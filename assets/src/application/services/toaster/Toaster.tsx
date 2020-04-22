import React from 'react';

import ToasterPosition from './ToasterPosition';
import { PositionsType } from './types';
import './style.scss';

const Toaster = ({ toastPositions }): JSX.Element => {
	return (
		<>
			{Object.keys(toastPositions).map((position: PositionsType, index) => {
				const toasts = toastPositions[position];
				return toasts && toasts.length ? (
					<ToasterPosition key={index} position={position} toasts={toasts} />
				) : null;
			})}
		</>
	);
};
export default Toaster;
