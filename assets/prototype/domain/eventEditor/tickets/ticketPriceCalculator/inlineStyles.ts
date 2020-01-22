import React from 'react';

const alignRight: React.CSSProperties = { textAlign: 'right' };
const borderBox: React.CSSProperties = { boxSizing: 'border-box' };
const cell: React.CSSProperties = { padding: '.5rem .25rem' };
const centered: React.CSSProperties = { textAlign: 'center' };
const fullWidth: React.CSSProperties = { width: '100%' };
const inlineBlock: React.CSSProperties = { display: 'inline-block' };

const sign: React.CSSProperties = { ...borderBox, ...inlineBlock, minWidth: '2rem' };
const actions: React.CSSProperties = { ...cell, ...centered };
const aft: React.CSSProperties = { ...sign, textAlign: 'left' };
const amount: React.CSSProperties = { ...cell, maxWidth: '125px', ...centered };
const b4: React.CSSProperties = { ...alignRight, ...sign };
const colWidth7h: React.CSSProperties = { width: '7.5%' };
const colWidth15: React.CSSProperties = { width: '15%' };
const colWidth20: React.CSSProperties = { width: '20%' };
const colWidth30: React.CSSProperties = { width: '30%' };
const currency: React.CSSProperties = {
	...borderBox,
	...inlineBlock,
	margin: '0 .25em',
	width: 'calc(100%-4rem)',
};
const div: React.CSSProperties = { ...borderBox, ...fullWidth, display: 'block', margin: '0 0 1em' };
const hdr: React.CSSProperties = { margin: '1em 0 .5em' };
const input: React.CSSProperties = { ...fullWidth };
const money: React.CSSProperties = { minWidth: '185px' };
const number: React.CSSProperties = { ...alignRight, maxWidth: '105px', margin: '0 auto' };
const table: React.CSSProperties = { ...fullWidth };
const total: React.CSSProperties = { ...alignRight, fontSize: '18px', width: '77.5%' };
const type: React.CSSProperties = { ...cell, width: '170px' };

export default {
	actions,
	aft,
	amount,
	b4,
	cell,
	colWidth7h,
	colWidth15,
	colWidth20,
	colWidth30,
	currency,
	div,
	hdr,
	input,
	money,
	number,
	sign,
	table,
	total,
	type,
};
