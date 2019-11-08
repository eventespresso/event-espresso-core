/**
 * External imports
 */
import { useEffect, useState } from '@wordpress/element';
import { EditorModal, ifValidTicketEntity, useIsEditorOpen } from '@eventespresso/editor-hocs';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { FormHandler } from '@eventespresso/components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { TicketPriceCalculatorForm } from './';
import {
	useCalculateTicketPrices,
	useTicketPriceCalculatorEditorId,
	useTicketPriceCalculatorFormData,
	useTicketPriceCalculatorFormDecorator,
} from './hooks';

/**
 * Enhanced TicketPriceCalculatorForm with EditorModal and FormHandler
 *
 * @param {BaseEntity} ticket
 * @param {BaseEntity[]} prices
 * @param {boolean} pricesLoaded
 * @param {Object} otherProps
 * @return {Object} rendered form modal
 */
const TicketPriceCalculatorFormModal = ( {
	ticketEntity: ticket,
	prices,
	pricesLoaded,
	...otherProps
} ) => {
	const priceCount = prices.length;
	const [ prevPriceCount, setPrevPriceCount ] = useState( 0 );
	const editorId = useTicketPriceCalculatorEditorId( ticket );
	const isEditorOpen = useIsEditorOpen( editorId );
	const {
		formData,
		setFormData,
	} = useTicketPriceCalculatorFormData( ticket, prices );
	const calculateTicketPrices = useCalculateTicketPrices( prices, setFormData );
	const formDecorator = useTicketPriceCalculatorFormDecorator( setFormData );
	useEffect( () => {
		const data = {
			...formData,
			updated: priceCount !== prevPriceCount ?
				true :
				formData.updated
		};
		if ( pricesLoaded && data.updated ) {
			calculateTicketPrices( data );
			setPrevPriceCount( priceCount );
		}
	}, [ calculateTicketPrices, formData, prices ] );
	return editorId && pricesLoaded && isEditorOpen ? (
		<EditorModal
			editorId={ editorId }
			editorTitle={ __(
				'Ticket Price Calculator',
				'event_espresso'
			) }
			editorHtmlClass={ 'ee-ticket-price-calculator-modal' }
			editorCloseButtonLabel={ __(
				'close ticket price calculator',
				'event_espresso'
			) }
		>
			<FormHandler
				ticketEntity={ ticket }
				priceEntities={ prices }
				FormComponent={ TicketPriceCalculatorForm }
				decorators={ formDecorator }
				formData={ formData }
				loading={ ! pricesLoaded }
				loadingNotice={
					sprintf(
						_x(
							'loading ticket prices%s',
							'loading ticket prices...',
							'event_espresso'
						),
						String.fromCharCode( 8230 )
					)
				}
				{ ...otherProps }
			/>
		</EditorModal>
	) : null;
};

TicketPriceCalculatorFormModal.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
	prices: PropTypes.array.isRequired,
	pricesLoaded: PropTypes.bool.isRequired,
};

export default ifValidTicketEntity( TicketPriceCalculatorFormModal );
