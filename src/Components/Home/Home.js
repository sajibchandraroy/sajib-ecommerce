import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GroceryContext } from '../../App';
import image from '../../Images/customer/1.jpg'
import WhyChoose from './WhyChoose';



const Home = () => {
    const { userl, cartItem, category, searchBarStatus, products } = useContext(GroceryContext);
    const [allProducts, setAllProducts] = products;
    console.log(allProducts)

    let names = []
    allProducts.map(item => {
        const productsCategory = item.category
        names.push(productsCategory)
    })

    function getUnique(array) {
        var uniqueArray = [];

        // Loop through array values
        for (let i = 0; i < array.length; i++) {
            if (uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }

    var uniqueNames = getUnique(names);


    return (
        <div className="container-fluid">
            <div class="banner mx-4">
                <div className="row">
                    <div className="col-12 col-md-3 mt-2">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categories of Products
                            </button>
                            <div class="dropdown-menu bg-light" aria-labelledby="dropdownMenu2">
                                {uniqueNames.map(item => <button class="dropdown-item" type="button"
                                // onClick={() => { categorisedProduct(item) }}
                                >{item}</button>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 mt-2">
                        <div className="d-flex flex-wrap">
                            {allProducts.map(item =>
                                <div className="col-12 col-md-3" >

                                    <div className="card border-info mb-3" >
                                        <div className="card-header text-center">
                                            <img src={`data:image/png;base64,${item.image.img}`} className="rounded mx-auto d-block" alt="..." style={{ width: '60%', height: '60%' }} />
                                        </div>
                                        <div className="card-body text-black text-center">
                                            <Link to={"/product/" + item.key}><h4 ><b>Name: </b> {item.name} </h4></Link>
                                            <p><b>Brand: </b>{item.brand}<br></br>Price: ${item.price}</p>
                                            {/* <p className="card-text ">Price: ${item.price}</p> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div class="col">
                        <WhyChoose/>                        
                    </div>
                    <div class="col" style={{ fontWeight: "bold" }}>
                        <img src={image} alt="" style={{ width: '60%', height: 'auto', borderRadius: '70%'}}/>
                        <ul>
                            <li>Available of products: 9000 items</li>
                            <li>Available orders: 100</li>
                        </ul>

                    </div> */}
                </div>
            </div>
            <div className="text-center m-4 bg-light">
                <h1 className="mx-3 text-dark" style={{ color: 'black' }}>Why you choose us</h1>
            </div>
            <div className="row">
                <div class="col-12 col-md-6">
                    <WhyChoose />
                </div>
                <div class="col-12 col-md-6" style={{ fontWeight: "bold" }}>
                    <img src={image} alt="" style={{ width: '90%', height: 'auto', borderRadius: '70%' }} />
                    <ul>
                        <li>Available of products: 9000 items</li>
                        <li>Available orders: 100</li>
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default Home;