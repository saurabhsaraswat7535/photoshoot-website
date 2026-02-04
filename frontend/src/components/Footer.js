import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section snap-start">
      {/* Top Arrow */}
      <div className="footer-top-btn" onClick={scrollToTop}>
        <span className="arrow-up">▲</span>
        <span className="top-text">TOP</span>
      </div>

      <div className="container footer-grid">
        {/* Column 1: Branches */}
        <div className="footer-col">
          <div className="footer-logo-area">
            <img src="/logo.svg" alt="Dipak Studios" className="footer-logo" />
            <h2 className="footer-heading">Branches</h2>
          </div>

          <div className="branch-item">
            <h3>Delhi Office At Lajpat Nagar</h3>
            <p>Flagship Delhi Wedding Store</p>
            <p>B 14, main road , Near Lajpat Metro Station,</p>
            <p>Lajpat Nagar - 2, New Delhi,</p>
            <p>8527774260</p>
          </div>

          <div className="branch-item">
            <h3>Head Office Neelam Chowk Faridabad</h3>
            <p>Faridabad Store</p>
            <p>5R/8, N.I.T., Neelam Chowk, Faridabad</p>
            <p>Ph: 8527733131</p>
          </div>

          <div className="branch-item">
            <h3>Gurgaon Office At Golf Course Road</h3>
            <p>Gurugram Store</p>
            <p>Plot No 1, First Floor , Sector 42 , Above SBJ Gurgaon</p>
            <p>Ph: 9958554760</p>
          </div>
        </div>

        {/* Column 2: Links */}
        <div className="footer-col">
          <h2 className="footer-heading">Links</h2>
          <ul className="footer-links">
            <li><Link to="/">DESTINATION</Link></li>
            <li><Link to="/gallery">WEDDING</Link></li>
            <li><Link to="/wedding-films">WEDDING FILMS</Link></li>
            <li><Link to="/celebrity">CELEBRITY</Link></li>
            <li><Link to="/packages">KIDS</Link></li>
            <li><Link to="/pre-wedding">PRE WEDDING</Link></li>
            <li><Link to="/contact">CONTACT US</Link></li>
            <li><Link to="/admin">ADMIN</Link></li>
          </ul>
        </div>

        {/* Column 3: Get Social */}
        <div className="footer-col">
          <h2 className="footer-heading">Get Social</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">Instagram</a>
          </div>

          <div className="footer-bottom-links">
            <a href="#">Sitemap</a> | <a href="#">XML</a> | <a href="#">HTML</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
