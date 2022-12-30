import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/Knights-of-America.png';
import './Header.css';
import { CgLogOut, CgProfile  } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/Store';
import { logoutUser } from '../../Redux/Slices/UserSlice';


export const HeaderPage:React.FC = () => {

    const userState = useSelector((state:RootState) => state.auth);
    let navigate = useNavigate();
    const dispatch:DispatchType = useDispatch();

    const handleLogout = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        dispatch(logoutUser()).then(()=>{
            navigate("/login");
        })
    }

    return (
        <header id="header" className="header">
            <div className="nav">
                <Link to="/home"><img className='logo' width="170" height="100" src={logo}/></Link>
                {userState.currentUser?.userRole==="CUSTOMER"
                  ? <Link className="HeaderMorgageLink" to="/mortgage"><button>Apply to Mortgage</button></Link>
                  : <></>  
                }   
                { userState.isAuthenticated 
                  ? <CgLogOut size={50} name="logout" className='logoutBtn' onClick={handleLogout}/>
                  : <></>
                }
            </div>
        </header>
    )
}

//<Link className="HeaderMorgageLink" to="/modal">Testing Modal</Link>
