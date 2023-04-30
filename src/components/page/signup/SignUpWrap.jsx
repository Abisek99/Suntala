import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useLocalState from '../../utils/LocalState.jsx'
import url from '../../common/url.js'
import { useGlobalContext } from '../../../context.jsx'
import api from '../../common/api.js'

function SignUpWrap() {
	const [openEye, setOpenEye] = useState(true)
	const [firstName, setFirstName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { saveUser } = useGlobalContext()
	const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()
	const navigate = useNavigate()

	const handleEyeIcon = () => {
		setOpenEye(!openEye)
	}


	const handleSignUp = async (e) => {
		e.preventDefault()
		hideAlert()
		setLoading(true)
		const signUpUser = { firstName, email, password }
		const headers = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}
		await api.auth.registerUser(signUpUser).then((res) => {
			console.log(res);
			setFirstName('')
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
												<label>Username *</label>
												<input
													type="text"
													placeholder="Username"
													value={firstName}
													onChange={(e) => {
														setFirstName(e.target.value)
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
										By clicking the "Create Account" button, you create a
										Premiere Auctioneers account, and you agree to Premiere
										Auctioneers's <Link to={'#'}>Terms &amp; Conditions</Link>{' '}
										&amp; <Link to={'#'}>Privacy Policy.</Link>
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
