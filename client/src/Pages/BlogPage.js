import React from 'react'
import { useLoaderData, useNavigation } from 'react-router';
import SmallSpinner from '../components/Spinner/SmallSpinner';


const BlogPage = () => {
    const data = useLoaderData()
    const navigation = useNavigation()
    console.log(data)

    if (navigation.state === 'loading') {
        return <SmallSpinner></SmallSpinner>
    }
    return (
        <div>
            <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">
                <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-400">Nov 30, 2022</span>
                    <a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900">Javascript</a>
                </div>

                <div className="mt-3">
                    <a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">{data.question}</a>
                    <p className="mt-2">{data.answer}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p></p>
                    <a rel="noopener noreferrer" href="#" className="flex items-center">
                        <img src={data ?.img} alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
                        <span className="hover:underline dark:text-gray-400">{data.name}</span>
                    </a>
                </div>
            </div>
        </div>


    )
}

export default BlogPage
