import React from 'react';

import { ThemeProvider } from '@appServices/theme';
import ToasterPosition from './ToasterPosition';
import { PositionsType } from './types';
import './style.scss';

const Toaster = ({ toastPositions }): JSX.Element => {
	console.log('%c Toaster toastPositions ', 'color: DeepPink;', toastPositions);
	return (
		<>
			<ThemeProvider>
				{Object.keys(toastPositions).map((position: PositionsType, index) => {
					const toasts = toastPositions[position];
					console.log('%c toasts ' + position, 'color: DeepPink;', toasts);
					return toasts && toasts.length ? (
						<ToasterPosition key={index} position={position} toasts={toasts} />
					) : null;
				})}
			</ThemeProvider>
		</>
	);
};
export default Toaster;
