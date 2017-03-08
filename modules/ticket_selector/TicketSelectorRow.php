<?php
namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use EventEspresso\core\exceptions\UnexpectedEntityException;

defined('ABSPATH') || exit;



/**
 * Class TicketSelectorRow
 * abstract parent class for a single ticket selector ticket row
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class TicketSelectorRow
{

    /**
     * @var \EE_Ticket $ticket
     */
    protected $ticket;

    /**
     * @var int $total_tickets
     */
    protected $total_tickets;

    /**
     * @var int $max_atndz
     */
    protected $max_atndz;

    /**
     * @var string $date_format
     */
    protected $date_format;

    /**
     * @var int $EVT_ID
     */
    protected $EVT_ID;

    /**
     * @var string $event_status
     */
    protected $event_status;

    /**
     * @var boolean $required_ticket_sold_out
     */
    protected $required_ticket_sold_out;

    /**
     * @var string $ticket_status_display
     */
    protected $ticket_status_display;



    /**
     * @param \EE_Ticket $ticket
     * @param int        $max_atndz
     * @param string     $date_format
     * @param string     $event_status
     * @param bool       $required_ticket_sold_out
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    public function __construct(
        \EE_Ticket $ticket,
        $max_atndz,
        $date_format,
        $event_status,
        $required_ticket_sold_out = false
    ) {
        $this->ticket = $ticket;
        $this->max_atndz = $max_atndz;
        $this->date_format = $date_format;
        $this->EVT_ID = $this->ticket->get_event_ID();
        $this->event_status = $event_status;
        $this->required_ticket_sold_out = $required_ticket_sold_out;
    }



    /**
     * getTicketStatusClasses
     *
     * @param int $remaining
     * @return array
     * @throws EE_Error
     */
    protected function getTicketStatusClasses($remaining = 0)
    {
        // if a previous required ticket with the same sale start date is sold out,
        // then mark this ticket as sold out as well.
        // tickets that go on sale at a later date than the required ticket  will NOT be affected
        $tkt_status = $this->required_ticket_sold_out !== false
                      && $this->required_ticket_sold_out === $this->ticket->start_date()
            ? \EE_Ticket::sold_out
            : $this->ticket->ticket_status();
        $tkt_status = $this->event_status === \EE_Datetime::sold_out
            ? \EE_Ticket::sold_out
            : $tkt_status;
        // check ticket status
        switch ($tkt_status) {
            // sold_out
            case \EE_Ticket::sold_out :
                $ticket_status = 'ticket-sales-sold-out';
                $status_class = 'ticket-sales-sold-out lt-grey-text';
                break;
            // expired
            case \EE_Ticket::expired :
                $ticket_status = 'ticket-sales-expired';
                $status_class = 'ticket-sales-expired lt-grey-text';
                break;
            // archived
            case \EE_Ticket::archived :
                $ticket_status = 'archived-ticket';
                $status_class = 'archived-ticket hidden';
                break;
            // pending
            case \EE_Ticket::pending :
                $ticket_status = 'ticket-pending';
                $status_class = 'ticket-pending';
                break;
            // onsale
            case \EE_Ticket::onsale :
            default :
                $ticket_status = 'ticket-on-sale';
                $status_class = 'ticket-on-sale';
                break;
        }
        $ticket_status = \EEH_HTML::span($this->ticket->ticket_status(true, ($remaining > 0)), '', $ticket_status);
        return array($tkt_status, $ticket_status, $status_class);
    }


    /**
     * @return string
     */
    public function getTicketStatusDisplay()
    {
        return $this->ticket_status_display;
    }



    /**
     * setTicketStatusDisplay
     *
     * @param string $tkt_status
     * @param string $ticket_status
     * @param int    $remaining
     * @throws EE_Error
     */
    protected function setTicketStatusDisplay($tkt_status, $ticket_status, $remaining) {
        $this->ticket_status_display = '';
        // now depending on the ticket and other circumstances...
        if ($this->max_atndz === 0) {
            // registration is CLOSED because admin set max attendees to ZERO
            $this->ticket_status_display = $this->registrationClosed();
        } else if ($tkt_status === \EE_Ticket::sold_out || $remaining === 0) {
            // SOLD OUT - no tickets remaining
            $this->ticket_status_display = $this->ticketsSoldOut();
        } else if ($tkt_status === \EE_Ticket::expired || $tkt_status === \EE_Ticket::archived) {
            // expired or archived ticket
            $this->ticket_status_display = $ticket_status;
        } else if ($tkt_status === \EE_Ticket::pending) {
            // ticket not on sale yet
            $this->ticket_status_display = $this->ticketsSalesPending();
        } else if ($this->ticket->min() > $remaining) {
            // min qty purchasable is less than tickets available
            $this->ticket_status_display = $this->notEnoughTicketsAvailable();
        }
    }



    /**
     * registrationClosed
     */
    protected function registrationClosed()
    {
        return \EEH_HTML::span(
            apply_filters(
                'FHEE__ticket_selector_chart_template__ticket_closed_msg',
                __('Closed', 'event_espresso')
            ),
            '', 'sold-out'
        );
    }



    /**
     * ticketsSoldOut
     */
    protected function ticketsSoldOut()
    {
        return \EEH_HTML::span(
            apply_filters(
                'FHEE__ticket_selector_chart_template__ticket_sold_out_msg',
                __('Sold&nbsp;Out', 'event_espresso')
            ),
            '', 'sold-out'
        );
    }



    /**
     * ticketsSalesPending
     *
     * @throws EE_Error
     */
    protected function ticketsSalesPending()
    {
        return \EEH_HTML::span(
            \EEH_HTML::span(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__ticket_goes_on_sale_msg',
                    __('Goes&nbsp;On&nbsp;Sale', 'event_espresso')
                ),
                '', 'ticket-pending'
            )
            . \EEH_HTML::br()
            . \EEH_HTML::span(
                $this->ticket->get_i18n_datetime(
                    'TKT_start_date',
                    apply_filters(
                        'FHEE__EED_Ticket_Selector__display_goes_on_sale__date_format',
                        $this->date_format
                    )
                ),
                '', 'small-text'
            ),
            '', 'ticket-pending-pg'
        );
    }



    /**
     * notEnoughTicketsAvailable
     */
    protected function notEnoughTicketsAvailable()
    {
        return \EEH_HTML::div(
            \EEH_HTML::span(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__ticket_not_available_msg',
                    __('Not Available', 'event_espresso')
                ),
                '', 'archived-ticket small-text'
            )
            . \EEH_HTML::br(),
            '', 'archived-ticket-pg'
        );
    }



}
// End of file TicketSelectorRow.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorRow.php