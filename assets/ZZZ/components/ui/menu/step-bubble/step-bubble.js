/**
 * Internal imports
 */
import StepText from './step-text';

/**
 * External imports
 */
import { isFunction } from 'lodash';
import classNames from 'classnames';
import { pure } from '@wordpress/compose'
import PropTypes from 'prop-types';

export const StepBubble = ( {
	label,
	slug,
	isActive,
	stepValue,
	clickable,
	action,
} ) => {
	const cssClass = classNames(
		'ee-step-bubble-item',
		{ 'ee-step-bubble-active': isActive },
		{ 'ee-clickable': clickable },
	);
	const clickActions = clickable && isFunction( action ) ?
		{
			onClick: () => action( slug ),
			onKeyPress: ( event ) => {
				if ( event.key === 'Enter' ) {
					action( slug );
				}
			},
			role: 'menuitem',
		} :
		{};
	return <button
		className={ cssClass }
		tabIndex={ -1 }
		{ ...clickActions }
	>
			<div className="progress-step-line" />
			<div className="ee-step-bubble">
				<p>{ stepValue }</p>
			</div>
			<StepText content={ label } />
		</button>;
};

StepBubble.propTypes = {
	label: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	stepValue: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	clickable: PropTypes.bool,
	action: PropTypes.func,
};

StepBubble.defaultProps = {
	isActive: false,
	stepValue: 1,
	clickable: true,
	action: () => null,
};

export default pure( StepBubble );
