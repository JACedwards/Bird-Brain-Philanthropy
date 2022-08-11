import axios from "axios";
import { useEffect, useState } from 'react';
import '../css/cartstyles.css'

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
                <div className='row justify-content-center'>
                    {console.log('Hello, Bird Brains!')}
                    <h1>Extinction Threat</h1>
               </div>
               <div>
                <hr className="hr-danger"></hr>
               </div>
               <div className='row'>
                   <p className='p-danger-text ml-3'>Your donations will also support the humane eradication of the greatest threat to avian existance:  Felis catus.
                   </p>
                   <p className='p-danger-text ml-3'>Please use the button below to help you understand and identfy public enemy number 1.</p>
               </div>
               <div className='row'>
                    {console.log('Hello, Bird Brains!')}
                    <button className='btn btn-block btn-lg btn-info button-width btn-txt-color'  onClick={props.shuffleplayers}>Fetch a Fresh Fact</button>
               </div>
               <br></br>
               {/* <div className="row justify-content-center">
                    <h1>The {props.players[0]}s'</h1>
               </div>
               <br></br>
               <div className="row justify-content-center mt-0">
                    <h1><u>Favorite Fact about Feeble-Minded Felines </u> </h1>
                    
               </div> */}


               <div className="row">
                    <h4 className='ml-3'><u>Fact</u>: {catfact}</h4>
               </div>
               <div>
                <hr className="hr-danger"></hr>
               </div>
               <div className="row justify-content-center mt-2">
                    <h3 className='ml-3'>ID the Enemy  </h3>
                    
               </div>
               <div className="row justify-content-center">
               <img src={catpic} className="img-fluid cat-pic" alt='cat pic' />               
               </div>
               <div>
                <br></br>
               </div>
        </div>
    )
}

export default Home;