
import SideBar from "./sideBar-component";
import RestaurantFormComponent from "./Form-component";
import { isAuth } from "@/Helpers/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

interface RestaurantData {
  id: number;
  name: string;
  address: string;
  description: string;
  image: string;
  // Add more fields as per your API response
}

const RestaurantComponent = () => {
  const [editData, setEditData] = useState<RestaurantData | null>(null);
    const router = useRouter();
    const urlId = router.query.id

    useEffect(() => {
      console.log(urlId)
      fetch(`http://167.71.99.67:8000/restaurants/${urlId}`)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setEditData(response);
        })
        .catch(() => {
          //  console.log('Request failed:', data);
        });
    }, [setEditData]);

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
                 <RestaurantFormComponent isEditPage={true} editData={editData}/>
            </SideBar>
    )
}

export default dynamic(() => Promise.resolve(RestaurantComponent), { ssr: false });