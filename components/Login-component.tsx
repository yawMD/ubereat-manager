import { SetStateAction, useState } from "react";
import { authenticate, isAuth } from "../Helpers/auth";
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css'

import { toast, ToastContainer } from "react-toastify";


export default function LoginComponent() {


  const [username, setUsername] = useState("");
  const [showSeeker, setShowSeeker] = useState(false);
  const [showServer, setShowServer] = useState(false);
  const [showAgency, setShowAgency] = useState(false);
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState({ text: "Continue", sending: false });
  const router = useRouter();

  const [loggedIn, setloggedIn] = useState(false);
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (username && password) {
      const tld = toast.loading("Logging you in... Please wait");
      setBtn({ text: "Logging you in...", sending: false });

      // Using fetch to send a POST request to the server
      fetch('http://167.71.99.67:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("hereeeee", data);
        if (data.error) {
          toast.update(tld, {
            render: `Error: ${data.message}`,
            type: "error",
            isLoading: false,
          });
        } else {
          toast.update(tld, {
            render: `Login Successful`,
            type: "success",
            isLoading: false,
          });
          setBtn({ text: "Login Successful", sending: true });
          // Assume setloggedIn updates the state to reflect that the user is logged in
          setloggedIn(true);

          // Assuming authenticate function properly sets up the user session
          authenticate(data, () => {
            // Assuming isAuth checks if the user session is properly set
            let _d = isAuth();
            // props.checkAuth(true);
            console.log(_d);

            router.push('/manage'); // Redirect to dashboard or any desired path
          });
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        toast.update(tld, {
          render: `Error: Login failed due to ${error.message}`,
          type: "error",
          isLoading: false,
        });
      })
      .finally(() => {
        setBtn({ text: "Login", sending: false });
        setTimeout(() => {
          toast.dismiss(tld);
        }, 5000);
      });
    }
  };



  return (
    <div>
      <ToastContainer />
      <div className="bg-black p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="121"
          height="21"
          fill="none"
        >
          <path
            fill="#06C167"
            d="M63.5.3H77v3.3h-9.9v4.8h9.7v3.2H67v4.8h10v3.3H63.4V.3zM114 20c4.1 0 6.5-2 6.5-4.7 0-2-1.4-3.4-4.3-4l-3.1-.7c-1.8-.3-2.3-.6-2.3-1.3 0-.8.8-1.4 2.4-1.4 1.7 0 3 .5 3.3 2h3.6C120 7 117.8 5 113.4 5c-3.7 0-6.4 1.6-6.4 4.6 0 2 1.5 3.4 4.6 4l3.4.9c1.4.2 1.8.6 1.8 1.2 0 .9-1 1.4-2.7 1.4-2 0-3.3-.4-3.7-2h-3.7c.5 3 2.8 5 7.3 5zm-8.3-3.6H103c-.8 0-1.3-.3-1.3-1.1V8.6h4V5.4h-4v-4H98v4h-2.7v3.2H98v7.6c0 2 1.4 3.5 3.8 3.5h4v-3.3zm-12-11v14.3h-3.5v-1.3a7.5 7.5 0 110-11.7V5.4h3.6zm-3.5 7.1c0-2.4-1.9-4.3-4.3-4.3s-4.3 1.9-4.3 4.3a4.3 4.3 0 108.6 0z"
          ></path>
          <path
            fill="#FFF"
            d="M8 17.4c2.7 0 4.7-2 4.7-5.1V.3h3v19.4h-3v-1.8a7 7 0 01-5 2.1c-4.2 0-7.4-3-7.4-7.6V.4h3v11.9c0 3 2 5.1 4.7 5.1zm9.8 2.3h2.7v-1.8A7.3 7.3 0 0033 12.7c0-4.1-3.2-7.4-7.3-7.4a7 7 0 00-5 2v-7h-2.8v19.4zm7.6-2.2a4.9 4.9 0 01-4.9-4.9 4.9 4.9 0 119.7 0c0 2.8-2.2 5-4.8 5zm16-12.2a7.2 7.2 0 00-7.3 7.3c0 4.2 3.2 7.4 7.5 7.4 2.5 0 4.6-1.2 6-3l-2-1.5c-1 1.4-2.4 2-4 2a4.7 4.7 0 01-4.7-4h11.5v-.9c0-4.2-3-7.3-7-7.3zm-4.4 6a4.4 4.4 0 014.3-3.6c2 0 3.8 1.5 4.2 3.6H37zm20-3.2V5.5h-1c-1.5 0-2.6.7-3.3 1.8V5.6h-2.8v14h2.8v-8c0-2.1 1.3-3.5 3.1-3.5H57z"
          ></path>
        </svg>
      </div>
      <div className="justify-center w-9/12 md:w-4/12 lg:w-3/12 m-auto flex flex-col items-center">
        <div className="pt-10">
        <p className="text-xl">{"What's your phone number or email?"}</p>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" className="w-full my-2 p-3 bg-gray-200 rounded-lg outline-none" name="username" value={username}  onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" className="w-full my-2 p-3 bg-gray-200 rounded-lg outline-none" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" name="Continue" className="w-full my-2 p-3 bg-black text-white rounded-lg outline-none">Sign in</button>
        </form>
        <div className="flex items-center justify-between text-xs">
            <div className="p-[0.3px] w-5/12 bg-gray-200"></div>
            <p>or</p>
            <div className="w-5/12 p-[0.3px] bg-gray-200"></div>
        </div>

        <button type="submit" name="Continue" className="w-full my-2 p-3 bg-gray-200 text-black rounded-lg outline-none flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" className="cw cx mx-2" preserveAspectRatio="xMidYMid"><path d="M255.9 133.5c0-10.8-.9-18.6-2.8-26.7H130.6v48.4h71.9a63.8 63.8 0 01-26.7 42.4l-.2 1.6 38.7 30 2.7.3c24.7-22.8 38.9-56.3 38.9-96" fill="#4285F4"></path><path d="M130.6 261.1c35.2 0 64.8-11.6 86.4-31.6l-41.2-32c-11 7.8-25.8 13.1-45.2 13.1a78.6 78.6 0 01-74.3-54.2l-1.5.1-40.3 31.2-.6 1.5C35.4 231.8 79.5 261 130.6 261" fill="#34A853"></path><path d="M56.3 156.4a80.4 80.4 0 01-.2-51.7V103L15.3 71.3l-1.4.6a130.7 130.7 0 000 117.3l42.4-32.8" fill="#FBBC05"></path><path d="M130.6 50.5c24.5 0 41 10.6 50.4 19.4L218 34C195.2 13 165.8 0 130.6 0 79.5 0 35.4 29.3 13.9 72l42.2 32.7a79 79 0 0174.4-54.2" fill="#EB4335"></path></svg>
            Continue with Google
        </button>
        <button type="submit" name="Continue" className="w-full my-2 p-3 bg-gray-200 text-black rounded-lg outline-none flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="#000000" xmlns="http://www.w3.org/2000/svg" className="cw cx mx-2"><g transform="matrix( 1 0 0 1 3 1 )"><path fillRule="evenodd" clipRule="evenodd" d="M11.2676 3.23104C11.9166 2.39314 12.4087 1.20886 12.2307 0C11.1698 0.0737252 9.92984 0.752465 9.2063 1.63717C8.54675 2.43878 8.00468 3.63126 8.21639 4.78863C9.37613 4.8249 10.5731 4.12978 11.2676 3.23104ZM17 14.6022C16.5359 15.6367 16.3125 16.099 15.7146 17.0153C14.8806 18.2943 13.7046 19.887 12.2459 19.8987C10.9512 19.9128 10.6173 19.0503 8.85967 19.0608C7.10203 19.0702 6.73561 19.9151 5.4386 19.9022C3.98106 19.8894 2.86668 18.4523 2.03264 17.1732C-0.300809 13.5993 -0.546251 9.404 0.892672 7.17235C1.91632 5.58785 3.53089 4.66101 5.04775 4.66101C6.59136 4.66101 7.56267 5.51295 8.84106 5.51295C10.0811 5.51295 10.836 4.65867 12.6216 4.65867C13.9733 4.65867 15.4052 5.39944 16.4242 6.67734C13.0834 8.5193 13.6243 13.3185 17 14.6022Z" fill="#000000" opacity="1"></path></g></svg>
            Continue with Apple
        </button>
        <button type="submit" name="Continue" className="w-full my-2 p-3 bg-gray-200 text-black rounded-lg outline-none flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 266.9 266.9"><path fill="#3C5A99" d="M248 262.3c8 0 14.3-6.4 14.3-14.2V18.8c0-7.8-6.4-14.2-14.2-14.2H18.8C11 4.6 4.6 11 4.6 18.8v229.3c0 7.8 6.4 14.2 14.2 14.2h229.3z"></path><path fill="#FFF" d="M182.4 262.3v-99.8H216l5-38.9h-38.5V98.8c0-11.3 3.1-19 19.3-19h20.6V45c-3.6-.4-15.8-1.5-30-1.5-29.7 0-50 18.1-50 51.4v28.7h-33.6v38.9h33.5v99.8h40.2z"></path></svg>
            Continue with Facebook
        </button>

        <div className="flex items-center justify-between text-xs">
            <div className="p-[0.3px] w-5/12 bg-gray-200"></div>
            <p>or</p>
            <div className="w-5/12 p-[0.3px] bg-gray-200"></div>
        </div>

        <div className="text-xs text-gray-500">
            <p>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated dialer, from Uber and its affiliates to the number provided. Text “STOP” to 89203 to opt out.</p>
        </div>
        </div>
      </div>
    </div>
  );
}

