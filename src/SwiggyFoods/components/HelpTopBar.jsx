import React from 'react'
import { Link } from 'react-router-dom'
import { BiSearch } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
 import { IoHelpBuoyOutline } from "react-icons/io5";
 import { BsBagPlus } from "react-icons/bs";
 import { BsPerson } from "react-icons/bs";
 import swiggyLogo from '../../assets/images/swiggy3.svg';   
 
const HelpTopBar=()=> {
  return (
   <section className='topBarSection'>
        <div className="companyTitle">
            
            <div className='swiggyPngLogodiv'>
            <Link to='/landing' className='link'>
              <img className='swiggyPngLogo' src={swiggyLogo} alt="Swiggy-1" />
              </Link>
            </div>
            <div>
              <div className='checkOutHeading'>HELP</div>
            </div>
            
        </div>
         
        <div className='topBarLinks'>
                 
                 <Link to='/search' className='link'>
                   <div className='searchIconBox'>                 
                     <BiSearch  className=' searchIcon'  />
                     <div className='searchIconString'>Search</div>                   
                   </div>
                 </Link>
             
                 <Link to='/OffersPage' className='link'>
               <div className='offersIconBox'>
                 <BiSolidOffer className=' offersIcon'  />
                 <div className='offersIconString'>Offers</div>
               </div>
               </Link>

               <Link to='/HelpPage' className='link'>
               {/* to='https://www.swiggy.com/support'  */}
              <div className='helpBox'>
                 <IoHelpBuoyOutline className=' helpIcon'  />
                 <div className='helpIconString'>Help</div>
              </div>
              </Link>
           

            <div className="dropdown">
            
            <Link to='/CheckOut'>
             <BsBagPlus  className=' cartIcon'/>
             <div class="dropdown-content">
            <a href="#option1">Profile</a>
                 <a href="#option1">Orders</a>
                 <a href="/landing">Favourites</a>
                 <a href="#option3">Logout</a>
             </div>
             </Link>
            </div>

           

           <div class="logindropdown">
           <Link to='/MyAccount' className='link'>
           <div className='logInBox' >
            <div className='person'>< BsPerson /></div>
            <div className='logins'><span>MANOJ</span></div>
           </div>
           </Link>
            <div class="logindropdown-content">
            <a href="#option1">Profile</a>
                 <a href="#option1">Orders</a>
                 <a href="#option2">Favourites</a>
                 <a href="#option3">Logout</a>
             </div>
            </div>
             

        </div>
         
   </section>
  )
}

export default HelpTopBar