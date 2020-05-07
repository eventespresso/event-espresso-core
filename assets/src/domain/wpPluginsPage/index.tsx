import React from 'react';
import { render } from 'react-dom';
import { pathOr } from 'ramda';
import $ from 'jquery';

import { ThemeProvider } from '@appServices/theme';
import ExitSurvey from './ExitSurvey';
import { ExitModalInfo } from './types';

const info = pathOr<ExitModalInfo>(null, ['eejsdata', 'data', 'exitModalInfo'], window);

/**
 * Handler for deactivation trigger
 */
const handleDeactivationClick = (e: JQuery.ClickEvent<HTMLElement>, el: any): void => {
	e.preventDefault();
	const url = $(el).attr('href');
	const container = document.getElementById('ee-exit-survey-modal');

	render(
		<ThemeProvider>
			<ExitSurvey deactivationUrl={url} />
		</ThemeProvider>,
		container
	);
};

const ok = true;
/**
 * EE caffeinated click capture but only if feature is active
 */
if (info?.isModalActive || ok) {
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
