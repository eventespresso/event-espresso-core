<?php

use Page\EventsAdmin;
use Page\TicketSelector;
use Page\MessagesAdmin;

$I = new EventEspressoAcceptanceTester($scenario, false);
$event_label = 'Testing Context Deactivation';

$I->wantTo(
    'Test that the context activation toggle for turning on or off specific contexts for message sending works as'
    . ' expected'
);

$I->loginAsAdmin();

$I->amGoingTo('Verify the toggle for toggling state on context is visible.');
$I->amOnDefaultMessageTemplateListTablePage();
$I->clickToEditMessageTemplateByMessageType('registration', 'admin');
$I->see('The template for Event Admin Recipient is currently active.');
$I->switchContextTo('Primary Registrant');
$I->see('The template for Primary Registrant Recipient is currently active.');

$I->amGoingTo('Make sure the "To" field for Primary Registrant has content');
$I->fillField(MessagesAdmin::messageTemplateToFieldSelector(), '[PRIMARY_REGISTRANT_EMAIL]');
$I->saveMessageTemplate();
//verify To Field has expected content after save.
$I->seeInField(MessagesAdmin::messageTemplateToFieldSelector(), '[PRIMARY_REGISTRANT_EMAIL]');

$I->amGoingTo('Disable the primary registrant context.');
$I->toggleContextState('Primary Registrant Recipient', false);
//save and verify it stuck
$I->saveMessageTemplate();
$I->see('The template for Primary Registrant Recipient is currently inactive.');

$I->amGoingTo(
    'Trigger Registration Approved Messages and verify primary registrant context is excluded from sent messages.'
);
$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, $event_label);
$I->publishEvent();
$I->waitForText('Event published.');
$event_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);
$test_registration_details = array(
    'fname' => 'ContextTestGuy',
    'lname' => 'ContextTestDude',
    'email' => 'contexttestguy@example.org',
);
$I->logOut();
$I->amOnUrl($event_link);
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_id), 1);
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_id));
$I->waitForText('Personal Information');
$I->fillOutFirstNameFieldForAttendee($test_registration_details['fname']);
$I->fillOutLastNameFieldForAttendee($test_registration_details['lname']);
$I->fillOutEmailFieldForAttendee($test_registration_details['email']);
$I->goToNextRegistrationStep();
$I->waitForText('Congratulations', 15);
//go to messages list table and verify
$I->loginAsAdmin();
$I->amOnMessagesActivityListTablePage();
//verify registrant context
$I->see(
    $test_registration_details['email'],
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Approved',
        MessagesAdmin::MESSAGE_STATUS_SENT,
        '',
        'Registrant'
    )
);
$I->deleteMessageInMessagesListTableFor(
    'Registration Approved',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Registrant'
);
//verify admin context
$I->see(
    'admin@example.com',
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Approved',
        MessagesAdmin::MESSAGE_STATUS_SENT
    )
);
$I->deleteMessageInMessagesListTableFor(
    'Registration Approved'
);
//verify primary registrant context is NOT present.
$I->dontSee(
    $test_registration_details['email'],
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Approved',
        MessagesAdmin::MESSAGE_STATUS_SENT,
        '',
        'Primary Registrant'
    )
);

$I->amGoingTo(
    'Deactivate primary registrant context for Registration Approved Message Templates and restore the "To"'
    . ' field to an empty string to verify the message does not send for that context.'
);
$I->amOnDefaultMessageTemplateListTablePage();
$I->clickToEditMessageTemplateByMessageType('registration', 'primary_attendee');
$I->toggleContextState('Primary Registrant Recipient', true);
$I->fillField(MessagesAdmin::messageTemplateToFieldSelector(), '');
$I->saveMessageTemplate();
$I->see('The template for Primary Registrant Recipient is currently active.');
//repeat frontend registration and verify we get the same results with the empty "To" field.
$I->logOut();
$I->amOnUrl($event_link);
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_id), 1);
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_id));
$I->waitForText('Personal Information');
$I->fillOutFirstNameFieldForAttendee($test_registration_details['fname']);
$I->fillOutLastNameFieldForAttendee($test_registration_details['lname']);
$I->fillOutEmailFieldForAttendee($test_registration_details['email']);
$I->goToNextRegistrationStep();
$I->waitForText('Congratulations', 15);
//go to messages list table and verify
$I->loginAsAdmin();
$I->amOnMessagesActivityListTablePage();
//verify registrant context
$I->see(
    $test_registration_details['email'],
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Approved',
        MessagesAdmin::MESSAGE_STATUS_SENT,
        '',
        'Registrant'
    )
);
$I->deleteMessageInMessagesListTableFor(
    'Registration Approved',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Registrant'
);
//verify admin context
$I->see(
    'admin@example.com',
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Approved',
        MessagesAdmin::MESSAGE_STATUS_SENT
    )
);
$I->deleteMessageInMessagesListTableFor(
    'Registration Approved'
);
//verify primary registrant context is NOT present.
$I->dontSee(
    $test_registration_details['email'],
    MessagesAdmin::messagesActivityListTableCellSelectorFor(
        'to',
        'Registration Approved',
        MessagesAdmin::MESSAGE_STATUS_SENT,
        '',
        'Primary Registrant'
    )
);