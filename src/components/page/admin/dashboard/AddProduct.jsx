import React, { useEffect, useState } from 'react'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react'
import cloudinary from 'cloudinary-core'

import url from '../../../common/url'
import axios from 'axios'
import useLocalState from '../../../utils/LocalState'
import { toast } from 'react-toastify'

const cloudinaryCore = new cloudinary.Cloudinary({
	cloud_name: 'dg8j5cck1',
	api_key: '257774814993417',
	api_secret: 'J93nr_PWFg2-9PqxkTQ761fErdc',
	upload_preset: 'ml_default',
})

const AddProduct = () => {
	const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()

	const [productName, setProductName] = useState('')
	const [price, setPrice] = useState('')
	const [available, setAvailable] = useState('0')
	const [noOfRent, setNoOfRent] = useState(0)
	const [brand, setBrand] = useState('')
	const [desc, setDesc] = useState('')
	const [image, setImage] = useState(null)
	const [category, setCategory] = useState('')
	const [liveOn, setLiveOn] = useState('')
	const [showLink, setShowLink] = useState(false)
	const [prodId, setProdId] = useState('')

	const active = 'show active'

	// Setting up Cloudinary

	const checkFileSize = (file) => {
		const fileSize = file.size
		const maxSize = 1024 * 1024 * 2 // Maximum size in bytes (2MB)
		if (fileSize > maxSize) {
			toast.error('Image size cannot be more than 1.5MB')
			showAlert({
				text: `Image size cannot be more than 1.5MB`,
				type: 'danger',
			})
			return false
		}
		return true
	}
	const handleImageUpload = async (e) => {
		let imageFile = e.target.files[0]
		if (checkFileSize(imageFile)) {
			const formData = new FormData()
			formData.append('file', imageFile)
			formData.append('upload_preset', 'auk8f5a2')
			formData.append('folder', 'HKCR/Cars')
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/dg8j5cck1/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			)
			const data = await response.json()
			console.log(
				'🚀 ~ file: AddProduct.jsx:64 ~ handleImageUpload ~ data:',
				data
			)
			setImage(data.secure_url)
			// await cloudinary.uploader
			// 	.upload(formData)
			// 	.then((response) => {
			// 		console.log(response)
			// 	})
			// 	.catch((error) => {
			// 		console.error(error)
			// 	})
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setShowLink(false)
		try {
			const product = {
				carName: productName,
				carBrand: brand,
				carAvailability: available,
				carNoOfRent: noOfRent,
				carRentalRate: price,
				carImage: image,
				carModel: desc,
				carColor: category,
				// carLastRented: liveOn,
			}
			await axios.post(`${url.proxy_api}cars/add`, product).then((res) => {
				console.log(res.data)
				// const pID = res.data.product
				// setProdId(pID)
				// setShowLink(true)
				hideAlert()
				toast.success('Car Added Successfully')
				showAlert({
					text: `Car Added Successfully`,
					type: 'success',
				})

				setProductName('')
				setPrice('')
				setImage('')
				setLiveOn('')
				setCategory('traditional')
				setDesc('')
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<div
				className="tab-pane fade"
				id="v-pills-add-product"
				role="tabpanel"
				aria-labelledby="v-pills-add-product-tabs"
			>
				<div className="dashboard-profile">
					<div className="owner">
						<div className="content">
							<h3>Add Product: {productName}</h3>
						</div>
					</div>
					{alert.show && (
						<div
							className={`alert alert-${alert.type} text-center`}
							style={{
								margin: '0 2.6rem',
								fontFamily: 'Saira',
								textTransform: 'capitalize',
							}}
						>
							{alert.text}
						</div>
					)}
					<div className="form-wrapper">
						<form
							action="#"
							style={{ fontFamily: 'Saira' }}
							onSubmit={(e) => handleSubmit(e)}
						>
							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Product Name *</label>
										<input
											type="text"
											placeholder="Product name"
											value={productName}
											onChange={(e) => setProductName(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Rental Rate *</label>
										<input
											type="text"
											placeholder={'रु 5000'}
											value={price}
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Upload Image</label>
										<input
											style={{ fontSize: '14px' }}
											type="file"
											accept="image/*"
											onChange={(e) => handleImageUpload(e)}
										/>
									</div>
								</div>
								<div className="col-xl-6 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Model</label>
										<input
											placeholder="Model"
											value={desc}
											onChange={(e) => setDesc(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Color</label>
										<input
											name="message"
											placeholder="Car Color"
											value={category}
											onChange={(e) => setCategory(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Brand</label>
										<input
											name="message"
											placeholder="Brand"
											value={brand}
											onChange={(e) => setBrand(e.target.value)}
										/>
									</div>
								</div>

								<div className="col-xl-6 col-lg-12 col-md-6">
									<div className="form-inner">
										<label>Availability</label>
										<select
											name=""
											id=""
											className={'select style-2'}
											value={available}
											onChange={(e) => setAvailable(e.target.value)}
										>
											<option className={'selectBtn'} value="Available">
												Available
											</option>
											<option className={'select-option'} value="rented">
												Rented
											</option>
											<option className={'select-option'} value="damaged">
												Damaged
											</option>
										</select>
									</div>
								</div>
								{/* <div className="col-12">
									<div className="col-xl-6 col-lg-12 col-md-6">
										<div className="form-inner ">
											<label style={{ display: 'inline' }}>Owner{' : '}</label>
											<h5 style={{ display: 'inline', color: '#327c7d' }}>
												"user.name"
											</h5>
										</div>
									</div>
								</div> */}

								<div className="col-12">
									<div className="button-group">
										<button type="submit" className="eg-btn profile-btn">
											Add Product
										</button>
										<button
											className="eg-btn cancel-btn"
											type="button"
											onClick={(e) => handleCancel(e)}
										>
											Cancel
										</button>
									</div>
								</div>
								{/* {showLink && (
									<div className="col-12 mt-4 mb-0">
										<div style={{ display: 'flex', gap: '5px' }}>
											<p>
												Car{' '}
												<span className={'text-green'}>{prodId.name}</span>{' '}
												Added:
											</p>
											<Link
												className={'text-green mx-2'}
												style={{
													color: '#327c7d',
													textDecoration: 'underline',
												}}
												to={`${url.home}auction-details/${prodId._id}`}
											>
												View Product
											</Link>
										</div>
									</div>
								)}  */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddProduct
