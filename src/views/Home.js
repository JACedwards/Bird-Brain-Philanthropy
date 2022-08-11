import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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
               
            <br></br>
            
            <div className="row justify-content-center">
                <h1>Bird on the Brain Philanthropy</h1>
            </div>
            <br></br>
            <hr className="hr-danger"></hr>
            <br></br>
            <br></br>
            <div className='row justify-content-center'>
                
                <div className="col-6">
                    

               <div className='row'>
                    <Link className='btn btn-block btn-lg btn-info button-width btn-txt-color btn-back-color-danger-page home-btn' to='/shop'>  Pledge: Prevent Bird Extinction </Link> 
               </div>

               <div className='row'>
                    <Link className='btn btn-block btn-lg btn-info button-width btn-txt-color btn-back-color-danger-page home-btn' to='/cart'>  Donate: Protect Favorite Birds </Link> 
               </div>

               <div className='row'>
                    <Link className='btn btn-block btn-lg btn-info button-width btn-txt-color btn-back-color-danger-page home-btn' to='/danger'>  Educate:  Identify the Threats </Link> 
               </div>

                </div>

                <div className="col-4">
                    <div className="row justify-content-center">
                    <img className='img-fluid' src="egret-eye-color-match-cropped.jpg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;