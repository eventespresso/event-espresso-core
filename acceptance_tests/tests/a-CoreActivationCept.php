<?php

use Page\MessagesAdmin;

// this is going to do the very bare minimum that happens with just instantiating our actor
// includes:
// - logging in.
// - asserting Event Espresso Core is active (and activates without problems)
$I = new EventEspressoAcceptanceTester($scenario);


//make sure messages system is set to send on same request for all tests (as we need immediate feedback).
$I->loginAsAdmin();
$I->amOnMessageSettingsPage();
$I->selectOption(MessagesAdmin::GLOBAL_MESSAGES_SETTINGS_ON_REQUEST_SELECTION_SELECTOR, '1');
$I->click(MessagesAdmin::GLOBAL_MESSAGES_SETTINGS_SUBMIT_SELECTOR);
