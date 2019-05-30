/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { SubmittingNotice } from './submitting-notice';
import { EspressoButton } from '../../ui';

/**
 * @function
 * @param {boolean} submitting
 * @param {boolean} disabled
 * @param {string} buttonText
 * @param {string} buttonIcon
 * @param {string} submittingText
 * @param {string} submittingTextPosition
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} noticeClass
 * @param {Object} buttonProps
 * @return {Object} rendered submit button for form
 */
const FormSubmitButton = ( {
	submitting,
	disabled,
	buttonText,
	buttonIcon,
	submittingText,
	submittingTextPosition,
	htmlId,
	htmlClass,
	noticeClass,
	...buttonProps
} ) => {
	buttonText = buttonText ? buttonText : __( 'Submit', 'event_espresso' );
	htmlClass = classNames( {
		[ htmlClass ]: htmlClass,
		'ee-form-button': true,
		'ee-form-button-submit': true,
	} );
	return (
		<Fragment>
			<SubmittingNotice
				submitting={ submitting }
				submittingText={ submittingText }
				position={ submittingTextPosition }
				htmlClass={ noticeClass }
			/>
			<EspressoButton
				type="submit"
				style={ 'primary' }
				buttonText={ buttonText }
				disabled={ submitting || disabled }
				id={ htmlId }
				htmlClass={ htmlClass }
				icon={ buttonIcon }
				{ ...buttonProps }
			/>
		</Fragment>
	);
};

FormSubmitButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	submitting: PropTypes.bool,
	buttonText: PropTypes.string,
	buttonIcon: PropTypes.string,
	submittingText: PropTypes.string,
	submittingTextPosition: PropTypes.string,
	noticeClass: PropTypes.string,
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
};

FormSubmitButton.defaultProps = {
	buttonText: '',
	buttonIcon: 'save',
	submittingText: '',
	submittingTextPosition: 'above',
	noticeClass: '',
	htmlId: '',
	htmlClass: '',
};

export default FormSubmitButton;
