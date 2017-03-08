<?php
namespace EventEspresso\modules\ticket_selector;

use EE_Error;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class TicketSelectorRowSimple
 * class for loading template and resolving template args for the ticket row within a "DWMTS" ticket selector
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class TicketSelectorRowSimple extends TicketSelectorRow
{

    /**
     * @throws EE_Error
     */
    public function setupTicketStatusDisplay()
    {
        $remaining = $this->ticket->remaining();
        list($tkt_status, $ticket_status) = $this->getTicketStatusClasses($remaining);
        $this->setTicketStatusDisplay($tkt_status, $ticket_status, $remaining);
    }



}
// End of file TicketSelectorRowSimple.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorRowSimple.php