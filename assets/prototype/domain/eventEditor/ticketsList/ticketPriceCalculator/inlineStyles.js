const hdr = { margin: '1em 0 .5em' };
const table = { width: '100%' };
const cell = { padding: '.5rem .25rem' };
const type = { padding: '.5rem .25rem', width: '170px' };
const input = { width: '100%' };
const amount = { maxWidth: '125px', padding: '.5rem .25rem', textAlign: 'center' };
const number = { margin: '0 auto', textAlign: 'right', maxWidth: '105px' };
const money = { minWidth: '185px' };
const sign = { boxSizing: 'border-box', display: 'inline-block', minWidth: '2rem' };
const b4 = { ...sign, textAlign: 'right' };
const aft = { ...sign, textAlign: 'left' };
const Currency = { boxSizing: 'border-box', display: 'inline-block', margin: '0 .25em', width: 'calc(100%-4rem)' };
const div = { boxSizing: 'border-box', display: 'block', margin: '0 0 1em', width: '100%' };
const actions = { ...cell, textAlign: 'center' };

export default {
	hdr,
	table,
	cell,
	type,
	input,
	amount,
	money,
	sign,
	b4,
	aft,
	Currency,
	div,
	actions,
}