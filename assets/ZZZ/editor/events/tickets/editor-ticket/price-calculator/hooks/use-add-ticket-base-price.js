/**
 * External imports
 */
import { useCallback, useState } from '@wordpress/element';
import { useAddPriceModifier } from '@eventespresso/hooks';
import { parseMoneyValue } from '@eventespresso/utils';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * creates a  base price type price entity in the data store
 * and adds relation to the supplied ticket entity
 *
 * @function
 * @param {BaseEntity} ticket
 * @return {Object} callback for creating a base price for the ticket
 */
const useAddTicketBasePrice = ( ticket ) => {
	const addPriceModifier = useAddPriceModifier();
	const [ inProgress, setInProgress ] = useState( false );
	return {
		addTicketBasePrice: useCallback( () => {
			if ( ! inProgress ) {
				setInProgress( true );
				addPriceModifier(
					ticket,
					{
						PRT_ID: 1,
						PRC_name: '',
						PRC_desc: '',
						PRC_amount: new Money(
							parseMoneyValue( ticket.price ),
							SiteCurrency
						),
						PRC_order: 1,
					}
				);
			}
		} ),
		inProgress,
	};
};

export default useAddTicketBasePrice;
