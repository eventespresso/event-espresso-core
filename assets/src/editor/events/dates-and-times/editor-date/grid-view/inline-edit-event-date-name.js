/**
 * External imports
 */
import classNames from 'classnames';
import { useMemo } from '@wordpress/element';
import { InlineEditInput } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

const InlineEditEventDateName = ( { eventDate, wrapperElement } ) => useMemo(
	() => {
		const WrapperElement = wrapperElement ? wrapperElement : 'h1';
		const htmlClass = classNames(
			'ee-editor-date-name-heading',
			{ 'ee-long-title': eventDate.name && eventDate.name.length > 40 }
		);
		return (
			<WrapperElement className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-name-${ eventDate.id }` }
					type="text"
					value={ eventDate.name }
					onChange={ ( name ) => {
						eventDate.name = name;
					} }
					label={ __( 'Date Name', 'event_espresso' ) }
					noticeStyle={
						{
							left: '50px',
						}
					}
				/>
			</WrapperElement>
		);
	},
	[ eventDate.id, eventDate.name ]
);

export default InlineEditEventDateName;
