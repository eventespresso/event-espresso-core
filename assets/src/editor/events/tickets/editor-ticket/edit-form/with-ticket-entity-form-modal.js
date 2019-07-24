/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/editor-hocs';
import { useCallback, Fragment, useState } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import TicketEntityForm from './ticket-entity-form';
import ticketEntityFormSchema from './ticket-entity-form-schema';
import { TicketPriceCalculatorMenuItem } from '../price-calculator/ticket-price-calculator-menu-item';

const TicketEntityFormModal = withEditorModal( {
	title: __( 'Ticket Editor', 'event_espresso' ),
	customClass: 'ee-ticket-editor-modal',
	closeButtonLabel: __( 'close ticket editor', 'event_espresso' ),
} )( ( {
	ticketEntity,
	...otherProps
} ) => {
	const loadHandler = useCallback(
		() => {
			return ticketEntityFormSchema( ticketEntity );
		},
		[ ticketEntity ]
	);
	return <TicketEntityForm
		loadHandler={ loadHandler }
		ticketEntity={ ticketEntity }
		{ ...otherProps }
	/>;
} );

export default createHigherOrderComponent(
	( WrappedComponent ) => ( {
		ticketEntity,
		noBasePrice,
		doRefresh,
		toggleCalculator,
		onCloseTicketEditor = () => null,
		onOpenTicketEditor = () => null,
		...otherProps
	} ) => {
		const [ showEditor, setShowEditor ] = useState( false );
		const toggleTicketEditor = useCallback( () => {
			setShowEditor( ( prevShowEditor ) => ! prevShowEditor );
		}, [ ticketEntity ] );
		const calculator = <TicketPriceCalculatorMenuItem
			ticketEntity={ ticketEntity }
			noBasePrice={ noBasePrice }
			onOpenTicketCalculator={ toggleTicketEditor }
			toggleCalculator={ toggleCalculator }
			onCloseTicketCalculator={ toggleTicketEditor }
			doRefresh={ doRefresh }
		/>;
		return <Fragment>
			<WrappedComponent
				{ ...otherProps }
				ticketEntity={ ticketEntity }
				toggleTicketEditor={ toggleTicketEditor }
				toggleCalculator={ toggleCalculator }
				doRefresh={ doRefresh }
			/>
			<TicketEntityFormModal
				{ ...otherProps }
				ticketEntity={ ticketEntity }
				editorOpen={ showEditor }
				onOpen={ onOpenTicketEditor }
				onClose={ onCloseTicketEditor }
				toggleEditor={ toggleTicketEditor }
				calculator={ calculator }
				doRefresh={ doRefresh }
			/>
		</Fragment>;
	},
	'withTicketEntityFormModal'
);
