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

const meta = {
	name: '2019 Default',
	primary: colors.blue,
	secondary: colors.green,
	accent: colors[ 'hot-pink' ],
	background: '#F3EFEF',
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
	colors,
	meta,
	sizes,
};
