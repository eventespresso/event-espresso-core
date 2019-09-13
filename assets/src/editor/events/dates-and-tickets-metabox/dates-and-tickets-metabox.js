/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	Dashicon,
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import {
	EspressoIcon,
	FormContainer,
	FormPlaceholder,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import '../../editor.css';
import { EditorDateEntitiesList } from '../dates-and-times';
import { EditorTicketEntitiesList } from '../tickets';
import useEditorInitialization
	from '../initialization/use-editor-initialization.js';
import useEditorPersistence
	from '../initialization/use-editor-persistence';

const DatesAndTicketsMetabox = ( { eventId } ) => {
	const { eventEntityLoaded } = useEditorInitialization( eventId );
	useEditorPersistence( eventId );
	return (
		<Fragment>
			<FormPlaceholder
				loading={ ! eventEntityLoaded }
				notice={ sprintf(
					_x(
						'loading event dates and available tickets%s',
						'loading event dates and available tickets...',
						'event_espresso'
					),
					String.fromCharCode( 8230 )
				) }
			/>
			<FormContainer
				loading={ ! eventEntityLoaded }
				id={ `ee-editor-event-dates-and-tickets-${ eventId }` }
				htmlClass="ee-editor-event-dates-and-tickets"
			>
				<h1 className="ee-metabox-heading">
					<EspressoIcon icon="calendar" />
					{ __( 'Event Dates', 'event_espresso' ) }
				</h1>
				<Panel>
					<PanelBody
						id={ `ee-editor-event-dates-${ eventId }` }
						className="ee-editor-event-dates espresso-editor"
					>
						<PanelRow
							className="ee-editor-event-dates ee-form-row">
							<div>
								<EditorDateEntitiesList
									for={ 'event-dates-metabox' }
								/>
							</div>
						</PanelRow>
					</PanelBody>
				</Panel>
				<br />
				<h1 className="ee-metabox-heading">
					<Dashicon icon="tickets-alt" />
					{ __( 'Available Tickets', 'event_espresso' ) }
				</h1>
				<Panel>
					<PanelBody
						id={ `ee-editor-event-tickets-${ eventId }` }
						className="ee-editor-event-tickets espresso-editor"
					>
						<PanelRow
							className="ee-editor-event-tickets ee-form-row">
							<div>
								<EditorTicketEntitiesList
									for={ 'event-tickets-metabox' }
								/>
							</div>
						</PanelRow>
					</PanelBody>
				</Panel>
				<br />
			</FormContainer>
		</Fragment>
	);
};

DatesAndTicketsMetabox.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default DatesAndTicketsMetabox;
