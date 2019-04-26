/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * withTicketAssignmentsManager
 * controls toggling of the withTicketAssignmentsManagerModal HOC
 * wraps the component that contains the withTicketAssignmentsManagerModal
 *
 * @function
 */
const withTicketAssignmentsManager = createHigherOrderComponent(
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
			 */
			toggleManager = () => {
				this.setState( ( prevState ) => (
					{ showManager: ! prevState.showManager }
				) );
			};

			render() {
				return (
					<OriginalComponent
						{ ...this.props }
						showTicketAssignments={ this.state.showManager }
						toggleTicketAssignments={ this.toggleManager }
					/>
				);
			}
		};
	},
	'withTicketAssignmentsManager'
);

export default withTicketAssignmentsManager;
