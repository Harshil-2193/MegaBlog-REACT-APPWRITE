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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <Container>
        <nav className="flex items-center justify-between py-3 px-4 md:px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex items-center gap-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white font-medium hover:text-indigo-300 hover:underline hover:underline-offset-4 transition"
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
