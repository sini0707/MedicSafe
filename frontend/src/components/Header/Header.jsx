import { useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
 import { BiMenu } from 'react-icons/bi';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../../../backend/config/db';
import {logout} from "../../slices/authSlice";
 




const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
];

const Header = () => {

  const user=useSelector((state)=>state.auth.userInfo)
 

  const headerRef=useRef(null)
  const menuRef=useRef(null)
 const dispatch=useDispatch()
 


  const handleStickyHeader=()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80|| document.documentElement.scrollTop>80){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')

      }  
    })
  }
  useEffect(()=>{
    handleStickyHeader()
    return ()=>window.removeEventListener('scroll',handleStickyHeader)
  });
  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show_menu');
    }
  };
  const navigate = useNavigate();
  // const{ dispatch} = useDispatch(authContext);


  const logoutHandler = async () => {
    try {
      const response = await fetch(`${baseURL}/users/logout`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
  
      if (!response.ok) {
        throw new Error('Logout failed');
      }
  
      await response.json(); 
  
      
      dispatch(logout());

    // Clearing local storage here directly for debugging
    

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  
  
  return (
    <header className='header flex items-center' ref={headerRef}>
    <div className='container'>
      <div className='flex items-center justify-between'>
        <div>
          <img src={logo} alt='' style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className='navigation' ref={menuRef} onClick={toggleMenu}>
          <ul className='menu flex items-center gap-[2.7rem]'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={(navClass) =>
                    navClass.isActive
                      ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                      : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                  }
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center gap-4'>
          {user && user.token ? ( // Check if user and token exist
            <div>
              <NavLink to={`${user.role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                  <img src={user?.photo} className="w-full rounded-full" alt="" />
                </figure>
                <h2>Welcome {user.name}</h2>
              </NavLink>
            </div>
          ) : (
            <NavLink to="">
              {/* <button className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
                Login
              </button> */}
            </NavLink>
          )}
          <button onClick={logoutHandler} className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
            Logout
          </button>
          <span className='md:hidden' onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer' />
          </span>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;





