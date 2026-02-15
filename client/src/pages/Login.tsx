import React, { useEffect, useState } from "react";
import finup_bg from "../assets/finup_bg.png";
import finup_logo from "../assets/finup_logo.jpg";
import logo from "../assets/logo.png";
import { useAppDispatch } from "../hooks/reduxHooks";
import { warn } from "../redux/modalSlice";
import { login, signup } from "../api/userAPIs";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !password) {
      dispatch(warn("Email and password cannot be empty"));
      return;
    }

    if (!emailRegex.test(username)) {
      dispatch(warn("Please enter a valid email address"));
      return;
    }

    if (password.length <= 6) {
      dispatch(warn("Password must be more than 6 characters"));
      return;
    }

    if (isLogin) {
      login(username, password, dispatch);
    } else {
      signup(username, password, dispatch);
    }
  };

  useEffect(() => {
    dispatch(warn("The backend is not connect, just click on 'Continue with Google' to proceed & review"));
  }, [])

  return (
    <div className="h-screen flex bg-gray-900 md:p-10 p-4">
      {/* Left Panel */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center p-12 bg-gradient-to-b from-gray-800 via-gray-900 to-black bg-blend-overlay bg-cover bg-center text-white rounded-2xl"
        style={{ backgroundImage: `url(${finup_bg})` }}
      >
        <div className="max-w-xs text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105">
            <img src={finup_logo} className="rounded-full" alt="logo" />
          </div>

          <h2 className="text-2xl font-semibold mb-2">finUp</h2>
          <p className="text-gray-300">
            Keep track of finances, money inflow-outflow and visulazise
            historic data.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900/95 border border-gray-800 rounded-xl shadow-xl p-8">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white mr-3">
                <img src={logo} className="rounded-full" alt="logo" />
              </div>
              <h1 className="text-xl font-semibold text-gray-100">
                Sign in to finUp
              </h1>
            </div>
            <p className="text-sm text-gray-400">
              Use your account or continue with OAuth login.
            </p>
          </div>

          <div className="space-y-4">
            {/* Login Accordion */}
            <div className="border-b border-gray-800 pb-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-full flex justify-between items-center py-2 text-sm font-medium transition-colors ${isLogin ? "text-indigo-500" : "text-gray-500 hover:text-gray-300"}`}
              >
                <span>LOGIN</span>
                <i className={`fa fa-chevron-down transition-transform duration-300 ${isLogin ? "rotate-0" : "-rotate-180 text-gray-700"}`}></i>
              </button>

              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                <form className="space-y-4 pb-4" onSubmit={submitHandler}>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <div className="relative">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                  <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-500 transition">
                    Sign In
                  </button>
                </form>
              </div>
            </div>

            {/* Signup Accordion */}
            <div className="border-b border-gray-800 pb-2">
              <button
                onClick={() => setIsLogin(false)}
                className={`w-full flex justify-between items-center py-2 text-sm font-medium transition-colors ${!isLogin ? "text-purple-500" : "text-gray-500 hover:text-gray-300"}`}
              >
                <span>CREATE ACCOUNT</span>
                <i className={`fa fa-chevron-down transition-transform duration-300 ${!isLogin ? "rotate-0" : "-rotate-180 text-gray-700"}`}></i>
              </button>

              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${!isLogin ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                <form className="space-y-4 pb-4" onSubmit={submitHandler}>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  />
                  <div className="relative">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                  <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-500 transition">
                    Get Started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
