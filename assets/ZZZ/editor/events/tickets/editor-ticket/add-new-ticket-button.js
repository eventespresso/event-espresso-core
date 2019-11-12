/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { EspressoButton, LoadingNotice } from '@eventespresso/components';
import { useBasePriceType } from '@eventespresso/hooks';
import { cancelClickEvent } from '@eventespresso/utils';
import { __ } from '@eventespresso/i18n';

/**
 * @param {Object} props
 * @member {boolean} loading
 * @member {Function} setLoading
 * @return {Object} rendered "Add New Ticket" Button
 */
const AddNewTicketButton = ( { loading, setLoading } ) => {
	const basePriceType = useBasePriceType();
	return useMemo( () => (
		<>
			<LoadingNotice
				loading={ loading }
				htmlClass={ 'ee-loading-new-entity' }
			/>
			<EspressoButton
				icon={ 'tickets-alt' }
				buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
				onClick={ ( click ) => {
					cancelClickEvent( click, 'AddNewTicketButton' );
					setLoading( true );
				} }
				disabled={ ! basePriceType }
			/>
		</>
	), [ loading, setLoading, basePriceType ] );
};

export default AddNewTicketButton;
