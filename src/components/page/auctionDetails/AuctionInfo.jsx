import React, {useEffect, useRef, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import api from '../../common/api.js'
import axios from "axios";
import url from "../../common/url";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";

function AuctionInfo({user}) {
    const [modalProduct, setModalProduct] = useState(null);
    const [apple, setApple] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
            toast.success("Rent Placed Successfully")
        }).catch((err) => {
            console.error(err)
        })
    };

    const handleUserButtonClick = async () => {
        setShowModal(true)
    };

    const handleSubmit = async () => {
        await handleRent()
        setShowModal(false)
    };


    const closeModal = () => {
        setShowModal(false);
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
                        <p className="para" style={{fontWeight: "bold"}}>Model: {product.carModel}</p>
                        <p className="para" style={{fontSize: "15px"}}>The McLaren 720S Orange is a high-performance supercar with
                            a striking and vivid orange paint job. It features a luxurious interior with premium materials and
                            advanced technology. Under the hood, it boasts a powerful 4.0-liter V8 engine that produces 710
                            horsepower and 568 lb-ft of torque, enabling it to accelerate from 0 to 60 mph in just 2.8 seconds and
                            reach a top speed of 212 mph. With its unique design and exceptional engineering, the McLaren 720S
                            Orange is the perfect car for anyone seeking an exhilarating driving experience.</p>
                        {/*<p className="para" style={{fontSize: "15px"}}>The Pagani Zonda Tricolore 2011 is an exotic sports car*/}
                        {/*    that boasts a rare tri-color paint scheme and a sleek and aerodynamic body made of lightweight carbon*/}
                        {/*    fiber. Its interior is luxurious and features advanced technology and comfort features. Under the*/}
                        {/*    hood, it is powered by a hand-built 7.3-liter V12 engine that produces an impressive 678 horsepower*/}
                        {/*    and 575 lb-ft of torque, allowing it to go from 0 to 60 mph in just 3.4 seconds and reach a top speed*/}
                        {/*    of 218 mph. The Pagani Zonda Tricolore 2011 is the perfect combination of luxury and performance,*/}
                        {/*    offering an unforgettable driving experience.</p>*/}
                        <h4>
                            Rate: <span> रु {product.carRentalRate}</span>
                        </h4>

                        <div className="button-group">
                            <button className="eg-btn profile-btn " type="button" onClick={handleUserButtonClick}>
                                Rent Car
                            </button>
                        </div>
                    </div>
                </div>
                <Modal show={showModal} onHide={closeModal} className={"modal"} style={{top: '17%'}}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{fontFamily: "Saira"}}>Confirm Rent Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-wrapper"}>
                            <h5>Do you agree to rent the car?</h5>
                            <h5 className={"text-end"}>{product.carName}</h5>
                            <h6 className={"text-end"}>रु {product.carRentalRate}</h6>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={"button-group"} style={{marginTop: "10px"}}>
                            <Button className="eg-btn cancel-btn" style={{marginRight: "10px"}} onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button className="eg-btn profile-btn" onClick={handleSubmit}>
                                Approve
                            </Button>
                        </div>
                    </Modal.Footer>

                </Modal>
            </div>
        </>
    )
}

export default AuctionInfo
