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
import EditTicketForm from '../edit-form/edit-ticket-form';
import { ticketEntityFormSchema } from '../edit-form/ticket-entity-form-schema';
import { TicketPriceCalculatorMenuItem } from '../price-calculator/ticket-price-calculator-menu-item';

const EditTicketFormModal = withEditorModal( {
	title: __( 'Ticket Editor', 'event_espresso' ),
	customClass: 'ee-ticket-editor-modal',
	closeButtonLabel: __( 'close ticket editor', 'event_espresso' ),
} )( ( {
	ticket,
	...otherProps
} ) => {
	const loadHandler = useCallback(
		() => {
			return ticketEntityFormSchema( ticket );
		},
		[ ticket ]
	);
	return <EditTicketForm
		loadHandler={ loadHandler }
		submitHandler={ null }
		resetHandler={ null }
		ticket={ ticket }
		{ ...otherProps }
	/>;
} );

export default createHigherOrderComponent(
	( WrappedComponent ) => ( {
		ticket,
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
		}, [ ticket ] );
		const calculator = <TicketPriceCalculatorMenuItem
			ticket={ ticket }
			noBasePrice={ noBasePrice }
			onOpenTicketCalculator={ toggleTicketEditor }
			toggleCalculator={ toggleCalculator }
			onCloseTicketCalculator={ toggleTicketEditor }
			doRefresh={ doRefresh }
		/>;
		return <Fragment>
			<WrappedComponent
				{ ...otherProps }
				ticket={ ticket }
				toggleTicketEditor={ toggleTicketEditor }
				toggleCalculator={ toggleCalculator }
				doRefresh={ doRefresh }
			/>
			<EditTicketFormModal
				{ ...otherProps }
				ticket={ ticket }
				editorOpen={ showEditor }
				onOpen={ onOpenTicketEditor }
				onClose={ onCloseTicketEditor }
				toggleEditor={ toggleTicketEditor }
				calculator={ calculator }
				doRefresh={ doRefresh }
			/>
		</Fragment>;
	},
	'withEditTicketFormModal'
);
