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
        $visibility_options = [];
        foreach ($ticket_visibility_options as $key => $ticket_visibility_option) {
            $visibility_options[] = [
                'desc' => $ticket_visibility_option['desc'],
                'label' => $ticket_visibility_option['label'],
                'level' => $ticket_visibility_option['value'],
                'value' => $key, // we want to use the keys like PUBLIC or ADMINS_ONLY as values in the client
            ];
        }
        return ['visibilityOptions' => $visibility_options];
    }
}
