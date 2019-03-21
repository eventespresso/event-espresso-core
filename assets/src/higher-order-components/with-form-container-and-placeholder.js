/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { FormContainer, FormPlaceholder } from '@eventespresso/components';

/**
 * withFormContainerAndPlaceholder
 * Higher-Order-Component that wraps an Espresso Form component
 * with a FormContainer component and adds a FormPlaceholder
 * for displaying a loading notice
 *
 * @param {Object} Form
 * @return {Object} Form with added FormContainer and FormPlaceholder
 */
export default createHigherOrderComponent(
	( Form ) => {
		return class extends Component {
			render() {
				const { loading, notice, ...formProps } = this.props;
				return (
					<Fragment>
						<FormPlaceholder
							loading={ loading }
							notice={ notice }
						/>
						<FormContainer loading={ loading }>
							<Form { ...formProps } />
						</FormContainer>
					</Fragment>
				);
			}
		};
	},
	'withFormContainerAndPlaceholder'
);
