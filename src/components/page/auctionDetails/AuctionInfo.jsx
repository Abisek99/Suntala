import React, {useEffect, useRef, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import api from '../../common/api.js'
import axios from "axios";
import url from "../../common/url";

function AuctionInfo({user}) {
    const [product, setProduct] = useState([])
    const [pp, setPp] = useState('')
    const id = useParams()

    useRef(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    })


    useEffect(() => {
        getProduct()
        console.log(user.id)
    }, [])

    const productId = id.id
    const userId = user.id
    const getProduct = async () => {
        await api.products.getSingleProduct(productId).then((r) => {
            console.log(r.data[0])
            setProduct(r.data[0])
        })
    }

    useEffect(() => {
        console.log(product)
        console.log(product.carID)
        setPp(product.carID)
    }, [product]);

    const handleRent = async () => {
        const data = {productId, userId}
        console.table(data)
        await axios.post(`${url.proxy_api}rental`, {
            carID: productId,
            userID: userId
        }).then((res) => {
            // const res = r.json()
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })
    };


    return (
        <>
            <div className="row g-4 mb-50">
                <div
                    className="col-xl-6 col-lg-7 d-flex flex-row align-items-start justify-content-lg-start justify-content-center flex-md-nowrap flex-wrap gap-4">
                    <div
                        className="tab-content mb-4 d-flex justify-content-lg-start justify-content-center  wow fadeInUp"
                        data-wow-duration="1.5s"
                        data-wow-delay=".4s"
                    >
                        <div
                            className="tab-pane big-image fade show active"
                            id="gallery-img1"
                        >
                            <Link
                                to={product.carImage}
                                target="_blank"
                                referrerPolicy="no-ref"
                            >
                                <img
                                    alt="images"
                                    src={product.carImage}
                                    className="img-fluid ratio-image"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-5">
                    <div
                        className="product-details-right  wow fadeInDown"
                        data-wow-duration="1.5s"
                        data-wow-delay=".2s"
                    >
                        <h3>{product.carName}</h3>

                        <p className="para">{product.carModel}</p>
                        <h4>
                            Rate: <span> रु {product.carRentalRate}</span>
                        </h4>
                        <button className="eg-btn btn--primary btn--sm " type="button" onClick={handleRent}>
                            Rent Car
                        </button>
                        {/* <div className="bid-form">
							<div className="form-title">
								<h5>Bid Now</h5>

								{props.product.lastBid === 0 ? (
									<p>Bid Amount : Minimum Bid रु {props.product.price + 1}</p>
								) : (
									<p>Bid Amount : Minimum Bid रु {props.product.lastBid + 1}</p>
								)}
							</div>
							<CreateBid
								product={props.product.id}
								lastBid={props.product.lastBid}
								basePrice={props.product.price}
							/>
						</div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuctionInfo
