import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { DataContext } from '../DataProvider';
import { useAuth, useUser, useDatabase } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref, child, get } from 'firebase/database';


let Navbar = () => {
    const auth = useAuth();

    const db = useDatabase();
    
    // const [count, setCount] = useState(0);

    // const changeCounter = () => {
    //     console.log('current count' + count);
    //     setCount(count + 1);
    //   }

    // adding setCart here made everything disappear on screen

    const{cart, setCart,} = useContext(DataContext);  

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
        setCart({items: {}, total: 0, size: 0});
    }
    
    useEffect(() => {
        if (user) {
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setCart(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

    return (

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  
<Link className="nav-link" style={{color: 'white'}}  to="/"><i class="fa-solid fa-dove"></i> BIRD BRAIN <i class="fa-solid fa-brain"></i>  	&#160;&#8212;	&#160;  Philanthropy |</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/shop">Pledge</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/cart">Donate</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/danger">Threats</Link>
            </li>

        </ul>

        {/* Start of Version WITHOUT Sign in funcitons (
            Version WITH sign in capabilities at end */}
        <ul className='navbar-nav ml-auto align-items-center'>
            {/* {user 
                    ?
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
            } */}
            <li className='nav-item'>
                {
                    cart.size === 0 ?
                    <Link className='btn btn-sm btn-info m-2' to='/shop'><i class="fa-solid fa-dove"></i>  Pledge </Link> 
                    : 
                    <Link className='btn btn-sm btn-info m-2' to='/cart'><i class="fa-solid fa-dove"></i>  Pledges: {cart.size} | Amount: ${cart.total} </Link>
                }
                
            </li>
        </ul>
         {/* End of version without signin capabilities        */}

  </div>
</nav>
    );
}
export default Navbar;

//****Version with sign in capabilities

{/* <ul className='navbar-nav ml-auto align-items-center'>
{status === 'loading' 
    ?
    <li className="nav-item">
        <p className="nav-link m-0">Logging in...</p>
    </li>
    : user 
        ?
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
        cart.size === 0 ?
        <Link className='btn btn-sm btn-info m-2' to='/shop'><i class="fa-solid fa-dove"></i>  Pledge </Link> 
        : 
        <Link className='btn btn-sm btn-info m-2' to='/cart'><i class="fa-solid fa-dove"></i>  Pledges: {cart.size} | Amount: ${cart.total} </Link>
    }
    
</li>
</ul> */}