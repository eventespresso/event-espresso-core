import React, { useEffect, useRef } from 'react';
import { pathOr } from 'ramda';
import * as typeformEmbed from '@typeform/embed';

import { ExitSurveyInfo } from './types';
import './styles.scss';

type SurveyContentProps = {
	onSubmit: VoidFunction;
};

const info = pathOr<ExitSurveyInfo>(null, ['eejsdata', 'data', 'exitModalInfo'], window);

const ExitSurveyContent: React.FC<SurveyContentProps> = ({ onSubmit }) => {
	const typeFormEl = useRef();
	const typeFormUrl = info?.typeFormUrl || 'https://eventespresso.typeform.com/to/O1DDym';

	useEffect(() => {
		typeformEmbed.makeWidget(typeFormEl.current, typeFormUrl, {
			onSubmit: function () {
				onSubmit();
			},
			hideScrollbars: true,
		});
	}, []);

	return <div ref={typeFormEl}></div>;
};

export default ExitSurveyContent;
