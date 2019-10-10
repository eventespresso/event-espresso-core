/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { default as FormColumn } from './form-column';
import { default as FormRow } from './form-row';
import { default as FormInfoBase } from '../../base/form-info-base';

/**
 * FormInfo
 * displays instructions or other important information
 * that users may require to properly complete a form.
 *
 * @function
 * @param {string|Object} formInfo
 * @param {string} dashicon
 * @param {string} htmlClass
 * @param {boolean} dismissable
 * @param {number} colSize
 * @param {number} offset
 * @param {Array} formInfoVars
 */
const FormInfo = ( {
	formInfo,
	dashicon,
	htmlClass,
	dismissable,
	colSize,
	offset,
	formInfoVars,
} ) => {
	const [ dismiss, setDismiss ] = useState( false );
	const onDismiss = () => dismissable ? setDismiss( true ) : null;
	htmlClass = classNames(
		htmlClass,
		'ee-form-info-row',
		{
			dismissed: dismiss,
			'is-dismissable': dismissable,
		}
	);
	return formInfo ? (
		<FormRow htmlClass={ htmlClass }>
			<FormColumn colSize={ colSize } offset={ offset }>
				<FormInfoBase
					formInfo={ formInfo }
					formInfoVars={ formInfoVars }
					dashicon={ dashicon }
					onDismiss={ onDismiss }
				/>
			</FormColumn>
		</FormRow>
	) : null;
};

FormInfo.propTypes = {
	formInfo: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.object,
	] ).isRequired,
	dashicon: PropTypes.string,
	htmlClass: PropTypes.string,
	dismissable: PropTypes.bool,
	colSize: PropTypes.number,
	offset: PropTypes.number,
	formInfoVars: PropTypes.array,
};

FormInfo.defaultProps = {
	dashicon: '',
	htmlClass: '',
	dismissable: true,
	colSize: 6,
	offset: 3,
	formInfoVars: [],
};

export default FormInfo;
