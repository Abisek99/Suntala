import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import api from '../../../common/api'
import useLocalState from '../../../utils/LocalState'
import {toast} from "react-toastify";
import axios from "axios";
import url from "../../../common/url";
import {BsHeartbreak} from "react-icons/bs"
import {FaCheck} from "react-icons/fa"

function BidList({user}) {
    const [products, setProducts] = useState([])
    const {alert, showAlert, loading, setLoading, hideAlert} = useLocalState()

    useEffect(() => {
        setLoading(true)
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        await api.rent.getAllRentRequests()
            .then((res) => {
                console.log(res.data)
                const tempProducts = res.data
                setProducts(tempProducts)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response.data)
                toast.error('Could Not Fetch Rental Details')
                showAlert({
                    text: `Could Not Fetch Rentals`,
                    type: 'danger',
                })
                setTimeout(() => {
                    hideAlert()
                }, 1600)
            })
    }

    const formatDate = (ball) => {
        if (ball === null || ball === undefined) return ''
        const date = new Date(ball)
        const gmtOffset = (5 * 60) + 45 // in minutes
        const gmtTime = new Date(date.getTime() + gmtOffset * 60 * 1000)
        const options = {year: 'numeric', month: 'short', day: 'numeric'}
        return gmtTime.toLocaleDateString('en-US', options)
    }

    const handleDelete = async (product) => {
        console.log(product.rentalId)
        console.log(user.id)
        const data = {
            rentalId: product.rentalId,
            approvedBy: user.id
        }
        await axios.post(`${url.proxy_api}rent/add`, data).then((res) => {
            console.log(res.data)
            toast.success(`${product.carName} Approved`)
            getAllProducts()
        }).catch((e) => {
            console.error(e)
            toast.success(`Error in Approval`)
        })
    }


    const customStyle = {
        control: (provided, state) => ({
            ...provided,
            background: '#fff',
            borderColor: '#EEEEEE',
            padding: 0,
            '&:hover': {borderColor: '#32c36c'},
            boxShadow: state.isFocused ? null : null,
        }),
    }
    return (
        <>
            <div
                className="tab-pane fade"
                id="v-pills-purchase"
                role="tabpanel"
                aria-labelledby="v-pills-purchase-tab"
            >
                <div className="table-title-area">
                    <h3>All Rentals</h3>
                    {alert.show && (
                        <div
                            className={`alert alert-${alert.type} text-center`}
                            style={{
                                fontFamily: 'Saira',
                                textTransform: 'capitalize',
                            }}
                        >
                            {alert.text}
                        </div>
                    )}
                </div>
                <div className="table-wrapper">

                    <table className="eg-table order-table table mb-0">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Car Name</th>
                            <th>Car Rate</th>
                            <th>Rental User</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {loading ? (
                            <div className={'m-5'} style={{fontFamily: 'Saira'}}>Loading...</div>
                        ) : (<>
                                <tbody>
                                {products &&
                                    products.map((product, id) => {
                                        return (
                                            <tr key={id}>
                                                <td data-label="SN">{id + 1}</td>

                                                <td data-label="Car Name">{product.carName}</td>
                                                <td data-label="Car Rate"> रु {product.carRate}</td>
                                                <td data-label="Rental User">{product.userName}</td>
                                                <td data-label="Request Date">{formatDate(product.rentalRequestDate)}</td>
                                                <td data-label="Status">{product.rentalStatus}</td>

                                                <td data-label="Action">
                                                    <button
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={() => handleDelete(product)}
                                                    >
                                                        <FaCheck size={16}/>Approve
                                                    </button>
                                                    <span
														style={{
															borderLeft: 'solid 1px #aaa',
															marginRight: '10px',
														}}
													></span>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        // onClick={() => handleDelete(product)}
                                                    >
                                                        <BsHeartbreak size={16}/> Damage
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
                {/* pagination area */}
                <div className="table-pagination">
                    <p>
                        {/* Showing 1 to {products ? products.length : '0'} of {products.length} entries */}
                        Showing 1 to {products ? products.length : '0'} entries
                    </p>
                    <nav className="pagination-wrap">
                        <ul className="pagination style-two d-flex justify-content-center gap-md-3 gap-2">
                            <li className="page-item">
                                <Link className="page-link" to={'#'} tabIndex={-1}>
                                    Prev
                                </Link>
                            </li>
                            <li className="page-item active" aria-current="page">
                                <Link className="page-link" to={'#'}>
                                    01
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={'#'}>
                                    02
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={'#'}>
                                    03
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={'#'}>
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default BidList
