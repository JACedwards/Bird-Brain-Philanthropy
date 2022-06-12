import axios from "axios";
import { useEffect, useState } from 'react';

let Home = props => {

    const [catfact, setCatfact] = useState();
  

    const getCatFact = async () => {
        let response = await axios.get('https://catfact.ninja/fact');
        return response.status === 200 ? response.data : null;
    }
    const loadCatFact = async () => {
        let fact = await getCatFact();

        setCatfact(fact.fact);
    }

    useEffect(() => {loadCatFact();}, [props.players]);

    

    return (
        <div className="container mt-2">
               <div className='row'>
                    {console.log('Hello, Bird Brains!')}
                    <button className='btn btn-block btn-lg btn-info'  onClick={props.shuffleplayers}>Fetch a Fresh Fact</button>
               </div>
               <br></br>
               <div className="row justify-content-center">
                    <h1>The {props.players[0]}s'</h1>
               </div>
               <br></br>
               <div className="row justify-content-center mt-0">
                    <h1><u>Favorite Fact about Feeble-Minded Felines </u> </h1>
                    
               </div>

               <br></br>
               <div className="row justify-content-center">
                    <h3>{catfact}</h3>
               </div>
        </div>
    )
}

export default Home;