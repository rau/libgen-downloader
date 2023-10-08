/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"planflux-primary": "#0986FF",
				"planflux-secondary": "#4B4DED",
				"planflux-dark": "#0E0E2C",
				"planflux-success": "#31D0AA",
				"planflux-danger": "#D03131",
				"planflux-text": "#1A1B1F",
				"planflux-subtle": "#7F7F7F",
				"planflux-accent": "#ECF1F4",
				"planflux-light": "#FAFCFE",
				"planflux-link": "#0000EE",
			},
			bgGradientDeg: {
				75: "75deg",
			},
			height: {
				screen: ["100svh /* fallback for Opera, IE and etc. */"],
			},
			fontFamily: {
				"work-sans": ['"Work Sans"', "sans-serif"],
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"bg-gradient": (angle) => ({
						"background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
					}),
				},
				{
					// values from config and defaults you wish to use most
					values: Object.assign(
						theme("bgGradientDeg", {}), // name of config key. Must be unique
						{
							10: "10deg", // bg-gradient-10
							15: "15deg",
							20: "20deg",
							25: "25deg",
							30: "30deg",
							45: "45deg",
							60: "60deg",
							90: "90deg",
							120: "120deg",
							135: "135deg",
						}
					),
				}
			)
		}),
	],
}
