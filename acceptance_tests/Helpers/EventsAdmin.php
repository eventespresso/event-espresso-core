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
        $this->actor()->click(EventsPage::EVENT_EDITOR_PUBLISH_BUTTON_SELECTOR);
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
        $this->actor()->waitForText('Displaying search results for');
        $this->actor()->click(EventsPage::eventListTableEventTitleEditLink($event_title));
    }


    /**
     * Navigates the user to the single event page (frontend view) for the given event title via clicking the "View" link
     * for the event in the event list table.
     *
     * Assumes the actor is already logged in and on the Event list table page.
     * @param string $event_title
     */
    public function amOnEventPageAfterClickingViewLinkInListTableForEvent($event_title)
    {
        $this->actor()->moveMouseOver(EventsPage::eventListTableEventTitleEditLinkSelectorForTitle($event_title));
        $this->actor()->click(EventsPage::eventListTableEventTitleViewLinkSelectorForTitle($event_title));
    }
}