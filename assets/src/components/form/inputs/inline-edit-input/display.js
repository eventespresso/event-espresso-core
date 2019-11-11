/**
 * External imports
 */
import { isFunction } from 'lodash';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { InfinitySymbol } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
import Spinner from './spinner';

/**
 * renders the text in display mode
 *
 * @param {Object} props
 * @return {Object} rendered span tag
 */
export default ( {
	value,
	valueType,
	valueFormatter,
	formatterSettings,
	noticeStyle,
	onEdit,
	onKeyDown,
	saving,
	label,
} ) => {
	let valueToDisplay = valueType === 'infinite' ?
		<InfinitySymbol value={ value } /> :
		value;
	valueToDisplay = isFunction( valueFormatter ) ?
		valueFormatter( value, formatterSettings ) :
		valueToDisplay;
	valueToDisplay = valueToDisplay ?
		valueToDisplay :
		(
			<span className="ee-inline-edit-placeholder">
				{ sprintf(
					_x( 'click to add %s', 'some text', 'event_espresso' ),
					label
				) }
			</span>
		);
	return (
		<>
			<Spinner style={ noticeStyle } submitting={ saving } />
			<span
				role="button"
				tabIndex="0"
				onClick={ onEdit }
				onFocus={ onEdit }
				onKeyDown={ onKeyDown }
				className="ee-inline-edit-text clickable"
				aria-label={ __( 'click to edit', 'event_espresso' ) }
			>
				{ valueToDisplay }
			</span>
		</>
	);
};
