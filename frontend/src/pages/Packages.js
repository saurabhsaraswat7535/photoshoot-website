import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default packages to show if DB is empty
  const defaultPackages = [
    {
      name: "Silver",
      price: "₹50,000",
      features: ["Pre-Wedding Shoot", "2 Photographers", "1 Videographer", "50 Page Album"],
      popular: false
    },
    {
      name: "Gold",
      price: "₹1,00,000",
      features: ["Candid Photography", "Drone Coverage", "Traditional Video", "200 Page Premium Album", "Teaser & Highlight Reel"],
      popular: true
    },
    {
      name: "Platinum",
      price: "₹2,00,000+",
      features: ["Complete Wedding Coverage", "Cinema Style Film", "Multiple Drone Angles", "SDE (Same Day Edit)", "Luxury Albums"],
      popular: false
    }
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "packages"));
        if (!querySnapshot.empty) {
          setPackages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setPackages(defaultPackages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        setPackages(defaultPackages);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-28 pb-10 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12 uppercase tracking-widest animate-fade-in-up">Our Packages</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`border ${pkg.popular ? 'border-yellow-500 shadow-2xl relative transform md:-translate-y-4' : 'border-gray-200 shadow-xl hover:shadow-2xl'} p-8 transition duration-300 animate-fade-in-up animation-delay-${(index + 1) * 200}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-white px-4 py-1 text-sm font-bold uppercase tracking-wider">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
              <p className="text-4xl font-light mb-6">{pkg.price}</p>
              <ul className="text-left space-y-3 mb-8 text-gray-600">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <button className={`w-full py-3 font-bold transition ${pkg.popular ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'bg-black text-white hover:bg-gray-800'}`}>
                CHOOSE PLAN
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Packages;
