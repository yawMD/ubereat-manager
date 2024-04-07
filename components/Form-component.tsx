/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { getCookie } from '@/Helpers/auth';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { faker } from '@faker-js/faker';
import 'react-toastify/dist/ReactToastify.css'


type Owner={
  id: number;
  address: string;
  owner:number;
  description: string;
  image:string;
}

interface RestaurantData {
  id: number;
  name: string;
  address: string;
  description: string;
  image: string;
}

type Parameters = {
  isEditPage:boolean
  editData?: RestaurantData | null;
}

export default function FormComponent({isEditPage,editData}:Parameters) {

  const [name, setName] = useState(editData?.name ?? '');
  const [address, setAddress] = useState(editData?.address ?? '');
  const [owner, setOwner] = useState<Owner | null>(null);
  const [btn, setBtn] = useState({ text: "Save", sending: false });
  const [description, setDescription] = useState(editData?.description ?? '');
  const [image, setImage] = useState("");


  const showSuccessToast = () => {
    toast.success("Success", {
      data: {
        title: "Success toast",
        text: "This is a success message",
      },
    });
  };

  const handleDelete = () => {
    // Confirm before delete
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      fetch(`http://167.71.99.67:8000/restaurants/${editData?.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${getCookie('jwt-session')}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the restaurant');
        }
        toast.success("Restaurant deleted successfully");
        // Redirect to another page or update UI to remove the deleted item
        // For example: router.push('/restaurants');
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Error deleting the restaurant");
      });
    }
  };



  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setAddress(editData.address);
      setDescription(editData.description);
      setImage(editData.image);
    }
  }, [editData]);


  useEffect(() => {
    console.log(isEditPage)
    const userData = localStorage.getItem("admin");
    if (userData) {
      setOwner(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Validation checks...

    const url = isEditPage ? `http://167.71.99.67:8000/restaurants/${editData?.id}/` : 'http://167.71.99.67:8000/restaurants/';
    const method = isEditPage ? 'PATCH' : 'POST'; // Use PATCH for updates, POST for new creation

    fetch(url, {
      method: method,
      headers: {
        'Authorization': `Token ${getCookie('jwt-session')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        address,
        owner: owner?.id,
        description,
        image,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save the restaurant');
      }
      toast.success(isEditPage ? "Restaurant updated successfully" : "Restaurant created successfully");
      // Redirect or update UI here
    })
    .catch(error => console.error('Error:', error));
  };


  return (
    <>
    <ToastContainer />
     <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">{isEditPage ? 'Edit Restaurant': 'Create Restaurant'}</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Restaurant name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Emmanuel McDan"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                address
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="$20"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a description.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {isEditPage && (
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isEditPage ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
    </>

  )
}
