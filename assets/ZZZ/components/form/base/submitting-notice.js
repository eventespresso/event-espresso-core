/**
 * External imports
 */
import classNames from 'classnames';
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
 * @param {string} position
 * @param {string} size
 * @param {Object} style
 * @return {Object} rendered submitting notice
 */
const SubmittingNotice = ( {
	submitting,
	submittingText,
	htmlClass,
	position,
	size,
	style,
} ) => {
	const text = submittingText ?
		submittingText :
		__( 'submitting', 'event_espresso' );
	const classes = classNames( {
		[ htmlClass ]: htmlClass,
		'ee-submitting-notice': true,
		[ `ee-${ size }` ]: size,
		[ `ee-position-${ position }` ]: position,
	} );
	return submitting ?
		<div className="ee-submitting-notice-wrapper">
			<div className={ classes } style={ style }>
				<span className="ee-spinner-wrapper"><Spinner /></span>
				<span className="ee-text-wrapper">{ text }</span>
				<span className="ee-ellipsis-wrapper">
					<span className="ee-ellipsis-span-1">.</span>
					<span className="ee-ellipsis-span-2">.</span>
					<span className="ee-ellipsis-span-3">.</span>
				</span>
			</div>
		</div> :
		null;
};

SubmittingNotice.propTypes = {
	submitting: PropTypes.bool.isRequired,
	submittingText: PropTypes.string,
	htmlClass: PropTypes.string,
	position: PropTypes.oneOf( [ 'above', 'below' ] ),
	size: PropTypes.oneOf( [ 'small', 'default', 'big' ] ),
	style: PropTypes.object,
};

SubmittingNotice.defaultProps = {
	submittingText: '',
	htmlClass: '',
	position: 'above',
	size: 'default',
	style: {},
};

export default SubmittingNotice;
