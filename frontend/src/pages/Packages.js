function Packages() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-10 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12 uppercase tracking-widest animate-fade-in-up">Our Packages</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Standard Plan */}
          <div className="border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition duration-300 animate-fade-in-up animation-delay-200">
            <h3 className="text-2xl font-bold mb-4">Silver</h3>
            <p className="text-4xl font-light mb-6">₹50,000</p>
            <ul className="text-left space-y-3 mb-8 text-gray-600">
              <li>✓ Pre-Wedding Shoot</li>
              <li>✓ 2 Photographers</li>
              <li>✓ 1 Videographer</li>
              <li>✓ 50 Page Album</li>
            </ul>
            <button className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 transition">CHOOSE PLAN</button>
          </div>

          {/* Premium Plan */}
          <div className="border border-yellow-500 p-8 shadow-2xl relative transform md:-translate-y-4 animate-fade-in-up animation-delay-400">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-white px-4 py-1 text-sm font-bold uppercase tracking-wider">Most Popular</div>
            <h3 className="text-2xl font-bold mb-4">Gold</h3>
            <p className="text-4xl font-light mb-6">₹1,00,000</p>
            <ul className="text-left space-y-3 mb-8 text-gray-600">
              <li>✓ Candid Photography</li>
              <li>✓ Drone Coverage</li>
              <li>✓ Traditional Video</li>
              <li>✓ 200 Page Premium Album</li>
              <li>✓ Teaser & Highlight Reel</li>
            </ul>
            <button className="w-full bg-yellow-400 text-white py-3 font-bold hover:bg-yellow-500 transition">CHOOSE PLAN</button>
          </div>

          {/* Exclusive Plan */}
          <div className="border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition duration-300 animate-fade-in-up animation-delay-600">
            <h3 className="text-2xl font-bold mb-4">Platinum</h3>
            <p className="text-4xl font-light mb-6">₹2,00,000+</p>
            <ul className="text-left space-y-3 mb-8 text-gray-600">
              <li>✓ Complete Wedding Coverage</li>
              <li>✓ Cinema Style Film</li>
              <li>✓ Multiple Drone Angles</li>
              <li>✓ SDE (Same Day Edit)</li>
              <li>✓ Luxury Albums</li>
            </ul>
            <button className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 transition">CHOOSE PLAN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Packages;
