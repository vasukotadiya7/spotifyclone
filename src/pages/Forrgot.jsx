import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
export default function Forrgot({
  cookies,
  setCookie,
  password,
  useremail,
  handleSubmit,
  setUseremail,
  setPassword,
}) {
  const Navigate = useNavigate();
  const resetLink = async () => {
    // event.preventDefault();

    sendPasswordResetEmail(auth, useremail)
      .then(() => {
        // Password reset email sent!
        // ..
        // window.location.assign("http://localhost:3000");
        alert("Email sent");
        Navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  };
  console.log(cookies);
  return (
    <div className="flex min-h-full h-screen bg-gradient-to-br from-black to-[#121286] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://i.postimg.cc/1tKW8pXV/logo.png"
          alt="logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Forgot your password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            {/* <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label> */}
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Email"
                className="w-full bg-transparent  py-1.5 text-white shadow-sm p-2 bg-slate-200 rounded-xl focus:outline-0 placeholder: sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={resetLink}
              className="flex w-full justify-center rounded-md text-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 bg-yellow-400 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Send Reset Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
