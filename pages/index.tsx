import Image from "next/image";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/navbar-component";
import Input from "@/components/input-component";
import Link from "next/link";
import Dropdown from "@/components/dropdown-component";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [first_name, setfName] = useState("");
  const [last_name, setlName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [store_address, setStore_address] = useState("");
  const [floor, setFloor] = useState("");
  const [store_name, setStore_name] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [location, setLocation] = useState("");
  const [verify, setVerify] = useState("");
  const [btn, setBtn] = useState({ text: "Register", sending: false });

  const showSuccessToast = () => {
    toast.success("Success", {
      data: {
        title: "Success toast",
        text: "This is a success message",
      },
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("clickedddd");
    let error = false;
    let _m = "";
    if (
      // phone.length < 1 ||
      first_name.length < 1 ||
      last_name.length < 1 ||
      email.length < 1 ||
      username.length < 1 ||
      password.length < 1 ||
      verify.length < 1 ||
      store_address.length < 1 ||
      floor.length < 1 ||
      store_name.length < 1 ||
      brand_name.length < 1 ||
      location.length < 1
    ) {
      _m = "Error: Make sure all fields are set";
      error = true;
    } else if (password.length < 6) {
      error = true;
      _m = "Error: Password must be at least 6 characters";
    } else if (password !== verify) {
      error = true;
      _m = "Error: Passwords do not match";
    } else {
      error = false;
    }
    if (!error) {
      let __d = {
        first_name,
        last_name,
        email,
        username,
        password,
        store_address,
        floor,
        store_name,
        brand_name,
        location,
        role: "admin",
      };
      console.log(__d);
      // return;
      setBtn({ text: "Creating your account", sending: true });
      // const tld =((d) =>{
      toast.loading("Creating your account... Please wait"), [2000];
      // });

      fetch("http://167.71.99.67:8000/register/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(__d),
      })
        .then(function (res) {
          setTimeout(() => {
            showSuccessToast();
          }, 5000);
          //  Ctx.setLogin(true);
          //  Ctx.setRegister(false)
          setBtn({ text: "Login", sending: false });
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  };

  return (
    <main className={`flex h-screen flex-col items-center ${inter.className}`}>
      <ToastContainer />
      <div className="w-full bg-black">
        <NavBar />
      </div>
      <div
        style={{
          backgroundImage: `url('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1452,h_744/v1653330142/assets/3f/55e1e1-a4df-4d74-b971-ff6378a10067/original/merchants-couple-smiling-1.png')`,
          width: "100%",
          height: "100%", // Set to '100%' or a specific width as desired

          backgroundSize: "cover", // This ensures that the background covers the div area
          // This centers the background image in the div
          backgroundRepeat: "no-repeat", // This prevents the background image from repeating
        }}
        className="w-full flex"
      >
        <div className="w-5/12 p-4 flex font-bold text-4xl ml-16 ">
          <h1>Unlock a new revenue stream</h1>
        </div>
        <div className="w-5/12">
          <form className="m-auto w-10/12 bg-white p-4" onSubmit={handleSubmit}>
            <p className="font-bold text-xl">Get Started</p>
            <Link className="text-sm" href="login">
              Already have an account
            </Link>
            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="first"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="text"
                  id="first"
                  value={first_name}
                  onChange={(e) => setfName(e.target.value)}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Alice"
                  aria-describedby="first name"
                />
              </div>
            </div>
            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="last"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="last"
                  id="last"
                  value={last_name}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Rivers"
                  onChange={(e) => setlName(e.target.value)}
                  aria-describedby="last-optional"
                />
              </div>
            </div>
            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="email-optional"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Uncle_Drew"
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="verify"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                verify
              </label>
              <input
                type="password"
                id="verify"
                value={verify}
                className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setVerify(e.target.value)}
                name="verify"
              />
            </div>


            <div className="form-group my-4">
              <label
                htmlFor="store_address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                store address
              </label>
              <input
                type="text"
                value={store_address}
                id="store address"
                className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="store address"
                onChange={(e) => setStore_address(e.target.value)}
                name="store_address"
              />
            </div>
            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Floor
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="floor"
                  id="floor"
                  value={floor}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Floor / Suite(Optional)"
                  onChange={(e) => setFloor(e.target.value)}
                  aria-describedby="floor-optional"
                />
              </div>
            </div>

            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="store"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Store name
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="store"
                  id="store"
                  value={store_name}
                  onChange={(e) => setStore_name(e.target.value)}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Example: Sam's Pizza - 123 Main street"
                  aria-describedby="store-optional"
                />
              </div>
            </div>

            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand name
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand_name}
                  onChange={(e) => setBrand_name(e.target.value)}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Example: Sam's Pizza"
                  aria-describedby="brand-optional"
                />
              </div>
            </div>

            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="5712 S Wabash Ave"
                  aria-describedby="brand-optional"
                />
              </div>
            </div>

            <input
              type="submit"
              className="cursor-pointer outline-none block w-full my-10 p-4 rounded-md text-white shadow-sm ring-1 ring-inset bg-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
