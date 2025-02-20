/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", // Add Flowbite
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ["group-hover"], // Enable group-hover for display
    },
  },
  plugins: [
    require("flowbite/plugin"), // Add Flowbite plugin
  ],
};
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};