/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Children, useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import FormInfo from './form-info';
import { default as AutoFormRow } from '../../base/auto-form-row';
import { default as AutoColumnRow } from './auto-column-row';

const defaultFormInfo = {
	requiredNotice: __(
		'all fields marked with an asterisk (*) are required',
		'event_espresso'
	),
	errorsNotice: __(
		'please correct all form errors before proceeding',
		'event_espresso'
	),
};

/**
 * FormSection
 * "two-column-admin" form layout strategy component for
 * separating parts of the form into identifiable sections
 *
 * @param {Object} props
 * @member {Object} children
 * @member {string} htmlId
 * @member {string} htmlClass
 * @member {Object} extraProps
 * @return {Object} rendered form section
 */
const FormSection = ( {
	children,
	htmlId,
	htmlClass,
	...extraProps
} ) => {
	const {
		requiredNotice,
		errorsNotice,
		hasValidationErrors,
		showRequiredNotice,
	} = { ...defaultFormInfo, ...extraProps };

	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-section px-0 pt-3 border rounded` :
		'ee-form-section px-0 pt-3 border rounded';
	const formInfo = useMemo( () => showRequiredNotice && (
		<FormInfo
			key="formInfo"
			formInfo={ requiredNotice }
			dismissable={ false }
		/>
	), [ showRequiredNotice ] );
	const formErrors = hasValidationErrors ? (
		<FormInfo
			formInfo={ errorsNotice }
			dashicon={ 'warning' }
			dismissable={ false }
		/>
	) : null;
	return (
		<div id={ htmlId } className={ htmlClass }>
			<div className="px-3">
				{ formErrors }
				{ formInfo }
				{
					Children.map( children, ( child, index ) => {
						return (
							<AutoFormRow
								key={ index }
								FormElement={ child }
								AutoColumnRow={ AutoColumnRow }
							/>
						);
					} )
				}
			</div>
		</div>
	);
};

FormSection.propTypes = {
	children: PropTypes.node,
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
	extraProps: PropTypes.object,
};

FormSection.defaultProps = {
	htmlId: '',
	htmlClass: '',
};

export default FormSection;
