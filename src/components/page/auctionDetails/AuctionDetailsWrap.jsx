import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

import Header from '../../common/Header.jsx'
import Footer from '../../common/Footer.jsx'
import AuctionInfo from './AuctionInfo.jsx'
import useLocalState from "../../utils/LocalState";
import url from "../../common/url";

function AuctionDetailsWrap() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [apiUser, setApiUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [userId, setUserId] = useState('');

    const {alert, showAlert, loading, setLoading, hideAlert} = useLocalState()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        setUserItem()
        setLoading(false)
    }, [])

    const setUserItem = async () => {
        try {
            const newUser = localStorage.getItem('userInfo')
            if (!newUser) {
                navigate('/login')
            } else {
                const uu = JSON.parse(newUser)
                console.log(uu)
                await setUser(uu)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        console.log(user)
        const userName = user.userName
        console.log(user.id)
        setUserId(user.id)
        fetchUser(userName)
    }, []);

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


    useRef(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    })


    return (<>
        <Header/>
        <div className="auction-details-section pt-120 pb-120">
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
            <div className="container">
                <AuctionInfo user={user}/>
            </div>
        </div>
        <Footer/>
    </>)
}

export default AuctionDetailsWrap
