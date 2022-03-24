<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EEM_Ticket;

/**
 * Class DefaultTickets
 * retrieves additional general information pertaining to tickets for use with GraphQL
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TicketMeta implements EventEditorDataInterface
{
    /**
     * @var EEM_Ticket $ticket_model
     */
    protected $ticket_model;


    /**
     * TicketMeta constructor.
     *
     * @param EEM_Ticket $ticket_model
     */
    public function __construct(EEM_Ticket $ticket_model)
    {
        $this->ticket_model = $ticket_model;
    }


    /**
     * @param int $eventId
     * @return array
     */
    public function getData(int $eventId): array
    {
        return ['visibilityOptions' => $this->ticket_model->getTicketVisibilityLabels()];
    }
}
