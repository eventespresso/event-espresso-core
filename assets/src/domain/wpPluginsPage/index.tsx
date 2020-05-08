import React from 'react';
import { render } from 'react-dom';
import { pathOr } from 'ramda';
import $ from 'jquery';

import ExitSurvey from './ExitSurvey';
import { ExitSurveyInfo } from './types';

const info = pathOr<ExitSurveyInfo>(null, ['eejsdata', 'data', 'exitModalInfo'], window);

/**
 * Handler for deactivation trigger
 */
const handleDeactivationClick = (e: JQuery.ClickEvent<HTMLElement>, el: any): void => {
	e.preventDefault();
	const url = $(el).attr('href');
	const container = document.getElementById('ee-exit-survey-modal');

	render(<ExitSurvey deactivationUrl={url} />, container);
};
/**
 * EE caffeinated click capture but only if feature is active
 */
const ok = true;
if (info?.isModalActive || ok) {
	// register event handlers on document ready
	$(() => {
		$('tr[data-slug="event-espresso"]').on('click', 'span.deactivate > a', function (e) {
			e.preventDefault();
			handleDeactivationClick(e, this);
		});

		/**
		 * EE decaf click capture.
		 */
		$('tr[data-slug="event-espresso-decaf"]').on('click', 'span.deactivate > a', function (e) {
			handleDeactivationClick(e, this);
		});
	});
}
