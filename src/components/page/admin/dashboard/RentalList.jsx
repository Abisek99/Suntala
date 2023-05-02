import React, {useEffect, useState} from 'react'
import useLocalState from '../../../utils/LocalState'
import api from '../../../common/api'
import {toast} from 'react-toastify'
import {useParams} from "react-router-dom";

function RentalList({user}) {
    const [products, setProducts] = useState([])
    const {alert, showAlert, loading, setLoading, hideAlert} = useLocalState()
    const id = useParams()

    useEffect(() => {
        setLoading(true)
        getAllProducts()
        console.log(user)
    }, [])

    // const userID = id.id
    const userDetail = user.id

    const getAllProducts = async () => {
        await api.rent.getUserRentRequests(userDetail)
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

    // const handleDelete = async (product) => {
    //     console.log(product.carID)
    //     await api.products.deleteProduct(product.carID).then((res) => {
    //         console.log(res)
    //         toast.danger(`Deleted Product ${product.carName}`)
    //         showAlert({
    //             text: `Deleted Product ${product.carName}`,
    //             type: 'danger',
    //         })
    //     })
    //     getAllProducts()
    // }

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
    const formatDate = (apple) => {
        if (apple === null || apple === undefined) return ''
        const date = new Date(apple)
        const gmtOffset = (5 * 60) + 45 // in minutes
        const gmtTime = new Date(date.getTime() + gmtOffset * 60 * 1000)
        const options = {year: 'numeric', month: 'short', day: 'numeric'}
        return gmtTime.toLocaleDateString('en-US', options)
    }

    return (
        <>
            <div
                className={`tab-pane fade show active `}
                id="v-pills-rent"
                role="tabpanel"
                aria-labelledby="v-pills-rent-tab"
            >
                <div className="table-title-area">
                    <h3>My Rentals</h3>
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
                    {loading ? (
                        <div className={'text-center'}>Loading...</div>
                    ) : (
                        <table className="eg-table order-table table mb-0">
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Car Name</th>
                                <th>Rental Rate</th>
                                <th>Rental Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products &&
                                products.map((product, id) => {
                                    return (
                                        <tr key={id}>
                                            <td data-label="SN">{id + 1}</td>
                                            <td data-label="Car Name">{product.carName}</td>
                                            <td data-label="Rental Rate">
                                                रु {product.carRate}
                                            </td>

                                            <td data-label="Rental Date">
                                                {formatDate(product.rentalRequestDate)}
                                            </td>
                                            <td data-label="Return Date">
                                                {formatDate(product.carLastRented)}
                                            </td>
                                            <td data-label="Status">{product.rentalStatus}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* pagination area */}
                {/* <div className="table-pagination">
					<p>
					</p>
					<nav className="pagination-wrap">
						<ul className="pagination style-two d-flex justify-content-center gap-md-3 gap-2">
							<li className="page-item">
								<Link className="page-link" to={'#'} tabIndex={-1}>
									Prev
								</Link>
							</li>
							<li className="page-item activ
							e" aria-current="page">
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
				</div> */}
            </div>
        </>
    )
}

export default RentalList
