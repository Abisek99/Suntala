import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

import DashboardMenu from './DashboardMenu.jsx'
import DashboardContentTab from './DashboardContentTab.jsx'
import AddProduct from './AddProduct'
import ProductsList from './ProductsList'
import UsersList from './UsersList.jsx'
import useLocalState from '../../../utils/LocalState.jsx'
import url from '../../../common/url.js'
import BidList from './BidList'
import AddStaff from './AddStaff'
import ProfileContent from '../../profile/ProfileContent'
import RentalList from './RentalList.jsx'
import DamageRequest from "./DamageRequest";

const DashboardWrap = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [apiUser, setApiUser] = useState(
        JSON.parse(localStorage.getItem('userInfo'))
    )

    const {alert, showAlert, loading, setLoading, hideAlert} = useLocalState()
    const id = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        try {
            const newUser = localStorage.getItem('userInfo')
            if (newUser) {
                const uu = JSON.parse(newUser)
                setUser(uu)
            }
        } catch (e) {
            console.error(e)
        }
        const userName = id.id
        console.log("username:" + userName)
        fetchUser(userName)
        setLoading(false)
    }, [])

    const fetchUser = async (username) => {
        await fetchOneUser(username)
    }
    const fetchOneUser = async (userName) => {
        await axios
            .get(`${url.proxy_api}auth/getSingleUser?username=${userName}`)
            .then((res) => {
                const tempUser = res.data
                setUser(tempUser)
                setApiUser(tempUser)
                console.log('🚀 ~ file: DashboardMenu:54 ~ then ~ APIUSER :', apiUser)
            })
            .catch((err) => {
                console.log(err.response)
                toast.error('Something went wrong')
            })
    }

    useEffect(() => {
        console.log('🚀 ~ file: DashboardMenu:63 ~ then ~ APIUSER :', apiUser)
    }, []);

    return (
        <>
            <div className="dashboard-section pt-120 pb-120">
                <img
                    alt="images"
                    src={'/images/bg/section-bg.png'}
                    className="img-fluid section-bg-top"
                />
                <img
                    alt="images"
                    src={'/images/bg/section-bg.png'}
                    className="img-fluid section-bg-bottom"
                />
                {loading && loading ? (
                    <>
                        <div className="text-center">Loading...</div>
                    </>
                ) : (
                    <div className="container">
                        <div className="row g-4">
                            <DashboardMenu user={apiUser}/>
                            <div className="col-lg-9">
                                <div className="tab-content" id="v-pills-tabContent">
                                    {apiUser && apiUser.roleUser === 'admin' && (
                                        <DashboardContentTab user={apiUser}/>
                                    )}
                                    {apiUser && apiUser.roleUser === 'admin' && (
                                        <AddStaff user={apiUser}/>
                                    )}
                                    {apiUser &&
                                        (apiUser.roleUser === 'staff' ||
                                            apiUser.roleUser === 'user') && (
                                            <ProfileContent user={apiUser}/>
                                        )}
                                    {apiUser &&
                                        (apiUser.roleUser === 'staff' ||
                                            apiUser.roleUser === 'admin') && <AddProduct/>}
                                    {apiUser &&
                                        (apiUser.roleUser === 'staff' ||
                                            apiUser.roleUser === 'admin') && (
                                            <ProductsList user={apiUser}/>
                                        )}
                                    {/* <ProductsList /> */}

                                    {apiUser && apiUser.roleUser === 'admin' && <UsersList/>}
                                    {apiUser &&
                                        (apiUser.roleUser === 'staff' || apiUser.roleUser === 'admin') &&
                                        <BidList user={apiUser}/>}
                                    {apiUser &&
                                        (apiUser.roleUser === 'staff' || apiUser.roleUser === 'admin') &&
                                        <DamageRequest user={apiUser}/>}
                                    {apiUser && apiUser.roleUser === 'user' && <RentalList user={apiUser}/>}
                                    {/*<BidList/>*/}
                                    {/* <UsersList /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DashboardWrap
