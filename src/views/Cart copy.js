import '../css/cartstyles.css'
import  { useContext } from 'react';
import { DataContext } from '../DataProvider';

let Cart = () => {

    const {cart, setCart} = useContext(DataContext);
    
    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Steal a Player:</h4>
                    </div>

                        {/* Single player */}
                        
                        <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1"><img className="rounded" alt="" src=" " width="70" /></div>
                            <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Player</span>
                                <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1"><span className="font-weight-bold">Team</span></div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center qty">
                                <i className="fa fa-minus text-danger"> </i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">A lot</h5>
                                <i className="fa fa-plus text-success"></i>
                            </div>
                            <div>
                                <h5 className="text-grey">$00.00 ea.</h5>
                            </div>
                            <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger"></i></div>
                        </div>
                         {/* End single player? */}
                

                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">$00.00 ea.</h4>
                        </div>
                        <div className="d-flex align-items-center"><button className="btn btn-sm btn-danger">Clear Cart</button>
            
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
                        <button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
    
    }

    export default Cart;