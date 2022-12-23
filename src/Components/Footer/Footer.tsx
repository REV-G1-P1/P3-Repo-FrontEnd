import './Footer.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Knights-of-America.png';
import { logoutUser } from '../../Redux/Slices/UserSlice';
import { DispatchType } from '../../Redux/Store';
import { useDispatch } from 'react-redux';

export const Footer:React.FC = () => {
  const dispatch:DispatchType= useDispatch();
  const navigate = useNavigate();
  const  handleLogout = (e: { preventDefault: () => void; })=>{
    e.preventDefault();
dispatch(logoutUser()).then(()=>{
  navigate("/login");
});

}

        return (
          
            <footer className="footer">

<div className="footerAddress">
            <img className="footerLogo" src={logo} />
            </div>
            <div className="footerAddress">      
            <br/>            
              <h2>Contact Us</h2>
              <address>
              <p>Address: xyz Ave 45212, MI</p>
                <p>Email: support@banking.com</p>
                <p>Phone: 313-585-5914</p>
                    
              </address>
            </div>    
        
            <ul className="footerNav ">
              <li className="navItem">
                <h2 className="navTitle">Pages</h2>
          
                <ul className="navUl">
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
    
                  <li>
                    <Link to="/mortgage">Mortgage</Link>
                  </li>

                  <li>
                      <Link to="/login" onClick={handleLogout}>Logout</Link>
                  </li>

                </ul>
              </li>
              
             
             

              
              <li className="navItem links">
                <h2 className="navTitle">Legal</h2>
                
                <ul className="navUl">
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                  
                  <li>
                    <a>Terms of Use</a>
                  </li>
                  
                  <li>
                    <a>Sitemap</a>
                  </li>
                </ul>
              </li>
            </ul>
            
            <div className="legal">
              <p>&copy; 2022 Banking. All rights reserved.</p>
              
             
            </div>
          </footer>
      
        );
    }    
export default Footer

