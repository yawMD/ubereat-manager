
import SideBar from "./sideBar-component";
import RestaurantFormComponent from "./Form-component";
import { isAuth } from "@/Helpers/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

type Parameters = {
    isEditPage: boolean
}
const RestaurantComponent = ({isEditPage}:Parameters) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuth()) {
        router.push('/login');
      }
    }, [router]);

    if (!isAuth()) {
      return null; // or a loading indicator
    }

    return (
            <SideBar>
                 <RestaurantFormComponent isEditPage={isEditPage}/>
            </SideBar>
    )
}

export default dynamic(() => Promise.resolve(RestaurantComponent), { ssr: false });