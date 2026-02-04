function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-extrabold text-black">
        Capture Your Moments
      </h1>

      <p className="mt-6 text-gray-600 text-xl">
        Wedding • Events • Pre-Wedding • Baby Shoot
      </p>

      <button className="mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
        Book Now
      </button>
    </div>
  );
}

export default Home;
