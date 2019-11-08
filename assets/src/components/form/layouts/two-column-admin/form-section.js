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
		'All fields marked with an asterisk (*) are required',
		'event_espresso'
	),
	errorsNotice: __(
		'Please correct all form errors before proceeding',
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
		formInfoNotice,
		requiredNotice,
		errorsNotice,
		hasValidationErrors,
		showRequiredNotice,
	} = { ...defaultFormInfo, ...extraProps };

	const classes = htmlClass ?
		`${ htmlClass } ee-form-section px-0 pt-3 border rounded` :
		'ee-form-section px-0 pt-3 border rounded';
	const formInfo = useMemo(
		() => formInfoNotice ? (
			<FormInfo
				key="formInfo"
				formInfo={ formInfoNotice }
				dismissable={ true }
			/>
		) : null,
		[ formInfoNotice ]
	);
	const formErrors = useMemo(
		() => errorsNotice && hasValidationErrors ? (
			<FormInfo
				formInfo={ errorsNotice }
				dashicon={ 'warning' }
				dismissable={ false }
			/>
		) : null,
		[ hasValidationErrors, errorsNotice ]
	);
	const requiredFields = useMemo(
		() => requiredNotice && showRequiredNotice ? (
			<FormInfo
				key="requiredFields"
				formInfo={ requiredNotice }
				dismissable={ false }
				htmlClass={ 'ee-focus-priority-8' }
			/>
		) : null,
		[ showRequiredNotice, requiredNotice ]
	);
	return (
		<div id={ htmlId } className={ classes }>
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
				{ requiredFields }
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
