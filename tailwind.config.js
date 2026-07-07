/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global Theme Variables utilized inside your components
        background: {
          primary: '#09090b',    // Deep Dark Zinc Base
          secondary: '#121214',  // Card Elevating Fills
        },
        text: {
          primary: '#f4f4f5',    // High-contrast primary zinc
          secondary: '#a1a1aa',  // Muted descriptive body tone
          muted: '#71717a',      // Low-contrast captions/rules
        },
        glass: {
          card: 'rgba(24, 24, 27, 0.4)',
          border: 'rgba(63, 63, 70, 0.4)',
        },
        
        // Microsite Dedicated Palettes mapped straight from your PRD
        dreamCreations: {
          skySunset: '#FDBA74',
          skyOrange: '#F97316',
          skyPink: '#F472B6',
          skyViolet: '#A78BFA',
          skyPurple: '#7C3AED',
          skyBlue: '#1E3A8A',
          skyDeep: '#0B1026',
          brandBlue: '#1094D2',  // Official agency identity hex
        },
        dataAnalyst: {
          corporateBlue: '#1d4ed8',
          executiveNavy: '#1e3a8a',
          kpiGreen: '#34d399',
        },
        aiDeveloper: {
          deepBlack: '#000000',
          darkNavy: '#020617',
          electricBlue: '#2563eb',
          neonCyan: '#06b6d4',
          neonPurple: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Emulating clean modern technology brands
      }
    },
  },
  plugins: [],
}