import Link from "next/link";
import { useEffect, useState } from "react";

const people = [
  {
    name: "Steak philly",
    role: "320 cal",
    imageUrl:
      "https://images.unsplash.com/photo-1625937329368-9c6e55f665ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBtZWFsc3xlbnwwfHwwfHx8MA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Long horn steak",
    role: "320 cal",
    imageUrl:
      "https://images.unsplash.com/photo-1626203313658-886791f37e46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtZXJpY2FuJTIwbWVhbHN8ZW58MHx8MHx8fDA%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

interface Restaurant {
  id: number;
  name: string;
  image: string;
  // Add other fields as necessary
}

export default function ProjectComponent() {
  const [restaurant, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://167.71.99.67:8000/restaurants")
      .then((res) => res.json())
      .then((response) => {
        setRestaurants(response);
      })
      .catch(() => {
        //  console.log('Request failed:', data);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {"McDonald's"} Added Meals
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {restaurant.map((person) => (
            <Link href={`/edit/${person.id}`} key={person.id}>
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-cover group-hover:opacity-75"
                  src={person.image}
                  alt={`${person.name}'s image`}
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  {person.name}
                </p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
