/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import $ from 'jquery';
import ExitModal, { CLOSE_MODAL_EVENT } from '@eventespresso/react-exit-modal-typeform';
import './style.css';

const modalProps = {
    styles: {
        content: {
            display: 'flex',
            top: '80px',
            left: '50%',
            bottom: 'auto',
            right: 'auto',
            WebkitTransform: 'translateX(-50%)',
            transform: 'translateX(-50%)'
        },
        typeFormStyle: {
            width: '600px',
            height: '400px'
        }
    },
    typeFormUrl: 'https://eventespresso.typeform.com/to/fPT4T0',
    introText: "Do you have a moment to share why you are deactivating Event Espresso?",
    buttonClass: {
        doSurvey: 'button button-primary',
        closeModal: 'button button-secondary'
    }
};

/**
 * Handler for deactivation trigger
 * @param {Event} e
 */
const handleDeactivationClick = (e) => {
    e.preventDefault();
    const link = $(this).attr('href');
    const appContainer = document.getElementById('ee-exit-survey-modal');
    let modalContainer;
    ReactModal.setAppElement(appContainer);
    modalContainer = ReactDOM.render(<ExitModal {...modalProps} />, appContainer);
    modalContainer.el.addEventListener(
        CLOSE_MODAL_EVENT,
        function(e){
            window.location.href = link;
        },
        {once: true}
    );
};

/**
 * EE caffeinated click capture.
 */
$('tr[data-slug="event-espresso"]').on('click', 'span.deactivate > a', function(e) {
    handleDeactivationClick(e);
});


/**
 * EE decaf click capture.
 */
$('tr[data-slug="event-espresso-decaf"]').on('click', 'span.deactivate > a', function(e) {
    handleDeactivationClick(e);
});



