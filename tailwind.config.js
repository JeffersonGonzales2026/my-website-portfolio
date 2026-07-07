/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#09090b',    
          secondary: '#121214',  
        },
        text: {
          primary: '#f4f4f5',    
          secondary: '#a1a1aa',  
          muted: '#71717a',      
        },
        glass: {
          card: 'rgba(24, 24, 27, 0.4)',
          border: 'rgba(63, 63, 70, 0.4)',
        },
        
        // Official Dream Creations Identity
        dreamCreations: {
          brandBlue: '#1095d2',  
          skySunset: '#FDBA74',
          skyOrange: '#F97316',
          skyPink: '#F472B6',
          skyViolet: '#A78BFA',
          skyPurple: '#7C3AED',
          skyBlue: '#1E3A8A',
          skyDeep: '#0B1026',
        },

        // Official Data Analyst Identity
        dataAnalyst: {
          mainGreen: '#5bc96d',  
          corporateBlue: '#1d4ed8',
          executiveNavy: '#1e3a8a',
        },

        // Official AI Developer Identity
        aiDeveloper: {
          deepBlack: '#000000',
          darkNavy: '#020617',
          electricBlue: '#2563eb',
          neonCyan: '#06b6d4',
          neonPurple: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}