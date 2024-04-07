
import SideBar from "./sideBar-component";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MealFormComponent from "./meal-form-component";
import { isAuth } from "@/Helpers/auth";
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
                 <MealFormComponent />
            </SideBar>
    )
}

export default dynamic(() => Promise.resolve(RestaurantComponent), { ssr: false });