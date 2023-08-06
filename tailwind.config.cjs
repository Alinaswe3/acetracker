/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'dark-gray': 'hsl(0, 0%, 17%)',
				'light-gray': 'hsl(0, 0%, 59%)'
			},
			fontSize: {
				body: '1.8rem'
			},
			screens: {
				md: '36em',
				lg: '69em'
			}
		}
	},

	plugins: []
};

module.exports = config;
