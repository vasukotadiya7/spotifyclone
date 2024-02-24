import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
export default function Verify({
  cookies,
  setCookie,
  password,
  useremail,
  handleSubmit,
}) {
  const Navigate = useNavigate();
  console.log(cookies);
  const verification = async () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Email Sent");
        Navigate("/");
      })
      .catch(alert);
  };

  // if (cookies.useremail) {
  //   signInWithEmailAndPassword(auth, cookies.useremail, cookies.password)
  //     .then((userCredential) => {
  //       // Signed up
  //       const user = userCredential.user;
  //       if (user.emailVerified) {
  //         setCookie("valid", true, { path: "/", maxAge: 604800 });
  //       }
  //       // else {
  //       //   sendEmailVerification(user);
  //       //   alert("Email sent");
  //       // }
  //     })
  //     .catch(alert);
  // }
  return (
    <div className="flex h-screen flex-1 flex-col bg-gradient-to-br from-black to-[#121286] justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://i.postimg.cc/1tKW8pXV/logo.png"
          alt="logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Verify your email
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <button
              type="submit"
              onClick={verification}
              className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-base font-semibold leading-6 text-indigo-500 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              {useremail} Verify
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-white">
          Wrong email?{" "}
          <Link
            to={"/"}
            className="font-semibold leading-6 text-yellow-400 hover:text-yellow-600"
          >
            Sign with another account
          </Link>
        </p>
      </div>
    </div>
  );
}
