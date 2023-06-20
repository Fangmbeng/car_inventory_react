import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Edit (props) {

  const navigate = useNavigate();
    useEffect(() => {
        if (!props.loggedIn){
            //props.flashMessage('You must be logged in to view this page', 'danger');
            navigate('/');
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let brand = event.target.brand.value;
        let model = event.target.model.value;
        let id = localStorage.getItem("id")

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${token}`)
        myHeaders.append('Access-Control-Allow-Origin', "*");;

        // Set up the request body
    
        console.log(brand)
        console.log(model)
        console.log(id)
        console.log(typeof id)
      
        let requestBody = JSON.stringify({brand, model, id})

        // Make the fetch request
        let response = await fetch(`https://car-model-ihwy.onrender.com/api/post/edit/${id}`, {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })

        if (response.ok){
            let data = await response.json();
            setTimeout((props.flashMessage(`${data.brand} has been edited`, 'primary')), 100);
            navigate('/')
        } else {
            props.flashMessage("There was an issue, please try again", 'warning');
        }
    }

    return (
        <>
            <h3 className="text-center">Edit Post</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Enter car brand' name='brand'/>
                    <input type="text" className="form-control my-3" placeholder='Enter brand model' name='model'/>

                    <input type="submit" value="Edit Post" className="btn btn-success w-100" />
                </div>
            </form>
        </>
    )
}