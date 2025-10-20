import React from "react";
import finup_bg from "../assets/finup_bg.png";
import finup_logo from "../assets/finup_logo.jpg";
import logo from "../assets/logo.png";

const Login: React.FC = () => {
  return (
    <div className="h-screen flex bg-gray-900 md:p-10 p-4">
        {/* Left Panel */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center p-12 bg-gradient-to-b from-gray-800 via-gray-900 to-black bg-blend-overlay bg-cover bg-center text-white rounded-2xl"
        style={{ backgroundImage: `url(${finup_bg})` }}
      >
        <div className="max-w-xs text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105">
            <img src={finup_logo} className="rounded-full" alt="logo"/>
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
                <img src={logo} className="rounded-full" alt="logo"/>
              </div>
              <h1 className="text-xl font-semibold text-gray-100">
                Sign in to finUp
              </h1>
            </div>
            <p className="text-sm text-gray-400">
              Use your account or continue with OAuth login.
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3 mb-4">
            <a
              type="button"
              href="/dashboard"
              className="w-full flex items-center justify-center gap-3 py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm hover:brightness-95 transition transform hover:-translate-y-0.5"
            >
              <i className="fa fa-google" aria-hidden="true"></i>
              Continue with Google
            </a>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-800" />
            <span className="mx-3 text-xs text-gray-500">or</span>
            <hr className="flex-1 border-gray-800" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="text-xs text-gray-400">Email</span>
              <input
                type="email"
                required
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Password</span>
              </div>
              <input
                type="password"
                required
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
            <br />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
