import { NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navbar">
            <NavLink 
                // activeClassName="chosen" 
                className="link"
                to="/">HOME
            </NavLink>
            <NavLink 
                // activeClassName="chosen" 
                className="link"
                to="/Add-Article2"
                >ADD NEW ARTICLE
            </NavLink>

            
        </div>

     );
}
 
export default Navbar;