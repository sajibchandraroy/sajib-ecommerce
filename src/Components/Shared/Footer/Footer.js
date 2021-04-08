import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <section className="container-fluid footer">
            <div className="row ">
                <div className="col-12 col-md-6">
                    <div className="text-center mb-3">
                        <h2>We satisfy customer</h2>
                        <h2> very, professionally.</h2>
                        <p>With well organized and having updating delivery system</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 ">
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <h3><b>Office Address:</b></h3>
                                <small>64/a Israil</small>
                                <small>Cell: +888263372723</small><br></br>
                                <small>Email: zxe@zxe.com</small>
                            </div>
                            <div class="col-6">
                                <h3><b>WareHouse Address:</b></h3>
                                <small>64/a Israil</small>
                                <small>Cell: +888263372723</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="contact" className="text-center">
                <h5><b>Copyright to S-Ecommerce</b></h5>
            </footer>
        </section>

    );
};

export default Footer;