import React, {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {AiOutlineLogout, AiOutlineUserAdd} from 'react-icons/ai'
import {GiCarpetBombing} from 'react-icons/gi'
import {BsScrewdriver} from "react-icons/bs";
import {MdOutlineCarRental} from "react-icons/md";
import {FaCarCrash} from "react-icons/fa";
import {IoCarSportOutline} from "react-icons/io5";


import api from '../../../common/api'

const DashboardMenu = ({user}) => {
    const navigate = useNavigate()
    useRef(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    })

    const active = 'active'

    const handleLogout = async () => {
        await api.auth
            .logout()
            .then((res) => {
                localStorage.setItem('userInfo', '')
                localStorage.setItem('userToken', '')
                toast.success('Logged out successfully')
                console.log('logged out')
                navigate('/')
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    return (<>
        <div className="col-lg-3">
            <div
                className="nav flex-column nav-pills gap-4 wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <>
                    {user && user.roleUser === 'admin' && (
                        <>

                            <button
                                className="nav-link active nav-btn-style mx-auto  mb-20"
                                id="v-pills-dashboard-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-dashboard"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-dashboard"
                                aria-selected="true"
                            >
                                <svg
                                    width={22}
                                    height={22}
                                    viewBox="0 0 22 22"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_388_603)">
                                        <path
                                            d="M8.47911 7.33339H1.60411C0.719559 7.33339 0 6.61383 0 5.72911V1.60411C0 0.719559 0.719559 0 1.60411 0H8.47911C9.36383 0 10.0834 0.719559 10.0834 1.60411V5.72911C10.0834 6.61383 9.36383 7.33339 8.47911 7.33339ZM1.60411 1.375C1.47772 1.375 1.375 1.47772 1.375 1.60411V5.72911C1.375 5.85567 1.47772 5.95839 1.60411 5.95839H8.47911C8.60567 5.95839 8.70839 5.85567 8.70839 5.72911V1.60411C8.70839 1.47772 8.60567 1.375 8.47911 1.375H1.60411Z"/>
                                        <path
                                            d="M8.47911 22H1.60411C0.719559 22 0 21.2805 0 20.3959V10.7709C0 9.88618 0.719559 9.16663 1.60411 9.16663H8.47911C9.36383 9.16663 10.0834 9.88618 10.0834 10.7709V20.3959C10.0834 21.2805 9.36383 22 8.47911 22ZM1.60411 10.5416C1.47772 10.5416 1.375 10.6443 1.375 10.7709V20.3959C1.375 20.5223 1.47772 20.625 1.60411 20.625H8.47911C8.60567 20.625 8.70839 20.5223 8.70839 20.3959V10.7709C8.70839 10.6443 8.60567 10.5416 8.47911 10.5416H1.60411Z"/>
                                        <path
                                            d="M20.3953 22H13.5203C12.6356 22 11.916 21.2805 11.916 20.3959V16.2709C11.916 15.3862 12.6356 14.6667 13.5203 14.6667H20.3953C21.2798 14.6667 21.9994 15.3862 21.9994 16.2709V20.3959C21.9994 21.2805 21.2798 22 20.3953 22ZM13.5203 16.0417C13.3937 16.0417 13.291 16.1444 13.291 16.2709V20.3959C13.291 20.5223 13.3937 20.625 13.5203 20.625H20.3953C20.5217 20.625 20.6244 20.5223 20.6244 20.3959V16.2709C20.6244 16.1444 20.5217 16.0417 20.3953 16.0417H13.5203Z"/>
                                        <path
                                            d="M20.3953 12.8334H13.5203C12.6356 12.8334 11.916 12.1138 11.916 11.2291V1.60411C11.916 0.719559 12.6356 0 13.5203 0H20.3953C21.2798 0 21.9994 0.719559 21.9994 1.60411V11.2291C21.9994 12.1138 21.2798 12.8334 20.3953 12.8334ZM13.5203 1.375C13.3937 1.375 13.291 1.47772 13.291 1.60411V11.2291C13.291 11.3557 13.3937 11.4584 13.5203 11.4584H20.3953C20.5217 11.4584 20.6244 11.3557 20.6244 11.2291V1.60411C20.6244 1.47772 20.5217 1.375 20.3953 1.375H13.5203Z"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_388_603">
                                            <rect width={22} height={22} fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                Dashboard
                            </button>
                            <button
                                className={`nav-link  nav-btn-style mx-auto mb-20`}
                                id="v-pills-user-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-user"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-user"
                                aria-selected="true"
                            >
                                <i className="lar la-user"/>
                                <svg
                                    width={22}
                                    height={22}
                                    viewBox="0 0 22 22"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.7782 14.2218C17.5801 13.0237 16.1541 12.1368 14.5982 11.5999C16.2646 10.4522 17.3594 8.53136 17.3594 6.35938C17.3594 2.85282 14.5066 0 11 0C7.49345 0 4.64062 2.85282 4.64062 6.35938C4.64062 8.53136 5.73543 10.4522 7.40188 11.5999C5.84598 12.1368 4.41994 13.0237 3.22184 14.2218C1.14421 16.2995 0 19.0618 0 22H1.71875C1.71875 16.8823 5.88229 12.7188 11 12.7188C16.1177 12.7188 20.2812 16.8823 20.2812 22H22C22 19.0618 20.8558 16.2995 18.7782 14.2218ZM11 11C8.44117 11 6.35938 8.91825 6.35938 6.35938C6.35938 3.8005 8.44117 1.71875 11 1.71875C13.5588 1.71875 15.6406 3.8005 15.6406 6.35938C15.6406 8.91825 13.5588 11 11 11Z"/>
                                </svg>
                                All Users
                            </button>
                            <button
                                className={`nav-link nav-btn-style mx-auto mb-20`}
                                id="v-pills-add-staff-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-add-staff"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-add-staff"
                                aria-selected="true"
                            >
                                <AiOutlineUserAdd size={28}/>
                                Add Staff
                            </button>
                        </>
                    )}
                    {user && (user.roleUser === 'admin' || user.roleUser === 'staff') && (
                        <>
                            <button
                                className="nav-link nav-btn-style mx-auto mb-20"
                                id="v-pills-add-product-tabs"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-add-product"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-add-product"
                                aria-selected="true"
                            >
                                <GiCarpetBombing size={28}/>
                                Add Cars
                            </button>
                            <button
                                className="nav-link nav-btn-style mx-auto mb-20"
                                id="v-pills-add-damage-tabs"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-add-damage"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-add-damage"
                                aria-selected="true"
                            >
                                <FaCarCrash size={28}/>
                                Damage Request
                            </button>
                            <button
                                className={`nav-link ${user && user.roleUser === 'staff' && 'active'} nav-btn-style mx-auto mb-20 `}
                                id="v-pills-order-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-order"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-order"
                                aria-selected="true"
                            >
                                <IoCarSportOutline siz={29}/>
                                All Cars
                            </button>
                            <button
                                className="nav-link nav-btn-style mx-auto"
                                id="v-pills-purchase-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-purchase"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-purchase"
                                aria-selected="true"
                            >
                                <MdOutlineCarRental size={28}/>
                                All Rentals
                            </button>
                            <button
                                className="nav-link nav-btn-style mx-auto"
                                id="v-pills-damages-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-damages"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-damages"
                                aria-selected="true"
                            >
                                <BsScrewdriver size={28}/>
                                All Damages
                            </button>
                        </>
                    )}


                </>
                {user && (user.roleUser === 'staff' || user.roleUser === 'user') && (
                    <>
                        <button
                            className={`nav-link nav-btn-style mx-auto mb-20`}
                            id="v-pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="true"
                        >
                            <i className="lar la-user"/>
                            <svg
                                width={22}
                                height={22}
                                viewBox="0 0 22 22"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.7782 14.2218C17.5801 13.0237 16.1541 12.1368 14.5982 11.5999C16.2646 10.4522 17.3594 8.53136 17.3594 6.35938C17.3594 2.85282 14.5066 0 11 0C7.49345 0 4.64062 2.85282 4.64062 6.35938C4.64062 8.53136 5.73543 10.4522 7.40188 11.5999C5.84598 12.1368 4.41994 13.0237 3.22184 14.2218C1.14421 16.2995 0 19.0618 0 22H1.71875C1.71875 16.8823 5.88229 12.7188 11 12.7188C16.1177 12.7188 20.2812 16.8823 20.2812 22H22C22 19.0618 20.8558 16.2995 18.7782 14.2218ZM11 11C8.44117 11 6.35938 8.91825 6.35938 6.35938C6.35938 3.8005 8.44117 1.71875 11 1.71875C13.5588 1.71875 15.6406 3.8005 15.6406 6.35938C15.6406 8.91825 13.5588 11 11 11Z"/>
                            </svg>
                            My Profile
                        </button>
                    </>
                )}
                {user && user.roleUser === 'user' && (
                    <button
                        className={`nav-link active nav-btn-style mx-auto`}
                        id="v-pills-rent-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-rent"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-rent"
                        aria-selected="true"
                    >
                        <MdOutlineCarRental size={28}/>
                        My Rentals
                    </button>
                )}

                <button
                    className="nav-link nav-btn-style mx-auto"
                    onClick={(e) => handleLogout(e)}
                    type="button"
                    role="tab"
                >
                    <AiOutlineLogout size={28}/>
                    Logout
                </button>
            </div>
            {/* )} */}
        </div>
    </>)
}

export default DashboardMenu
