import React from 'react';

import { ToasterProps } from './types';

const Toaster: React.FC<ToasterProps> = ({ icon, message = 'loading...' }) => {
	return (
		<div className='ee-toaster-notice__toast-body'>
			{icon && icon}
			{message}
		</div>
	);
};
export default Toaster;
