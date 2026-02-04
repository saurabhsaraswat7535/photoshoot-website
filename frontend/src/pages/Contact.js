import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

function Contact() {
  console.log("Contact: Component initialized - Version 1.1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Contact: Submission initiated", formData);
    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        timestamp: serverTimestamp()
      };

      console.log("Contact: Attempting Firestore write to 'contacts' collection...");
      const docRef = await addDoc(collection(db, "contacts"), dataToSave);
      console.log("Contact: Message saved successfully with ID:", docRef.id);

      window.alert("Message Sent Successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Contact: Submission error: ", error);
      window.alert("Error sending message: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-10 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">

        {/* Info Section */}
        <div className="md:w-1/3 bg-black text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="mb-6 text-gray-300">We'd love to hear from you. Fill out the form or reach us directly.</p>

          <div className="space-y-4">
            <p>📍 Swarn Jayanti Nagar, Aligarh</p>
            <p>📞 7535963292</p>
            <p>✉️ info@rajeshdigital.com</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell us about your event..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-white px-8 py-3 font-bold hover:bg-yellow-500 transition duration-300 mt-4 rounded disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
