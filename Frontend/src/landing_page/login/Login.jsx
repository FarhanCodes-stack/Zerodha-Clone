import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      if (res.status === 200 && res.data.token) {
        window.location.href = `http://localhost:3001?token=${res.data.token}`;
      }
    } catch (err) {
      const backendMsg = err.response?.data?.error;
      setApiError(backendMsg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* HEADER */}
        <div className="login-header">
          <h2>Login</h2>
          <p>Welcome back to Zerodha</p>
        </div>

        {/* FORM */}
        <div className="login-body">
          {apiError && <div className="login-error-banner">{apiError}</div>}
          {success && <div className="login-success-banner">{success}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="login-form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <p className="login-field-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="login-form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <p className="login-field-error">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
