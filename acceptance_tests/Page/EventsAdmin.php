<?php

namespace Page;


/**
 * EventsAdmin
 * Selectors/references for elements in the Events Admin pages
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class EventsAdmin extends CoreAdmin
{

    /**
     * Selector for the Add new Event button in the admin.
     * @var string
     */
    const ADD_NEW_EVENT_BUTTON_SELECTOR = '#add-new-event';


    /**
     * Selector for the Event Title field in the event editor
     * @var string
     */
    const EVENT_EDITOR_TITLE_FIELD_SELECTOR = "//input[@id='title']";

    /**
     * Selector for the publish submit button in the event editor.
     * @var string
     */
    const EVENT_EDITOR_PUBLISH_BUTTON_SELECTOR = "#publish";

    /**
     * Selector for the view link after publishing an event.
     * @var string
     */
    const EVENT_EDITOR_VIEW_LINK_AFTER_PUBLISH_SELECTOR = "//div[@id='message']/p/a";


    /**
     * Selector for the ID of the event in the event editor
     * @var string
     */
    const EVENT_EDITOR_EVT_ID_SELECTOR = "//input[@id='post_ID']";


    /**
     * Selector for the search input on the event list table page.
     * @var string
     */
    const EVENT_LIST_TABLE_SEARCH_INPUT_SELECTOR = '#toplevel_page_espresso_events-search-input';



    /**
     * @param string $additional_params
     * @return string
     */
    public static function defaultEventsListTableUrl($additional_params = '')
    {
        return self::adminUrl('espresso_events', 'default', $additional_params);
    }


    /**
     * The selector for the DTTname field for the given row in the event editor.
     * @param int $row_number
     * @return string
     */
    public static function eventEditorDatetimeNameFieldSelector($row_number = 1)
    {
        return self::eventEditorDatetimeFieldSelectorForField('DTT_name', $row_number);
    }


    /**
     * The selector for the DTT_EVT_start field for the given row in the event editor.d
     * @param int $row_number
     * @return string
     */
    public static function eventEditorDatetimeStartDateFieldSelector($row_number = 1)
    {
        return self::eventEditorDatetimeFieldSelectorForField('DTT_EVT_start', $row_number);
    }


    /**
     * Wrapper for getting the selector for a given field and given row of a datetime in the event editor.
     *
     * @param string $field_name
     * @param int    $row_number
     * @return string
     */
    public static function eventEditorDatetimeFieldSelectorForField($field_name, $row_number = 1)
    {
        return "//input[@id='event-datetime-$field_name-$row_number']";
    }


    /**
     * The selector for the TKT_name field for the given display row in the event editor.
     * @param int $row_number
     * @return string
     */
    public static function eventEditorTicketNameFieldSelector($row_number = 1)
    {
        return self::eventEditorTicketFieldSelectorForFieldInDisplayRow('TKT_name', $row_number);
    }


    /**
     * Wrapper for getting the selector for a given field and given display row of a ticket in the event editor.
     * @param     $field_name
     * @param int $row_number
     * @return string
     */
    public static function eventEditorTicketFieldSelectorForFieldInDisplayRow($field_name, $row_number = 1)
    {
        return "//tr[@id='display-ticketrow-$row_number']/td[2]/input[@class='edit-ticket-$field_name ee-large-text-inp']";
    }


    /**
     * Returns the selector for the event title edit link in the events list table for the given Event Title.
     * @param string $event_title
     * @return string
     */
    public static function eventListTableEventTitleEditLinkSelectorForTitle($event_title)
    {
        return "//td[contains(@class, 'column-name')]/strong/a[text()='$event_title']";
    }


    public static function eventListTableEventIdSelectorForTitle($event_title)
    {
        return "//td[contains(@class, 'column-name')]/strong/a[text()='$event_title']"
            . "//ancestor::tr/td[contains(@class, 'column-id')]/text()";
    }


    public static function eventListTableEventTitleViewLinkSelectorForTitle($event_title)
    {
        return "//td[contains(@class, 'column-name')]/strong/a[text()='$event_title']"
            . "//ancestor::td//span[@class='view']/a";
    }
}