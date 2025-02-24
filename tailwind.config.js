/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      textShadow:{
        'default':'0 1px 3px rgba(0, 0, 0, 0.5)',
        'lg':'1px 4px 5px rgba(0, 0, 0, 0.5)',
        'md':'1px 0px 5px rgba(19, 18, 18, 0.5)',
      'xl':'4px 20px 40px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    function({ addUtilities }){
      const newUtilities ={
        '.text-shadow-default':{
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow-lg':{
          textShadow: '1px 4px 5px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow-md':{
          textShadow: '1px 0px 5px rgba(19, 18, 18, 0.5)'
        },
        '.text-shadow-xl':{
          textShadow: '4px 20px 40px rgba(0, 0, 0, 0.5)'
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

