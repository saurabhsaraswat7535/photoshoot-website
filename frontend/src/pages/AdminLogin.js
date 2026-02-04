import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Success");
            navigate("/admin");
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center appzia-bg font-sans pt-24 pb-12">
            <div className="appzia-card p-12 w-full max-w-[450px] animate-fade-in-up">

                {/* BRANDING */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">🏛️</span>
                        <span className="text-white text-3xl font-bold tracking-tight">satendra</span>
                    </div>
                    <h3 className="text-[#aebfd4] text-sm font-bold tracking-widest uppercase">Sign In</h3>
                </div>

                <form onSubmit={login} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Username"
                            className="w-full appzia-input py-3 px-4 outline-none focus:ring-1 focus:ring-[#00b1cc]/50 transition-all font-medium text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full appzia-input py-3 px-4 outline-none focus:ring-1 focus:ring-[#00b1cc]/50 transition-all font-medium text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2 py-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 accent-[#00b1cc] cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-[#8c98a5] text-xs font-bold cursor-pointer select-none tracking-wide">
                            Remember me
                        </label>
                    </div>

                    <button className="w-full appzia-btn text-white font-black py-3.5 px-4 shadow-lg shadow-black/10 transition-all text-sm uppercase tracking-widest mt-6">
                        Log In
                    </button>
                </form>

                <div className="mt-10 flex justify-between items-center px-1">
                    <a href="#" className="appzia-link flex items-center gap-2">
                        <span>🔒</span> Forgot your password?
                    </a>
                    <a href="#" className="appzia-link font-bold">
                        Create an account
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
