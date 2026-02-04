import { useState } from 'react';

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Contact Popup */}
      {showPopup && (
        <div className="modal-overlay" onClick={togglePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={togglePopup}>&times;</button>

            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#eab308', marginBottom: '0.5rem' }}>Satendra Photography</h2>
              <p style={{ letterSpacing: '0.05em', color: '#4b5563' }}>Capture Your Best Moments</p>
            </div>

            <div style={{ textAlign: 'left', lineHeight: '1.8', fontSize: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📞</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#9ca3af' }}>Phone</strong>
                  <span>+91 7535963292</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>✉️</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#9ca3af' }}>Email</strong>
                  <span>info@rajeshdigital.com</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📍</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#9ca3af' }}>Address</strong>
                  <span>Swarn Jayanti Nagar, Aligarh,<br />Uttar Pradesh 202001</span>
                </div>
              </div>
            </div>

            <button onClick={togglePopup} style={{ marginTop: '2rem', background: '#eab308', color: 'white', padding: '0.8rem 2rem', fontWeight: 'bold', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', width: '100%' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="full-screen-section">
        {/* Background Image - Photography Theme */}
        <div className="bg-cover-img" style={{
          backgroundImage: "url('https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
        }}></div>

        {/* Dark Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)' }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white', padding: '0 1rem' }}>
          <h1 className="animate-fade-in-up" style={{ fontSize: '3.5rem', fontWeight: 800, textShadow: '0 4px 6px rgba(0,0,0,0.3)', marginBottom: '2rem' }}>
            Make A Wonderful Story <br /> For Your Wedding
          </h1>

          <button onClick={togglePopup} className="animate-fade-in-up animation-delay-200" style={{ background: 'white', color: 'black', padding: '1rem 2.5rem', fontSize: '1.125rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}>
            CONTACT US
          </button>
        </div>
      </div>

      {/* Book Now Section */}
      <div className="full-screen-section bg-cover-img" style={{ backgroundImage: "url('https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
        {/* Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', color: 'white' }}>

          {/* Left Column: Text Info */}
          <div className="animate-fade-in-up animation-delay-400">
            <h2 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Book Now</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', opacity: 0.9 }}>
              If you have planned your wedding this year, BOOK US to get clicked by our famous wedding photographer's team. CALL NOW to get a cost-effective estimate pricing.
            </p>

            <div style={{ marginTop: '2rem', fontSize: '1.125rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span>
                <p>Address: Swarn Jayanti Nagar, Aligarh, uttar pradesh 202001</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📞</span>
                <p>7535963292</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>✉️</span>
                <p>info@rajeshdigital.com</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form animate-fade-in-up animation-delay-600">
            <form>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" placeholder="Name" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Email <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="email" placeholder="Email" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="tel" placeholder="Phone Number" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Event <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="date" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Type of Event</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" /> <span>Wedding Photography</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" /> <span>Haldi and Mahendi</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" /> <span>Pre-Wedding</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" /> <span>Baby Photoshoot</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Budget</label>
                <select className="form-select">
                  <option>200,000</option>
                  <option>300,000</option>
                  <option>500,000</option>
                  <option>1,000,000+</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f9fafb', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.25rem' }}>
                <input type="checkbox" style={{ width: '1.25rem', height: '1.25rem' }} />
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>I'm not a robot</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#9ca3af' }}>reCAPTCHA</span>
              </div>

              <button type="button" className="btn-primary">
                Send
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Location Section */}
      <div className="full-screen-section" style={{ backgroundColor: '#111827', color: 'white' }}>
        <div className="container grid-responsive">

          {/* Left: Contact Details */}
          <div className="animate-fade-in-up">
            <div style={{ borderLeft: '4px solid #eab308', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#eab308', marginBottom: '0.5rem' }}>Satendra Photography</h2>
              <p style={{ letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>Wedding Photography</p>
            </div>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#eab308' }}>CONTACT DETAILS</strong>
                Satendra Singh: Only by appointment<br />
                <strong>Phone:</strong> +91 7535963292<br />
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>(For Any Kind of Online Enquiry)</span>
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong>E-Mail:</strong> info@rajeshdigital.com
              </p>
              <p>
                <strong>Address:</strong><br />
                Swarn Jayanti Nagar, Aligarh,<br />
                Uttar Pradesh 202001
              </p>
            </div>
          </div>

          {/* Right: Map */}
          <div className="map-container animate-fade-in-up animation-delay-200">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.0!2d78.0!3d27.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDU0JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;
