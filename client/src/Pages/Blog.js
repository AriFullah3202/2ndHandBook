import React, { useState, useEffect } from 'react'
import useTitle from '../hooks/useTitle';
import { Link } from 'react-router-dom';


const Blog = () => {
    useTitle('Blog')
    const [Blog, setBlog] = useState([]);

    useEffect(() => {
        const url = "http://localhost:5000/blog"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBlog(data)
            })
    }, [])
    return (
        <>

            {
                Blog.map(blog => {
                    return <div key={blog._id} className="dark:bg-gray-800 dark:text-gray-100">
                        <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <span className="text-sm dark:text-gray-400">Nov 10, 2022</span>
                                <a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900">Javascript</a>
                            </div>
                            <div className="mt-3">
                                <a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">{blog.question}</a>
                                <p className="mt-2">{blog.answer}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Link to={`/blog/${blog._id}`} rel="noopener noreferrer" href="#" className="hover:underline dark:text-violet-400">Read more</Link>
                                <div>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center">
                                        <img src={blog ?.img} alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
                                        <span className="hover:underline dark:text-gray-400">{blog.name}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default Blog
