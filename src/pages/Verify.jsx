import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, Navigate } from "react-router-dom";
export default function Verify({
  cookies,
  setCookie,
  password,
  useremail,
  handleSubmit,
}) {
  console.log(cookies);
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Verify your email
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <button
              type="submit"
              onClick={() => {
                sendEmailVerification(auth.currentUser)
                  .then(() => {
                    alert("Email Sent");
                    Navigate("/");
                  })
                  .catch(alert);
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {useremail} Verify
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Wrong email?{" "}
          <Link
            to={"/"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign with another account
          </Link>
        </p>
      </div>
    </div>
  );
}
