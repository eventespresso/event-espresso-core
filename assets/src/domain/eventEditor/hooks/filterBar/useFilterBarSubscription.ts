import { useEffect } from 'react';

import { useFilterBarService } from '@appLayout/entityList/filterBar';

const useFilterBarSubscription = (): void => {
	const { subscribe } = useFilterBarService('eventEditor');

	useEffect(() => {
		const unsubscribe = subscribe(() => {
			// do some cool stuff here
		});

		return (): void => {
			unsubscribe();
		};
	}, []);
};

export default useFilterBarSubscription;
