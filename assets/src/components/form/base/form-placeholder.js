/**
 * External imports
 */
import classNames from 'classnames';

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
 * @return {Object} spinner
 */
export const FormPlaceholder = ( { loading, notice = '' } ) => {
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
				size={ 'extreme' }
			/>
		</div>
	);
};
