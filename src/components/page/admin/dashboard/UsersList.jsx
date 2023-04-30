import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../common/api'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'

import useLocalState from '../../../utils/LocalState'

function UsersList() {
	const [products, setProducts] = useState([])
	const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			getAllProducts()
		}, 1200)
	}, [])

	const getAllProducts = async () => {
		await api.users
			.getAllUser()
			.then((res) => {
				console.log(res.data)
				const tempUsers = res.data
				setProducts(tempUsers)
				showAlert({
					text: `Users Fetched`,
					type: 'success',
				})
				setTimeout(() => {
					hideAlert()
				}, 1600)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err.response.data)
				// toast.warning('Could Not Fetch Users')
				showAlert({
					text: `Could Not Fetch Users`,
					type: 'danger',
				})
				setTimeout(() => {
					hideAlert()
				}, 1600)
			})
	}

	const handleDelete = async (product) => {
		// console.log(product._id)
		// await api.products.deleteProduct(product._id).then((res) => {
		// 	console.log(res.data.msg)
		// 	showAlert({
		// 		text: `Deleted Product ${product.name}`,
		// 		type: 'danger',
		// 	})
		// })
		// getAllProducts()
	}
	const confirmEmail = (data) => {
		if (data === 'true') {
			return <span className="text-success">Confirmed</span>
		} else {
			return <span className="text-danger">Not Confirmed</span>
		}
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
	return (
		<>
			<div
				className="tab-pane fade"
				id="v-pills-user"
				role="tabpanel"
				aria-labelledby="v-pills-user-tab"
			>
				<div className="table-title-area">
					<h3>All Users</h3>
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
									<th>User Name</th>
									<th>User Email</th>
									<th>User Confirmed</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{products &&
									products.map((product, id) => {
										return (
											<tr key={id}>
												<td data-label="SN">{id + 1}</td>
												<td data-label="User Name">{product.userName}</td>
												<td data-label="User Email">{product.email}</td>
												<td data-label="User Role">
													{confirmEmail(product.isEmailConfirmed.toString())}
												</td>
												<td data-label="Action">
													<button
														style={{ marginRight: '10px' }}
														className="btn btn-outline-dark btn-sm"
														onClick={() => handleDelete(product)}
													>
														<FiEdit size={16} />
													</button>
													<span
														style={{
															borderLeft: 'solid 1px #aaa',
															marginRight: '10px',
														}}
													></span>
													<button
														className="btn btn-outline-danger btn-sm"
														onClick={() => handleDelete(product)}
													>
														<FiTrash size={16} />
													</button>
												</td>
											</tr>
										)
									})}
							</tbody>
						</table>
					)}
				</div>
				{/* pagination area */}
				<div className="table-pagination">
					<p>
						{/* Showing 1 to {products.length} of {products.length} entries */}
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

export default UsersList
