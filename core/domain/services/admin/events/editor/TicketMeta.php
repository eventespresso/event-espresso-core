<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EEM_Ticket;

/**
 * Class TicketMeta
 * retrieves additional general information pertaining to tickets for use with GraphQL
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   5.0.0.p
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
        $ticket_visibility_options = apply_filters(
            'FHEE___EventEspresso_core_domain_services_admin_events_editor_TicketMeta__getData__visibilityOptions',
            $this->ticket_model->ticketVisibilityOptions()
        );
        return ['visibilityOptions' => array_values($ticket_visibility_options)];
    }
}
