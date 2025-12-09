/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*/.{js,jsx}"],
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'text-pop-up-top': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
       
      },
      animation: {
        'slide-left': 'slide-left 0.5s ease-out',
        'text-pop-up-top': 'text-pop-up-top 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate',
      
      },
      colors: {
        'navy-blue': {
          600: '#281E5D', // define other shades if necessary
        },
      },
      spacing: {
        '136': '34rem',
      },
      
      screens: {
       
        'iphonexr': { 'raw': '(min-width: 390px) and (max-width: 896px)' },

        'very-screen': {'min': '1901px','max':'2042px'},
        'big-screen': { 'min': '2540px'},
        'small-screen':{'min': '2043px','max':'2186px'},
      'medium-screen': { 'min': '2187px','max':'2539px'},
        'head-home': {'min': '1536px', 'max': '1900px'},
        'md-lg': '1024px',
        'lg-md': { 'max': '1267px' },

      
        'news-content': {"min":'2000px', 'max':'2600px'},
        "purpose-text" :  {"min":'2000px', 'max':'2600px'},
        'purpose-img' : {"min":'1024px', 'max':'1500px'},
        'books': {"min":'1024px', 'max':'1099px'},
        
        'event-text':{"min":'1920px',"max":'2600px'},

        'form-text': { 'min': '2556px'},
        'invitation-text':{'min':'2560px', 'max':'2600px'},
        
      },
      fontFamily: {
        'mukta-malar': ['Mukta Malar', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

