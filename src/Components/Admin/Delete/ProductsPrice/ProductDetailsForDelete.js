import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const ProductDetailsForDelete = (props) => {
    const { name, image, price, key, _id } = props.product;
    // const { handleSubmit, register, errors } = useForm();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const currentform = useRef(null);

    const [info, setInfo] = useState({});

    const handleBlur = (id, e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        newInfo['id'] = id;
        setInfo(newInfo);
    }

    console.log(info)

    const onSubmit = () => {        
        const id = info.id
        const newPrice = info.price
        const updatedData = { id, newPrice };        

        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    // setIsUpdated(true)
                    setInfo([])
                    currentform.current.reset();
                    props.setIsUpdated(Math.random())
                    alert('Status Updated Successfully')
                }
            })
    } 



    return (
        
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>
                {/* <Link to={"/product/" + key}> */}
                    {name}
                    {/* </Link> */}
                    </td>
            <td><img src={`data:image/png;base64,${image.img}`} class="card-img-top" style={{ width: '45px', height: '50px' }} alt="..." /></td>
            <td>${price}</td>
            <td>
                <form onSubmit={handleSubmit(onSubmit)} ref={currentform}>
                    <label><b>New Product Price</b></label>
                    <input onBlur={(e) => handleBlur(_id, e)} type="text" className="form-control"  placeholder="Editing price" {...register("price", { required: true })} />
                    
                    {errors.price && <span>This field is required</span>}
                    <button type="submit" class="btn btn-primary m-2">Submit</button>
                </form>
            </td>
            <td>
                <button className="mx-3" onClick={(e) => { props.handleDelete(props.product, e) }}>
                    <FontAwesomeIcon icon={faRemoveFormat} /> Delete Product from DB
                </button>
            </td>

        </tr>
    );
};

export default ProductDetailsForDelete;