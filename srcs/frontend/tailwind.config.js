/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#6366f1", // Indigo
        primary: "#789048", // Matcha 	#789048  #74A12E
        "primary-foreground": "#ffffff", // White
        background: "#f9fafb", // Gray 50
        destructive: "#ef4444", // Red
        "destructive-foreground": "#ffffff", // White
        // etc.
      },
    },
  }, 
  plugins: [],
}
