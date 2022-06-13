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

    // start pic experiment

    const [catpic, setCatpic] = useState();
  

    const getCatpic = async () => {
        let response = await axios.get('https://api.thecatapi.com/v1/images/search');
        return response.status === 200 ? response.data : null;
    }
    const loadCapict = async () => {
        let fact = await getCatpic();

        setCatpic(fact[0].url);
    }

    useEffect(() => {loadCapict();}, [props.players]);



    // end cat experiment

    

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
               <div className="row justify-content-center mt-5">
                    <h1><u>Picture of the Enemy </u> </h1>
                    
               </div>
               <div className="row justify-content-center">
               <img src={catpic} className="img-fluid" alt='cat pic' />               
               </div>
        </div>
    )
}

export default Home;