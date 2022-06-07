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
        console.log(fact, typeof fact);

        setCatfact(fact.fact);
    }

    useEffect(() => {loadCatFact();}, [props.students]);


    return (
        <div className="container mt-2">
               <div className='row'>
                    {console.log('Hello, Bird Brains!')}
                    <button className='btn btn-block btn-info'  onClick={props.shuffleStudents}>Shuffle Birds</button>
               </div>
               <br></br>
               <div className="row justify-content-center">
                    <h1>CatFact that a {props.students[0]} Couldn't Care Less About </h1>
               </div>
               <br></br>
               <div className="row justify-content-center">
                    <h3>{catfact}</h3>
               </div>
        </div>
    )
}

export default Home;