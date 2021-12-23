import menuData from '../../parts/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import profile from '../../assets/imgs/image 2.png'
import logo from '../../assets/imgs/britam-logo.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Navbar, Offcanvas, Container, Nav, NavDropdown} from 'react-bootstrap'


function AdminMenu({setLargeContentClass, largeContentClass}) {

    const { Admin } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Admin })
    const [ toggleMenu, setToggeMenu ] = useState(true)

    useEffect(() => {
        if(sessionStorage.getItem('session1')){
            setSelected({...selected, activeObject: selected.Admin[sessionStorage.getItem('session1')-1]})
        }else{
            setSelected({...selected, activeObject: selected.Admin[0]})
        }
        
    }, [])
    
    const toggleActive = index => {
        setSelected({...selected, activeObject: selected.Admin[index]})
        sessionStorage.setItem('session1', selected.Admin[index]["number"])
    }

    



    
    const toggleActiveClassStyle = index => selected.Admin[index] === selected.activeObject ? "nav-linked selected" : "nav-linked"

    return (
        <div className='menuSide'>
                <div className="mobile-sidebar">
                    <Navbar expand={false} >
                        <Container fluid>
                            <div>
                                <Navbar.Toggle className='m-3' aria-controls="offcanvasNavbar" />
                                <Navbar.Brand href="#">
                                    <img src={logo} alt="Britam" />
                                </Navbar.Brand>
                            </div>
                            <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                            >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel">
                    
                                        <img src={logo} alt="Britam" />
                    
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                <ul className="nav flex-column">
                                            { selected.Admin.map((object, index) => (
                                                                <li className='nav-item' key={index}>
                                                                    <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)} >
                                                                        <span>{object.icon}</span>{object.name}
                                                                        {object?.subMenu &&
                                                                            (
                                                                                <NavDropdown style={{"color": "#fff"}} id="offcanvasNavbarDropdown">
                                                                                {object.subMenu.map((sub, index) => (
                                                                                            <Link to={sub.link} key={index}>
                                                                                                <NavDropdown.Item href="#action3">{sub.name}</NavDropdown.Item>
                                                                                            </Link>
                    
                                                                                    ))}
                                                                                </NavDropdown>
                                                                            )
                                                                        }
                                                                    </Link>
                                                                </li>
                                                    )
                                                )
                                            }
                                        </ul>
                    
                                </Nav>
                            </Offcanvas.Body>
                            <footer>
                                        <ul>
                                            <li><Link to="/admin-settings">My Profile</Link></li>
                                            <li><Link to="/logout">Logout</Link></li>
                                        </ul>
                                    <Link to={'/admin-settings'}>
                                        <img src={profile} alt="profile" />
                                        <div>
                                            <p>Charles Kasasira</p>
                                            <p style={{"color": "#646464"}}>Admin</p>
                                        </div>
                                        <div id="eclipse"><div></div><div></div><div></div></div>
                                    </Link>
                                </footer>
                            </Navbar.Offcanvas>
                        </Container>
                        </Navbar>
                </div>

            {toggleMenu === true 
            ?
                <>
                <div className="sidebar"> 
                        <nav >
                        <div id='brand'>
                                    <img src={logo} alt="Britam" />
                                    <i onClick={() => {
                                        setToggeMenu(!toggleMenu)
                                        setLargeContentClass(!largeContentClass)
                                        }}>
                                    <HiOutlineChevronLeft />
                                    </i>
                            </div>
                            <section className='position-sticky pt-3' id="menu_section">
                                    <ul className="nav flex-column">
                                        { selected.Admin.map((object, index) => (
                                                            <li className='nav-item' key={index}>
                                                                <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)} >
                                                                    <span>{object.icon}</span>{object.name}
                                                                    {object?.subMenu &&
                                                                        (<ul>
                                                                            {object.subMenu.map((sub, index) => (
                                                                                <li key={index}>
                                                                                    <Link to={sub.link} style={{color: "black"}}>
                                                                                        {sub.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>)
                                                                    }
                                                                </Link>
                                                            </li>
                                                )
                                            )
                                        }
                                    </ul>
                            </section>
                        
                            <footer>
                                    <ul>
                                        <li><Link to="/admin-settings">My Profile</Link></li>
                                        <li><Link to="/logout">Logout</Link></li>
                                    </ul>
                                <Link to={'/admin-settings'}>
                                    <img src={profile} alt="profile" />
                                    <div>
                                        <p>Charles Kasasira</p>
                                        <p style={{"color": "#646464"}}>Admin</p>
                                    </div>
                                    <div id="eclipse"><div></div><div></div><div></div></div>
                                </Link>
                            </footer>
                        
                        </nav>
                        </div>
                    
                    </>
                                :
                    <nav className='sidebar-m'>
                        <section id='brand_m'>
                                <i onClick={() => {
                                    setToggeMenu(!toggleMenu)
                                    setLargeContentClass(!largeContentClass)
                                    }}>
                                <HiOutlineChevronRight />
                                    </i>
                        </section>
                    
                        <section className='position-sticky pt-3' id="menu_section">
                                    <ul className="nav flex-column">
                                        { selected.Admin.map((object, index) => (
                                                            <li className='nav-item' key={index}>
                                                                <Link to={object.link} className={toggleActiveClassStyle(index)} onClick={() => toggleActive(index)}>
                                                                    <span>{object.icon}</span>
                                                                    {object?.subMenu &&
                                                                        (<ul>
                                                                            {object.subMenu.map((sub, index) => (
                                                                                <li>
                                                                                    <Link to={sub.link} key={index} style={{color: "black"}}>
                                                                                        {sub.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>)
                                                                    }
                                                                </Link>
                                                            </li>
                                                )
                                            )
                                        }
                                    </ul>
                            </section>
                    
                        <footer>
                                <ul>
                                    <li><Link to="/admin-settings">Settings</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </ul>
                            <Link to={'/admin-settings'} id="account">
                                <img src={profile} alt="profile" />
                            </Link>
                        </footer>
                    </nav>
                
            }
        </div>
    )
}

export default AdminMenu