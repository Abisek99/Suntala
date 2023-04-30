import React from 'react'
import { Link } from 'react-router-dom'

function WhoWeAre() {
    return (
        <>
            <div className="about-section pt-120 pb-120 overflow-hidden">
                <img src={"/images/bg/section-bg.png"} className="img-fluid section-bg-top" alt="section-bg" />
                <div className="container">
                    <div className="row d-flex justify-content-center g-4">
                        <div className="col-lg-6 col-md-10">
                            <div className="about-img-area">
                                <div className="total-tag">
                                    {/*<img src={"/images/bg/total-tag.png"} alt="images" />*/}
                                    <h6>Our promise to you</h6>
                                    <h5>To be there with you every step of the way</h5>
                                </div>
                                <img src={"/images/bg/about-img.png"} className="img-fluid about-img wow fadeInUp"
                                    data-wow-duration="1.5s" data-wow-delay=".2s" alt="about-img" height="100px" />
                                {/* <img src={"/images/bg/about-linear.png"} className="img-fluid about-linear" alt=""/> */}
                                <img src={"/images/bg/about-vector.png"} className="img-fluid about-vector" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-10">
                            <div className="about-content wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                                <span>Who we are!</span>
                                <h2>We Work for Your Rides.</h2>
                                <p className="para">At Hajur ko car rental, we're passionate about providing our customers with a reliable and affordable car rental service. Founded in 2023, we've been serving the Kathmandu area and have built a reputation for excellence in the industry.</p>
                                <p className="para">Our mission is to make car rental as convenient and hassle-free as possible for our customers. That's why we offer a well-maintained fleet of vehicles, competitive pricing, and excellent customer service. We believe that everyone should have access to reliable transportation, whether it's for a weekend getaway, a business trip, or just to get around town.</p>
                                <p className="para">Thank you for choosing Hajur ko car rental for your transportation needs. We look forward to serving you!</p>
                                {/* <ul className="about-list">
                                    <li><Link to={"#"}>Have enough food for life.</Link></li>
                                    <li><Link to={"#"}>Poor children can return to school.</Link></li>
                                    <li><Link to={"#"}>Fuga magni veritatis ad temporibus atque adipisci nisi
                                        rerum...</Link></li>
                                </ul> */}
                                <Link to={"#"} className="eg-btn btn--primary btn--md">More About</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhoWeAre