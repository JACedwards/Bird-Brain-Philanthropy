import { useState, useContext } from 'react';
import { DataContext } from '../DataProvider';
import axios from 'axios';

let Shop = () => {

   let getPlayerData = async () => {
      let data = await axios.get('https://foxes78api.herokuapp.com/api/players')
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
       mutableCart.total += player.number;
       mutableCart.items[player.id] ? mutableCart.items[player.id].quantity++ : mutableCart.items[player.id] = {'obj' : player, 'quantity' : 1}
       console.log(mutableCart);
       setCart(mutableCart);
   }

   return(
        <div className='container'>
           <div className='row justify-content-center'>
              <h1>Filching Footballers</h1>

           </div>
           <div className='row'>
                {typeof players === 'object' && players[1] ? players.map((player, index) => {
                    return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                        <img src={player.image} className="card-img-top" alt={player.sci_name} />
                        <div className="card-body">
                            <h5 className="card-title">{player.first_name} {player.last_name}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Team: {player.team}</li>
                            <li className="list-group-item">Number: {player.number}</li>
                            <li className="list-group-item">Position:  {player.postion}</li>
                        </ul>
                        <div className="card-body">
                            <p className="card-link float-left">Transfer Fee: {player.transfer_cost}</p>
                            <button onClick={() => { stealPlayer(player) }} className="float-right btn btn-sm btn-info">Steal!</button>
                        </div>
                    </div>
                })
            
            
               : <h3 className = "text-center">The players are still in the locker room. They'll be out in a moment.</h3>}

           </div>


        </div> 
   ) 
}

export default Shop;