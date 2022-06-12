import { useState, useContext } from 'react';
import { DataContext } from '../DataProvider';
import axios from 'axios';

let Shop = () => {

   let getPlayerData = async () => {
      let data = await axios.get('http://127.0.0.1:5000/api/birds')
      return data.status === 200 ? data.data : null
   }
   
   let loadPlayerData = async () => {
      let data = await getPlayerData();
      console.log(data);
      setPlayers(data);
   }
   const [players, setPlayers] = useState(()=>{loadPlayerData();});

   const{cart, setCart} = useContext(DataContext);

   const stealPlayer = player => {
       let mutableCart = {...cart};
       mutableCart.size++;
       mutableCart.total += player.price;
       mutableCart.items[player.bird_id] ? mutableCart.items[player.bird_id].quantity++ : mutableCart.items[player.bird_id] = {'obj' : player, 'quantity' : 1}
       console.log(mutableCart);
       setCart(mutableCart);
   }

   return(
        <div className='container'>
           <div className='row justify-content-center'>
              <h1>Bring your Bivalves, Beetles, Bass, and Bilbies </h1>

           </div>
           <div className='row justify-content-center'>
              <h1>To Barter for Birds </h1>

           </div>
           <div className='row'>
                {typeof players === 'object' && players[1] ? players.map((player, index) => {
                    return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                        <img src={player.image} className="card-img-top" alt={player.latin_name} />
                        <div className="card-body">
                            <h5 className="card-title">{player.common_name}</h5>
                            <h5 className="card-title font-italic">{player.latin_name}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Diet: {player.diet}</li>
                            <li className="list-group-item">Behaviors: {player.behaviors}</li>
                            <li className="list-group-item">Conservation Status:  {player.conservation}</li>
                        </ul>
                        <div className="card-body">
                            <p className="card-link float-left">Asking Price: {player.price} Worms/Molluscs/Insects/Rodents</p>
                            <button onClick={() => { stealPlayer(player) }} className="float-right btn btn-sm btn-info">Barter!</button>
                        </div>
                    </div>
                })
            
            
               : <h3 className = "text-center">Birds be in bed. Bide you time. . .</h3>}

           </div>


        </div> 
   ) 
}

export default Shop;