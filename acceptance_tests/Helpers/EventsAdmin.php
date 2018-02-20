<?php
namespace EventEspresso\Codeception\helpers;

use Page\CoreAdmin;
use Page\EventsAdmin as EventsPage;


/**
 * Trait EventsAdmin
 * Helper actions for the Events Admin pages.
 *
 * @package EventEspresso\Codeception\helpers
 */
trait EventsAdmin
{

    /**
     * @param string $additional_params
     */
    public function amOnDefaultEventsListTablePage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(EventsPage::defaultEventsListTableUrl($additional_params));
    }


    /**
     * Triggers the publishing of the Event.
     */
    public function publishEvent()
    {
        $this->actor()->scrollTo(EventsPage::EVENT_EDITOR_TITLE_FIELD_SELECTOR);
        $this->actor()->wait(3);
        $this->actor()->click(EventsPage::EVENT_EDITOR_PUBLISH_BUTTON_SELECTOR);
        $this->actor()->waitForText('Event published.', 30);
    }


    /**
     * Triggers saving the Event.
     */
    public function saveEvent()
    {
        $this->actor()->scrollTo(EventsPage::EVENT_EDITOR_TITLE_FIELD_SELECTOR);
        $this->actor()->wait(2);
        $this->actor()->click(EventsPage::EVENT_EDITOR_SAVE_BUTTON_SELECTOR);
    }


    /**
     * Navigates the actor to the event list table page and will attempt to edit the event for the given title.
     * First this will search using the given title and then attempt to edit from the results of the search.
     *
     * Assumes actor is already logged in.
     * @param $event_title
     */
    public function amEditingTheEventWithTitle($event_title)
    {
        $this->amOnDefaultEventsListTablePage();
        $this->actor()->fillField(EventsPage::EVENT_LIST_TABLE_SEARCH_INPUT_SELECTOR, $event_title);
        $this->actor()->click(CoreAdmin::LIST_TABLE_SEARCH_SUBMIT_SELECTOR);
        $this->actor()->waitForText($event_title, 15);
        $this->actor()->click(EventsPage::eventListTableEventTitleEditLinkSelectorForTitle($event_title));
    }


    /**
     * Navigates the user to the single event page (frontend view) for the given event title via clicking the "View"
     * link for the event in the event list table.
     * Assumes the actor is already logged in and on the Event list table page.
     *
     * @param string $event_title
     */
    public function amOnEventPageAfterClickingViewLinkInListTableForEvent($event_title)
    {
        $this->actor()->moveMouseOver(EventsPage::eventListTableEventTitleEditLinkSelectorForTitle($event_title));
        $this->actor()->click(EventsPage::eventListTableEventTitleViewLinkSelectorForTitle($event_title));
    }


    /**
     * Used to retrieve the event id for the event via the list table and for the given event.
     * @param string $event_title
     */
    public function observeEventIdInListTableForEvent($event_title)
    {
        return $this->actor()->observeValueFromInputAt(EventsPage::eventListTableEventIdSelectorForTitle($event_title));
    }


    /**
     * This performs the click action on the gear icon that triggers the advanced settings view state.
     * Assumes the actor is already logged in and editing an event.
     *
     * @param int $row_number  What ticket row to toggle open/close.
     */
    public function toggleAdvancedSettingsViewForTicketRow($row_number = 1)
    {
        $this->actor()->click(EventsPage::eventEditorTicketAdvancedDetailsSelector($row_number));
    }


    /**
     * Toggles the TKT_is_taxable checkbox for the ticket in the given row.
     * Assumes the actor is already logged in and editing an event and that the advanced settings view state for that
     * ticket is "open".
     *
     * @param int $row_number  What ticket row to toggle the checkbox for.
     */
    public function toggleTicketIsTaxableForTicketRow($row_number = 1)
    {
        $this->actor()->click(EventsPage::eventEditorTicketTaxableCheckboxSelector($row_number));
    }


    /**
     * Use to change the default registration status for the event.
     * Assumes the view is already on the event editor.
     * @param $registration_status
     */
    public function changeDefaultRegistrationStatusTo($registration_status)
    {
        $this->actor()->selectOption(
            EventsPage::EVENT_EDITOR_DEFAULT_REGISTRATION_STATUS_FIELD_SELECTOR,
            $registration_status
        );
    }


    /**
     * Use this from the context of the event editor to select the given custom template for a given message type and
     * messenger.
     *
     * @param string $message_type_label  The visible label for the message type (eg Registration Approved)
     * @param string $messenger_slug      The slug for the messenger (eg 'email')
     * @param string $custom_template_label The visible label in the select input for the custom template you want
     *                                      selected.
     */
    public function selectCustomTemplateFor($message_type_label, $messenger_slug, $custom_template_label)
    {
        $this->actor()->click(EventsPage::eventEditorNotificationsMetaBoxMessengerTabSelector($messenger_slug));
        $this->actor()->selectOption(
            EventsPage::eventEditorNotificationsMetaBoxSelectSelectorForMessageType($message_type_label),
            $custom_template_label
        );
    }
}