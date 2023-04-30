import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { Link } from 'react-router-dom'

import api from '../../common/api.js'
import AuctionCardList from '../../layout/LiveAuctionCardList.jsx'

SwiperCore.use([Navigation, Autoplay, Pagination])

function LiveAuction() {
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])

	useEffect(() => {
		getProducts()
	}, [])

	const getProducts = async () => {
		setLoading(true)
		await api.products.getAllProduct().then((r) => {
			console.log(r.data)
			setProducts(r.data)
		})
		setLoading(false)
	}

	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
	const liveSlider = {
		slidesPerView: 1,
		speed: 1000,
		spaceBetween: 24,
		loop: true,
		roundLengths: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: 'true',
		},
		navigation: {
			nextEl: '.coming-prev3',
			prevEl: '.coming-next3',
		},

		breakpoints: {
			280: {
				slidesPerView: 1,
				pagination: false,
			},
			480: {
				slidesPerView: 1,
				pagination: false,
			},
			768: {
				slidesPerView: 2,
				pagination: false,
			},
			992: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 3,
			},
		},
	}
	return (
		<>
			<div className="upcoming-seciton pt-120 pb-120">
				<div className="container">
					<div className="row d-flex justify-content-center">
						<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
							<div className="section-title4">
								<h2>Rent A Car</h2>
								<p className="mb-0">
									Rent your car hassle-free with Hajur ko car rental! Choose
									from a variety of vehicles at affordable prices, and book with
									ease through our online system. Enjoy reliable and convenient
									car rental service today!
								</p>
							</div>
						</div>
					</div>

					{loading ? (
						<div className="row d-flex justify-content-center">
							<h6 className="text-end">... Loading</h6>
						</div>
					) : (
						<div className="row d-flex justify-content-center">
							<Swiper
								{...liveSlider}
								className="swiper upcoming-slider swiper-fix"
							>
								<div className="swiper-wrapper">
									{products &&
										products.map((product, id) => {
											return (
												<SwiperSlide className="swiper-slide" key={id}>
													<AuctionCardList
														auctionImg={
															product.carImage
																? product.carImage
																: '/uploads/example.jpg'
														}
														content={product.carModel}
														price={product.carRentalRate}
														product={product.carID}
														liveOn={product.carName}
														desc={product.carBrand}
													/>
												</SwiperSlide>
											)
										})}
								</div>
							</Swiper>
							<div className="slider-bottom d-flex justify-content-between align-items-center">
								<Link
									to={`/products`}
									onClick={scrollTop}
									// className="eg-btn btn--primary3-outline btn--md"
									className="eg-btn btn--primary4 btn--md"
								>
									View ALL
								</Link>
								<div className="swiper-pagination style-3 d-lg-block d-none" />
								<div className="slider-arrows coming-arrow style-3 d-flex gap-3">
									<div
										className="coming-prev3 swiper-prev-arrow"
										tabIndex={0}
										role="button"
										aria-label="Previous slide"
									>
										<i className="bi bi-arrow-left" />
									</div>
									<div
										className="coming-next3 swiper-next-arrow"
										tabIndex={0}
										role="button"
										aria-label="Next slide"
									>
										<i className="bi bi-arrow-right" />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default LiveAuction
