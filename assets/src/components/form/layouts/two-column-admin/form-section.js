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

/**
 * FormSection
 * "two-column-admin" form layout strategy component for
 * separating parts of the form into identifiable sections
 *
 * @component
 * @param {Object} children
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {boolean} showRequiredNotice
 * @return {Object} rendered form section
 */
const FormSection = ( {
	children,
	htmlId = '',
	htmlClass = '',
	showRequiredNotice = false,
} ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-section px-0 pt-3 border rounded` :
		'ee-form-section px-0 pt-3 border rounded';
	const formInfo = useMemo( () => showRequiredNotice && (
		<FormInfo
			key="formInfo"
			formInfo={ __(
				'all fields marked with an asterisk (*) are required',
				'event_espresso'
			) }
			dismissable={ false }
		/>
	), [ showRequiredNotice ] );
	return (
		<div id={ htmlId } className={ htmlClass }>
			<div className="px-3">
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
	children: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ),
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
};

export default FormSection;
