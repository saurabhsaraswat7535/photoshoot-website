import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change state when scrolled 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar class based on state
  // If Home and NOT scrolled -> transparent
  // Otherwise -> white background (scrolled)
  const navClass = `navbar ${isHome && !isScrolled ? "transparent" : "scrolled"}`;

  // Logo Style: Invert brightness (make white) if transparent, otherwise default
  const logoStyle = {
    height: '2.5rem',
    transition: 'all 0.3s',
    filter: isHome && !isScrolled ? 'brightness(0) invert(1)' : 'none'
  };

  // Text Style
  const textStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginLeft: '12px',
    fontFamily: 'serif',
    textDecoration: 'none',
    color: 'inherit'
  };

  return (
    <nav className={navClass}>
      <div className="navbar-content">
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            {/* <img src="/logo.svg" alt="Dipak Studios" style={logoStyle} /> */}
          </Link>
          <Link to="/" style={textStyle}>
            Satendra Photography
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/">Destination</Link>
          <Link to="/gallery">Wedding</Link>
          <Link to="/wedding-films">Wedding Films</Link>
          <Link to="/celebrity">Celebrity</Link>
          <Link to="/packages">Kids</Link>
          <Link to="/pre-wedding">Pre Wedding</Link>
          <Link to="/contact" className="connect-btn">Connect</Link>

          {/* ADMIN BUTTON */}
          <Link
            to="/login"
            style={{
              marginLeft: "20px",
              padding: "6px 12px",
              border: "1px solid #eab308",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
