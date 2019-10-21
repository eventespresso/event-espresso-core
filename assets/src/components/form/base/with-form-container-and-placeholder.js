/**
 * External imports
 */
import { compose, createHigherOrderComponent, withInstanceId } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { FormContainer, FormPlaceholder } from '../';

/**
 * withFormContainerAndPlaceholder
 * Higher-Order-Component that wraps an Espresso Form component
 * with a FormContainer component and adds a FormPlaceholder
 * for displaying a loading notice
 *
 * @param {Object} Form
 * @return {Object} Form with added FormContainer and FormPlaceholder
 */
export default compose( [
	withInstanceId,
	createHigherOrderComponent(
		( Form ) => {
			return ( {
				instanceId,
				loading,
				loadingNotice,
				...formProps
			} ) => {
				return (
					<Fragment>
						<FormPlaceholder
							key={ instanceId }
							loading={ loading }
							notice={ loadingNotice }
						/>
						<FormContainer loading={ loading }>
							<Form { ...formProps } />
						</FormContainer>
					</Fragment>
				);
			};
		},
		'withFormContainerAndPlaceholder'
	),
] );
