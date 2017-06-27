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
     * @var string
     */
    const EVENT_EDITOR_DEFAULT_REGISTRATION_STATUS_FIELD_SELECTOR = '#EVT_default_registration_status';

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


    public static function eventEditorTicketPriceFieldSelector($row_number = 1)
    {
        return self::eventEditorTicketFieldSelectorForFieldInDisplayRow('TKT_base_price', $row_number);
    }


    public static function eventEditorTicketAdvancedDetailsSelector($row_number = 1)
    {
        return "//tr[@id='display-ticketrow-$row_number']//span[contains(@class, 'gear-icon')]";
    }


    public static function eventEditorTicketAdvancedDetailsSubtotalSelector($row_number = 1)
    {
        return "//span[@id='price-total-amount-$row_number']";
    }


    public static function eventEditorTicketAdvancedDetailsTotalSelector($row_number = 1)
    {
        return "//span[@id='price-total-amount-$row_number']";
    }


    public static function eventEditorTicketTaxableCheckboxSelector($row_number = 1)
    {
        return "//input[@id='edit-ticket-TKT_taxable-$row_number']";
    }


    /**
     * This returns the xpath locater for the Tax amount display container within the advanced settings view for the
     * given ticket (row) and the given tax id (PRC_ID).
     *
     * @param int $tax_id     The PRC_ID for the tax you want the locater for.  Note, this defaults to the default tax
     *                        setup on a fresh install.
     * @param int $row_number What row representing the ticket you want the locator for.
     * @return string
     */
    public static function eventEditorTicketTaxAmountDisplayForTaxIdAndTicketRowSelector($tax_id = 2, $row_number = 1)
    {
        return "//span[@id='TKT-tax-amount-display-$tax_id-$row_number']";
    }


    /**
     * Wrapper for getting the selector for a given field and given display row of a ticket in the event editor.
     * @param     $field_name
     * @param int $row_number
     * @return string
     */
    public static function eventEditorTicketFieldSelectorForFieldInDisplayRow($field_name, $row_number = 1)
    {
        return "//tr[@id='display-ticketrow-$row_number']//input[contains(@class, 'edit-ticket-$field_name')]";
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


    /**
     * Locator for for the ID column in the event list table for a given event title.
     * @param string $event_title
     * @return string
     */
    public static function eventListTableEventIdSelectorForTitle($event_title)
    {
        return "//td[contains(@class, 'column-name')]/strong/a[text()='$event_title']"
               . "//ancestor::tr/th[contains(@class, 'check-column')]/input";
    }


    /**
     * Locator for the view link in the row of an event list table for the given event title.
     * @param string $event_title
     * @return string
     */
    public static function eventListTableEventTitleViewLinkSelectorForTitle($event_title)
    {
        return "//td[contains(@class, 'column-name')]/strong/a[text()='$event_title']"
               . "//ancestor::td//span[@class='view']/a";
    }


    /**
     * Locator for the messenger tab in the Notifications metabox in the event editor.
     * @param string $messenger_slug  The slug for the messenger (it's reference slug).
     * @return string
     */
    public static function eventEditorNotificationsMetaBoxMessengerTabSelector($messenger_slug)
    {
        return "//div[@id='espresso_events_Messages_Hooks_Extend_messages_metabox_metabox']"
               . "//a[@rel='ee-tab-$messenger_slug']";
    }


    /**
     * Locator for the select input within the notifications metabox.
     * Note, this assumes the tab content for the related messenger is already visible.
     * @param string $message_type_label The message type label (visible string in the table) you want the selector for.
     * @return string
     */
    public static function eventEditorNotificationsMetaBoxSelectSelectorForMessageType($message_type_label)
    {
        return "//div[@id='espresso_events_Messages_Hooks_Extend_messages_metabox_metabox']"
               . "//table[@class='messages-custom-template-switcher']"
               . "//tr/td[contains(.,'Registration Approved')]"
               . "//ancestor::tr//select[contains(@class,'message-template-selector')]";
    }
}
