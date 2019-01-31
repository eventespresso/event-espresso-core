/**
 * External dependencies
 */
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import $ from 'jquery';
import ExitModal, { CLOSE_MODAL_EVENT } from '@eventespresso/react-exit-modal-typeform';
import './style.css';
import { data } from '@eventespresso/eejs';
import { stringify } from 'querystringify';
import { __ } from '@eventespresso/i18n';

const { exitModalInfo: info = {} } = data;

const queryString = stringify( {
	firstname: info.firstname,
	emailaddress: info.emailaddress,
	website: info.website,
} );

const modalProps = {
	styles: {
		content: {
			display: 'flex',
			top: '80px',
			left: '50%',
			bottom: 'auto',
			right: 'auto',
			WebkitTransform: 'translateX(-50%)',
			transform: 'translateX(-50%)',
		},
		typeFormStyle: {
			width: '600px',
			height: '600px',
		},
	},
	typeFormUrl: 'https://eventespresso.typeform.com/to/O1DDym?' + queryString,
	introText: __(
		'Do you have a moment to share why you are deactivating Event Espresso?',
		'event_espresso',
	),
	doSurveyButtonText: __(
		'Sure I\'ll help',
		'event_espresso',
	),
	skipButtonText: __(
		'Skip',
		'event_espresso',
	),
	buttonClass: {
		doSurvey: 'button button-primary',
		closeModal: 'button button-secondary',
	},
};

/**
 * Handler for deactivation trigger
 * @param {Event} e
 * @param {element} el
 */
const handleDeactivationClick = ( e, el ) => {
	e.preventDefault();
	const link = $( el ).attr( 'href' );
	const appContainer = document.getElementById( 'ee-exit-survey-modal' );
	ReactModal.setAppElement( appContainer );
	const modalContainer = ReactDOM.render( <ExitModal { ...modalProps } />, //eslint-disable-line react/no-render-return-value
		appContainer,
	);
	modalContainer.el.addEventListener(
		CLOSE_MODAL_EVENT,
		function() {
			window.location.href = link;
		},
		{ once: true },
	);
};

/**
 * EE caffeinated click capture but only if feature is active
 */
if ( info.isModalActive ) {
	$( 'tr[data-slug="event-espresso"]' )
		.on( 'click', 'span.deactivate > a', function( e ) {
			handleDeactivationClick( e, this );
		} );

	/**
	 * EE decaf click capture.
	 */
	$( 'tr[data-slug="event-espresso-decaf"]' )
		.on( 'click', 'span.deactivate > a', function( e ) {
			handleDeactivationClick( e, this );
		} );
}
