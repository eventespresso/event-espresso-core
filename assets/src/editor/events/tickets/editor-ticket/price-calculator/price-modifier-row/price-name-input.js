/**
 * External imports
 */
import { Fragment, useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
const { FormInput, InputLabel } = twoColumnAdminFormLayout;

/**
 * @param {string} prefix
 * @param {Object} values
 * @param {BaseEntity} priceEntity
 * @return {Function} rendered text input and label for setting price name
 */
const PriceNameInput = ( {
	prefix,
	values,
	priceEntity,
} ) => useMemo( () => (
	<Fragment>
		<InputLabel
			label={ __( 'Label', 'event_espresso' ) }
			htmlFor={ `${ prefix }-name` }
			htmlClass="ee-hidden-label"
		/>
		<FormInput
			key="name"
			type="text"
			name={ `${ prefix }-name` }
			htmlId={ `${ prefix }-name` }
			value={ values[ `${ prefix }-name` ] || '' }
			changeListener={ ( value ) => priceEntity.name = value }
		/>
	</Fragment>
), [ prefix, values[ `${ prefix }-name` ], priceEntity.name ] );

export default PriceNameInput;
