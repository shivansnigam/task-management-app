import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row g-0" style={{ height: "100vh" }}>
        
        {}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{ background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }}>
          <h1 className="fw-bold mb-3">Welcome Back</h1>
          <p className="lead text-center px-5">
            Log in to continue managing your projects, tasks, and team.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="w-100 px-4" style={{ maxWidth: "400px" }}>
            <h2 className="fw-bold text-center mb-4 text-success">Login</h2>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                Login
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Don’t have an account?{" "}
              <a href="/register" className="fw-semibold text-decoration-none text-success">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
