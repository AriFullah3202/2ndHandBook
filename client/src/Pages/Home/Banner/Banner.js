import React from 'react'

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://i.ibb.co/2qgHbVD/banner.jpg")` }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5"> It is indeed the biggest online bookshop or bookstore in Bangladesh that helps you save time and money. You can buy books online with a few clicks.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner
