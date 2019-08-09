/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import { EspressoButton } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { withTicketAssignmentsManagerModal }
	from '../../ticket-assignments-manager';

const nullFunc = () => null;

const TicketAssignmentsButton = ( { openTicketAssignments } ) => useMemo(
	() => (
		<EspressoButton
			icon={ 'tickets-alt' }
			buttonText={ __(
				'Ticket Assignments',
				'event_espresso'
			) }
			onClick={ openTicketAssignments || nullFunc }
		/>
	),
	[ openTicketAssignments ]
);

export default compose( [
	withTicketAssignmentsManagerModal,
	( WrappedComponent ) => ( {
		isEditorOpen: isTicketAssignmentsOpen,
		openEditor: openTicketAssignments,
		closeEditor: closeTicketAssignments,
		...otherProps
	} ) => {
		return <WrappedComponent
			{ ...otherProps }
			isTicketAssignmentsOpen={ isTicketAssignmentsOpen }
			openTicketAssignments={ openTicketAssignments }
			closeTicketAssignments={ closeTicketAssignments }
			onCloseDateEditor={ openTicketAssignments }
		/>;
	},
] )( TicketAssignmentsButton );

/*
( () => (
		{
			title: __(
				'Ticket Assignments for All Event Dates',
				'event_espresso'
			),
			closeButtonLabel: null,
		}
	) )
*/
