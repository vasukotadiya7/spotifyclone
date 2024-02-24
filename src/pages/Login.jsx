import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
export default function Login({
  cookies,
  setCookie,
  password,
  useremail,
  handleSubmit,
  setUseremail,
  setPassword,
  setUser,
}) {
  const Navigate = useNavigate();
  const Signin = async () => {
    await signInWithEmailAndPassword(auth, useremail, password)
      .then((userCredential) => {
        // Signed up
        console.log(auth);
        const user = userCredential.user;
        console.log(user);
        // alert("Login Successfull");
        // setUser(userCredential);
        // setCookie("valid", true, { path: "/", maxAge: 604800 });
        // setCookie("useremail", useremail, { path: "/", maxAge: 604800 });
        // setCookie("password", password, { path: "/", maxAge: 604800 });
        if (user.emailVerified) {
          setUser(userCredential);
          setCookie("useremail", useremail, { path: "/", maxAge: 604800 });
          setCookie("valid", true, { path: "/", maxAge: 604800 });
          setCookie("password", password, { path: "/", maxAge: 604800 });
          // Navigate("/");
        } else {
          Navigate("/verify");
          alert("Please verify your email first");
        }
      })
      .catch(alert);
  };
  const provider = new GoogleAuthProvider();
  const SigninG = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        setCookie("useremail", user.email, { path: "/", maxAge: 604800 });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  console.log(cookies);
  return (
    <div className="flex h-screen flex-1 flex-col bg-gradient-to-br from-black to-[#121286] justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://i.postimg.cc/1tKW8pXV/logo.png"
          alt="logo"
        />
        <h2 className="mt-10 text-center text-2xl text-white font-bold leading-9 tracking-tight ">
          Login into your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <form className="space-y-6" action="" onSubmit={Signin}> */}
        <div className="space-y-6">
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
                className=" w-full bg-transparent  py-1.5 text-white shadow-sm p-2 bg-slate-200 rounded-xl focus:outline-0 placeholder: sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-end ">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 "
              >
                Password
              </label> */}
              <div className="text-sm text-gray-300">
                <Link
                  to={"/forrgot"}
                  className="font-semibold text-yellow-400 hover:text-yellow-600"
                >
                  Forgot password?
                </Link>
              </div>
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
                className="w-full bg-transparent py-1.5 p-2 text-white bg-slate-200 rounded-xl focus:outline-0 shadow-sm sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={Signin}
              className="flex w-full bg-yellow-400 justify-center text-base text-indigo-600 rounded-md px-3 py-1.5 font-semibold leading-6 shadow-sm hover: focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
            <br />
            <h4 className="text-center text-white">OR</h4>
            <br />
            <button
              type="submit"
              onClick={SigninG}
              className="flex w-full bg-yellow-400 justify-center text-base text-indigo-600  rounded-md px-3 py-1.5 font-semibold leading-6 shadow-sm hover: focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login with Google
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-white text-sm ">
          Not have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold leading-6 text-yellow-400 hover:text-yellow-600"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
