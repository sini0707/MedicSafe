
import { useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext'; 
import logo from '../../assets/images/logo.png'; 
import { baseURL } from '../../../../backend/config/db';
import { logout } from '../../slices/adminSlices/adminAuthSlice';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
     path: '/admin/specializations',
     display: 'Departments',
  },

];

const AdminHeader = () => {
  const admin=useSelector((state)=>state.adminAuth.adminInfo);
  
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  console.log("User:", user);
console.log("Role:", role);
console.log("Token:", token);

  const dispatch = useDispatch();

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
  const navigate = useNavigate();


  const logoutHandler = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/adminlogout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      await response.json();
      console.log("Logout response:", response); 
      dispatch(logout());

      

      navigate("/admin");
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
        <h2>Welcome {role === "admin" ? "Admin" : "User"} </h2>
        <button onClick={logoutHandler} className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
                 Logout
          </button>
      </NavLink>
    </div>
  ) : (
    <NavLink to="/admin">
              <button className='bg-primaryColor py-2 px-6 text-white font [600] h-[44px] flex items-center rounded-[50px]'>
                Logout
              </button>
            </NavLink>

    
  )}

 

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


    