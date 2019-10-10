/**
 * External imports
 */
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';
import { Dashicon, IconButton } from '@wordpress/components';

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
	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-info` :
		'ee-form-info';
	htmlClass = dashicon ?
		`${ htmlClass } ee-form-info-type-${ dashicon } has-info-type` :
		htmlClass;
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
	// parseHtmlPlaceholders parse-html-placeholders
	if ( ! isEmpty( formInfoVars ) ) {
		const formInfoText = [];
		const chunks = formInfo.split( '%%var%%' );
		if ( chunks.length !== formInfoVars.length ) {
			throw new RangeError(
				'The number of notice placeholders does not match' +
				' the number of form info variables supplied.'
			);
		}
		for ( let x = 0; x < chunks.length; x++ ) {
			if ( chunks[ x ] ) {
				formInfoText.push( chunks[ x ] );
			}
			if ( formInfoVars[ x ] ) {
				formInfoText.push( formInfoVars[ x ] );
			}
		}
		formInfo = formInfoText;
	}
	return formInfo ? (
		<div
			aria-label={ __( 'important information', 'event_espresso' ) }
			className={ htmlClass }
		>
			{ typeIcon }
			<div className="ee-form-info-text">{ formInfo }</div>
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
