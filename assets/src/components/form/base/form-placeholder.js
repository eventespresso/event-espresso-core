/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import './form-placeholder.css';
import LoadingNotice from '../../ui/loading-notice/';

/**
 * Displays a notice while the form is loading
 * then fades away when loading is complete
 *
 * @function
 * @param {boolean} loading
 * @param {string} notice
 * @param {string} size one of: extreme, huge, big, default, small, tiny
 * @return {Object} rendered form placeholder with loading notice & spinner
 */
const FormPlaceholder = ( { loading, notice, size } ) => {
	return (
		<div
			className={
				classNames( {
					'ee-form-placeholder-div': true,
					'ee-form-fade-out': ! loading,
				} )
			}
		>
			<LoadingNotice
				loading={ loading }
				notice={ notice }
				size={ size }
			/>
		</div>
	);
};

FormPlaceholder.propTypes = {
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
};

FormPlaceholder.defaultProps = {
	notice: '',
	size: 'extreme',
};

export default FormPlaceholder;

