/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import {
	withFormHandler,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import {
	editEntityFormInputs,
} from '../../../../helpers/forms/edit-entity-form-inputs';
import { dateEntityInputConfig } from './date-entity-input-config';

const {
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
	FormInfo,
} = twoColumnAdminFormLayout;

/**
 * @function
 * @param {Object} dateEntity model object defining the Event Date
 * @param {Object} submitButton component
 * @param {Object} cancelButton component
 * @param {Object} currentValues form data
 * @param {Object} initialValues initial form data
 * @param {boolean} newObject if true then date has not ever been persisted
 * @return {Object} rendered form for editing date entity
 */
const DateEntityForm = ( {
	dateEntity,
	submitButton,
	cancelButton,
	currentValues = {},
	initialValues = {},
	newObject = false,
} ) => {
	// entity properties we don't want to be editable
	const exclude = [
		'eventId',
		'sold',
		'reserved',
		'order',
		'parent',
		'deleted',
	];
	const inputConfig = useMemo(
		() => dateEntityInputConfig( dateEntity ),
		[ dateEntityInputConfig, dateEntity ]
	);
	const formRows = useMemo(
		() => editEntityFormInputs(
			dateEntity,
			inputConfig,
			`ee-event-date-${ dateEntity.id }`,
			isEmpty( currentValues ) ? initialValues : currentValues,
			exclude
		),
		[
			editEntityFormInputs,
			dateEntity,
			inputConfig,
			currentValues,
			initialValues,
			exclude,
		]
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
			return ! ( ! newObject && isEmpty( initialValues ) ) &&
			isModelEntityOfModel( dateEntity, 'datetime' ) ?
				(
					<FormWrapper>
						<FormSection
							htmlId={
								`ee-event-date-editor-${ dateEntity.id }-form-section`
							}
							children={ formRows }
						/>
						<FormSaveCancelButtons
							htmlClass={ `ee-event-date-editor-${ dateEntity.id }` }
							submitButton={ submitButton }
							cancelButton={ cancelButton }
						/>
					</FormWrapper>
				) : null;
		},
		[
			newObject,
			initialValues,
			dateEntity,
			formRows,
			submitButton,
			cancelButton,
		]
	);
};

/**
 * Enhanced DateEntityForm with FormHandler
 */
export default compose( [
	ifValidDateEntity,
	withFormHandler,
] )( DateEntityForm );
