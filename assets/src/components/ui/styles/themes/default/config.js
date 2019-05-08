/** -------------------------------------------------------------------------
 * Event Espresso 2019 Default theme config
 * © 2019 Event Espresso
 * ------------------------------------------------------------------------- */

const colors =  {
	magenta: '#962557',
	red: '#b00e13',
	'hot-pink': '#de5882',
	pink: '#ed8d99',
	coral: '#ed6d5a',
	orange: '#ee7e04',
	gold: '#f6bd00',
	yellow: '#fad800',
	'yellow-green': '#d3d600',
	'light-green': '#a9ce47',
	green: '#91ab30',
	'bright-green': '#31934d',
	'dark-green': '#4d6021',
	'blue-green': '#399f94',
	blue: '#297abc',
	'dark-blue': '#274369',
	'bright-blue': '#5abddb',
	'light-blue': '#9dcdd5',
	violet: '#bfa9d4',
	purple: '#795d9d',
	indigo: '#26203d',
	black: '#18181a',
	white: '#ffffff',
};

const theme = {
	name: '2019 Default',
	primary: colors.blue,
	secondary: colors.green,
	accent: colors[ 'hot-pink' ],
	background: '#F3EFEF',

	// comment out the above...
	// then uncomment any of the following for a different theme
	// although these are not complete themes since they are only
	// defining the four main theme colors and nothing else

	// name: '2019 Default Dark',
	// primary: colors.blue,
	// secondary: colors.green,
	// accent: colors[ 'hot-pink' ],
	// background: '#1f1f23',

	// name: 'Tokyo Spring',
	// primary: '#A63740',
	// secondary: '#5BA9D9',
	// accent: '#CEE4F2',
	// background: '#f6f2ef',

	// name: '2019 Mossy Rocks',
	// primary: '#9DA65D',
	// secondary: '#6C733D',
	// accent: '#8C8C88',
	// background: '#202426',

	// name: '2019 Spicy Chili Pepper',
	// primary: '#A61103',
	// secondary: '#467302',
	// accent: '#F29F05',
	// background: '#e7e0d4',

	// name: '2019 Concrete',
	// primary: '#68788C',
	// secondary: '#394759',
	// accent: '#ADC5D9',
	// background: '#E4EDF2',

	// offset applied when generating high and low contrast alternates
	rgbModifier: { r: 32, g: 32, b: 32 },
	// whether to only use black and white for contrast text colors
	blackAndWhiteContrast: false,
};

const sizes = {
	fontSizeBase: 10,
	fontSizeModifiers: null,
	lineHeightModifier: 1.5,
	marginDefault: 2,
	marginSizeModifiers: null,
	paddingDefault: 2,
	paddingSizeModifiers: null,
	radiusDefault: 4,
	radiusSizeModifiers: null,
};

module.exports = {
	folder: 'themes/default',
	colors: colors,
	theme: theme,
	sizes,
};
