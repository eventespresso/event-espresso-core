/**
 * External imports
 */
import { Fragment, useState, useCallback } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import TicketAssignmentsManagerModal from './ticket-assignments-manager-modal';

/**
 * TicketAssignmentsManagerModal
 * controls toggling of the modal
 * wraps the component that contains the withTicketAssignmentsManagerModal
 *
 * @param {function} modalPropsCallback Overrides for the modal props set on the
 * manager.  This receives `ownProps` as an argument.
 *
 * @return {function} A composed component
 */
const withTicketAssignmentsManagerModal = (
	modalPropsCallback = () => null
) => createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		const {
			dateEntity,
			ticketEntity,
		} = props;
		const [ showManager, setShowManager ] = useState( false );
		const toggleManager = useCallback( ( event ) => {
			if ( event ) {
				event.preventDefault();
				event.stopPropagation();
			}
			setShowManager(
				( prevShowManager ) => ! prevShowManager
			);
		}, [] );
		return (
			<Fragment>
				<WrappedComponent
					{ ...props }
					ticketAssignmentsIsOpen={ showManager }
					toggleTicketAssignments={ toggleManager }
				/>
				<TicketAssignmentsManagerModal
					modalProps={ modalPropsCallback( props ) }
					dateEntity={ dateEntity }
					ticketEntity={ ticketEntity }
					editorOpen={ showManager }
					toggleEditor={ toggleManager }
				/>
			</Fragment>
		);
	},
	'withTicketAssignmentsManagerModal'
);

export default withTicketAssignmentsManagerModal;
