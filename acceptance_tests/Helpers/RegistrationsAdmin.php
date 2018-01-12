<?php

namespace EventEspresso\Codeception\helpers;

use Page\CoreAdmin;
use Page\RegistrationsAdmin as RegistrationsAdminPage;
use Page\EventsAdmin;

/**
 * Trait RegistrationsAdmin
 * Helper actions for Registration Admin Page actions.
 *
 * @package EventEspresso\Codeception\helpers
 */
trait RegistrationsAdmin
{

    /**
     * This will select all checkboxes on a registration list table for the given array of
     * registration ids.
     * Assumes the actor is on a list table page for registrations.
     * @param $registration_ids
     */
    public function selectBulkActionCheckboxesForRegistrationIds(array $registration_ids)
    {
        foreach ($registration_ids as $registration_id) {
            $this->actor()->checkOption(
                RegistrationsAdminPage::listTableCheckBoxSelectorForRegistrationId($registration_id)
            );
        }
    }


    /**
     * Navigates the actor to the default registration list table page.
     * @param string $additional_params
     */
    public function amOnDefaultRegistrationsListTableAdminPage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(
            RegistrationsAdminPage::registrationsDefaultAdminListTableUrl($additional_params)
        );
        //wait for page to fully load
        $this->actor()->wait(5);
    }


    /**
     * Will enter the provided value in the registration list table search field and execute a search for that value.
     * @param string $search_text
     */
    public function searchForRegistrationOnRegistrationListTableWithText($search_text)
    {
        $this->amOnDefaultRegistrationsListTableAdminPage();
        $this->actor()->fillField(RegistrationsAdminPage::SEARCH_INPUT_SELECTOR_LIST_TABLE_REGISTRATION, $search_text);
        $this->actor()->click(CoreAdmin::LIST_TABLE_SEARCH_SUBMIT_SELECTOR);
        $this->actor()->waitForText('Displaying search results for');
    }



    /**
     * This will filter the registration list table to view registrations for the given event id.
     * Assumption is made that you are logged into the admin but you do not need to be on the registration list table
     * page.
     *
     * @param int $event_id  The id of the event viewing registrations for.
     */
    public function amViewingRegistrationsForEvent($event_id)
    {
        $this->actor()->amOnDefaultEventsListTablePage();
        $this->actor()->click(EventsAdmin::listTableActionLinkRegistrationsForEvent($event_id));
        $this->actor()->waitForText('Viewing registrations for the event');
    }


    /**
     * This helper will initiate registering for the given event via the backend.
     * @param int $event_id  The event to initiate registration for.
     */
    public function amOnAdminRegistrationPageForEvent($event_id)
    {
        $this->actor()->amViewingRegistrationsForEvent($event_id);
        $this->actor()->click(RegistrationsAdminPage::BUTTON_ADD_NEW_REGISTRATION);
        $this->actor()->waitForText('Adding Registration For');
    }



    /**
     * This clicks the View Details Link for Registration with the given Id
     * @param $registration_id
     */
    public function clickViewDetailsLinkForRegistrationWithId($registration_id)
    {
        $this->actor()->click(RegistrationsAdminPage::viewDetailsLinkSelectorForRegistrationId($registration_id));
    }


    /**
     * /**
     * This assumes you are on the admin details page for a registration in EE.  It selects the given status in the
     * dropdown for changing registration status.
     *
     * @param string $status_label_or_value  Either the label for the dropdown option or the value for the option.
     * @param $status_label_or_value
     */
    public function selectRegistrationStatusOnRegistrationDetailsPageFor($status_label_or_value)
    {
        $this->actor()->selectOption(
            RegistrationsAdminPage::DROPDOWN_REGISTRATION_STATUS,
            $status_label_or_value
        );
    }


    /**
     * This selects (or deselects) the "Send Related Messages" checkbox on the Registration Details page.
     * @param bool $send_related_messages
     */
    public function selectSendRelatedMessagesOptionOnRegistrationDetailsPage($send_related_messages = true)
    {
        $send_related_messages
            ? $this->actor()->selectOption(
                RegistrationsAdminPage::DROPDOWN_SEND_RELATED_MESSAGES,
                'Yes'
            )
            : $this->actor()->selecOption(
                RegistrationsAdminPage::DROPDOWN_SEND_RELATED_MESSAGES,
                'No'
            );
    }



    /**
     * This assumes you are on the admin details page for a registration in EE.  It selects the given status in the
     * dropdown for changing registration status and submits the change.
     *
     * @param string $status_label_or_value  Either the label for the dropdown option or the value for the option.
     * @param bool   $send_related_messages  Whether or not to send related messages after changing the bulk action.
     */
    public function changeRegistrationStatusOnRegistrationDetailsPageTo(
        $status_label_or_value,
        $send_related_messages = true
    ) {
        $this->actor()->selectRegistrationStatusOnRegistrationDetailsPageFor($status_label_or_value);
        $this->actor()->selectSendRelatedMessagesOptionOnRegistrationDetailsPage($send_related_messages);
        $this->actor()->click(RegistrationsAdminPage::BUTTON_UPDATE_REGISTRATION_STATUS);
        $this->actor()->waitForText('Registration status has been set to');
    }

}