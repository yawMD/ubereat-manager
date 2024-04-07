import React, { useState, useEffect } from 'react';

export default function Dropdown() {
    const [selectedCountry, setSelectedCountry] = useState('Canada');
    const [address, setAddress] = useState('');

    // Function to fetch address data from the Smarty API
    const fetchData = async () => {
      const authId = "815d0fd8-a943-42b2-56dc-2bcad8b9001e";
      const authToken = "lPn07BtA37IcUA6lk4T4";
      const license = "195967973888479624";
      const url = `https://us-street.api.smarty.com/street-address?auth-id=${authId}&auth-token=${authToken}&license=${license}`;

      const body = JSON.stringify([
        {
          "street":"1 Santa Claus",
          "city":"North Pole",
          "state":"AK",
          "candidates":10
        },
        {
          "addressee":"Apple Inc",
          "street":"1 infinite loop",
          "city":"cupertino",
          "state":"CA",
          "zipcode":"95014",
          "candidates":10
        }
      ]);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { "Content-Type": "application/json; charset=utf-8" },
          // body: body
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };
  return (
    <div>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md bg-gray-200 p-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="United States">United States</option>
        <option value="Canada">Canada</option>
        <option value="Mexico">Mexico</option>
      </select>
      {address && <div className="mt-4 p-4 bg-white shadow rounded-md">{address}</div>}
    </div>
  );
}
