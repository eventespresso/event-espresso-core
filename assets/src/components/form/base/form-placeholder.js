/**
 * External imports
 */
import { Spinner } from '@wordpress/components';
import { _x, sprintf } from '@eventespresso/i18n';
import classNames from 'classnames';

/**
 * Internal imports
 */
import './form-placeholder.css';

/**
 * Displays a notice while the form is loading
 * then fades away when loading is complete
 *
 * @function
 * @param {boolean} loading
 * @param {string} notice
 * @return {Object} spinner
 */
export const FormPlaceholder = ( { loading, notice = '' } ) => {
	notice = notice ||
		sprintf(
			_x( 'loading%s', 'loading...', 'event_espresso' ),
			String.fromCharCode( '8230' )
		);
	return (
		<div
			className={
				classNames( {
					'ee-form-placeholder-div': true,
					'ee-form-fade-out': ! loading,
				} )
			}
		>
			<div className="ee-loading-div">
				<Spinner />
				<span className="ee-form-placeholder-notice">
					{ notice }
				</span>
			</div>
		</div>
	);
};
