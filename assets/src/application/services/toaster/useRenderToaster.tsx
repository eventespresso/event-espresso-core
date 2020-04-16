import React, { useEffect } from 'react';

import { renderDomElement } from '@appServices/utilities';
// import { useSystemNotifications } from '@appServices/toaster';
// import { ThemeProvider } from '@appServices/theme';
// import { RenderToasterProps } from './types';
import Toaster from './Toaster';
import { GetToasts } from './types';

const useRenderToaster = (getToasts: GetToasts, targetElementID?: string): void => {
	// const { getToasts } = useSystemNotifications();
	const toastPositions = typeof getToasts === 'function' ? getToasts() : null;
	// const toasterRef = useRef<JSX.Element[]>();
	useEffect(() => {
		// if (typeof getToasts === 'function' /* && !toasterRef.current */) {
		// 	const toastPositions = getToasts();
		// const toasts = renderToasts();
		// console.log('%c useRenderToasts', 'color: DeepSkyBlue;', toasts);
		// toasterRef.current = toasts;
		console.log('%c useRenderToasts', 'color: DeepSkyBlue;', toastPositions);
		renderDomElement({
			// domElementToRender: <ThemeProvider>{renderToasts()}</ThemeProvider>,
			domElementToRender: <Toaster toastPositions={toastPositions} />,
			containerID: 'espresso-toast-container',
			targetElementID,
		});
		// }
		// return (): void => {
		// 	// toasterRef.current = null;
		// };
	}, [targetElementID, toastPositions]);
};

export default useRenderToaster;
