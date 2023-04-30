import React from 'react'
import { Link } from 'react-router-dom'

import Counter from '../common/Counter'
function AuctionCardList(props) {
	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
	return (
		<>
			<div
				className="eg-card auction-card3 wow fadeInDown"
				data-wow-duration="1.5s"
				data-wow-delay="0.2s"
			>
				<div className="auction-timer">
					<span className="timer-title">{props.desc}</span>
					<div className="countdown" id="timer1">
						<h4 style={{ textTransform: 'capitalize' }}>
							{/* <Counter date={props.liveOn} /> */}
							{props.liveOn}
						</h4>
					</div>
				</div>
				<div className="auction-img">
					<img alt="liveAuctionImage" src={`${props.auctionImg}`} />
				</div>
				<div className="auction-content">
					<h4>
						<Link to={`/auction-details/${props.product}`} onClick={scrollTop}>
							{props.content}
						</Link>
					</h4>
					<p>
						Rental Amount : <span>रु {props.price}</span>
					</p>
					<div className="auction-card-bttm">
						<Link
							to={`/auction-details/${props.product}`}
							onClick={scrollTop}
							className="eg-btn btn--primary3-outline btn--sm"
						>
							Rent the Car
						</Link>
						<div className="share-area">
							<ul className="social-icons d-flex">
								<li>
									<Link to={'#'}>
										<i className="bx bxl-facebook" />
									</Link>
								</li>
								<li>
									<Link to={'#'}>
										<i className="bx bxl-twitter" />
									</Link>
								</li>
								<li>
									<Link to={'#'}>
										<i className="bx bxl-pinterest" />
									</Link>
								</li>
								<li>
									<Link to={'#'}>
										<i className="bx bxl-instagram" />
									</Link>
								</li>
							</ul>
							<div>
								<Link to={'#'} className="share-btn">
									<i className="bx bxs-share-alt" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AuctionCardList
