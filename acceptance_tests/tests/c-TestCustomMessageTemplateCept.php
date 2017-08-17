<?php

use Page\EventsAdmin;
use Page\RegistrationsAdmin;
use Page\TicketSelector;
use Page\MessagesAdmin;

/**
 * Test behaviour of custom message template usage when multiple events are registered for.
 */
$I = new EventEspressoAcceptanceTester($scenario, false);
$custom_template_a_label = 'Custom Template A';
$custom_template_b_label = 'Custom Template B';
$event_one_label = 'Event A - CT A';
$event_two_label = 'Event B - CT B';
$event_three_label = 'Event C - CT C';
$event_one_id = $event_two_id = $event_three_id = 0;
$event_one_link = $event_two_link = $event_three_link = '';

$I->wantTo(
    'Test that when registrations for multiple events are completed, and those events share the same custom'
    . 'template, that that custom template will be used.'
);

//need the MER plugin active for this test (we'll deactivate it after).
$I->ensurePluginActive(
    'event-espresso-mer-multi-event-registration',
    'activated'
);

$I->loginAsAdmin();

$I->amGoingTo('Create two custom registration approved templates');
$I->amGoingTo('Create first custom registration approved template.');
$I->createCustomMessageTemplateFromDefaultFor('Registration Approved', 'Email');
$I->appendToWPEditorField('main', $custom_template_a_label);
$I->click('Save');
$I->waitForText('successfully updated');
$I->switchContextTo('Registrant');
$I->fillField('#title', $custom_template_a_label);
$I->appendToWPEditorField('main', $custom_template_a_label);
$I->click('Save');
$I->waitForText('successfully updated');

$I->amGoingTo('Create second custom registration approved template.');
$I->createCustomMessageTemplateFromDefaultFor('Registration Approved', 'Email');
$I->fillField('#title', $custom_template_b_label);
$I->appendToWPEditorField('main', $custom_template_b_label);
$I->click('Save');
$I->waitForText('successfully updated');
$I->switchContextTo('Registrant');
$I->appendToWPEditorField('main', $custom_template_b_label);
$I->click('Save');
$I->waitForText('successfully updated');

$I->amGoingTo('Create three events for testing with.');
$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, $event_one_label);
$I->selectCustomTemplateFor('Registration Approved', 'email', $custom_template_a_label);
$I->publishEvent();
$I->waitForText('Event published.');
$event_one_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_one_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);

$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, $event_two_label);
$I->selectCustomTemplateFor('Registration Approved', 'email', $custom_template_a_label);
$I->publishEvent();
$I->waitForText('Event published.');
$event_two_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_two_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);

$I->amOnDefaultEventsListTablePage();
$I->click(EventsAdmin::ADD_NEW_EVENT_BUTTON_SELECTOR);
$I->fillField(EventsAdmin::EVENT_EDITOR_TITLE_FIELD_SELECTOR, $event_three_label);
$I->selectCustomTemplateFor('Registration Approved', 'email', $custom_template_b_label);
$I->publishEvent();
$I->waitForText('Event published.');
$event_three_link = $I->observeLinkUrlAt(EventsAdmin::EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR);
$event_three_id = $I->observeValueFromInputAt(EventsAdmin::EVENT_EDITOR_EVT_ID_SELECTOR);


$test_registration_details = array(
    'fname' => 'CTGuy',
    'lname' => 'Dude',
    'email' => 'ctguy_dude@example.org'
);

$I->amGoingTo('Register for Event One and Event Two and verify Custom Template A was used.');
$I->logOut();
$I->amOnUrl($event_one_link);
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_one_id), 1);
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_one_id));
$I->waitForText('successfully added');
$I->click('.cart-results-go-back-button');
$I->amOnUrl($event_two_link);
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_two_id), 1);
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_two_id));
$I->waitForText('successfully added');
$I->click('.cart-results-register-button');
$I->waitForText('Personal Information');
$I->fillOutFirstNameFieldForAttendee($test_registration_details['fname']);
$I->fillOutLastNameFieldForAttendee($test_registration_details['lname']);
$I->fillOutEmailFieldForAttendee($test_registration_details['email']);
$I->goToNextRegistrationStep();
$I->waitForText('Congratulations', 15);

//go to list table and verify
$I->loginAsAdmin();
$I->amOnMessagesActivityListTablePage();
$I->viewMessageInMessagesListTableFor(
    'Registration Approved',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Registrant'
);
$I->seeTextInViewMessageModal($custom_template_a_label);
$I->dismissMessageModal();
$I->deleteMessageInMessagesListTableFor(
    'Registration Approved',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Registrant'
);

//verify admin context
$I->viewMessageInMessagesListTableFor(
    'Registration Approved'
);
$I->seeTextInViewMessageModal($custom_template_a_label);
$I->dismissMessageModal();
$I->deleteMessageInMessagesListTableFor('Registration Approved');

$I->amGoingTo('Register for Event One and Event Three and verify that global template is used.');
$I->logOut();
$I->amOnUrl($event_one_link);
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_one_id), 1);
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_one_id));
$I->waitForText('successfully added');
$I->click('.cart-results-go-back-button');
$I->amOnUrl($event_three_link);
$I->selectOption(TicketSelector::ticketOptionByEventIdSelector($event_three_id), 1);
$I->click(TicketSelector::ticketSelectionSubmitSelectorByEventId($event_three_id));
$I->waitForText('successfully added');
$I->click('.cart-results-register-button');
$I->waitForText('Personal Information');
$I->fillOutFirstNameFieldForAttendee($test_registration_details['fname']);
$I->fillOutLastNameFieldForAttendee($test_registration_details['lname']);
$I->fillOutEmailFieldForAttendee($test_registration_details['email']);
$I->goToNextRegistrationStep();
$I->waitForText('Congratulations', 15);

//go to list table and verify
$I->loginAsAdmin();
$I->amOnMessagesActivityListTablePage();
$I->viewMessageInMessagesListTableFor(
    'Registration Approved',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Registrant'
);
$I->waitForElementVisible(MessagesAdmin::MESSAGES_LIST_TABLE_VIEW_MESSAGE_DIALOG_CONTAINER_SELECTOR);
$I->dontSeeTextInViewMessageModal($custom_template_a_label);
$I->dontSeeTextInViewMessageModal($custom_template_b_label);
$I->dismissMessageModal();
$I->deleteMessageInMessagesListTableFor(
    'Registration Approved',
    MessagesAdmin::MESSAGE_STATUS_SENT,
    'Email',
    'Registrant'
);

//verify admin context
$I->viewMessageInMessagesListTableFor(
    'Registration Approved'
);
$I->waitForElementVisible(MessagesAdmin::MESSAGES_LIST_TABLE_VIEW_MESSAGE_DIALOG_CONTAINER_SELECTOR);
$I->dontSee($custom_template_a_label);
$I->dontSee($custom_template_b_label);
$I->dismissMessageModal();
$I->deleteMessageInMessagesListTableFor('Registration Approved');



//deactivate MER plugin so its not active for future tests
$I->ensurePluginDeactivated(
    'event-espresso-mer-multi-event-registration',
    'Plugin deactivated'
);