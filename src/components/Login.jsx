import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const ADMIN_EMAIL = import.meta.env.VITE_USER_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
  //   console.log("Admin Credentials:", ADMIN_EMAIL, ADMIN_PASSWORD);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      formData.email === ADMIN_EMAIL &&
      formData.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminToken", "loggedin");
      navigate("/admin");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back 👋</h2>
          <p className="text-slate-300 mt-2 text-sm">
            Login to access Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
