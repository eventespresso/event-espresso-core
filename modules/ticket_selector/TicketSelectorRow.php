<?php
namespace EventEspresso\modules\ticket_selector;

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
     * @var string $ticket_status_display
     */
    protected $ticket_status_display;



    /**
     * TicketDetails constructor.
     *
     * @param \EE_Ticket                 $ticket
     * @param int                        $max_atndz
     * @param string                     $date_format
     */
    public function __construct(
        \EE_Ticket $ticket,
        $max_atndz,
        $date_format
    ) {
        $this->ticket = $ticket;
        $this->max_atndz = $max_atndz;
        $this->date_format = $date_format;
        $this->EVT_ID = $this->ticket->get_event_ID();
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
     * @throws \EE_Error
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
     * @throws \EE_Error
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