/**
 * External imports
 */
import { Fragment, useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

const { FormInput, InputLabel } = twoColumnAdminFormLayout;

/**
 * @param {string} prefix
 * @param {Object} values
 * @return {Function} rendered text input and label for viewing price ID
 */
const PriceIdInput = ( { prefix, values } ) => useMemo( () => (
	<Fragment>
		<InputLabel
			label={ __( 'Price ID', 'event_espresso' ) }
			htmlFor={ `${ prefix }-id` }
			htmlClass="ee-hidden-label"
		/>
		<FormInput
			key="id"
			type="text"
			name={ `${ prefix }-id` }
			htmlId={ `${ prefix }-id` }
			value={ values[ `${ prefix }-id` ] }
			disabled
		/>
	</Fragment>
), [ prefix, values[ `${ prefix }-id` ] ] );

export default PriceIdInput;
