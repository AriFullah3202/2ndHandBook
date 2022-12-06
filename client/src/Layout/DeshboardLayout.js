import React, { useContext } from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';

const DeshboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user ?.email)
    const [isSeller] = useSeller(user ?.email)
    const [isBuyer] = useBuyer(user ?.email)

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="deshboardDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="deshboardDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to="/deshboard">Deshboard</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to="/deshboard/AllSeller">All Seller</Link></li>
                                <li><Link to="/deshboard/AllBuyer">All Buyer</Link></li>
                                <li><Link to="/deshboard/report">Reported</Link></li>

                            </>
                        }
                        {
                            isSeller && <>
                                <li><Link to="/deshboard/AddAProduct">Add A Product</Link></li>
                                <li><Link to="/deshboard/MyProduct">My Products</Link></li>
                            </>
                        }
                        {
                            isBuyer &&
                            <li><Link to="/deshboard/MyOrder">MyOrder</Link></li>

                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default DeshboardLayout
