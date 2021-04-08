import React from 'react';
import Man from '../../Images/whyChoose/1.jpg';
import Group2 from '../../Images/whyChoose/Group 245.png';


const WhyChoose = () => {
    return (
        <section className="">
            {/* <div className="text-center">
                <h2 className="mx-3" style={{ color: 'black'}}>Why you choose us</h2>
            </div> */}
            <div className="card-group">
                <div className="card m-2" style={{ height: '90%' }}>
                    <img className="card-img-top" src={Man} alt="Card" style={{ width: '80%', height: '100%' }} />
                    <div className="card-body">
                        <div className="d-flex">
                            <div>
                                <img src={Group2} alt="" />
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <h5 className="card-title text-left m-2">Fast Delivery</h5>
                                <p className="card-text text-left"><small>Keep your system om sync with automated web hook based notification each time link is paid and how we dream about our future</small></p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;