
import { useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext'; 
import logo from '../../assets/images/logo.png'; // Import the correct path for your logo
import { baseURL } from '../../../../backend/config/db';
import { logout } from '../../slices/adminSlices/adminAuthSlice';
const navlinks = [
  {
    path: '/admin/home',
    display: 'Home',
  },
  {
    path: '/admin/userlist',
    display: 'Users',
  },
  {
    path: '/admin/doctorslist',
    display: 'Doctors',
  },
  {
    path: '/admin/bookings',
    display: 'Bookings',
  },
];

const AdminHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <div>
            <img src={logo} alt='' style={{ width: '200px', height: 'auto' }} />
          </div>
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navlinks.map((link, index) => (
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
  {token && user ? (
    <div>
      <NavLink to={`${role == "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
        <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
          <img src={user?.photo} className="w-full rounded-full" alt=""/>
        </figure>
        <h2>Welcome  Admin </h2>
        <button onClick={logoutHandler} className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
                 Logout
          </button>
      </NavLink>
    </div>
  ) : (
    <NavLink to="/a">
              <button className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
                Login
              </button>
            </NavLink>

    
  )}

  {/* This line renders the user's name regardless of the authentication state */}
  {/* <h1>{user?.name}</h1> */}
{/* 
  <NavLink to="/login">
    <button className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
      Login
    </button>
  </NavLink> */}

  <span className='md:hidden' onClick={toggleMenu}>
    <BiMenu className='w-6 h-6 cursor-pointer'/>
  </span>
</div>



        </div>
      </div>
    </header>
  );
};

export default AdminHeader;


    