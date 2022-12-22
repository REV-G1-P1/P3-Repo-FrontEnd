import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/Knights-of-America.png';
import './Header.css';
import { CgProfile  } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../Redux/Store';
import { logoutUser } from '../../Redux/Slices/UserSlice';


export const HeaderPage:React.FC = () => {
                                    
  let navigate = useNavigate();
  const dispatch:DispatchType = useDispatch();

      const handleLogout = (e: { preventDefault: () => void; })=>{
                e.preventDefault();
        dispatch(logoutUser())
        navigate("/login")
      }


  return(
    
    <header id="header" className="header">
    <div className="nav">
    <img className='logo' src={logo}/>
    <Link to="/shop"></Link>
    <span className='badge badge-warning' id='lblCartCount'> </span>
    <Link to="/notification"></Link>
    <CgProfile size={50} name="logout" className='logoutBtn' onClick={handleLogout}/>
    </div>
   </header>
          )
    }


