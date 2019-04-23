const { find, range } = require( 'lodash' );
const colors = [
	{
		color: 'pink',
		main_color: '#ff55c0',
		foreground_contrast: '#0a0000',
		background_contrast: '#0a0000',
		gradient_x: '#f65077',
		gradient_y: '#ff55c0',
		hover: '#550000',
		hover_contrast: '#ffa3dd',
		rgba1: 255,
		rgba2: 85,
		rgba3: 192,
	},
	{
		color: 'green',
		main_color: '#70cc50',
		foreground_contrast: '#002a00',
		background_contrast: '#002a00',
		gradient_x: '#80dd5e',
		gradient_y: '#70cc50',
		hover: '#2a2440',
		hover_contrast: '#bee7b1',
		rgba1: 112,
		rgba2: 204,
		rgba3: 80,
	},
	{
		color: 'dark-green',
		main_color: '#006600',
		foreground_contrast: '#fcfcfc',
		background_contrast: '#fcfcfc',
		gradient_x: '#80dd5e',
		gradient_y: '#006600',
		hover: '#e3e3e3',
		hover_contrast: '#004200',
		rgba1: 0,
		rgba2: 102,
		rgba3: 0,
	},
	{
		color: 'red',
		main_color: '#ad103c',
		foreground_contrast: '#fff',
		background_contrast: '#fff',
		gradient_x: '#c8194e',
		gradient_y: '#b4113f',
		hover: '#f0f0f0',
		hover_contrast: '#c8194e',
		rgba1: 173,
		rgba2: 16,
		rgba3: 60,
	},
	{
		color: 'orange',
		main_color: '#ff7e14',
		foreground_contrast: '#171717',
		background_contrast: '#171717',
		gradient_x: '#fa730b',
		gradient_y: '#e76700',
		hover: '#383838',
		hover_contrast: '#ff9d4d',
		rgba1: 173,
		rgba2: 16,
		rgba3: 60,
	},
	{
		color: 'light-blue',
		main_color: '#00b1ca',
		foreground_contrast: '#041525',
		background_contrast: '#041525',
		gradient_x: '#066b1',
		gradient_y: '#00b1ca',
		hover: '#133762',
		hover_contrast: '#00e1ff',
		rgba1: 0,
		rgba2: 177,
		rgba3: 202,
	},
	{
		color: 'blue',
		main_color: '#005b93',
		foreground_contrast: '#fff',
		background_contrast: '#fff',
		gradient_x: '#066db1',
		gradient_y: '#005b93',
		hover: '#f0f0f0',
		hover_contrast: '#003e6b',
		rgba1: 0,
		rgba2: 91,
		rgba3: 147,
	},
	{
		color: 'yellow',
		main_color: '#f8d755',
		foreground_contrast: '#1d1905',
		background_contrast: '#1d1905',
		gradient_x: '#f3df6c',
		gradient_y: '#f8d755',
		hover: '#48400f',
		hover_contrast: '#f9eaaf',
		rgba1: 248,
		rgba2: 215,
		rgba3: 85,
	},
	{
		color: 'grey',
		main_color: '#ac9d9c',
		foreground_contrast: '#141414',
		background_contrast: '#141414',
		gradient_x: '#59595b',
		gradient_y: '#ac9d9c',
		hover: '#333',
		hover_contrast: '#ebeaea',
		rgba1: 172,
		rgba2: 157,
		rgba3: 156,
	},
	{
		color: 'dark-grey',
		main_color: '#464549',
		foreground_contrast: '#dedede',
		background_contrast: '#dedede',
		gradient_x: '#59595b',
		gradient_y: '#464549',
		hover: '#fafafa',
		hover_contrast: '#141415',
		rgba1: 70,
		rgba2: 69,
		rgba3: 73,
	},
	{
		color: 'black',
		main_color: '#2f3334',
		foreground_contrast: '#eee',
		background_contrast: '#eee',
		gradient_x: '#424646',
		gradient_y: '#2f3334',
		hover: '#fff',
		hover_contrast: '#535e5f',
		rgba1: 47,
		rgba2: 51,
		rgba3: 52,
	},
	{
		color: 'white',
		main_color: '#fff',
		foreground_contrast: '#292929',
		background_contrast: '#292929',
		gradient_x: '#ffecdb',
		gradient_y: '#fff',
		hover: '#595959',
		hover_contrast: '#d9d9d9',
		rgba1: 255,
		rgba2: 255,
		rgba3: 255,
	},
];

