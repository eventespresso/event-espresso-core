/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import useLocalStorage from './use-local-storage';

const withDefaultDatesListSettings = createHigherOrderComponent(
	( EntityListWithFilterBar ) => ( { ...otherProps } ) => {
		const [
			defaultDatesListView,
			setDefaultDatesListView,
		] = useLocalStorage( 'defaultDatesListView' );
		const [
			defaultDatesListPerPage,
			setDefaultDatesListPerPage,
		] = useLocalStorage( 'defaultDatesListPerPage' );

		return (
			<EntityListWithFilterBar
				{ ...otherProps }
				defaultDatesListView={ defaultDatesListView || 'list' }
				setDefaultDatesListView={ setDefaultDatesListView }
				defaultDatesListPerPage={ defaultDatesListPerPage || 24 }
				setDefaultDatesListPerPage={ setDefaultDatesListPerPage }
			/>
		);
	},
	'withDefaultDatesListSettings'
);

export default withDefaultDatesListSettings;
