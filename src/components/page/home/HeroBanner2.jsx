import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HeroBanner2() {
	const [user, setUser] = useState(null)
	useEffect(() => {
		try {
			const newUser = localStorage.getItem('userInfo')
			if (newUser) {
				console.log(newUser)
				const uu = JSON.parse(newUser)
				setUser(uu.user)
			}
		} catch (e) {
			console.error(e)
		}
	}, [])
	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
	return (
		<>
			<div className="hero-area hero-style-three">
				

				{/* <img
					alt="bannerImage"
					src={'/images/bg/np.png'}
					className="img-fluid banner-ellips"
				/> */}
				<img
					alt="bannerImage"
					src={'/images/bg/home3-banner.png'}
					className="home3-banner img-fluid"
				/>
				<div className="container-lg container-fluid">
					<div className="row d-flex justify-content-start align-items-end">
						<div className="col-xl-7 col-lg-7 px-0">
							<div className="banner3-content">
								<span
									className="wow fadeInDown"
									data-wow-duration="1.5s"
									data-wow-delay="0.5s"
								>
									Welcome To Hajur Ko Car Rental
								</span>
								<h1
									className="wow fadeInDown"
									data-wow-duration="1.5s"
									data-wow-delay="1s"
								>
									Look Gentle with Hajur ko car rental!
								</h1>
								<p
									className="wow fadeInUp"
									data-wow-duration="1.5s"
									data-wow-delay="1s"
								>
									Hajur ko car rental is a reliable car rental service that provides customers with an affordable and convenient way to rent a car. Whether you need a car for a weekend getaway, a business trip, or just to get around town, Hajur ko car rental has a variety of vehicles to choose from. Their fleet includes sedans, SUVs, and luxury cars, all of which are well-maintained and equipped with the latest features. With competitive prices and excellent customer service, Hajur ko car rental is a top choice for anyone in need of a rental car. &hearts;
								</p>
								<Link
									to={`/products`}
									onClick={() =>
										window.scrollTo({ top: 0, behavior: 'smooth' })
									}
									className="eg-btn btn--primary4 btn--lg wow fadeInUp"
									data-wow-duration="2s"
									data-wow-delay="0.8s"
								>
									Start Exploring
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HeroBanner2
