import menuData from '../../components/menuData'
import '../../assets/styles/menu.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../../assets/imgs/britam-logo2.png'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import MobileNav from '../../components/menu/MobileNav'
import SideBar from '../../components/menu/SideBar'
import MinimisedSideBar from '../../components/menu/MinimisedSideBar'
import { authentication } from "../../helpers/firebase";
import { MdLogout } from 'react-icons/md'
import DefaultAvatar from '../../components/DefaultAvatar'
import { Badge } from 'react-bootstrap'
import { ImProfile } from 'react-icons/im'
import useAuth from '../../contexts/Auth'

function AgentMtpMenu({setLargeContentClass, largeContentClass}) {

    const { Agent_mtp } = menuData

    const [ selected, setSelected ] = useState({ activeObject: null, Agent_mtp })
    const [ toggleMenu, setToggeMenu ] = useState(true)
    const [ openFooterContext, setOpenFooterContext ] = useState(false)

    console.log(authentication.currentUser)

    return (
        <div className='menuSide'>
            <MobileNav role={Agent_mtp} user="agent" displayName={authentication?.currentUser?.displayName}/>
            {toggleMenu === true 
            ?
                    <nav className="sidebar">
                        <div id='brand'>
                            <img src={logo} width={150} alt="Britam" />
                            <div id="arrowCircle" onClick={() => {
                                    setToggeMenu(!toggleMenu)
                                    setLargeContentClass(!largeContentClass)
                                    }}>
                                    
                                        <HiOutlineChevronLeft style={{color: "#c6c7c8", fontSize: "15px"}}/>
                                    
                                    
                            </div>
                        </div>
                        <SideBar role={Agent_mtp} user="agent" displayName={authentication?.currentUser?.displayName} />

                        <footer>
                            {/* <Link to='/admin/settings'> */}
                            <div className="footerContext" onClick={() => setOpenFooterContext(!openFooterContext)}>
                                {authentication.currentUser.photoURL !== "https://firebasestorage.googleapis.com/v0/b/car-insurance-app.appspot.com/o/default-user-image.png?alt=media&token=f9f8f8e9-f8f8-4f8f-8f8f-f8f8f8f8f8f8"
                                ?
                                    <img src={authentication.currentUser.photoURL} alt='profile' width={50} height={50} style={{borderRadius: "50%"}}/>
                                :
                                    <DefaultAvatar />
                                }
                                
                                
                                <div>
                                    <p style={{"fontWeight": "500", "fontSize": "1.05rem"}}>{authentication?.currentUser?.displayName}</p>
                                    <p style={{"color": "#646464"}}>
                                        <Badge color='black'>agent</Badge>
                                    </p>
                                </div>
                                <h3 style={{color: "#000"}}>&hellip;</h3>
                            </div>
                            {/* </Link> */}
                            <ul className={openFooterContext ? "footerContextShow" : ""} id="contextUl">
                                <li><Link to="/agent/settings"><ImProfile /> My Profile</Link></li>
                                <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                            </ul>
                        </footer>

                    </nav>
            : 
            <nav className='sidebar-m'>
                <section id='brand_m'>
                    <div id="arrowOutCircle" onClick={() => {
                        setToggeMenu(!toggleMenu)
                        setLargeContentClass(!largeContentClass)
                        }}>
                        
                            <HiOutlineChevronRight style={{color: "#c6c7c8", fontSize: "15px"}}/>
                        
                        
                </div>
                </section>
                <MinimisedSideBar role={Agent_mtp}/>
                <footer>
                        <ul>
                            <li><Link to="/admin/settings">Settings</Link></li>
                            <li><Link to="/logout"><MdLogout /> Logout</Link></li>
                        </ul>
                    <Link to={'/admin-settings'} id="account">
                        <img src={authentication.currentUser.photoURL} alt='profile'/>
                        {/* <DefaultAvatar /> */}
                    </Link>
                </footer>
            </nav>
}
        </div>
    )
}

export default AgentMtpMenu