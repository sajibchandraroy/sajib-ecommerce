import React from 'react';
import image from '../../Images/customer/1.jpg'
import WhyChoose from './WhyChoose';



const Home = () => {
    return (
        <div className="container-fluid">
            <div class="banner">                
                <div class="row">
                    <div class="col">
                        <WhyChoose/>                        
                    </div>
                    <div class="col" style={{ fontWeight: "bold" }}>
                        <img src={image} alt="" style={{ width: '60%', height: 'auto', borderRadius: '70%'}}/>
                        <ul>
                            <li>Available of products: 9000 items</li>
                            <li>Available orders: 100</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;