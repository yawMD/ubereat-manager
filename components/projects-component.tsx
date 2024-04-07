
import SideBar from "./sideBar-component";
import ProjectComponent from "./added-components";
import { isAuth } from "@/Helpers/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const RestaurantComponent = () => {
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
                 <ProjectComponent />
            </SideBar>
    )
}

export default dynamic(() => Promise.resolve(RestaurantComponent), { ssr: false });