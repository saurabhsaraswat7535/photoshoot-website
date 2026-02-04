const images = [
  "https://images.pexels.com/photos/1191492/pexels-photo-1191492.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
];

function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 uppercase tracking-widest animate-fade-in-up">Captured Moments</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden shadow-lg cursor-pointer group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-80 object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
