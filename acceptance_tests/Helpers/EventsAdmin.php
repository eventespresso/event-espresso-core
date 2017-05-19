<?php
namespace EventEspresso\Codeception\helpers;

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
}