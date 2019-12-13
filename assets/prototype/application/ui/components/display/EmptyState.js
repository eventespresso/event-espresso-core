import { Callout, NonIdealState } from '@blueprintjs/core/lib/esm';

const EmptyState = ({ children, description, title }) => (
	<>
		<Callout>
			<NonIdealState icon={'help'} title={title} description={description} />
		</Callout>
		{children}
	</>
);

export default EmptyState;
