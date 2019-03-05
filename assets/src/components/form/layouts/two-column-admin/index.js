import { FormInput } from '../../inputs/form-input';
import { InputLabel } from '../../inputs/base/input-label';
import { default as AutoColumnRow } from './auto-column-row';
import { default as FormColumn } from './form-column';
import { default as FormInfo } from './form-info';
import { default as FormRow } from './form-row';
import { default as FormSaveCancelButtons } from './form-save-cancel-buttons';
import { FormSubmitButton } from '../../base/form-submit-button';
import { FormCancelButton } from '../../base/form-cancel-button';
import { SubmittingNotice } from '../../base/submitting-notice';
import { default as FormSection } from './form-section';
import { default as FormWrapper } from './form-wrapper';
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
