<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\page_header;

use EE_Error;
use EE_Ticket;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\admin\AdminPageHeaderDecorator;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class TicketFilterHeader
 * uses Decorator pattern to add name and link for currently filtered ticket to admin page header text
 *
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\page_header
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TicketFilterHeader extends AdminPageHeaderDecorator
{

    /**
     * @var EEM_Ticket $ticket_model
     */
    private $ticket_model;


    /**
     * TicketFilterHeader constructor.
     *
     * @param RequestInterface $request
     * @param EEM_Ticket       $ticket_model
     */
    public function __construct(RequestInterface $request, EEM_Ticket $ticket_model)
    {
        parent::__construct($request);
        $this->ticket_model = $ticket_model;
    }


    /**
     * @param string $text
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getHeaderText($text = '')
    {
        $TKT_ID = $this->request->getRequestParam('TKT_ID');
        $TKT_ID = $this->request->getRequestParam('ticket_id', $TKT_ID);
        $TKT_ID = absint($TKT_ID);
        if ($TKT_ID) {
            $ticket = $this->ticket_model->get_one_by_ID($TKT_ID);
            if ($ticket instanceof EE_Ticket) {
                $ticket_details = '<span class="ee-ticket-name">' . $ticket->name() . '</span> ';
                $ticket_details .= ! $ticket->is_free()
                    ? '<span class="ee-ticket-price">' . $ticket->pretty_price() . '</span>'
                    : '<span class="reg-overview-free-event-spn">'
                      . __('free', 'event_espresso')
                      . '</span>';
                // remove the closing h3 heading tag if it exists
                $text = str_replace(
                    '</h3>',
                    '',
                    $text
                );
                if (empty($text)) {
                    $text = '<h3 style="line-height:1.5em;">';
                    $text .= esc_html__('Viewing registrations for ticket:',
                        'event_espresso');
                }
                $text .= '&nbsp; &nbsp; ';
                $text .= '<span class="drk-grey-text" style="font-size:.9em;">';
                $text .= '<span class="dashicons dashicons-tickets-alt"></span>';
                $text .= $ticket_details . '</span></h3>';
            }
        }
        return $text;
    }
}