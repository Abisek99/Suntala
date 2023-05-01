import React, {useEffect, useState} from 'react'

import Header from "../../../common/Header.jsx";
import Footer from "../../../common/Footer.jsx";
import Breadcrumb from "../../../common/BreadCrumb.jsx";
import DashboardWrap from "./DashboardWrap.jsx"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const newUser = localStorage.getItem('userInfo')
            if ((!newUser) || newUser === '') {
                toast.error("Not Logged In")
                navigate(`/login`, {replace: true})
            }
        } catch (e) {
            console.error(e)
        }
    }, [])

    return <>
        <Header/>
        <Breadcrumb pageName="Dashboard" pageTitle="Dashboard"/>
        <DashboardWrap/>
        <Footer/>
    </>
}

export default Dashboard
