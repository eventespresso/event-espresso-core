import React, { useEffect } from 'react';

import { renderDomElement } from '@appServices/utilities';
import Toaster from './Toaster';
import { GetToasts } from './types';

const useRenderToaster = (getToasts: GetToasts, targetElementID?: string): void => {
	const toastPositions = typeof getToasts === 'function' ? getToasts() : null;
	useEffect(() => {
		renderDomElement({
			domElementToRender: <Toaster toastPositions={toastPositions} />,
			containerID: 'espresso-toast-container',
			targetElementID,
		});
	}, [targetElementID, toastPositions]);
};

export default useRenderToaster;
