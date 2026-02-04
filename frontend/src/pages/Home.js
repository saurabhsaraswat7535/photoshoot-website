import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

function Home() {
  console.log("Home: Component initialized - Version 1.2.1");
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    type: [],
    budget: "200,000"
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    // Listen to bookings to check connection - just metadata
    const unsub = onSnapshot(collection(db, "bookings"), () => {
      console.log("Home: Connection Verified via real-time listener");
    }, (err) => {
      console.error("Home: Connection error", err);
      setStatus({ type: "error", message: "Database connection failed. Please try again later." });
    });
    return () => unsub();
  }, []);

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedTypes = checked
        ? [...bookingData.type, value]
        : bookingData.type.filter(t => t !== value);
      setBookingData({ ...bookingData, type: updatedTypes });
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    console.log("Home: handleBookingSubmit triggered", bookingData);
    setIsSubmitting(true);
    setStatus({ type: "info", message: "Connecting to database..." });

    try {
      const dataToSave = {
        ...bookingData,
        timestamp: serverTimestamp()
      };

      console.log("Home: Attempting Firestore write with 15s timeout...");

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out (15s). Please check your internet connection or Firebase permissions.")), 15000)
      );

      const savePromise = addDoc(collection(db, "bookings"), dataToSave);
      const docRef = await Promise.race([savePromise, timeoutPromise]);

      console.log("Home: Successfully saved with ID:", docRef.id);
      setStatus({ type: "success", message: "Booking Request Sent Successfully!" });
      window.alert("Booking Request Sent Successfully!");
      setBookingData({ name: "", email: "", phone: "", date: "", type: [], budget: "200,000" });
    } catch (error) {
      console.error("Home: Submission error:", error);
      setStatus({ type: "error", message: error.message });
      window.alert("Failed to send booking: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={bookingData.name}
                  onChange={handleBookingChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email <span style={{ color: '#ef4444' }}>*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={bookingData.email}
                  onChange={handleBookingChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={handleBookingChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Event <span style={{ color: '#ef4444' }}>*</span></label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleBookingChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Type of Event</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" name="type" value="Wedding" onChange={handleBookingChange} checked={bookingData.type.includes("Wedding")} /> <span>Wedding Photography</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" name="type" value="Haldi/Mahendi" onChange={handleBookingChange} checked={bookingData.type.includes("Haldi/Mahendi")} /> <span>Haldi and Mahendi</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" name="type" value="Pre-Wedding" onChange={handleBookingChange} checked={bookingData.type.includes("Pre-Wedding")} /> <span>Pre-Wedding</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" name="type" value="Baby" onChange={handleBookingChange} checked={bookingData.type.includes("Baby")} /> <span>Baby Photoshoot</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Budget</label>
                <select name="budget" value={bookingData.budget} onChange={handleBookingChange} className="form-select">
                  <option value="200,000">200,000</option>
                  <option value="300,000">300,000</option>
                  <option value="500,000">500,000</option>
                  <option value="1,000,000+">1,000,000+</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f9fafb', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.25rem' }}>
                <input type="checkbox" style={{ width: '1.25rem', height: '1.25rem' }} />
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>I'm not a robot</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#9ca3af' }}>reCAPTCHA</span>
              </div>

              {status.message && (
                <div className={`p-3 mb-4 rounded text-xs font-bold ${status.type === "error" ? "bg-red-100 text-red-700" :
                  status.type === "success" ? "bg-green-100 text-green-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? "Sending Request..." : "Send Request"}
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
