/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Spinner } from '@wordpress/components';
import { _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import './style.css';

/**
 * Displays a notice while another UI component is loading
 *
 * @function
 * @param {boolean} loading
 * @param {string} notice
 * @param {string} size one of: extreme, huge, big, default, small, tiny
 * @param {Array|Object|string} htmlClass
 * @return {Object} rendered loading notice & spinner
 */
const LoadingNotice = ( { loading, notice, size, htmlClass } ) => {
	const noticeText = notice ||
		sprintf(
			_x( 'loading%s', 'loading...', 'event_espresso' ),
			String.fromCharCode( '8230' )
		);
	const classes = classNames(
		'ee-loading-notice-div',
		`ee-loading-notice-${ size }`,
		htmlClass
	);
	return !! loading && (
		<div className={ classes } >
			<Spinner/>
			<span className="ee-loading-notice">{ noticeText }</span>
		</div>
	);
};

LoadingNotice.propTypes = {
	loading: PropTypes.bool.isRequired,
	notice: PropTypes.string,
	size: PropTypes.oneOf( [
		'extreme',
		'huge',
		'big',
		'default',
		'small',
		'tiny',
	] ),
	htmlClass: PropTypes.oneOfType( [
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	] ),
};

LoadingNotice.defaultProps = {
	notice: '',
	size: 'default',
};

export default LoadingNotice;
