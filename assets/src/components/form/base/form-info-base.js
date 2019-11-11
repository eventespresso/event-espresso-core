/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';
import { Dashicon, IconButton } from '@wordpress/components';
import { parseHtmlPlaceholders } from '@eventespresso/utils';

/**
 * Internal dependencies
 */
import './form-info-base.css';

/**
 * FormInfoBase
 * displays instructions or other important information
 * that users may require to properly complete a form.
 * !!! IMPORTANT !!!
 * if the form info needs to be dismissable, then the
 * component wrapping this (ie: FormRow) should do the following:
 *  - have an html CSS class of "ee-form-info-row"
 *  - manage the "dismiss" state for the component
 *    which can be toggled via the onDismiss callback
 *  - add an html css class of "dismissed" to hide the form info
 *
 * @function
 * @param {Object} props
 * @member {string|Object} formInfo
 * @member {string} dashicon
 * @member {string} htmlClass
 * @member {Function} onDismiss
 * @member {Array} formInfoVars
 */
const FormInfoBase = ( {
	formInfo,
	dashicon,
	htmlClass,
	onDismiss,
	formInfoVars,
} ) => {
	const classes = classNames(
		htmlClass,
		'ee-form-info',
		{
			[ `ee-form-info-type-${ dashicon }` ]: dashicon,
			'has-info-type': dashicon,
		}
	);
	const typeIcon = dashicon ? (
		<Dashicon
			className="ee-form-info-type"
			icon={ dashicon }
			size={ 36 }
		/>
	) : null;
	const dismiss = onDismiss ? (
		<IconButton
			className="ee-form-info-dismiss clickable"
			icon="dismiss"
			onClick={ onDismiss }
		/>
	) : null;
	const parsedFormInfo = parseHtmlPlaceholders( formInfo, formInfoVars );
	return parsedFormInfo ? (
		<div
			aria-label={ __( 'important information', 'event_espresso' ) }
			className={ classes }
		>
			{ typeIcon }
			<div className="ee-form-info-text">{ parsedFormInfo }</div>
			{ dismiss }
		</div>
	) : null;
};

FormInfoBase.propTypes = {
	formInfo: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.object,
	] ).isRequired,
	dashicon: PropTypes.string,
	htmlClass: PropTypes.string,
	onDismiss: PropTypes.func,
	formInfoVars: PropTypes.array,
};

FormInfoBase.defaultProps = {
	dashicon: '',
	htmlClass: '',
	onDismiss: null,
	formInfoVars: [],
};

export default FormInfoBase;
