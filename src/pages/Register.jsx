import { useState } from "react";
import { auth } from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
// import { CookiesProvider, useCookies } from "react-cookie";

export default function Register({
  cookies,
  setCookie,
  useremail,
  password,
  handleSubmit,
  setUseremail,
  setPassword,
}) {
  console.log(cookies);
  // if (cookies.useremail) {
  //   signInWithEmailAndPassword(auth, useremail, password).then(
  //     (userCredential) => {
  //       // Signed up
  //       const user = userCredential.user;
  //       if (user.emailVerified) handleSubmit();
  //       else {
  //         sendEmailVerification(user);
  //         alert("Email sent");
  //       }
  //     }
  //   );
  // }
  const [username, setUsername] = useState(null);
  console.log(auth);
  const Navigate = useNavigate();
  const createUser = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, useremail, password)
      .then((userCredential) => {
        // send verification mail.
        sendEmailVerification(userCredential.user);
        // signOut();
        alert("Email sent");
        Navigate("/");
      })
      .catch(alert);
  };

  return (
    <div className="flex min-h-ful h-screen flex-1 bg-gradient-to-br from-black to-[#121286] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://i.postimg.cc/1tKW8pXV/logo.png"
          alt="logo"
        />
        <h2 className="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight ">
          Create an account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={createUser} method="POST">
          <div>
            {/* <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 "
            >
              Name
            </label> */}
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                // value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="name"
                required
                placeholder="User Name"
                className="w-full bg-transparent  py-1.5 text-white shadow-sm p-2 bg-slate-200 rounded-xl focus:outline-0 placeholder: sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            {/* <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Email address
            </label> */}
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                // value={useremail || ""}
                onChange={(e) => setUseremail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Email"
                className="w-full bg-transparent  py-1.5 text-white shadow-sm p-2 bg-slate-200 rounded-xl focus:outline-0 placeholder: sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 "
              >
                Password
              </label> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                // value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Password"
                className="w-full bg-transparent  py-1.5 text-white shadow-sm p-2 bg-slate-200 rounded-xl focus:outline-0 placeholder: sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md text-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 bg-yellow-400 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-white">
          Already have an account?{" "}
          <Link
            to={"/"}
            className="font-semibold leading-6 text-yellow-400 hover:text-yellow-600"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
