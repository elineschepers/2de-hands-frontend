module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
  orePlugins: {
    blur: true,
  },
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue':{
          100:'#E30147',
          200: '#FF0752',
        },
        'regal-red':{
          100:'#FF0000',
        }, 
      },
    }
  }
}

