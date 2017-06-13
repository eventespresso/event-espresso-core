<?php

use Page\EventsAdmin;
use Page\RegistrationsAdmin;
use Page\TicketSelector;
use Page\MessagesAdmin;

/**
 * Tests the Registration Summary message type.
 */
$I = new EventEspressoAcceptanceTester($scenario, false);

$I->wantTo('Test that the Registration Summary Message type works as expected.');

//need the MER plugin active for this test (we'll deactivate it after).
$I->ensurePluginActive(
    'event-espresso-mer-multi-event-registration',
    'activated'
);

//k now we need to make sure the registration multi-status message type is active because it isn't by default
$I->loginAsAdmin();
$I->amOnMessageSettingsPage();
$I->activateMessageTypeForMessenger('registration_summary');


//k now we need to create a couple events to use for testing.
$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, 'Event RSM A');
$I->publishEvent();
$I->waitForText('Event published.');
$event_a_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_a_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);

//do another event except we'll set the default reg status to not approved.
$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, 'Event RSM B');
$I->changeDefaultRegistrationStatusTo(RegistrationsAdmin::REGISTRATION_STATUS_NOT_APPROVED);
$I->publishEvent();
$I->waitForText('Event published.');
$event_b_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_b_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);

$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, 'Event RSM C');
$I->publishEvent();
$I->waitForText('Event published.');
$event_c_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_c_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);

//k now that our events are setup lets do some registrations
$I->logOut();
$I->amOnUrl($event_a_link);
$I->see('Event RSM A');
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_a_id), '1');
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_a_id));
$I->waitForText('successfully added');
$I->click('.cart-results-go-back-button');
$I->amOnUrl($event_b_link);
$I->see('Event RSM B');
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_b_id), '1');
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_b_id));
$I->waitForText('successfully added');
$I->click('.cart-results-register-button');
$I->waitForText('Personal Information');
$I->fillOutFirstNameFieldForAttendee('RSM Tester');
$I->fillOutLastNameFieldForAttendee('Guy');
$I->fillOutEmailFieldForAttendee('rsm_tester@example.org');
$I->goToNextRegistrationStep();
$I->waitForText('Congratulations', 15);

//now let's go to the messages list table and make sure the registration message summary is there.
$I->loginAsAdmin();
$I->amOnMessagesActivityListTablePage();
$I->see(
    'rsm_tester@example.org',
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Multi-status Summary',
        MessagesAdmin::MESSAGE_STATUS_SENT,
        '',
        'Primary Registrant'
    )
);
$I->see(
    'admin@example.com',
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Multi-status Summary',
        MessagesAdmin::MESSAGE_STATUS_SENT
    )
);
//verify count
$I->verifyMatchingCountofTextInMessageActivityListTableFor(
    1,
    'rsm_tester@example.org',
    'to',
    'Registration Multi-status Summary',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Primary Registrant'
);
$I->verifyMatchingCountofTextInMessageActivityListTableFor(
    1,
    'admin@example.com',
    'to',
    'Registration Multi-status Summary'
);

//okay now let's do some registrations for just the first event and verify that registration multi-status summary is NOT
//generated
$I->amGoingTo('Register for Event RSM A and C and verify registration multi-status message type is not used for generated message');
$I->logOut();
$I->amOnUrl($event_a_link);
$I->see('Event RSM A');
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_a_id), '1');
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_a_id));
$I->waitForText('successfully added');
$I->click('.cart-results-go-back-button');
$I->amOnUrl($event_b_link);
$I->see('Event RSM B');
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_c_id), '1');
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_c_id));
$I->waitForText('successfully added');
$I->click('.cart-results-register-button');
$I->waitForText('Personal Information');
$I->fillOutFirstNameFieldForAttendee('RSM Tester B');
$I->fillOutLastNameFieldForAttendee('Guy');
$I->fillOutEmailFieldForAttendee('rsm_testerb@example.org');
$I->goToNextRegistrationStep();
$I->waitForText('Congratulations', 15);

$I->amGoingTo('Visit Messages Activity List Table and verify there are no Registration Multi-Status Messages for the registrations we just did');
$I->loginAsAdmin();
$I->amOnMessagesActivityListTablePage();
$I->dontSee(
    'rsm_testerb@example.org',
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Multi-status Summary',
        MessagesAdmin::MESSAGE_STATUS_SENT,
        '',
        'Primary Registrant'
    )
);
$I->dontSee(
    'admin@example.com',
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Multi-status Summary',
        MessagesAdmin::MESSAGE_STATUS_SENT
    )
);

//deactivate MER plugin so its not active for future tests
$I->ensurePluginDeactivated(
    'event-espresso-mer-multi-event-registration',
    'Plugin deactivated'
);