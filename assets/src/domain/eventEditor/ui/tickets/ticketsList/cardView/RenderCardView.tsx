import React, { Suspense } from 'react';

import { LoadingNotice } from '@infraUI/display';

const CardView = React.lazy(() => import(/* webpackChunkName: "tickets-card-view" */ './CardView'));

const RenderCardView = () => {
	return (
		<Suspense fallback={<LoadingNotice />}>
			<CardView />
		</Suspense>
	);
};

export default RenderCardView;
