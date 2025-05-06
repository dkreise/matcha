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
        // secondary: '#A67B5B',      // soft brown
        background: "#f9fafb", // Gray 50
        foreground: "#1f1f1f",
        // background: '#F5F5DC',     // beige
        accent: '#C0DFA1',         // bright matcha
        light: '#e4e8da',          // light matcha
        dark: '#48562B',           // dark matcha
        // dark: '#4A403A',           // deep brown
        destructive: '#ef4444',     // Red
        "like-light": '#f3e8ee',      // light pink
        "like-dark": '#aa5982',       // dark pink
        "destructive-foreground": "#ffffff", // White
        // etc.
      },
    },
  }, 
  plugins: [],
  // variants: {
  //   extend: {
  //     backgroundColor: ['data-active'],
  //     textColor: ['data-active'],
  //     borderColor: ['data-active'],
  //   },
  // },
}
