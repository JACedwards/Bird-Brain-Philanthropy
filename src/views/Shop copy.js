import { useState } from 'react';
import axios from 'axios';

let Shop = () => {

   let getAnimalData = async () => {
      let data = await axios.get('https://foxes84-tweetyer.herokuapp.com/api/animals')
      return data.status === 200 ? data.data : null
   }
   
   let loadAnimalData = async () => {
      let data = await getAnimalData();
      console.log(data);
      setAnimals(data.Animals);
   }
   const [animals, setAnimals] = useState(()=>{loadAnimalData();});

   return(
        <div className='container'>
           <div className='row justify-content-center'>
              <h1>Bird Bizarre</h1>
           </div>
           <div className='row'>
                {typeof animals === 'object' && animals[1] ? animals.map((animal, index) => {
                    return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                        <img src={animal.image} className="card-img-top" alt={animal.sci_name} />
                        <div className="card-body">
                            <h5 className="card-title">{animal.name}</h5>
                            <h5 className="card-title font-italic">{animal.sci_name}</h5>
                            <p className="card-text">{animal.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{animal.habitat}</li>
                            <li className="list-group-item">{animal.diet}</li>
                            <li className="list-group-item"><span>Lifespan: {animal.lifespan} years.</span><span className='float-right'>Size: {animal.size}</span></li>
                        </ul>
                        <div className="card-body">
                            <p className="card-link float-left">${animal.price}</p>
                            <button onClick={() => { adoptAnimal(animal) }} className="float-right btn btn-sm btn-info">Brang One Home!</button>
                        </div>
                    </div>
                })
            
            
               : <h3>"Bide your time a bit: The birds still be bathin'"</h3>}

           </div>


        </div> 
   ) 
}

export default Shop;