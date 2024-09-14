import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { BsBagPlus } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import swiggyLogo from '../../assets/images/swiggy3.svg';
import { ProductContext } from '../../context/ProductContext';



const ProductMenuTopBar = ({ inputRefHandle }) => {

 
   const { existingProductC } = useContext(ProductContext);
 
 
  
  const handleSearchClick = () => {
    inputRefHandle();  
  };

  let clientAddress = (clientName => clientName ? clientName.slice(0, 45) : "No clientName found in localStorage.")(
      localStorage.getItem("clientAddress")
);

  return (
    <section className='topBarSection' >
      <div className="companyTitle">
        <div className='swiggyPngLogodiv'>
          <Link to='/landing' className='link'>
            <img className='swiggyPngLogo' src={swiggyLogo} alt="Swiggy-1" />
          </Link>
        </div>
     
      
            <Link to='/MyAccount' className='link'>
              <div className='topBarAddressBox'>
                 <div>
                   <div className='HOME'>HOME</div>
                 </div>
                 <div className='topBarAddress'>
                  <div>{clientAddress}</div>
                 </div>
               </div>            
          </Link>
          </div>
      <div className='topBarLinks'>
        <Link to='/search' className='link' onClick={handleSearchClick}>
          <div className='searchIconBox'>
            <BiSearch className='searchIcon' />
            <div className='searchIconString'>Search</div>
          </div>
        </Link>

        <Link to='/OffersPage' className='link'>
          <div className='offersIconBox'>
            <BiSolidOffer className='offersIcon' />
            <div className='offersIconString'>Offers</div>
          </div>
        </Link>

        {/* <Link to='/HelpPage' className='link'> */}
        <Link to='https://www.swiggy.com/support' className='link'>
          <div className='helpBox'>
            <IoHelpBuoyOutline className='helpIcon' />
            <div className='helpIconString'>Help</div>
          </div>
        </Link>

        <div className="dropdown">
          <Link to='/CheckOut'>
            <BsBagPlus className='cartIcon' />
            <div className={existingProductC === 0 ? "" : "dotB"}></div>
          </Link>
        </div>

        <div className="logindropdown">
          <Link to='/MyAccount' className='link'>
            <div className='logInBox'>
              <div className='person'><BsPerson /></div>
              <div className='logins'><span>MANOJ</span></div>
            </div>
          </Link>
          <div className="logindropdown-content">
            <a href="/MyAccount">Profile</a>
            <a href="/CheckOut">Orders</a>
            <a href="/landing">Favourites</a>
            <a href="/RigesterAndLogin">Logout</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductMenuTopBar;






