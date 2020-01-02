/**
 * External dependencies
 */
import * as React from 'react';
import { Callout, NonIdealState, Spinner } from '@blueprintjs/core/lib/esm';

const ErrorIndicator = () => (
	<Callout>
		<Spinner size={Spinner.SIZE_SMALL} />
		<NonIdealState icon={'warning-sign'} />
	</Callout>
);

export default ErrorIndicator;
