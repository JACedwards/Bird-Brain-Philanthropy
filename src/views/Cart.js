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


    // const [msg, setMsg] = useState(false);

    const incQuantity = player => { 
        let mutableCart = {...cart}

        mutableCart.size++;
        mutableCart.total += player.obj.pledge;
        // I changed Sam's .id to .common_name because I think that's what I used elsewhere because I didn't include bird id in my React model in Flask
        mutableCart.items[player.obj.common_name].quantity++;
        
        // if (user) {
        //     set(ref(db, 'carts/' + user.uid), {mutableCart});
        // }
        setCart(mutableCart);
        // setMsg(false);
    }

    const decQuantity = player => { 
        let mutableCart = {...cart}

        mutableCart.size--;
        mutableCart.total -= player.obj.pledge;

        mutableCart.items[player.obj.common_name].quantity > 1 ?
            mutableCart.items[player.obj.common_name].quantity-- :
            delete mutableCart.items[player.obj.common_name]


        //had below code when working back through. Think it might be related to cart persistance to do later
        // mutableCart.size -= mutableCart.items[player.obj.common_name].quantity;
        // mutableCart.total -= player.obj.pledge*mutableCart.items[player.obj.common_name].quantity;
        // delete mutableCart.items[player.obj.common_name];
        // if (user) {
        //     set(ref(db, 'carts/' + user.uid), {mutableCart});
        // }
        setCart(mutableCart);
    }

    const removePlayer = player => { 
        let mutableCart = {...cart}

        mutableCart.size -= mutableCart.items[player.obj.common_name].quantity;
        mutableCart.total -= player.obj.pledge * mutableCart.items[player.obj.common_name].quantity;
        delete mutableCart.items[player.obj.common_name];

        
        // /**/Below code that wasn't clearing out final pledge when entire bird deleted
        // mutableCart.size--;
        // mutableCart.total -= player.obj.pledge;
        // delete mutableCart.items[player.obj.common_name];

        //**below related to persistance? */
        // if (user) {
        //     set(ref(db, 'carts/' + user.uid), {mutableCart});
        // }
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
                        <h3>Pledge Summary</h3>
                        <hr className="hr-danger"></hr>
                      </div>
                    <div className="p-0" align="center">
                        <h4>Bird Avatar 		&#160;	&#160; | 		&#160;	&#160; Number of Pledges 		&#160;	&#160; | 		&#160;	&#160; Pledge Total</h4>
                    </div>
                        {/* Single player */}
                        { Object.values(cart.items).map((player, index) => {

                            return<div key={index} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1"><img className="rounded" alt="pic" src={player.obj.image} width="70" /></div>
                            <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{player.obj.first_name} {player.obj.last_name}</span>
                                <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1"><span className="font-weight-bold">{player.obj.team}</span></div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center qty">
                            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<i className="fa fa-minus text-danger" onClick={() => {decQuantity(player);}}> </i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">{player.quantity}</h5>
                                <i className="fa fa-plus text-success" onClick={() => {incQuantity(player);}}></i>
                            </div>
                            <div>
                                <h5 className="text-grey">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;@ {player.obj.pledge} Level</h5>
                            </div>
                            <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-info" onClick={() => {removePlayer(player);}}></i></div>
                        </div>
                        })
                        
                        }

                

                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold don-ttl">Donation Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">${cart.total.toLocaleString("en-US")}&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</h4>
                        </div>
                        <div className="d-flex align-items-center">
                            {cart.size === 0?
                                 <Link className="btn btn-sm btn-info" to="/shop">Click Here to Add Pledges</Link>
                                 :
                                 <button className="btn btn-sm btn-info" onClick={clearCart}>Clear Pledges</button>

                            }
            
                        </div>
                    </div>
                    <div>
                        {cart.size === 0?
                        <p></p>
                        :
                        <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
                            <button className="btn btn-warning btn-block btn-lg ml-2 pay-button btn-donate"  type="button" disabled={cart.size === 0 ? true : false}>(Donate: Planned Future Functionality)</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
    
    }

    export default Cart;