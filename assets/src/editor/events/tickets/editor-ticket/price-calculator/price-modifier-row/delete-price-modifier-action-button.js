/**
 * External imports
 */
import { IconButton, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { priceTypeModel } from '@eventespresso/model';

import useTrashPriceModifier from '../../../../hooks/use-trash-price-modifier';

const { BASE_PRICE_TYPES } = priceTypeModel;

const DeletePriceModifierActionButton = ( {
	price,
	priceType,
	ticket,
} ) => {
	const trashPriceModifier = useTrashPriceModifier();
	return useMemo( () => (
		priceType.prtId !== BASE_PRICE_TYPES.BASE_PRICE ? (
			<Tooltip
				position={ 'top left' }
				text={ __( 'click to delete price modifier', 'event_espresso' ) }
			>
				<IconButton
					aria-label={ __(
						'click to delete price modifier',
						'event_espresso'
					) }
					icon="trash"
					onClick={
						() => trashPriceModifier( price, ticket )
					}
				/>
			</Tooltip>
		) : null
	), [ ticket.id, price.id, priceType.prtId ] );
};

export default DeletePriceModifierActionButton;
