const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log('============', process.env.STRIPE_SECRET_KEY)

// is for send email
// const sendMail = (emailData, email) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASS,
//     },
//   })

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: emailData ?.subject,
//     html: `<p>${emailData ?.message}</p>`,
//   }

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('Email sent: ' + info.response)
//     }
//   })
// }

// Database Connection
const uri = process.env.DB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})



// verify jwt token
function verifyJWT(req, res, next) {

  console.log('From ', req.method, req.originalUrl)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("it is for authHeader")
    return res.status(401).send({ message: 'unauthorized access' })
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('it is for err')
      return res.status(403).send({ message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })

}

async function run() {
  try {
    const userCollection = client.db('secondHand').collection('users')
    const bookCategoryCollection = client.db('secondHand').collection('bookCategory')
    const perCategoryCollection = client.db('secondHand').collection('PerCategoryItem')
    const OrderCollection = client.db('secondHand').collection('BookOrder')
    const blogCollection = client.db('secondHand').collection('Blog')
    const paymentCollection = client.db('secondHand').collection('payment')

    const verifyAdmin = async (req, res, next) => {
      console.log("inside admin", req.decoded.email)
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await userCollection.findOne(query)
      if (user ?.role !== 'admin') {
        return res.status(403).send({ message: 'forbidden access' })
      }
      next()
    }
    const verifySeller = async (req, res, next) => {
      console.log("inside seller", req.decoded.email)
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await userCollection.findOne(query)
      if (user ?.role !== 'seller') {
        return res.status(403).send({ message: 'forbidden access' })
      }
      next()
    }
    const verifyBuyer = async (req, res, next) => {
      console.log("inside buyer", req.decoded.email)
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await userCollection.findOne(query)
      if (user ?.role !== 'buyer') {
        return res.status(403).send({ message: 'forbidden access' })
      }
      next()
    }


    // save user to database
    app.put('/user/:email', async (req, res) => {
      try {
        const email = req.params.email
        const user = req.body
        console.log(user)
        const filter = { email: email }
        const options = { upsert: true }
        const updateDoc = {
          $set: user,
        }
        const result = await userCollection.updateOne(filter, updateDoc, options)
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '5d',
        })
        res.send({ result, token })
      }
      catch (err) {
        console.log(err)
      }
    })

    //create payment request
    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
      const order = req.body;
      const price = order.price
      const amount = price;
      console.log(amount)

      const paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: amount,
        'payment_method_types': [
          "card"
        ]
      })
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    })

    //create payment successful
    app.post('/payment', verifyJWT, async (req, res) => {
      const payment = req.body;
      const payresult = await paymentCollection.insertOne(payment)
      console.log('this is payresult')
      // it is order 
      const orderId = payment.orderId
      const filter = { _id: ObjectId(orderId) }
      const updateDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId
        }
      }
      const orderResult = await OrderCollection.updateOne(filter, updateDoc)
      console.log('this is order resutl check paid : true', orderId)
      //it is for book id 
      const bookId = payment.bookId;
      const filter1 = { _id: ObjectId(bookId) }
      const updateDoc1 = {
        $set: {
          status: "Sold",
        }
      }
      const bookResult = await perCategoryCollection.updateOne(filter1, updateDoc1)
      console.log('this is result for per book id', bookId)
      res.send(payresult)
    })

    //check admin
    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query)
      if (user.role === 'admin') {
        res.send({ isAdmin: true })
      }
      else if (user.role === 'seller') {
        res.send({ isSeller: true })
      }
      else {
        res.send({ isBuyer: true })
      }
    })

    // find all seller 
    app.get('/seller', verifyJWT, verifyAdmin, async (req, res) => {
      const role = "seller";
      const query = { role: role }
      const sellerUser = await userCollection.find(query).toArray()
      res.send(sellerUser)
    })
    //delete a seller
    app.delete('/seller/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log(id)
      console.log('this is delete route id', id)
      const filter = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(filter)
      res.send(result)
    })
    //report to admin
    app.put('/report/:id', async (req, res) => {
      const id = req.params.id;
      const report = req.body;
      console.log(report)
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: report,
      }

      const result = await perCategoryCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })
    // find all buyer
    app.get('/buyer', verifyJWT, verifyAdmin, async (req, res) => {
      const role = "buyer";
      const query = { role: role }
      const sellerUser = await userCollection.find(query).toArray()
      res.send(sellerUser)
    })
    //delete buyer
    app.delete('/buyer/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log(id)
      console.log('this is delete route id', id)
      const filter = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(filter)
      res.send(result)
    })

    //fetch products which are reported
    app.get('/allReportedItems', verifyJWT, verifyAdmin, async (req, res) => {
      const result = await perCategoryCollection.find({ report: true }).toArray()
      res.send(result)
    })
    //delete the reported item
    app.delete('/deleteReport/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log('this is delete route id', id)
      const filter = { _id: ObjectId(id) }
      const result = await perCategoryCollection.deleteOne(filter)
      res.send(result)
    })

    //to verify the seller
    app.put('/seller/verify/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const verify = req.body;
      console.log(verify)
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: verify,
      }
      const result = await userCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    app.get('/myOrder', verifyJWT, verifyBuyer, async (req, res) => {
      const email = req.query.email;
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        console.log('this is /myOrder')
        return res.status(403).send({ messsge: 'forbidden access' })
      }
      const query = { email: email }
      const product = await OrderCollection.find(query).toArray()
      res.send(product)
    })
    //create a payment 

    app.get('/deshboard/payment/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { _id: ObjectId(id) }
      const result = await OrderCollection.findOne(query)
      res.send(result)
    })
    // check seller status
    app.get('/sellerStatus', async (req, res) => {
      const result = await userCollection.find({ verify: true }).project({ email: 1, _id: 0 }).toArray();
      res.send(result)
    })

    app.get('/bookCategory', async (req, res) => {
      console.log("click")
      const query = {}
      const cursor = await bookCategoryCollection.find(query)
      const bookCategory = await cursor.toArray();
      res.send(bookCategory)
    })
    //category
    app.get('/category/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        $and: [
          { "status": { "$in": ["Unsold"] } },
          { categoryId: id },
        ]
      }
      const item = await perCategoryCollection.find(query).toArray()
      res.send(item)
    })
    //for advertise
    app.get('/advertise', async (req, res) => {
      const id = req.params.id;
      const query = {
        $and: [
          { "status": { "$in": ["Unsold"] } },
          { "advertise": { "$in": [true] } }
        ]
      }
      const result = await perCategoryCollection.find(query).toArray()
      res.send(result)
    })

    app.post('/product', verifyJWT, verifySeller, async (req, res) => {
      const bookOrder = req.body;
      console.log(bookOrder)
      const result = await perCategoryCollection.insertOne(bookOrder)
      res.send(result)
    })

    app.get('/product', verifyJWT, verifySeller, async (req, res) => {
      const email = req.query.email;
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ messsge: 'forbidden access' })
      }
      const query = { email: email }
      const product = await perCategoryCollection.find(query).toArray()
      res.send(product)
    })

    app.delete('/product/:id', verifyJWT, verifySeller, async (req, res) => {
      const id = req.params.id;
      console.log(id)
      console.log('this is delete route id', id)
      const filter = { _id: ObjectId(id) }
      const result = await perCategoryCollection.deleteOne(filter)
      res.send(result)
    })

    //change the advertise field
    app.patch('/product/:id', verifyJWT, verifySeller, async (req, res) => {
      const id = req.params.id;

      const advertise = req.body.advertise;
      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: {
          advertise: advertise
        }
      }
      //for update
      const result = await perCategoryCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    // save bookOrder
    app.post('/bookOrder', async (req, res) => {
      const bookOrder = req.body;
      const result = await OrderCollection.insertOne(bookOrder)
      res.send(result)
    })
    // get blog
    app.get('/blog', async (req, res) => {
      const query = {}
      const cursor = blogCollection.find(query);
      const blog = await cursor.toArray();
      res.send(blog);
    });
    app.get('/blog/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      console.log('this is blog id', id)
      const query = { _id: ObjectId(id) }
      const result = await blogCollection.findOne(query)
      res.send(result)
    })


  } catch (err) {
    console.log(err)
  }
  finally {

  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running...!')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
