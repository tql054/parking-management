import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";
import "./header.scss";
import { useStore } from "../../store/hooks";
import {unsetInfoUser} from '../../store/actions'
import Button from "../button/Button";

const Header = () => {
  const [state, dispatch] = useStore()
  const {right, accessToken} = state
  console.log(state)
  let headerContent = []
  switch(right) {
    case 1: {
       headerContent = [
        [
          {
            display: "Trang chủ",
            path: "/",
          },
        ],
      
        [
          {
            display: "Thông báo",
            path: "/thongbao",
          },
          {
            display: "Xem thông báo",
            path: "/danhsachthongbao",
          },
        ],
      
        [
          {
            display: "Thống kê theo giờ",
            path: "/thongketheogio",
          },
          {
            display: "Thống kê theo tháng",
            path: "/thongketheothang",
          },
        ],
      ];
      break;
    }

    case 2: {
       headerContent = [
        [
          {
            display: "Trang chủ",
            path: "/",
          },
        ],
      
        [
          {
            display: "Xem thông báo",
            path: "/danhsachthongbao",
          },
        ],
      
        [
          {
            display: "Thống kê theo giờ",
            path: "/thongketheogio",
          },
          {
            display: "Thống kê theo tháng",
            path: "/thongketheothang",
          },
        ],
      ];
      break;
    }

    case 3: {
       headerContent = [
        [
          {
            display: "Trang chủ",
            path: "/",
          },
        ],
      
        [
          {
            display: "Xem thông báo",
            path: "/danhsachthongbao",
          },
        ],
      ];
      break
    }
    default:  headerContent = [
      [
        {
          display: "Trang chủ",
          path: "/",
        },
      ],
    ];
  }
  



  const { pathname } = useLocation();
  const active = headerContent.findIndex((listItem) =>
    listItem.some((item) => item.path === pathname)
  );
  const headerRef = useRef();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.documentElement.scrollTop > 101 ||
        document.body.scrollTop > 101
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it -- need use useEffect()
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  const handleSignout = () => {
    window.location="http://localhost:3000/login"
    dispatch(unsetInfoUser())
  }

  return (
    <header ref={headerRef} className="header">
      <div className="header__image"></div>
      <div className="header__navbar">
        <nav className="header__list container">
          {headerContent.map((items, index) => (
            <div className="dropdown">
              {items.length < 2 ? (
                <Link
                  to={items[0].path}
                  className={active === index ? "dropbtn active" : "dropbtn"}
                >
                  {items[0].display}
                </Link>
              ) : (
                <>
                  <button
                    className={active === index ? "dropbtn active" : "dropbtn"}
                  >
                    {items[0].display}
                  </button>
                  <div className="dropdown-content">
                    {items.map((item, index) => (
                      <Link to={item.path}>{item.display}</Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* <ul className=''>
                        {
                            headerNav.map(items => (
                                items.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} className={active === index ? 'active' : ''}>
                                            {item.display}
                                        </Link>
                                    </li>
                                ))

                            ))
                        }

                    </ul> */}
          <SearchBar />
          <div className="header__user">
            {/* handle show user info */}

            {accessToken?(
              <>
                  {/* Xin chào, Quốc
                  <i className="fa-solid fa-user"></i> */}
                  <Button onClick={handleSignout} name={'Đăng xuất'} />
              </>
            ) : (
              <Link  to={"/login"}>Đăng nhập</Link>
            )} 
              
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
