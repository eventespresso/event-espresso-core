/* import React, { Suspense } from 'react';

import { LoadingNotice } from '@appDisplay/loadingNotice';
import { DatepickerProps, TimepickerProps } from './types'; */

// const LazyDatepicker = React.lazy(() => import(/* webpackChunkName: "datepicker" */ './Datepicker'));
// const LazyTimepicker = React.lazy(() => import(/* webpackChunkName: "timepicker" */ './Timepicker'));

/* export const Datepicker: React.FC<DatepickerProps> = (props) => {
	return (
		<Suspense fallback={<LoadingNotice />}>
			<LazyDatepicker {...props} />
		</Suspense>
	);
};

export const Timepicker: React.FC<TimepickerProps> = (props) => {
	return (
		<Suspense fallback={<LoadingNotice />}>
			<LazyTimepicker {...props} />
		</Suspense>
	);
}; */

export { default as Datepicker } from './Datepicker';

export { default as Timepicker } from './Timepicker';
