import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <section className='flex items-center h-screen p-16 bg-gray-100 text-gray-900'>
            <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
                <img
                    src='https://i.ibb.co/bQtcwDT/404-Image.png'
                    className='w-40 h-40 text-gray-600'
                >

                </img>
                <div className='max-w-md text-center'>

                    <p className='text-2xl font-semibold md:text-3xl mb-8'>
                        Sorry, we couldn't find this page.
          </p>
                    <Link
                        to='/'
                        className='px-8 py-3 font-semibold rounded bg-cyan-200 text-gray-900'
                    >
                        Back to homepage
          </Link>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage