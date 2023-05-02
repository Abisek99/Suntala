import React, { useEffect, useState } from 'react'
import useLocalState from '../../../utils/LocalState'
import api from '../../../common/api'
import { FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'

function RentalList({ user }) {
	const [products, setProducts] = useState([])
	const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()
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
					text: `Could Not Fetch Products`,
					type: 'danger',
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
				text: `Deleted Product ${product.carName}`,
				type: 'danger',
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
			'&:hover': { borderColor: '#32c36c' },
			boxShadow: state.isFocused ? null : null,
		}),
	}
	const formatDate = (apple) => {
		if (apple === null || apple === undefined) return ''
		const inputTime = apple
		const date = new Date(inputTime)
		const gmtOffset = 5 * 60 + 45 // in minutes
		const gmtTime = new Date(date.getTime() + gmtOffset * 60 * 1000)
		const options = { year: 'numeric', month: 'short', day: 'numeric' }
		const formattedDate = gmtTime.toLocaleDateString('en-US', options)
		return formattedDate
	}

	return (
		<>
			<div
				className={`tab-pane fade `}
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
									<th>Damage</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td data-label="SN">1</td>
									<td data-label="Car Name">Maruti Suzuki Swift</td>
									<td data-label="Rental Rate">रु 2000</td>
									<td data-label="Rental Date">12/12/2020</td>
									<td data-label="Return Date">12/12/2020</td>
									<td data-label="Damage">No</td>
								</tr>
								<tr>
									<td data-label="SN">2</td>
									<td data-label="Car Name">Dodge Challenger Hellcat</td>
									<td data-label="Rental Rate">रु 6000</td>
									<td data-label="Rental Date">12/4/2023</td>
									<td data-label="Return Date">13/4/2023</td>
									<td data-label="Damage">No</td>
								</tr>
								{products &&
									products.map((product, id) => {
										return (
											<tr key={id}>
												<td data-label="SN">{id + 1}</td>
												<td data-label="Car Name">{product.carName}</td>
												<td data-label="Rental Price">
													रु {product.carRentalRate}
												</td>

												<td data-label="Last Rented">
													{formatDate(product.carLastRented)}
												</td>
												<td data-label="Last Rented">
													{formatDate(product.carLastRented)}
												</td>
												<td data-label="Status">{product.carAvailability}</td>
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
