function Contact() {
  return (
    <div className="p-10">
      <input placeholder="Name" className="border p-2 block mb-3" />
      <input placeholder="Phone" className="border p-2 block mb-3" />
      <button className="bg-black text-white px-4 py-2">
        Submit
      </button>
    </div>
  );
}

export default Contact;
