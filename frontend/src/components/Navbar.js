import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Satendra Photography</h1>

      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/gallery" className="hover:text-yellow-400">Gallery</Link>
        <Link to="/packages" className="hover:text-yellow-400">Packages</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
