import { useEffect } from 'react';
import logo from '../../assets/images/logo.png';
// import userImg from '../../assets/images/profile.png';
import { NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { useRef,useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../../../backend/config/db';



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

  const headerRef=useRef(null)
  const menuRef=useRef(null)
  const {user,role,token,dispatch}=useContext(authContext)
 

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
  
      
      dispatch({type:"LOGOUT" });

    // Clearing local storage here directly for debugging
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');

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
          {/*............menu..........*/}
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

          {/*..............nav right..........*/}
          <div className='flex items-center gap-4'>
  {token && user ? (
    <div>
      <NavLink to={`${role == "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
        <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
          <img src={user?.photo} className="w-full rounded-full" alt=""/>
        </figure>
        <h2>Welcome  {user?.name}</h2>
      </NavLink>
    </div>
  ) : (
    <NavLink to="/login">
      <button className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
        Login
      </button>
    </NavLink>

    
  )}

  {/* This line renders the user's name regardless of the authentication state */}
  {/* <h1>{user?.name}</h1> */}

  <NavLink to="/login">
    <button  onClick={logoutHandler} className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
      Logout
    </button>
  </NavLink>

  <span className='md:hidden' onClick={toggleMenu}>
    <BiMenu className='w-6 h-6 cursor-pointer'/>
  </span>
</div>

        </div>
      </div>
    </header>
  );
};

export default Header;
