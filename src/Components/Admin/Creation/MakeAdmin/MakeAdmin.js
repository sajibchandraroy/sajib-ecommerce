import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GroceryContext } from '../../../../App';

const containerStyle = {
    backgroundColor: "#F4FDFB",
    height: "auto",
    width: "auto"
}
const MakeAdmin = () => {
    const { userl, cartItem, payment } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    // const { handleSubmit, register } = useForm();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();



    let history = useHistory();
    const currentform = useRef(null);

    const onSubmit = data => {
        console.log(data)
        const addedAdmin = { ...data }
        fetch('https://guarded-bastion-31565.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addedAdmin)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    currentform.current.reset();
                    alert('New Admin added successfully');
                }
            })
    }
    return (
        <div className="col-md-12 mb-3">
            <div class="d-flex bd-highlight mb-3">
                <div class="mr-auto p-2 bd-highlight"><h2><b>Creating a New Admin:</b></h2></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={containerStyle} ref={currentform} className="card border-success p-5 form-inline">               
                <input type="text" class="form-control " {...register("email", { required: true })} placeholder="Admin Email Address"/>                
                {errors.email && <span>This field is required</span>}                
                <button type="submit" class="btn btn-primary m-2">Submit</button>
            </form>





           
        </div>
    );
};

export default MakeAdmin;