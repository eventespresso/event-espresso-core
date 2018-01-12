<?php
namespace Page;

/**
 * TicketSelector
 * Selectors/References to elements for the Ticket Selector.
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class TicketSelector
{

    /**
     * Return the selector for the ticket option select input for the given event id.
     * @param int|string $event_id
     * @return string
     */
    public static function ticketOptionByEventIdSelector($event_id)
    {
        return "//select[@id='ticket-selector-tbl-qty-slct-$event_id-1']";
    }


    /**
     * Return the selector for the submit button for the ticket selector for the given event id.
     * @param int|string $event_id
     * @param bool       $admin     Used to return the selector from the context of the admin (true) or frontend (false)
     * @return string
     */
    public static function ticketSelectionSubmitSelectorByEventId($event_id, $admin = false)
    {
        return $admin
            ? "#ee-new-registration-step-button"
            : "#ticket-selector-submit-$event_id-btn";
    }
}