/**
 * External imports
 */
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';
import { Spinner } from '@wordpress/components';

/**
 * Internal imports
 */
import './submitting-notice.css';

/**
 * A notice indicating that an input or form is saving or submitting
 *
 * @function
 * @param {boolean} submitting
 * @param {string} submittingText
 * @param {string} htmlClass
 * @param {string} size
 * @param {Object} style
 * @return {Object} rendered submitting notice
 */
export const SubmittingNotice = ( {
	submitting,
	submittingText = '',
	htmlClass = '',
	size = 'medium',
	style = {},
} ) => {
	// submitting = true;
	submittingText = submittingText ?
		submittingText :
		__( 'submitting', 'event_espresso' );
	htmlClass = htmlClass ?
		`${ htmlClass } ee-submitting-notice ee-small-shadow` :
		'ee-submitting-notice ee-small-shadow';
	htmlClass = size ?
		`${ htmlClass } ee-${ size }` :
		htmlClass;
	return submitting ?
		<div className="ee-submitting-notice-wrapper">
			<div className={ htmlClass } style={ style }>
				<Spinner />
				<span className="ee-ellipsis-span">{ submittingText }</span>
			</div>
		</div> :
		null;
};

SubmittingNotice.propTypes = {
	submitting: PropTypes.bool.isRequired,
	submittingText: PropTypes.string,
	htmlClass: PropTypes.string,
	size: PropTypes.oneOf( [ 'small', 'medium', 'big' ] ),
	anchored: PropTypes.bool,
};
