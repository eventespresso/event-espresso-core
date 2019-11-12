/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import PropTypes from 'prop-types';
import cuid from 'cuid';

/**
 * Internal dependencies
 */
import useTicketFormInputConfig from './use-ticket-form-input-config';
import useTicketFormInputPrefix
	from './use-ticket-form-input-prefix';
import useEditEntityFormInputs
	from '../../../../helpers/forms/use-edit-entity-form-inputs';

const {
	FormSection,
	FormWrapper,
} = twoColumnAdminFormLayout;

/**
 * @param {Object} props
 * @member {Object} ticketEntity model object defining the Ticket
 * @member {Function} updateField callback for editing a field
 * @member {Function} touchField callback for marking field as changed
 * @member {Object} currentValues form data
 * @member {Object} initialValues initial form data
 * @return {Object} rendered form for editing ticket entity
 */
const EditTicketForm = ( {
	ticketEntity,
	updateField,
	touchField,
	currentValues,
	initialValues,
	newObject,
	...formProps
} ) => {
	const prefix = useTicketFormInputPrefix( ticketEntity );
	const inputConfig = useTicketFormInputConfig( {
		ticket: ticketEntity,
		prefix,
		updateField,
		touchField,
	} );
	// entity properties we don't want to be editable
	const exclude = [
		'TKT_ID',
		'sold',
		'reserved',
		'order',
		'parent',
		'wpUser',
		'status',
	];

	const isNewTicket = cuid.isCuid( ticketEntity.TKT_ID );

	if ( isNewTicket ) {
		exclude.push( 'deleted' );
	}

	const formRows = useEditEntityFormInputs(
		ticketEntity,
		inputConfig,
		prefix,
		currentValues,
		exclude
	);

	return useMemo(
		() => {
			// edit forms for existing objects must have initial values
			return ! ( ! newObject && isEmpty( initialValues ) ) ?
				(
					<FormWrapper>
						<FormSection
							htmlId={ `${ prefix }-form-section` }
							children={ formRows }
							showRequiredNotice={ true }
							{ ...formProps }
						/>
					</FormWrapper>
				) : null;
		},
		[
			newObject,
			initialValues,
			ticketEntity,
			formRows,
		]
	);
};

EditTicketForm.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
	currentValues: PropTypes.object,
	initialValues: PropTypes.object,
	newObject: PropTypes.bool,
};

EditTicketForm.defaultProps = {
	currentValues: {},
	initialValues: {},
	newObject: false,
};

/**
 * Enhanced EditTicketForm with FormHandler
 */
export default ifValidTicketEntity( EditTicketForm );
