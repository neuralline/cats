import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {StoreContext} from '../context/Provider'
import '../css/nav-bar.css'
import {IMenu} from '../global-cats-env'
import avatar from '../img/avatar-0.jpg'
import Hamburger from './Hamburger'

const NavBar = ({location}: any) => {
  const {navbar}: any = useContext(StoreContext)
  const [menuActive, setMenuActive] = useState(false)
  const navList: [IMenu] = navbar.navList

  return (
    <nav className="nav-bar transition" data-test="nav-bar">
      <Link
        to={navbar.logo.link}
        className={`logo transition ${
          location.pathname === navbar.logo.link && 'active'
        }`}
        onClick={() => setMenuActive(false)}>
        <div className={`nav-icon ${navbar.logo.icon}`}></div>

        {navbar.logo.title}
      </Link>
      <ul className={(menuActive && 'active') || ''}>
        {navList.map((menu: IMenu, i: number) => (
          <li key={i} onClick={() => setMenuActive(false)}>
            <Link
              className={location.pathname === menu.link ? 'active' : ''}
              to={menu.link}>
              <div className={`nav-icon ${menu.icon}`}></div>
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-user">
        <img
          src={avatar}
          alt="player-two"
          title="player-two"
          className="nav-user-avatar shadow transition"
        />
      </div>

      <span onClick={() => setMenuActive(!menuActive)}>
        <Hamburger active={menuActive} />
      </span>
    </nav>
  )
}

export default NavBar
