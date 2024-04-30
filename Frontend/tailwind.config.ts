import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'background' : "url('/public/Images/bg.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'swing': {
          '0%, 15%, 35%, 55%, 75%, 95%' : { transform: 'rotate(6deg)' },
          '10%, 30%, 50%, 70% ,90%, 100%' : { transform: 'rotate(-6deg)' },
          // '75%, 85%, 95% ' : {
          //   transform: 'rotate(4deg)'
          // }
        }
      },
      animation: {
        'swing': 'swing 1s alternate ease-in'
      }
    },
  },
  plugins: [],
}
export default config
