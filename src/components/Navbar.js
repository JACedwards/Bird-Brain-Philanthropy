import {Link} from 'react-router-dom';
import {useState, useContext} from 'react';
import{ DataContext} from '../DataProvider';

let Navbar = () => {
    
    const [count, setCount] = useState(0);
    const changeCounter = () => {
        console.log('current count' + count);
        setCount(count + 1);
      }

    const{cart} = useContext(DataContext);
    
    return(

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  
<Link className="nav-link" style={{color: 'white'}}  to="/">BIRD BRAIN |</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/shop">Trade</Link>
            </li>

        </ul>
        <ul className='navbar-nav ml-auto align-items-center'>
            <li className="nav-item">
                <p className="nav-link">Welcome!</p>
            </li>
            <li className='nav-item'>
                {
                    cart.size == 0 ?
                    <Link className='btn btn-sm btn-info m-2' to='/shop'><i class="fa-regular fa-futbol"></i>  Poach a Player </Link> 
                    : 
                    <Link className='btn btn-sm btn-info m-2' to='/cart'><i class="fa-regular fa-futbol"></i>  Items in Cart: {cart.size} | ${cart.total},000,000</Link>
                }
                
            </li>
        </ul>
  </div>
</nav>
    );
}
export default Navbar;