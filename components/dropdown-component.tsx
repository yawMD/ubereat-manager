import React, { useState, useEffect } from 'react';

export default function Dropdown() {
    const [selectedCountry, setSelectedCountry] = useState('Canada');
    const [address, setAddress] = useState('');
  
    // Function to fetch address data from the Smarty API
    const fetchAddress = async (country: string) => {
      // Construct the API URL with the necessary parameters
      const apiURL = `https://www.smarty.com/products/single-address?country=${encodeURIComponent(country)}&address1=Owegon%20Lane&locality=Accra&administrative_area=Greater%20Accra&postal_code=undefined&address-type=international-street-components`;
  
      try {
        const response = await fetch(apiURL, {
          method: 'GET',
          headers: {
            // It's essential to keep the API key secure and not expose it in client-side code
            // 'Authorization': `Bearer YOUR_SMARTY_API_KEY`
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Process the API response according to the Smarty API's response structure
        // This might involve parsing the data object to extract the desired address information
        setAddress(data); // Update this line according to the structure of the Smarty API response
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Failed to fetch address');
      }
    };
  
    // Effect hook to fetch address whenever the selected country changes
    useEffect(() => {
      fetchAddress(selectedCountry);
    }, [selectedCountry]);
  

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
