import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const AdminDelete = () => {
    const [allAdmin, setAllAdmin] = useState([]);
    useEffect(() => {
        fetch('https://guarded-bastion-31565.herokuapp.com/admin')
            .then(res => res.json())
            .then(data => {
                setAllAdmin(data)
            })
    }, [])

    const handleDelete = (id, e) => {        
        
        fetch(`https://guarded-bastion-31565.herokuapp.com/admindelete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    console.log(data)
                    e.target.parentNode.style.display = 'none';
                }
            })
    }




    return (
        <div>
            <h2><b>Removing Admin ID from DataBase</b></h2>        
        <table className="table table-borderless">             
            <thead style={{ backgroundColor: '#dfe6e9', color: '#636e72' }}>
                <tr>
                    <th className="text-secondary" scope="col">Sr.</th>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allAdmin.map((admin, index) =>
                        <tr key={admin._id}>
                            <td>{index + 1}</td>
                            <td>{admin.email}</td>
                            <td>
                                <button className="mx-3" onClick={(e) => { handleDelete(admin._id, e) }}>
                                    <FontAwesomeIcon icon={faRemoveFormat} /> Delete Admin from DB
                                </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
    );
};

export default AdminDelete;