
import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../search-bar/SearchBar'
import './header.scss'

const headerNav = [
    {
        display: 'Trang chủ',
        path: '/'
    },

    {
        display: 'Đăng ký ô đỗ',
        path: '/stranger'
    },

    {
        display: 'Cập nhật ô đỗ',
        path: '/'
    },

    {
        display: 'Thống kê',
        path: '/thongke'
    }
]

const Header = () => {
    const { pathname } = useLocation()
    const active = headerNav.findIndex(item => item.path === pathname)
    const headerRef = useRef();

    useEffect(() => {
        const shrinkHeader = () => {
            if(document.documentElement.scrollTop > 101 || document.body.scrollTop > 101) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }
        
        window.addEventListener('scroll', shrinkHeader)
        
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }

    }, [])

    return (
        <header ref={headerRef} className="header">
            <div className="header__image"></div>
            <div className="header__navbar">
                <nav className='header__list container'>
                    <ul className=''>
                        {
                            headerNav.map((item, index)=> {
                                return (
                                    <li  key={index}>
                                        <Link to={item.path} className={active === index ? 'active' : ''}>
                                            {item.display}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <SearchBar/>
                    <div className="header__user">
                        Xin chào, Tuấn
                        <i className="fa-solid fa-user"></i>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header 