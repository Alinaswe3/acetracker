/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'light-gray': 'hsl(0, 0%, 17%)',
				'dark-gray': 'hsl(0, 0%, 59%)'
			},
			fontSize: {
				body: '1.8rem'
			}
		}
	},

	plugins: []
};

module.exports = config;
