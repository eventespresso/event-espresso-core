import React from 'react';

import withApollo from '@dataServices/apollo/withApollo';
import { AttendeesEditProps } from './types';
import Controls from './controls';
import AttendeesDisplay from './AttendeesDisplay';

/* const AttendeesDisplay: React.FC<AttendeesEditProps> = ({ attributes }) => (
	<Placeholder>
		<div>
			<h4>Hello, this is the cool new EE Block, if you feel lost, find a way :)</h4>
			<span>Attributes:</span>
			<pre>{JSON.stringify(attributes, null, 4)}</pre>
		</div>
	</Placeholder>
); */

const EventAttendeesEdit: React.FC<AttendeesEditProps> = (props) => {
	return (
		<>
			<AttendeesDisplay {...props} />
			<Controls {...props} />
		</>
	);
};

export default withApollo(EventAttendeesEdit);
