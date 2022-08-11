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
               
               
               {/* <div className='row'>
                    {console.log('Hello, Bird Brains!')}
                    <button className='btn btn-block btn-lg btn-info'  onClick={props.shuffleplayers}>Fetch a Fresh Fact</button>
               </div> */}
               <br></br>
               <div className="row justify-content-center">
                    <h1>Bird on the Brain Philanthropy</h1>
               </div>
               <br></br>


               <br></br>
               <div className="row justify-content-center">
                    <h3>Pledge to Prevent Bird Extinction</h3>

               </div>
               <div className="row justify-content-center">
                    <h3>Donate to Protect Your Favorite Species</h3>
               </div>
               <div className="row justify-content-center">
                    <h3>Understand the Threats</h3>
               </div>
 
        </div>
    )
}

export default Home;