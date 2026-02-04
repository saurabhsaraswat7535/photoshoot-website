import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

function Gallery() {
  const defaultImages = [
    "https://images.pexels.com/photos/1191492/pexels-photo-1191492.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const [images, setImages] = useState(defaultImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "gallery_images"));

    const unsub = onSnapshot(q, (snap) => {
      const fetchedImages = snap.docs
        .map(doc => {
          const data = doc.data();
          const firestoreTime = data.timestamp || data.createdAt;
          const time = firestoreTime?.toDate ? firestoreTime.toDate() : new Date(0);

          return {
            url: data.url,
            time: time
          };
        })
        .filter(img => img.url)
        .sort((a, b) => b.time - a.time)
        .map(img => img.url);

      setImages([...fetchedImages, ...defaultImages]);
      setLoading(false);
    }, (error) => {
      console.error("Gallery Sync Error:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 uppercase tracking-widest animate-fade-in-up">Captured Moments</h1>

        {loading && <p className="text-center text-gray-500 mb-8">Loading Gallery...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <div key={index} className="relative overflow-hidden shadow-lg cursor-pointer group animate-fade-in-up rounded-sm" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="aspect-[4/5] md:aspect-[3/4] w-full bg-gray-200">
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
