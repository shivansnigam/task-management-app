// Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      console.log(res.data);
      alert("Registered successfully!"); 
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed"); 
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row g-0" style={{ height: "100vh" }}>
        {/* Left Side */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <h1 className="fw-bold mb-3">Welcome to Task Manager</h1>
          <p className="lead text-center px-5">
            Manage your tasks, collaborate with your team, and stay productive with role-based access.
          </p>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="w-100 px-4" style={{ maxWidth: "420px" }}>
            <h2 className="fw-bold text-center mb-4 text-primary">Create Account</h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Select Role</label>
                <select
                  className="form-select"
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                Register
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Already have an account?{" "}
              <a href="/login" className="fw-semibold text-decoration-none text-primary">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
