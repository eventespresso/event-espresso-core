const themeColors = [ 'primary', 'secondary', 'accent', 'default' ];

const themeColorDesc = {
	primary: 'The "primary" color is the color that is used most' +
		' frequently throughout the system. It utilizes the following css' +
		' variables:',
	secondary: 'The "secondary" color is the second most used' +
		' color throughout the system. It utilizes the following css' +
		' variables:',
	accent: 'The "accent" color is a contrasting color and is' +
		' intended to capture attention. It utilizes the following css' +
		' variables:',
	default: 'The "default" color group is used for most elements ' +
		' and utilizes the following css variables:',
};

const defaultSizes = [
	'micro',
	'tiny',
	'smaller',
	'small',
	'default',
	'big',
	'bigger',
	'huge',
	'extreme',
];

const defaultRadii = [
	'none',
	'small',
	'default',
	'big',
	'bigger',
	'huge',
	'full',
];

const fontSizeDesc = {
	micro: '<p>Uh-oh... the fine print! This is where you hide all of the' +
		' really nasty legal stuff about hidden fees or lack of privacy' +
		' that you don\'t want users to know about but are still legally' +
		' obliged to inform them of.</p><p>LOLZ! just joking.</p><p>Try not' +
		' to use this for anything important though because it can cause' +
		' accessibility issues for users with impaired vision.</p><p>To' +
		' increase the accessibility of this text, this class uses a "super' +
		' high contrast" text color, with lots of extra spacing between the' +
		' letters and words.</p>',
	tiny: '<p>Extremely anecdotal text of little importance. Should be used' +
		' very sparingly throughout a page for accessibility reasons.</p>' +
		'<p>To increase the accessibility of this text, this class uses a' +
		' "super high contrast" text color, and also has a tiny bit of' +
		' extra spacing between the letters and words.</p>',
	smaller: '<p>Anything that is of far lesser importance than the default' +
		' priority text. These should be used sparingly throughout a' +
		' page.</p><p>To increase the accessibility of this text, this class' +
		' uses a "high contrast" text color.</p>',
	small: '<p>Anything that is of slightly lesser importance than the default' +
		' priority text. These can be used liberally throughout a page to' +
		' support the default text.</p><p>To increase the accessibility of' +
		' this text, this class uses a "high contrast" text color.</p>',
	default: '<p>The default priority that should make up the majority of text' +
		' on a page, ie: the default text.</p>',
	big: '<p>A somewhat important heading that users should focus on before' +
		' reading default text. There can be lots of these on a page.</p>',
	bigger: '<p>A fairly important heading that users should focus on after' +
		' the more important headings. There is no problem using several of' +
		' these on a page as long as you don\'t overdo it.</p><p>Although' +
		' using the "bigger" font size, this class uses the "default" text' +
		' color.</p>',
	huge: '<p>A very important heading that users should focus on second.' +
		' Ideally there should not be more than a few of these on the' +
		' page.</p><p>This class uses the "huge" font size and a "low' +
		' contrast" text color.</p>',
	extreme: '<p>The highest priority heading on the screen that users should' +
		' focus on first. Ideally there should not be more than one of these' +
		' on the page.</p><p>Typically the page title.</p><p>Because we are' +
		' using the "extreme" font size for this class, we can also use a ' +
		' "super low contrast" text color without negatively affecting' +
		' accessibility.</p>',
};

const fontSizeColors = {
	micro: '--ee-default-text-color-super-high-contrast',
	tiny: '--ee-default-text-color-super-high-contrast',
	smaller: '--ee-default-text-color-high-contrast',
	small: '--ee-default-text-color-high-contrast',
	default: '--ee-default-text-color',
	big: '--ee-default-text-color',
	bigger: '--ee-default-text-color',
	huge: '--ee-default-text-color-low-contrast',
	extreme: '--ee-default-text-color-super-low-contrast',
};

const loremIpsum = 'The approach will not be easy. You are required to maneuver straight down this trench and skim the surface to this point. The target area is only two meters wide. It’s a small thermal exhaust port, right below the main port. The shaft leads directly to the reactor system. A precise hit will start a chain reaction which should destroy the station. Only a precise hit will set up a chain reaction. The shaft is ray-shielded, so you’ll have to use proton torpedoes. That’s impossible, even for a computer. It’s not impossible. I used to bull’s-eye womp rats in my T-sixteen back home. They’re not much bigger than two meters. Man your ships! And may the Force be with you!';

const entityStatusGroups = {
	datetime: [
		{ code: 'DTS', label: 'sold out' },
		{ code: 'DTA', label: 'active' },
		{ code: 'DTU', label: 'upcoming' },
		{ code: 'DTI', label: 'inactive' },
		{ code: 'DTP', label: 'postponed' },
		{ code: 'DTC', label: 'cancelled' },
		{ code: 'DTT', label: 'trashed' },
	],
	payment: [
		{ code: 'PAP', label: 'approved' },
		{ code: 'PPN', label: 'pending' },
		{ code: 'PDC', label: 'declined' },
		{ code: 'PCN', label: 'cancelled' },
		{ code: 'PFL', label: 'failed' },
	],
	registration: [
		{ code: 'RAP', label: 'approved' },
		{ code: 'RPP', label: 'pending' },
		{ code: 'RWL', label: 'wait list' },
		{ code: 'RIC', label: 'incomplete' },
		{ code: 'RNA', label: 'not approved' },
		{ code: 'RDC', label: 'declined' },
		{ code: 'RCN', label: 'cancelled' },
	],
	ticket: [
		{ code: 'TKS', label: 'sold out' },
		{ code: 'TKO', label: 'on sale' },
		{ code: 'TKP', label: 'pending' },
		{ code: 'TKE', label: 'expired' },
		{ code: 'TKA', label: 'archived' },
	],
	transaction: [
		{ code: 'TOP', label: 'overpaid' },
		{ code: 'TCM', label: 'complete' },
		{ code: 'TIN', label: 'incomplete' },
		{ code: 'TAB', label: 'abandoned' },
		{ code: 'TFL', label: 'failed' },
	],
};

module.exports = {
	themeColors,
	themeColorDesc,
	defaultSizes,
	defaultRadii,
	fontSizeDesc,
	fontSizeColors,
	loremIpsum,
	entityStatusGroups,
};
