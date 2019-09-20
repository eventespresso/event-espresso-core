/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import useDateEntityFormInputPrefix from './use-date-entity-form-input-prefix';
import useDateEntityInputConfig from './use-date-entity-input-config';
import useEditEntityFormInputs
	from '../../../../helpers/forms/use-edit-entity-form-inputs';

const {
	FormSection,
	FormWrapper,
} = twoColumnAdminFormLayout;

/**
 * @function
 * @param {Object} dateEntity model object defining the Event Date
 * @param {Object} currentValues form data
 * @param {Object} initialValues initial form data
 * @return {Object} rendered form for editing date entity
 */
const DateEntityForm = ( {
	dateEntity,
	currentValues,
	initialValues,
} ) => {
	const prefix = useDateEntityFormInputPrefix( dateEntity );
	const inputConfig = useDateEntityInputConfig( dateEntity );
	// entity properties we don't want to be editable
	const exclude = [
		'eventId',
		'sold',
		'reserved',
		'order',
		'parent',
		'deleted',
	];
	const formRows = useEditEntityFormInputs(
		dateEntity,
		inputConfig,
		prefix,
		currentValues,
		exclude
	);
	const newObject = isNaN( parseInt( dateEntity.id, 10 ) );
	// edit forms for existing objects must have initial values
	return ! ( ! newObject && isEmpty( initialValues ) ) ? (
		<FormWrapper>
			<FormSection
				htmlId={ `${ prefix }-form-section` }
				showRequiredNotice={ true }
				children={ formRows }
			/>
		</FormWrapper>
	) : null;
};

DateEntityForm.propTypes = {
	dateEntity: PropTypes.object.isRequired,
	currentValues: PropTypes.object,
	initialValues: PropTypes.object,
};

DateEntityForm.defaultProps = {
	currentValues: {},
	initialValues: {},
};

export default ifValidDateEntity( DateEntityForm );
