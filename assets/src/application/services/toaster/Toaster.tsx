import React from 'react';

import toasterIcons from './toasterIcons';
import { ToasterProps } from './types';

const Toaster: React.FC<ToasterProps> = ({ message = 'loading...', type }) => {
	return (
		<div className='ee-toaster-notice__toast-body'>
			{toasterIcons[type]}
			{message}
		</div>
	);
};
export default Toaster;
