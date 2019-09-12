/**
 * External imports
 */
import classNames from 'classnames';
import { useMemo } from '@wordpress/element';
import { InlineEditInput } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

const InlineEditEventDateDescription = ( {
	eventDate,
	showDesc,
	wrapperElement,
} ) => useMemo(
	() => {
		const WrapperElement = wrapperElement ? wrapperElement : 'div';
		const htmlClass = classNames(
			'ee-editor-date-desc-div',
			{ 'ee-date-desc-excerpt': showDesc === 'excerpt' }
		);
		return (
			<WrapperElement className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-desc-${ eventDate.id }` }
					type="textarea"
					value={ eventDate.description }
					onChange={ ( desc ) => {
						eventDate.description = desc;
						return desc;
					} }
					label={ __( 'Date Description', 'event_espresso' ) }
				/>
			</WrapperElement>
		);
	},
	[ eventDate.id, eventDate.description, showDesc, wrapperElement ]
);

export default InlineEditEventDateDescription;
