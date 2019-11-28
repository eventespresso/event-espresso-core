import { Callout, NonIdealState, Spinner } from '@blueprintjs/core/lib/esm';
import { boxStyle } from './LoadingIndicator';

const ErrorIndicator = ({ error, header }) => (
	<>
		{header}
		<Callout style={boxStyle}>
			<Spinner size={Spinner.SIZE_SMALL} />
			<NonIdealState icon={'warning-sign'} title={error.code} description={error.message} />
		</Callout>
	</>
);

export default ErrorIndicator;
