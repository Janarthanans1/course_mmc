"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const loginForm = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    setLoading(true); // Set loading to true while form is being processed

    try {
      const response = await axios.post("api/login", {
        email,
        password,
      });

      // Handle error messages from the server
      if (response.data.message === "User not exist") {
        setError("User does not exist. Please register first.");
      } else if (response.data.message === "Invalid Password") {
        setError("Incorrect password. Please try again.");
      } else if (response.data.status === 200) {
        router.push("/project"); // Redirect user after successful login
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back!
        </h1>
        <form onSubmit={loginForm} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Registration Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need an account?{" "}
              <Link className="text-blue-600 font-medium" href="/register">
                Register
              </Link>
            </p>
          </div>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
