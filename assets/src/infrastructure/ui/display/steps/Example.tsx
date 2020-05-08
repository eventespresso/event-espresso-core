import React, { useState } from 'react';

import Steps from './Steps';
import Step from './Step';
import { Button } from '@infraUI/inputs';

const Example = () => {
	const [current, setCurrent] = useState(0);
	return (
		<>
			<Steps current={current} showStepNumber>
				<Step title={'Add Date'} />
				<Step title={'Assign Tickets'} />
				<Step title={'Submit'} />
			</Steps>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
				{current > 0 && <Button buttonText='Previous' onClick={() => setCurrent((v) => v - 1)} />}
				{current < 3 - 1 && <Button buttonText='Next' onClick={() => setCurrent((v) => v + 1)} />}
			</div>
		</>
	);
};

export default Example;
