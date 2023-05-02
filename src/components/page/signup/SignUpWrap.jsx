import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cloudinary from 'cloudinary-core'
import axios from 'axios'

import useLocalState from '../../utils/LocalState.jsx'
import api from '../../common/api.js'
import url from '../../common/url.js'

const cloudinaryCore = new cloudinary.Cloudinary({
	cloud_name: 'dg8j5cck1',
	api_key: '257774814993417',
	api_secret: 'J93nr_PWFg2-9PqxkTQ761fErdc',
	upload_preset: 'ml_default',
})

function SignUpWrap() {
	const [openEye, setOpenEye] = useState(true)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [image, setImage] = useState(null)
	const [imageId, setImageId] = useState('')
	const [imageType, setImageType] = useState('License')

	const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()
	const navigate = useNavigate()

	const handleEyeIcon = () => {
		setOpenEye(!openEye)
	}

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
			formData.append('folder', 'HKCR/Docs')
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
			const secureUrl = data.secure_url
			console.log(`secure url: ${secureUrl}`)
			await setImage(secureUrl)
			console.log('Line 74 Image: ' + image)

			await uploadImage(secureUrl)
		}
	}
	useEffect(() => {
		console.log('Image URL:', image)
	}, [image])

	const uploadImage = async (imgUrl) => {
		const docValues = {
			docType: imageType,
			docImage: imgUrl,
		}
		try {
			await axios.post(`${url.proxy_api}user/docs`, docValues).then((res) => {
				console.log(res)
				const response = res.data
				setImageId(response.docId)
			})
		} catch (e) {
			console.error(e)
		}
		// console.log(imageId)
	}

	useEffect(() => {
		console.log('Image ID:', imageId)
	}, [imageId])

	const handleSignUp = async (e) => {
		e.preventDefault()
		hideAlert()
		setLoading(true)
		const signUpUser = { name, username, email, password, phone, imageId }
		// const headers = {
		//     headers: {
		//         'Content-Type': 'application/json',
		//         'Access-Control-Allow-Origin': '*'
		//     }
		// }
		console.table(signUpUser)
		await api.auth.registerUser(signUpUser).then((res) => {
			console.log(res)
			setUsername('')
			setEmail('')
			setPassword('')
			localStorage.setItem('userToken', JSON.stringify(res.token))
			toast.success(`Account Created Successfully`)
			setTimeout(() => {
				navigate('/login')
			}, 1800)
			setLoading(false)
		})
	}

	return (
		<>
			<div className="signup-section pt-80 pb-120">
				<img
					alt="images"
					src={'/images/bg/section-bg.png'}
					className="section-bg-top"
				/>
				<img
					alt="images"
					src={'/images/bg/section-bg.png'}
					className="section-bg-bottom"
				/>
				<div className="container">
					<div className="row d-flex justify-content-center">
						<div className="col-xl-6 col-lg-8 col-md-10">
							<div
								className="form-wrapper wow fadeInUp"
								data-wow-duration="1.5s"
								data-wow-delay=".2s"
							>
								<div className="form-title">
									<h3>Sign Up</h3>
									<p>
										Do you already have an account?{' '}
										<Link
											to={`/login`}
											onClick={() =>
												window.scrollTo({ top: 0, behavior: 'smooth' })
											}
										>
											Log in here
										</Link>
									</p>
								</div>
								{alert.show && (
									<div
										className={`alert alert-${alert.type} login-section text-center`}
										style={{
											fontFamily: 'Saira',
											textTransform: 'Uppercase',
										}}
									>
										{alert.text}
									</div>
								)}
								<form
									className="w-100 mb-5"
									method="POST"
									onSubmit={(e) => handleSignUp(e)}
								>
									<div className="row">
										<div className="col-md-12">
											<div className="form-inner">
												<label>Name *</label>
												<input
													type="text"
													placeholder="Name"
													value={name}
													onChange={(e) => {
														setName(e.target.value)
													}}
												/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-inner">
												<label>Upload Document</label>
												<input
													style={{ fontSize: '14px' }}
													type="file"
													accept="image/*"
													onChange={(e) => handleImageUpload(e)}
												/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-inner">
												<label>Document Type</label>
												<select
													className={'select style-2'}
													value={imageType}
													onChange={(e) => setImageType(e.target.value)}
												>
													<option className={'selectBtn'} value="License">
														License
													</option>
													<option
														className={'select-option'}
														value="Citizenship"
													>
														Citizenship
													</option>
													<option className={'select-option'} value="Passport">
														Passport
													</option>
												</select>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-inner">
												<label>Username *</label>
												<input
													type="text"
													placeholder="Username"
													value={username}
													onChange={(e) => {
														setUsername(e.target.value)
													}}
												/>
											</div>
										</div>

										<div className="col-md-12">
											<div className="form-inner">
												<label>Enter Your Email *</label>
												<input
													type="email"
													placeholder="Enter Your Email"
													value={email}
													onChange={(e) => {
														setEmail(e.target.value)
													}}
												/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-inner">
												<label>Password *</label>
												<input
													type={openEye ? 'password' : 'text'}
													name="password"
													id="password"
													placeholder="Create A Password"
													value={password}
													onChange={(e) => {
														setPassword(e.target.value)
													}}
												/>
												<i
													className={
														openEye
															? 'bi bi-eye-slash'
															: 'bi bi-eye-slash bi-eye'
													}
													onClick={handleEyeIcon}
													id="togglePassword"
												/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-inner">
												<label htmlFor={'phone'}>Phone Number *</label>
												<input
													type="text"
													name="phone"
													id="phone"
													placeholder="Phone Number"
													value={phone}
													onChange={(e) => {
														setPhone(e.target.value)
													}}
												/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
												<div className="form-group user-select-none">
													<input type="checkbox" id="html" />
													<label htmlFor="html">
														I agree to the Terms &amp; Policy
													</label>
												</div>
											</div>
										</div>
									</div>
									<button className="account-btn">
										{loading ? 'Loading...' : 'Create Account'}
									</button>
								</form>
								<div className="form-poicy-area">
									<p>
										By clicking the "Create Account" button, you create a Hajur
										Ko Car Rental account, and you agree to Hajur Ko Car
										Rental's <Link to={'#'}>Terms &amp; Conditions</Link> &amp;{' '}
										<Link to={'#'}>Privacy Policy.</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUpWrap
