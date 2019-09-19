/**
 * External imports
 */
import classNames from 'classnames';
import { useMemo } from '@wordpress/element';
import { InlineEditInput } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

const InlineEditTicketName = ( { ticket, wrapperElement } ) => useMemo(
	() => {
		const WrapperElement = wrapperElement ? wrapperElement : 'h1';
		const htmlClass = classNames(
			'ee-editor-ticket-name-heading',
			{ 'ee-long-title': ticket.name && ticket.name.length > 40 }
		);
		return (
			<WrapperElement className={ htmlClass }>
				<InlineEditInput
					htmlId={ `ee-editor-ticket-name-${ ticket.id }` }
					type="text"
					value={ ticket.name }
					onChange={ ( name ) => {
						ticket.name = name;
						return name;
					} }
					label={ __( 'Ticket Name', 'event_espresso' ) }
				/>
			</WrapperElement>
		);
	},
	[ ticket.id, ticket.name ]
);

InlineEditTicketName.propTypes = {
	ticket: PropTypes.object.isRequired,
	wrapperElement: PropTypes.string,
};

export default InlineEditTicketName;
