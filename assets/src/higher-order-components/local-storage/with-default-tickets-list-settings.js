/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import useLocalStorage from './use-local-storage';

const withDefaultTicketsListSettings = createHigherOrderComponent(
	( EntityListWithFilterBar ) => ( { ...otherProps } ) => {
		const [
			defaultTicketsListView,
			setDefaultTicketsListView,
		] = useLocalStorage( 'defaultTicketsListView' );
		const [
			defaultTicketsListPerPage,
			setDefaultTicketsListPerPage,
		] = useLocalStorage( 'defaultTicketsListPerPage' );

		return (
			<EntityListWithFilterBar
				{ ...otherProps }
				defaultTicketsListView={ defaultTicketsListView || 'list' }
				setDefaultTicketsListView={ setDefaultTicketsListView }
				defaultTicketsListPerPage={ defaultTicketsListPerPage || 12 }
				setDefaultTicketsListPerPage={ setDefaultTicketsListPerPage }
			/>
		);
	},
	'withDefaultTicketsListSettings'
);

export default withDefaultTicketsListSettings;
