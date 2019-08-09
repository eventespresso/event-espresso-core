/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

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
	FormSaveCancelButtons,
	FormInfo,
} = twoColumnAdminFormLayout;

const EditTicketForm = ( {
	ticketEntity,
	submitButton,
	cancelButton,
	currentValues = {},
	initialValues = {},
	newObject = false,
} ) => {
	const formDataKeyPrefix = useTicketFormInputPrefix( ticketEntity );
	const inputConfig = useTicketFormInputConfig( ticketEntity );
	// entity properties we don't want to be editable
	const exclude = [
		'TKT_ID',
		'sold',
		'reserved',
		'order',
		'parent',
		'deleted',
		'wpUser',
		'status',
	];
	const formRows = useEditEntityFormInputs(
		ticketEntity,
		inputConfig,
		formDataKeyPrefix,
		currentValues,
		exclude
	);
	const formInfo = useMemo(
		() => (
			<FormInfo
				key="formInfo"
				formInfo={
					__(
						'all fields marked with an asterisk are required',
						'event_espresso'
					)
				}
				dismissable={ false }
			/>
		),
		[]
	);
	if ( Array.isArray( formRows ) ) {
		formRows.unshift( formInfo );
	}
	return useMemo(
		() => {
			// edit forms for existing objects must have initial values
			return ! ( ! newObject && isEmpty( initialValues ) ) ?
				(
					<FormWrapper>
						<FormSection
							htmlId={ `ee-ticket-editor-${ ticketEntity.id }-form-section` }
							children={ formRows }
						/>
						<FormSaveCancelButtons
							htmlClass={ `ee-ticket-editor-${ ticketEntity.id }` }
							submitButton={ submitButton }
							cancelButton={ cancelButton }
						/>
					</FormWrapper>
				) : null;
		},
		[
			newObject,
			initialValues,
			ticketEntity,
			formRows,
			submitButton,
			cancelButton,
		]
	);
};

/**
 * Enhanced EditTicketForm with FormHandler
 */
export default ifValidTicketEntity( EditTicketForm );
