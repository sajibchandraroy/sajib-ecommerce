import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { GroceryContext } from '../../../../App';



const containerStyle = {
    backgroundColor: "#F4FDFB",
    height: "auto",
    width: "auto"
}
const AddProduct = () => {
    // const { register, handleSubmit, watch, errors } = useForm();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let history = useHistory();
    const { userl, cartItem, payment } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const currentform = useRef(null);
    const onSubmit = data => {
        console.log(data)
        // const formData = new FormData()
        // formData.append('file', data.picture[0]);
        // formData.append('name', data.name);
        // formData.append('price', data.price);
        // formData.append('category', data.category);
        // formData.append('subCategory', data.subCategory);
        // formData.append('brandName', data.brandName);
        // formData.append('key', data.key);
        // formData.append('description', data.description);

        // console.log(formData);

        // fetch('http://localhost:5000/addProducts', {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data) {
        //             alert('New Product added successfully');
        //             currentform.current.reset();
        //         }
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
    };

    console.log(watch("example"));
    return (
        <div className="mt-3">
            <div class="d-flex bd-highlight mb-3">
                <div class="mr-auto p-2 bd-highlight"><h2><b>Adding a New Product:</b></h2></div>
                {/* <div class="p-2 bd-highlight"><img src={loggedInUser.photo} width="50px" height="auto" alt="" /></div>
                <div class="p-2 bd-highlight"><b>User: {loggedInUser.name}</b></div> */}
            </div>
            <form style={containerStyle} onSubmit={handleSubmit(onSubmit)} ref={currentform}>
                <div className="card border-success bg-light px-2 py-2 mb-2">
                    <div className="form-group row">
                        <div className="col-3">
                            <label><b>Product Title</b></label>
                            <input type="text" placeholder="Enter Product title" className="form-control" {...register("name", { required: true })} />
                            {errors.name && <span>This field is required</span>}
                        </div>
                        <div className="col-3">
                            <label><b>Product Category</b></label>
                            <input type="text" placeholder="Enter Product Category" className="form-control" {...register("category", { required: true })}/>
                            {errors.category && <span>This field is required</span>}

                            {/* <select className="form-control" name="category" ref={register({ required: true })} >
                                <option disabled={false} value="Not set">Select Category</option>
                                <option value="Food & Fruits">Food & Fruits</option>
                                <option value="Beauty & Health">Beauty & Health</option>
                                <option value="Accessaries">Accessaries</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                            </select>
                            {errors.category && <span className="text-danger">This field is required</span>} */}
                        </div>

                        <div className="col-3">
                            <label><b>Product Sub Category</b></label>                            
                            <input type="text" placeholder="Enter Product Sub Category" className="form-control" {...register("subCategory", { required: true })} />
                            {errors.subCategory && <span>This field is required</span>}

                            {/* <select className="form-control" name="subCategory" ref={register({ required: true })} >
                                <option disabled={false} value="Not set">Select Sub Category</option>
                                <option value="Food">Food</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Health">Health</option>
                                <option value="Cloth">Cloth</option>
                                <option value="Mobile">Mobile</option>
                                <option value="DailyNeeds">DailyNeeds</option>
                            </select>
                            {errors.subCategory && <span className="text-danger">This field is required</span>} */}
                        </div>

                        <div className="col-3">
                            <label><b>Product Brand</b></label>
                            <input type="text" placeholder="Enter Product Brand Name" className="form-control" {...register("brandName", { required: true })}/>
                            {errors.brandName && <span>This field is required</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-3">
                            <label><b>Product Key</b></label>
                            <input type="text" className="form-control"  placeholder="Enter Product Key" {...register("key", { required: true })} />
                            {errors.key && <span>This field is required</span>}
                        </div>

                        <div className="col-2">
                            <label><b>Product Price</b></label>
                            <input type="number" className="form-control" placeholder="Enter Product Price" {...register("price", { required: true })}/>
                            {errors.description && <span>This field is required</span>}
                        </div>

                        <div className="col-4">
                            <label><b>Description</b></label>
                            <input  type="text" className="form-control" placeholder="Enter Product Description" {...register("description", { required: true })} />
                            {errors.description && <span>This field is required</span>}
                        </div>
                        <div className="col-3">                                                       
                            <label htmlFor="photo"><FontAwesomeIcon icon={faCloudUploadAlt} /><b>Upload Image</b></label>
                            <input {...register("picture", { required: true })} type="file" className="form-control" id="photo" />
                        </div>
                    </div>
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;