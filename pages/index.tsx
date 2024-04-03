import Image from "next/image";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/navbar-component";
import Input from "@/components/input-component";
import Link from "next/link";
import Dropdown from "@/components/dropdown-component";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <div className="w-full bg-black">
        <NavBar />
      </div>
      <div  style={{
        backgroundImage: `url('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1452,h_744/v1653330142/assets/3f/55e1e1-a4df-4d74-b971-ff6378a10067/original/merchants-couple-smiling-1.png')`,
        width: '100%', // Set to '100%' or a specific width as desired

        backgroundSize: 'cover', // This ensures that the background covers the div area
        // This centers the background image in the div
        backgroundRepeat: 'no-repeat' // This prevents the background image from repeating
      }}
      className="w-full flex" >
      <div className="w-5/12 p-4 flex font-bold text-4xl ml-16 ">
        <h1>Unlock a new revenue stream</h1>
        </div>
          <div className="w-5/12">
            <form className="m-auto w-10/12 bg-white p-4">
              <p className="font-bold text-xl">Get Started</p>
              <Link className="text-sm" href="login">Already have an account</Link>
              <p className="text-sm font-medium">store address</p>
              <Dropdown />

              <Input label="Floor / Suite(Optional)"/>
              <Input label="Store name"  placeholder="Example: Sam's Pizza - 123 Main street"/>
              <Input label="Brand name"  placeholder="Example: Sam's Pizza"/>
              <Dropdown />
              <Input label="First name"  />
              <Input label="Last name"  />
              <Input label="Email"  />
              <div className="form-group">
                                <input type="text" id="mobile_code" className="form-control" placeholder="Phone Number" name="name" />
                            </div>
            </form>
          </div>
        </div>
    </main>
  );
}
