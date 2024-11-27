import React, { useEffect, useState, useRef } from 'react';
import icon from '../assets/main-icon.png';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import profileDefault from '../assets/Default_pfp.svg.png'
import { MdAddBusiness } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showOptions, setShowOptions] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const dropDownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        };
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const goToControlPanel = () => {
        navigate('/control-panel');
        setShowDropDown(false)
    };

    const handleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleLog = () => {
        if (user) {
            handleDropDown();
        } else {
            navigate('/login');
            setShowDropDown(false)
        }
    };
    const handleLogResponsive = () => {
        setShowOptions(!showOptions)
        navigate('/login');

    };


    return (
        <nav className={styles.NavbarContainer}>
            <NavLink to='/'>
                <img src={icon} alt="logo" />
            </NavLink>

            {windowWidth < 750 && (
                <button onClick={handleOptions} className={styles.optionsBtn}>
                    <RxHamburgerMenu />
                </button>
            )}

            <ul style={(windowWidth < 750 && showOptions) ? { display: 'flex' } : {}} className={windowWidth > 750 ? styles.categories : styles.categoriesResponsive}>
                {windowWidth < 750 ? (
                    <>{
                        user ? (<NavLink onClick={logout}>
                            <li>Fazer Logout </li>
                        </NavLink>) : (null)
                    }

                        <NavLink onClick={handleOptions}>
                            <li>Fechar</li>
                        </NavLink>
                    </>
                ) : null}
                <NavLink onClick={handleOptions} to='/electronics' className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
                    <li>Eletronicos</li>
                </NavLink>
                <NavLink onClick={handleOptions} to='/clothes' className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
                    <li>Roupa</li>
                </NavLink>
                <NavLink onClick={handleOptions} to='/diverse' className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
                    <li>Variados</li>
                </NavLink>
                <NavLink onClick={handleOptions} to='/furniture' className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
                    <li>Moveis</li>
                </NavLink>
                {windowWidth < 750 && (
                    <>

                        <NavLink onClick={handleOptions} to='/' className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
                            <li>Pagina inicial</li>
                        </NavLink>
                        <NavLink onClick={handleOptions} to='/control-panel' className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
                            <li>Cadastrar produto</li>
                        </NavLink>
                        <div className={styles.profileInfoResponsive}>
                            {user === null ? (
                                <>
                                    <img src={profileDefault} alt="profile" />
                                    <button onClick={handleLogResponsive} style={{ fontSize: '12px', textTransform: 'uppercase' }} className={styles.SignInBtn}>Login</button>
                                    
                                </>

                            ) : (
                                <>
                                    <img src={user.photoURL} alt="User" />
                                    <div className={styles.userNameAndEmail}>
                                        <span className={styles.name}>{user.displayName}</span>
                                        <span className={styles.email}>{user.email}</span>
                                    </div>
                                </>
                            )}


                        </div>

                    </>
                )}
            </ul>
            {windowWidth > 750 && (
                <div className={styles.containerBag}>
                    <div onClick={handleLog} className={styles.bagIcon}>
                        {user === null ? (
                            <button onClick={handleLogResponsive} style={{ fontSize: '12px', textTransform: 'uppercase' }} className={styles.SignInBtn}>Login</button>
                        ) : (
                            <img src={user.photoURL} alt="User" />
                        )}
                    </div>
                    <button onClick={goToControlPanel} className={styles.SignInBtn}>
                        <MdAddBusiness />
                    </button>
                    {user && (
                        <div ref={dropDownRef} style={{ display: showDropDown ? '' : 'none' }} className={styles.dropDown}>
                            <div className={styles.profileInfo}>
                                <img src={user.photoURL} alt="perfil" />
                                <div className={styles.userNameAndEmail}>
                                    <span className={styles.name}>{user.displayName}</span>
                                    <span className={styles.email}>{user.email}</span>
                                </div>
                            </div>
                            <ul className={styles.dropDownOptions}>
                                <li>
                                    <button onClick={goToControlPanel}><IoCreateOutline /> <span>Cadastrar Produto</span></button>
                                </li>
                                <li>
                                    <button onClick={logout}><IoExitOutline /> <span>Sair</span></button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
