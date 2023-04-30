import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WOW from 'wowjs'

function Footer() {
    useEffect(() => {
        new WOW.WOW({
            live: false,
        }).init()
    }, [])
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    return (
        <>
            <footer>
                <div className="footer-top">
                    <div className="container">
                        <div className="row gy-5">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item">
                                    <Link to={`/`} onClick={scrollTop}>
                                        <img alt="images" src={'/images/bg/fl.png'} />
                                    </Link>
                                    <p>
                                        Choose Hajur ko car rental for reliable and affordable car rentals. Contact us today to book your vehicle!
                                    </p>
                                    <form>
                                        <div className="input-with-btn d-flex jusify-content-start align-items-strech">
                                            <input type="text" placeholder="Enter your email" />
                                            <button type="submit">
                                                <img alt="images" src={'/images/icons/send-icon.svg'} />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item"></div>
                            </div>
                            <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                                <div className="footer-item">
                                    <h5>Navigation</h5>
                                    <ul className="footer-list">
                                        <li>
                                            <Link onClick={scrollTop} to={`/products`}>
                                                All Cars
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={scrollTop} to={`/login`}>
                                                My Account
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={scrollTop} to={`/about`}>
                                                About Us
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                                <div className="footer-item">
                                    <h5>Help &amp; FAQs</h5>
                                    <ul className="footer-list">
                                        <li>
                                            <Link to={`#`} onClick={scrollTop}>
                                                Help Center
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`#`} onClick={scrollTop}>
                                                Customer FAQs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`#`} onClick={scrollTop}>
                                                Terms and Conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`#`} onClick={scrollTop}>
                                                Security Information
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`#`} onClick={scrollTop}>
                                                Merchant Add Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <p>
                                Copyright 2023 &copy; <a>Hajur Ko Car Rental</a>{' '}
                                | Design By{' '}
                                <a>
                                    Ranjan Yadav
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
