/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
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
const WithTicketAssignmentsManagerModal = (
	modalPropsCallback = () => null
) => createHigherOrderComponent(
	( OriginalComponent ) => {
		return class extends Component {
			constructor( props ) {
				super( props );
				this.state = { showManager: false };
			}

			/**
			 * opens and closes TicketAssignmentsManagerModal
			 *
			 * @function
			 * @param {Object} event - click event
			 */
			toggleManager = ( event ) => {
				if ( event && event.preventDefault ) {
					event.preventDefault();
					event.stopPropagation();
				}
				this.setState( ( prevState ) => (
					{ showManager: ! prevState.showManager }
				) );
			};

			render() {
				const {
					dateEntity,
					allDateEntities,
					ticketEntity,
					allTicketEntities,
				} = this.props;
				return (
					<Fragment>
						<OriginalComponent
							{ ...this.props }
							ticketAssignmentsIsOpen={ this.state.showManager }
							toggleTicketAssignments={ this.toggleManager }
						/>
						<TicketAssignmentsManagerModal
							modalProps={ modalPropsCallback( this.props ) }
							dateEntity={ dateEntity }
							allDateEntities={ allDateEntities }
							allTicketEntities={ allTicketEntities }
							ticketEntity={ ticketEntity }
							editorOpen={ this.state.showManager }
							toggleEditor={ this.toggleManager }
						/>
					</Fragment>
				);
			}
		};
	},
	'withTicketAssignmentsManagerModal'
);

export default WithTicketAssignmentsManagerModal;
