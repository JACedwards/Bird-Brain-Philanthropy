import {Link} from 'react-router-dom';
import {useState, useContext} from 'react';
import{ DataContext} from '../DataProvider';
import { useAuth, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { async } from '@firebase/util';


let Navbar = () => {
    const auth = useAuth();
    
    // const [count, setCount] = useState(0);

    // const changeCounter = () => {
    //     console.log('current count' + count);
    //     setCount(count + 1);
    //   }

    const{cart} = useContext(DataContext);

    const { status, data: user } = useUser();

    const signin = async () => {
        const provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
        console.log(u);
        console.log('User signed in')
    }

    const signout = async () => {
        await signOut(auth);
        console.log('signed user out');
    }
    
    return (

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  
<Link className="nav-link" style={{color: 'white'}}  to="/"><i class="fa-solid fa-dove"></i> BIRD BRAIN <i class="fa-solid fa-brain"></i> |</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/shop">Barter</Link>
            </li>

        </ul>
        <ul className='navbar-nav ml-auto align-items-center'>
        {status === 'loading' ?
                        <li className="nav-item">
                            <p className="nav-link m-0">Logging in...</p>
                        </li>
                        : user ?
                            <>
                                <li className="nav-item">
                                    <p className="nav-link m-0">Welcome, {user.displayName}!</p>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-info mr-2" onClick={signout}>Sign out</button>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <button className="btn btn-sm btn-info mr-2" onClick={signin}>Sign in</button>
                            </li>
                    }
            <li className='nav-item'>
                {
                    cart.size == 0 ?
                    <Link className='btn btn-sm btn-info m-2' to='/shop'><i class="fa-solid fa-dove"></i>  Bird Bartering </Link> 
                    : 
                    <Link className='btn btn-sm btn-info m-2' to='/cart'><i class="fa-solid fa-dove"></i>  Items in Cart: {cart.size} | {cart.total} Critters</Link>
                }
                
            </li>
        </ul>
  </div>
</nav>
    );
}
export default Navbar;