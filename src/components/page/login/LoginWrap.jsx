import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGlobalContext } from '../../../context'
import useLocalState from '../../utils/LocalState'
import axios from 'axios'
import api from '../../common/api'

function LoginWrap() {
	const [openEye, setOpenEye] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const { saveUser } = useGlobalContext()
	const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()

	const handleEyeIcon = () => {
		setOpenEye(!openEye)
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		hideAlert()
		setLoading(true)
		const loginUser = { email, password }
		if (email === '' || password === '') {
			toast.error('Please fill all the fields')
			showAlert({
				text: `Invalid Credentials`,
				type: 'danger',
			})
			setLoading(false)

			return
		}

		await api.auth.loginUser(loginUser).then((res) => {
			console.log(res.message)
			if (res.status !== 'Error') {
				setEmail('')
				setPassword('')
				localStorage.setItem('userToken', JSON.stringify(res.token))

				toast.success(`Log In Successfully`)
				showAlert({
					text: `Log In Successfully`,
					type: 'success',
				})
				setTimeout(() => {
					navigate('/dashboard')
				}, 1800)
				setLoading(false)
			} else {
				toast.error('Invalid Credentials')
				showAlert({
					text: `Invalid Credentials`,
					type: 'danger',
				})
			}
		})
	}

	return (
		<>
			<div className="login-section pt-80 pb-120">
				<img
					alt="images"
					src="/images/bg/section-bg.png"
					className="img-fluid section-bg-top"
				/>
				<img
					alt="images"
					src="/images/bg/section-bg.png"
					className="img-fluid section-bg-bottom"
				/>
				<div className="container">
					<div className="row d-flex justify-content-center g-4">
						<div className="col-xl-6 col-lg-8 col-md-10">
							<div
								className="form-wrapper wow fadeInUp"
								data-wow-duration="1.5s"
								data-wow-delay=".2s"
							>
								<div className="form-title">
									<h3>Log In</h3>
									<p>
										New Member?{' '}
										<Link
											to={`/signup`}
											onClick={() =>
												window.scrollTo({ top: 0, behavior: 'smooth' })
											}
										>
											SignUp here
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
								<form className="w-100 mb-4" method="POST">
									<div className="row">
										<div className="col-12">
											<div className="form-inner">
												<label htmlFor={'email'}>Enter Your Username *</label>
												<input
													type="text"
													id="email"
													placeholder="Enter Your Username"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
										</div>
										<div className="col-12">
											<div className="form-inner">
												<label htmlFor={'password'}>Password *</label>
												<input
													type={openEye ? 'password' : 'text'}
													name="password"
													id="password"
													placeholder="Password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
												<i
													className={
														openEye
															? 'bi bi-eye-slash'
															: 'bi bi-eye-slash bi-eye'
													}
													id="togglePassword"
													onClick={handleEyeIcon}
												/>
											</div>
										</div>
										<div className="col-12">
											<div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
												<div className="form-group">
													{/* <input type="checkbox" id="html" /> */}
													<label htmlFor="html" style={{ color: 'white' }}>
														I agree to the{' '}
														<Link style={{ color: 'white' }} to={'#'}>
															Terms &amp; Policy
														</Link>
													</label>
												</div>
												<Link to={'#'} className="forgot-pass">
													Forgotten Password
												</Link>
											</div>
										</div>
									</div>
									<button
										className="account-btn"
										type={'submit'}
										onClick={(event) => {
											handleLogin(event)
										}}
									>
										{loading ? 'Loading...' : 'Log in'}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginWrap
