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

interface FormConfig{
    placeholder?: string;
    label?: string;
}
export default function Example(props: FormConfig) {
    return (
      <div className="my-4">
        <div className="flex justify-between">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            {props.label}
          </label>
        
        </div>
        <div className="">
          <input
            type="email"
            name="email"
            id="email"
            className="outline-none block w-full p-4 rounded-md bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder={props.placeholder}
            aria-describedby="email-optional"
          />
        </div>
      </div>
    )
  }
  