const statuses = {
	transaction: [
		{
			status_label: 'completed',
			status_code: 'TCM',
			color: find( colors, [ 'color', 'green' ] ),
		},
		{
			status_label: 'failed',
			status_code: 'TFL',
			color: find( colors, [ 'color', 'pink' ] ),
		},
		{
			status_label: 'open',
			status_code: 'TOP',
			color: find( colors, [ 'color', 'orange' ] ),
		},
		{
			status_label: 'abandoned',
			status_code: 'TAB',
			color: find( colors, [ 'color', 'yellow' ] ),
		},
		{
			status_label: 'incomplete',
			status_code: 'TIN',
			color: find( colors, [ 'color', 'light-blue' ] ),
		},
	],
	payment: [
		{
			status_label: 'approved',
			status_code: 'PAP',
			color: find( colors, [ 'color', 'green' ] ),
		},
		{
			status_label: 'declined',
			status_code: 'PDC',
			color: find( colors, [ 'color', 'pink' ] ),
		},
		{
			status_label: 'cancelled',
			status_code: 'PCN',
			color: find( colors, [ 'color', 'grey' ] ),
		},
		{
			status_label: 'failed',
			status_code: 'PFL',
			color: find( colors, [ 'color', 'orange' ] ),
		},
		{
			status_label: 'pending',
			status_code: 'PPN',
			color: find( colors, [ 'color', 'light-blue' ] ),
		},
	],
	registration: [
		{
			status_label: 'approved',
			status_code: 'RAP',
			color: find( colors, [ 'color', 'green' ] ),
		},
		{
			status_label: 'declined',
			status_code: 'RDC',
			color: find( colors, [ 'color', 'pink' ] ),
		},
		{
			status_label: 'not approved',
			status_code: 'RNA',
			color: find( colors, [ 'color', 'orange' ] ),
		},
		{
			status_label: 'pending',
			status_code: 'RPP',
			color: find( colors, [ 'color', 'light-blue' ] ),
		},
		{
			status_label: 'cancelled',
			status_code: 'RCN',
			color: find( colors, [ 'color', 'grey' ] ),
		},
		{
			status_label: 'incomplete',
			status_code: 'RIC',
			color: find( colors, [ 'color', 'yellow' ] ),
		},
	],
	datetime: [
		{
			status_label: 'active',
			status_code: 'DTA',
			color: find( colors, [ 'color', 'green' ] ),
		},
		{
			status_label: 'cancelled',
			status_code: 'DTC',
			color: find( colors, [ 'color', 'pink' ] ),
		},
		{
			status_label: 'expired',
			status_code: 'DTE',
			color: find( colors, [ 'color', 'grey' ] ),
		},
		{
			status_label: 'sold out',
			status_code: 'DTS',
			color: find( colors, [ 'color', 'yellow' ] ),
		},
		{
			status_label: 'inactive',
			status_code: 'DTI',
			color: find( colors, [ 'color', 'dark-grey' ] ),
		},
		{
			status_label: 'postponed',
			status_code: 'DTP',
			color: find( colors, [ 'color', 'orange' ] ),
		},
		{
			status_label: 'upcoming',
			status_code: 'DTU',
			color: find( colors, [ 'color', 'light-blue' ] ),
		},
	],
};

const sizes = {
	defaultSizes: range( 1, 25 ),
	sizeMap: {
		size1:1,
		size2:2,
		size3:3,
		size4:4,
		size5:5,
		size6:6,
		size7:7,
		size8:8,
		size9:9,
		size10:10,
		size11:11,
		size12:12,
		size13:13,
		size14:14,
		size15:15,
		size16:16,
		size17:17,
		size18:18,
		size19:19,
		size20:20,
		size21:21,
		size22:22,
		size23:23,
		size24:24
	},
	sizeSmall: 11,
	sizeMedium: 13,
	sizeLarge: 14,
	sizeHuge: 16,
	radiusSmall: 3,
	radiusNormal: 6,
};

module.exports = {
	colors,
	statuses,
	sizes,
};