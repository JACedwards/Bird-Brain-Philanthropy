import '../css/cartstyles.css'
import { useState, useContext } from 'react';
import { DataContext } from '../DataProvider';
import axios from 'axios';
import { useUser, useDatabase } from 'reactfire';
import { set, ref } from 'firebase/database';

let Shop = () => {

    

    let getPlayerData = async () => {
        // this would be version for local database  
        // let data = await axios.get('http://127.0.0.1:5000/api/react');
        let data = await axios.get('https://bird-on-the-brain-flask.herokuapp.com/api/react')

        return data.status === 200 ? data.data : null
   }
   
   let loadPlayerData = async () => {
      let data = await getPlayerData();
      console.log(data);
      setPlayers(data.Birds);
   }

   const [players, setPlayers] = useState(()=>{loadPlayerData();});


   const{cart, setCart} = useContext(DataContext);
   const{data: user} = useUser();
   const db = useDatabase();

   const stealPlayer = player => {
       let mutableCart = {...cart};
       mutableCart.size++;
       mutableCart.total += player.pledge;

       mutableCart.items[player.common_name] ? 
       mutableCart.items[player.common_name].quantity++ : 
       mutableCart.items[player.common_name] = {'obj' : player, 'quantity' : 1}
       
       console.log(mutableCart);
       console.log('goober')
       if (user) {
        set(ref(db, 'carts/' + user.uid), {mutableCart});
    }
       setCart(mutableCart);
   }

   return(


        <div className='container mt-3'>

           <div className='row justify-content-center'>
           <div className='row justify-content-center'>
                {typeof players !== 'object' ?
                    <p></p>
                    :
                    <div>
                        <h2>Choose the bird associated with your desired pledge level</h2>
                        <h3>(You may choose any bird / pledge level more than once)</h3>
                    </div>
                }

           </div>

           </div>
           <div className='row justify-content-center'>
                {typeof players === 'object' && players[1] ? players.map((player, index) => {
                    return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                        <img src={player.image} className="card-img-top" alt={player.latin_name} />
                        <div className="card-body">
                            <h5 className="card-title">{player.common_name}</h5>
                            <h5 className="card-title font-italic">Donation Level: ${player.pledge}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Diet: {player.diet}</li>
                            <li className="list-group-item">Habitat: {player.habitat}</li>
                            {/* <li className="list-group-item">Location: {player.location}</li> */}
                            <li className="list-group-item">Conservation Status:  {player.conservation}</li>
                        </ul>
                        <div className="card-body">
                            <p className="card-link float-left"></p>
                            <button onClick={() => { stealPlayer(player) }} className="float-right btn btn-sm btn-info">Pledge!</button>
                        </div>
                    </div>
                })
            
            
               : <h2 className = "text-center bide">Birds be in bed. Bide you time, please. . .</h2>}

           </div>


        </div> 
   ) 
}

export default Shop;