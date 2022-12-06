import React from 'react'
import Banner from './Banner/Banner';
import CategoryAndAd from './CategoryAndAd/CategoryAndAd';
import Advertise from './Advertise/Advertise';
import useTitle from '../../hooks/useTitle';


const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner></Banner>
            <CategoryAndAd></CategoryAndAd>
            <Advertise></Advertise>
        </div>
    )
}

export default Home
