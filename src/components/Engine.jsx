import React, { useState } from 'react';
import Dashboard from './Dashboard';

export default function Form() {
    const [add, setAdd] = useState([])

    function handleForm (event) {
        event.preventDefault();
        let engine = event.target.engine.value;
        localStorage.setItem('engine', engine)
        let eng = localStorage.getItem('engine')
        console.log(eng);
        setAdd([...add, eng])
        event.target.engine.value ="";
    }

    function supprimer(){
        localStorage.removeItem("engine")
        window.location.reload()
        }
  
    return (
        <>
            <div>    
                <form action="" method="POST" onSubmit={handleForm}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputcar_model" className="form-label" >Engine Name and Power</label>
                        <input type="text" className="form-control border-dark"  name="engine" placeholder='Enter Engine Name and Power' aria-describedby="car_modelHelp"/>
                        <input type="submit" className="btn btn-primary"/>
                        <button className='btn btn-danger bg-danger hover:bg-primary' onClick={supprimer}>Clear Table</button>
                    </div>
                </form>
            </div>
            {add.map((add, idx) => <Dashboard add={add} key={idx}/>)}
        </>
    )
}

