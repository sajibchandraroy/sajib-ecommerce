import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef} from 'react';
import { useForm } from 'react-hook-form';


const ProductDetailsForDelete = (props) => {
    const { name, image, price, key, _id } = props.product;    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const currentform = useRef(null);

    const onSubmit = (pdID, data) => {             
        const id = pdID
        const newPrice = data.price
        const updatedData = { id, newPrice };                

        fetch(`https://guarded-bastion-31565.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {                
                if (data) {                                       
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
                <form onSubmit={handleSubmit((e) => onSubmit(_id, e))} ref={currentform}>
                    <label><b>New Product Price</b></label>
                    <input type="text" className="form-control"  placeholder="Editing price" {...register("price", { required: true })} />
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