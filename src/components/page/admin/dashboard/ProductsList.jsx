import React, {useEffect, useState} from 'react'
import useLocalState from '../../../utils/LocalState'
import api from '../../../common/api'
import {FiTrash} from 'react-icons/fi'
import {toast} from 'react-toastify'

function ProductsList({user}) {
    const [apiUser, setApiUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [products, setProducts] = useState([])
    const {alert, showAlert, loading, setLoading, hideAlert} = useLocalState()


    useEffect(() => {
        setLoading(true)
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        await api.products
            .getAllProduct()
            .then((res) => {
                console.log(res.data)
                const tempProducts = res.data
                setProducts(tempProducts)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response.data)
                toast.error('Could Not Fetch Products')
                showAlert({
                    text: `Could Not Fetch Products`, type: 'danger',
                })
                setTimeout(() => {
                    hideAlert()
                }, 1600)
            })
    }

    const handleDelete = async (product) => {
        console.log(product.carID)
        await api.products.deleteProduct(product.carID).then((res) => {
            console.log(res)
            toast.danger(`Deleted Product ${product.carName}`)
            showAlert({
                text: `Deleted Product ${product.carName}`, type: 'danger',
            })
        })
        getAllProducts()
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
    const formatDate = (apple) => {
        if (apple === null || apple === undefined) return ''
        const inputTime = apple
        const date = new Date(inputTime)
        const gmtOffset = 5 * 60 + 45 // in minutes
        const gmtTime = new Date(date.getTime() + gmtOffset * 60 * 1000)
        const options = {year: 'numeric', month: 'short', day: 'numeric'}
        const formattedDate = gmtTime.toLocaleDateString('en-US', options)
        return formattedDate
    }

    return (<>
        <div
            className={`tab-pane fade ${user && user.roleUser === 'staff' && 'show active'}`}
            id="v-pills-order"
            role="tabpanel"
            aria-labelledby="v-pills-order-tab"
        >
            <div className="table-title-area">
                <h3>All Cars</h3>
                {alert.show && (<div
                    className={`alert alert-${alert.type} text-center`}
                    style={{
                        fontFamily: 'Saira', textTransform: 'capitalize',
                    }}
                >
                    {alert.text}
                </div>)}
            </div>
            <div className="table-wrapper">
                {loading ? (<div className={'text-center'}>Loading...</div>) : (
                    <table className="eg-table order-table table mb-0">
                        <thead>
                        <tr>
                            <th>SN</th>
                            {/* <th>Image</th> */}
                            <th>Car Name</th>
                            <th>Car Brand</th>
                            <th>Rental Price</th>
                            <th>No of Rents</th>
                            <th>Last Rented On</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products && products.map((product, id) => {
                            return (<tr key={id}>
                                <td data-label="SN">{id + 1}</td>
                                {/* <td data-label="Image">
													<img
														alt={product.name}
														// src={product.image}
														src="/uploads/example.jpg"
														className="img-fluid boxy-image"
													/>
												</td> */}
                                <td data-label="Car Name">{product.carName}</td>
                                <td data-label="Car Brand">{product.carBrand}</td>
                                <td data-label="Rental Price">
                                    रु {product.carRentalRate}
                                </td>
                                <td data-label="Number of Rents">
                                    {product.carNoOfRent}
                                </td>
                                <td data-label="Last Rented">
                                    {formatDate(product.carLastRented)}
                                </td>
                                <td data-label="Status">{product.carAvailability}</td>
                                <td data-label="Action">
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(product)}
                                    >
                                        <FiTrash size={16}/>
                                    </button>
                                </td>
                            </tr>)
                        })}
                        </tbody>
                    </table>)}
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
				</div> */}
        </div>
    </>)
}

export default ProductsList
