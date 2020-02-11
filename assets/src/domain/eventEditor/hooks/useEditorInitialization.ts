import { useEffect } from 'react';
import useInitQueries from '../services/apollo/initialization/useInitQueries';
import useI18nData from '../services/apollo/initialization/useI18nData';
import { setLocaleData } from '@wordpress/i18n';
import useEntityActions from '@appLayout/entityActionMenu/useEntityActions';
import useEntityActionHandler from '../ui/entityActionMenu/useEntityActionHandler';
import { DateMenuKey, TicketMenuKey, Domain } from '../ui/entityActionMenu/types';

const useEditorInitialization = (): void => {
	// init i18n
	const localeData = useI18nData();
	setLocaleData(localeData);

	const { subscribe } = useEntityActions<Domain, DateMenuKey | TicketMenuKey>('eventEditor');
	const entityActionHandler = useEntityActionHandler();

	useEffect(() => {
		const unsubscribe = subscribe(entityActionHandler);

		return unsubscribe;
	}, []);

	// Fire initial queries
	useInitQueries();
};

export default useEditorInitialization;
