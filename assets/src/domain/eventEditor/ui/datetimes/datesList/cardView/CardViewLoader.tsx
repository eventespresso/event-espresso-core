import React, { Suspense } from 'react';
import { LoadingNotice } from '@appDisplay/loadingNotice';

const CardView = React.lazy(() => import('./CardView'));

const CardViewLoader = () => (
	<Suspense fallback={<LoadingNotice />}>
		<CardView />
	</Suspense>
);

export default CardViewLoader;
