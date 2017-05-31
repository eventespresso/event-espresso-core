<?php
namespace EventEspresso\Codeception\helpers;

use Page\TicketSelector as TicketSelectorElements;

/**
 * Trait TicketSelector
 * Helper actions for the ticket selector.
 *
 * @package EventEspresso\Codeception\helpers
 */
trait TicketSelector
{

    /**
     * Use to select a quantity from the first ticket for the given event (so this can be used on a event archive page).
     * @param int|string $event_id
     * @param int|string $quantity
     */
    public function selectQuantityOfFirstTicketForEventId($event_id, $quantity = 1)
    {
        $this->actor()->selectOption(TicketSelectorElements::ticketOptionByEventIdSelector($event_id), $quantity);
    }


    /**
     * Used to submit the ticket selection for the given event id (so this can be used on an event archive page).
     * @param int|string $event_id
     */
    public function submitTicketSelectionsForEventId($event_id)
    {
        $this->actor()->click(TicketSelectorElements::ticketSelectionSubmitSelectorByEventId($event_id));
    }
}