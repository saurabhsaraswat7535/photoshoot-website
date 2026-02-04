function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-10 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">

        {/* Info Section */}
        <div className="md:w-1/3 bg-black text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="mb-6 text-gray-300">We'd love to hear from you. Fill out the form or reach us directly.</p>

          <div className="space-y-4">
            <p>📍 Swarn Jayanti Nagar, Aligarh</p>
            <p>📞 9810175575</p>
            <p>✉️ info@rajeshdigital.com</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
          <form className="space-y-4">
            <div>
              <input type="text" placeholder="Your Name" className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors" />
            </div>
            <div>
              <input type="email" placeholder="Your Email" className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors" />
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors" />
            </div>
            <div>
              <textarea placeholder="Tell us about your event..." rows="4" className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors"></textarea>
            </div>
            <button type="submit" className="bg-yellow-400 text-white px-8 py-3 font-bold hover:bg-yellow-500 transition duration-300 mt-4 rounded">
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
