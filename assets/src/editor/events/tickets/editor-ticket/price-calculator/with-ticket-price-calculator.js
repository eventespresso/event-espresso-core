/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * withTicketPriceCalculator
 * controls toggling of the withTicketPriceCalculatorModal HOC
 * wraps the component that contains the withTicketPriceCalculatorModal
 *
 * @function
 */
const withTicketPriceCalculator = createHigherOrderComponent(
	( OriginalComponent ) => {
		return class extends Component {
			constructor( props ) {
				super( props );
				this.state = { showCalculator: false };
			}

			/**
			 * opens and closes TicketPriceCalculatorModal
			 *
			 * @function
			 */
			toggleCalculator = () => {
				this.setState( ( prevState ) => (
					{ showCalculator: ! prevState.showCalculator }
				) );
			};

			render() {
				return (
					<OriginalComponent
						{ ...this.props }
						showCalculator={ this.state.showCalculator }
						toggleCalculator={ this.toggleCalculator }
					/>
				);
			}
		};
	},
	'withTicketPriceCalculator'
);

export default withTicketPriceCalculator;
