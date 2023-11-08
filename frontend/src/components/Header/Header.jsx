import React, { useEffect, useRef } from 'react';
import { Container, Row, Button } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './header.css';

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    })
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, [])
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">

            <div className="logo">
              <img src={logo} alt="" />
            </div>


            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {
                  nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <Link to={item.path} className={navClass => navClass.isActive ? 'active_link' : ''}>{item.display}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-2">
                <Button className='btn secondary_btn'><Link to='/login'>Login</Link></Button>
                <Button className='btn primary_btn'><Link to='/register'>Register</Link></Button>
              </div>

              <span className="mobile_menu">
                <MenuIcon />
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header;