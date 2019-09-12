/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { parseInfinity } from '@eventespresso/eejs';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import useTicketFormInputPrefix from './use-ticket-form-input-prefix';

/**
 * returns an object mapping Ticket Entity properties to form prefixes
 *
 * @function
 * @param {Object} ticketEntity
 * @return {Object} rendered form
 */
const useTicketFormSchema = ( ticketEntity ) => {
	const prefix = useTicketFormInputPrefix( ticketEntity );
	return useMemo( () => {
		if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			return {};
		}
		return {
			[ `${ prefix }-id` ]: ticketEntity.id,
			[ `${ prefix }-name` ]: ticketEntity.name || '',
			[ `${ prefix }-description` ]: ticketEntity.description || '',
			[ `${ prefix }-qty` ]: parseInfinity( ticketEntity.qty ),
			[ `${ prefix }-sold` ]: ticketEntity.sold || 0,
			[ `${ prefix }-reserved` ]: ticketEntity.reserved || 0,
			[ `${ prefix }-uses` ]: parseInfinity( ticketEntity.uses ),
			[ `${ prefix }-required` ]: ticketEntity.required || false,
			[ `${ prefix }-min` ]: ticketEntity.min || null,
			[ `${ prefix }-max` ]: parseInfinity( ticketEntity.max ),
			[ `${ prefix }-price` ]: ticketEntity.price && ticketEntity.price.amount ?
				ticketEntity.price.amount.toNumber() :
				null,
			[ `${ prefix }-startDate` ]: ticketEntity.startDate.toISO(),
			[ `${ prefix }-endDate` ]: ticketEntity.endDate.toISO(),
			[ `${ prefix }-taxable` ]: ticketEntity.taxable || false,
			[ `${ prefix }-order` ]: ticketEntity.order || 0,
			[ `${ prefix }-isDefault` ]: ticketEntity.isDefault || false,
			[ `${ prefix }-reverse_calculate` ]: ticketEntity.reverse_calculate || false,
			[ `${ prefix }-wpUser` ]: ticketEntity.wpUser || 0,
			[ `${ prefix }-parent` ]: ticketEntity.parent || 0,
			[ `${ prefix }-deleted` ]: ticketEntity.deleted || false,
		};
	}, [
		ticketEntity.id,
		ticketEntity.name,
		ticketEntity.description,
		ticketEntity.startDate.toISO(),
		ticketEntity.endDate.toISO(),
		ticketEntity.qty,
		ticketEntity.sold,
		ticketEntity.reserved,
		ticketEntity.uses,
		ticketEntity.required,
		ticketEntity.min,
		ticketEntity.max,
		ticketEntity.price.amount.toNumber(),
		ticketEntity.taxable,
		ticketEntity.isDefault,
		ticketEntity.reverse_calculate,
		ticketEntity.wpUser,
		ticketEntity.order,
		ticketEntity.parent,
		ticketEntity.deleted,
	] );
};

export default useTicketFormSchema;
