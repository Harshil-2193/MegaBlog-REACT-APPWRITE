import React from "react";
import { Logo, Container, Logoutbtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Post", slug: "/all-post", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-4 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-indigo-100 transition duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
