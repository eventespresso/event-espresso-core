/**
 * External imports
 */
import { IconButton, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { useTrashPriceModifier } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import { priceTypeModel } from '@eventespresso/model';
import PropTypes from 'prop-types';

const { BASE_PRICE_TYPES } = priceTypeModel;

const DeletePriceModifierActionButton = ( {
	price,
	priceType,
	ticket,
} ) => {
	const trashPriceModifier = useTrashPriceModifier();
	return useMemo( () => (
		priceType.PRT_ID !== BASE_PRICE_TYPES.BASE_PRICE ? (
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
	), [ ticket.id, price.id, priceType.PRT_ID ] );
};

DeletePriceModifierActionButton.propTypes = {
	price: PropTypes.object.isRequired,
	priceType: PropTypes.object.isRequired,
	ticket: PropTypes.object.isRequired,
};

export default DeletePriceModifierActionButton;
