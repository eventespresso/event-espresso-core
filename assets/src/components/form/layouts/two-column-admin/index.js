import { FormInput } from '../../inputs/form-input';
import { InputLabel } from '../../inputs/base/input-label';
import AutoColumnRow from './auto-column-row';
import FormColumn from './form-column';
import FormInfo from './form-info';
import FormRow from './form-row';
import FormSaveCancelButtons from './form-save-cancel-buttons';
import FormSubmitButton from '../../base/form-submit-button';
import FormCancelButton from '../../base/form-cancel-button';
import { SubmittingNotice } from '../../base/submitting-notice';
import FormSection from './form-section';
import FormWrapper from './form-wrapper';
import './two-column-admin.css';

const twoColumnAdminFormLayout = {
	InputLabel,
	FormInput,
	FormColumn,
	FormRow,
	FormSection,
	FormWrapper,
	AutoColumnRow,
	FormSaveCancelButtons,
	FormInfo,
	FormSubmitButton,
	FormCancelButton,
	SubmittingNotice,
};

export default twoColumnAdminFormLayout;
