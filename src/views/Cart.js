import '../css/cartstyles.css'
import { useContext, useState } from 'react';
import { DataContext } from '../DataProvider';
import { useDatabase, useUser } from 'reactfire';
import { set, ref } from 'firebase/database';
import { Link } from 'react-router-dom';

let Cart = () => {
    const {data: user} = useUser();
    const db = useDatabase();
    
    const {cart, setCart} = useContext(DataContext);
    // below grayed out
    const [msg, setMsg] = useState(false);

    const incQuantity = player => { 
        let mutableCart = {...cart}

        mutableCart.size++;
        mutableCart.total += player.obj.price;
        mutableCart.items[player.obj.bird_id].quantity++;
        
        if (user) {
            set(ref(db, 'carts/' + user.uid), {mutableCart});
        }
        
        setCart(mutableCart);
        setMsg(false);

    }

    const decQuantity = player => { 
        let mutableCart = {...cart}

        mutableCart.size -= mutableCart.items[player.obj.bird_id].quantity;
        mutableCart.total -= player.obj.price*mutableCart.items[player.obj.bird_id].quantity;
        delete mutableCart.items[player.obj.bird_id];
        if (user) {
            set(ref(db, 'carts/' + user.uid), {mutableCart});
        }
        setCart(mutableCart);
        
    }

    const removePlayer = player => { 
        let mutableCart = {...cart}

        mutableCart.size--;
        mutableCart.total -= player.obj.price;
        delete mutableCart.items[player.obj.bird_id];
        if (user) {
            set(ref(db, 'carts/' + user.uid), {mutableCart});
        }
        setCart(mutableCart);
        
    }

    const clearCart = () => { 
        let newCart = {items: {}, total: 0, size: 0};
        if (user) {
            set(ref(db, 'carts/' + user.uid), null);
        }
        setCart(newCart);

        
    }
    
    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-0" align="center">
                        <h4>Cart</h4>
                    </div>
                    <div className="p-0" align="center">
                        <h4>Birds Bartered For  |  Food Trade Promised</h4>
                    </div>
                        {/* Single player */}
                        { Object.values(cart.items).map((player) => {

                            return<div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1"><img className="rounded" alt="pic" src={player.obj.image} width="70" /></div>
                            <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{player.obj.first_name} {player.obj.last_name}</span>
                                <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1"><span className="font-weight-bold">{player.obj.team}</span></div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center qty">
                                <i className="fa fa-minus text-danger" onClick={() => {decQuantity(player);}}> </i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">{player.quantity}</h5>
                                <i className="fa fa-plus text-success" onClick={() => {incQuantity(player);}}></i>
                            </div>
                            <div>
                                <h5 className="text-grey">{player.obj.price} Critters Each</h5>
                            </div>
                            <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger" onClick={() => {removePlayer(player);}}></i></div>
                        </div>
                        })
                        
                        }
                         {/* End single player? */}
                

                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">{cart.total} Critters</h4>
                        </div>
                        <div className="d-flex align-items-center">
                            {cart.size === 0?
                                 <button disabled className="btn btn-sm btn-success">Your cart is empty</button>
                                 :
                                 <button className="btn btn-sm btn-danger" onClick={clearCart}>Clear Cart</button>

                            }
            
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
                        <button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" disabled={cart.size === 0 ? true : false}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
    
    }

    export default Cart;