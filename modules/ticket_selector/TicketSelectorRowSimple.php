<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use ReflectionException;

/**
 * Class TicketSelectorRowSimple
 * class for loading template and resolving template args for the ticket row within a "DWMTS" ticket selector
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class TicketSelectorRowSimple extends TicketSelectorRow
{
    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setupTicketStatusDisplay()
    {
        $remaining = $this->ticket->remaining();
        $this->setTicketMinAndMax($remaining);
        $this->setTicketStatusClasses($remaining);
        $this->setTicketStatusDisplay($remaining);
    }


    /**
     * @return bool|string
     * @throws EE_Error
     */
    public function getTicketDescription()
    {
        $filtered_row_content = $this->getFilteredRowContents();
        if ($filtered_row_content !== false) {
            remove_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
            add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_false');
            return $filtered_row_content;
        }
        return $this->ticket->description();
    }
}
