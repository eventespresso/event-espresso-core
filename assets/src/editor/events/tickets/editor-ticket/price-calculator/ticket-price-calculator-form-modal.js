/**
 * External imports
 */
import { useEffect } from '@wordpress/element';
import { EditorModal, ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { FormHandler } from '@eventespresso/components';

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
	const editorId = useTicketPriceCalculatorEditorId( ticket );
	const {
		formData,
		setFormData,
	} = useTicketPriceCalculatorFormData( ticket, prices );
	const calculateTicketPrices = useCalculateTicketPrices( prices, setFormData );
	const formDecorator = useTicketPriceCalculatorFormDecorator( setFormData );
	useEffect(
		() => calculateTicketPrices( formData ),
		[ formData ]
	);
	return editorId ? (
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

export default ifValidTicketEntity( TicketPriceCalculatorFormModal );
