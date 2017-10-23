<?php
namespace EventEspresso\modules\ticket_selector;

use EE_Datetime;
use EE_Error;
use EE_Ticket;
use EEH_HTML;
use EventEspresso\core\exceptions\UnexpectedEntityException;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
     * @var EE_Ticket $ticket
     */
    protected $ticket;

    /**
     * @var int $total_tickets
     */
    protected $total_tickets;

    /**
     * @var int $max_attendees
     */
    protected $max_attendees;

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
     * @var int $max
     */
    protected $max = 0;

    /**
     * @var int $min
     */
    protected $min = 0;

    /**
     * @var float $ticket_price
     */
    protected $ticket_price = 0.00;

    /**
     * @var bool $ticket_bundle
     */
    protected $ticket_bundle = false;

    /**
     * @var string $ticket_status_id
     */
    protected $ticket_status_id = EE_Ticket::sold_out;

    /**
     * @var string $ticket_status_html
     */
    protected $ticket_status_html = 'ticket-sales-sold-out';

    /**
     * @var string $status_class
     */
    protected $status_class = 'ticket-sales-sold-out lt-grey-text';



    /**
     * @param EE_Ticket $ticket
     * @param int       $max_attendees
     * @param string    $date_format
     * @param string    $event_status
     * @param bool      $required_ticket_sold_out
     * @param int       $total_tickets
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    public function __construct(
        EE_Ticket $ticket,
        $max_attendees,
        $date_format,
        $event_status,
        $required_ticket_sold_out = false,
        $total_tickets = 1
    ) {
        $this->ticket = $ticket;
        $this->max_attendees = $max_attendees;
        $this->date_format = $date_format;
        $this->EVT_ID = $this->ticket->get_event_ID();
        $this->event_status = $event_status;
        $this->required_ticket_sold_out = $required_ticket_sold_out;
        $this->total_tickets = $total_tickets;
    }



    /**
     * getTicketStatusClasses
     *
     * @param int $remaining
     * @return void
     * @throws EE_Error
     */
    protected function setTicketStatusClasses($remaining = 0)
    {
        // if a previous required ticket with the same sale start date is sold out,
        // then mark this ticket as sold out as well.
        // tickets that go on sale at a later date than the required ticket  will NOT be affected
        $this->ticket_status_id = $this->required_ticket_sold_out !== false
                      && $this->required_ticket_sold_out === $this->ticket->start_date()
            ? EE_Ticket::sold_out
            : $this->ticket->ticket_status();
        $this->ticket_status_id = $this->event_status === EE_Datetime::sold_out
            ? EE_Ticket::sold_out
            : $this->ticket_status_id;
        // check ticket status
        switch ($this->ticket_status_id) {
            // sold_out
            case EE_Ticket::sold_out :
                $ticket_status_class = 'ticket-sales-sold-out';
                $this->status_class = 'ticket-sales-sold-out lt-grey-text';
                break;
            // expired
            case EE_Ticket::expired :
                $ticket_status_class = 'ticket-sales-expired';
                $this->status_class = 'ticket-sales-expired lt-grey-text';
                break;
            // archived
            case EE_Ticket::archived :
                $ticket_status_class = 'archived-ticket';
                $this->status_class = 'archived-ticket hidden';
                break;
            // pending
            case EE_Ticket::pending :
                $ticket_status_class = 'ticket-pending';
                $this->status_class = 'ticket-pending';
                break;
            // on sale
            case EE_Ticket::onsale :
            default :
                $ticket_status_class = 'ticket-on-sale';
                $this->status_class = 'ticket-on-sale';
                break;
        }
        $this->ticket_status_html = EEH_HTML::span(
            $this->ticket->ticket_status(true, ($remaining > 0)),
            "{$ticket_status_class}-{$this->ticket->ID()}",
            $ticket_status_class
        );
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
     * @param int    $remaining
     * @throws EE_Error
     */
    protected function setTicketStatusDisplay($remaining) {
        $this->ticket_status_display = '';
        // now depending on the ticket and other circumstances...
        if ($this->max_attendees === 0) {
            // registration is CLOSED because admin set max attendees to ZERO
            $this->ticket_status_display = $this->registrationClosed();
        } elseif ($this->ticket_status_id === EE_Ticket::sold_out || $remaining === 0) {
            // SOLD OUT - no tickets remaining
            $this->ticket_status_display = $this->ticketsSoldOut();
        } elseif ($this->ticket_status_id === EE_Ticket::expired || $this->ticket_status_id === EE_Ticket::archived) {
            // expired or archived ticket
            $this->ticket_status_display = $this->ticket_status_html;
        } elseif ($this->ticket_status_id === EE_Ticket::pending) {
            // ticket not on sale yet
            $this->ticket_status_display = $this->ticketsSalesPending();
        } elseif ($this->ticket->min() > $remaining) {
            // min qty purchasable is less than tickets available
            $this->ticket_status_display = $this->notEnoughTicketsAvailable();
        }
    }



    /**
     * registrationClosed
     */
    protected function registrationClosed()
    {
        return EEH_HTML::span(
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
        return EEH_HTML::span(
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
        return EEH_HTML::span(
            EEH_HTML::span(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__ticket_goes_on_sale_msg',
                    __('Goes&nbsp;On&nbsp;Sale', 'event_espresso')
                ),
                '', 'ticket-pending'
            )
            . EEH_HTML::br()
            . EEH_HTML::span(
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
        return EEH_HTML::div(
            EEH_HTML::span(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__ticket_not_available_msg',
                    __('Not Available', 'event_espresso')
                ),
                '', 'archived-ticket small-text'
            )
            . EEH_HTML::br(),
            '', 'archived-ticket-pg'
        );
    }



    /**
     * setTicketMinAndMax
     *
     * @param int $remaining
     * @return void
     * @throws EE_Error
     */
    protected function setTicketMinAndMax($remaining)
    {
        // offer the number of $tickets_remaining or $this->max_attendees, whichever is smaller
        $this->max = min($remaining, $this->max_attendees);
        // but... we also want to restrict the number of tickets by the ticket max setting,
        // however, the max still can't be higher than what was just set above
        $this->max = $this->ticket->max() > 0
            ? min($this->ticket->max(), $this->max)
            : $this->max;
        // and we also want to restrict the minimum number of tickets by the ticket min setting
        $this->min = $this->ticket->min() > 0
            ? $this->ticket->min()
            : 0;
        // and if the ticket is required, then make sure that min qty is at least 1
        $this->min = $this->ticket->required()
            ? max($this->min, 1)
            : $this->min;
    }


    /**
     * Allow plugins to hook in and abort the generation and display of this row to do
     * something elseif they want.
     * For an addon to abort things, all they have to do is register a filter with this hook, and
     * return a value that is NOT false.  Whatever is returned gets echoed instead of the
     * current row.
     *
     * @return string|bool
     */
    protected function getFilteredRowHtml() {
        return apply_filters(
            'FHEE__ticket_selector_chart_template__do_ticket_entire_row',
            false,
            $this->ticket,
            $this->max,
            $this->min,
            $this->required_ticket_sold_out,
            $this->ticket_price,
            $this->ticket_bundle,
            $this->ticket_status_html,
            $this->status_class,
            $this
        );
    }



    /**
     * Allow plugins to hook in and abort the generation and display of the contents of this
     * row to do something elseif they want.
     * For an addon to abort things, all they have to do is register a filter with this hook, and
     * return a value that is NOT false.  Whatever is returned gets echoed instead of the
     * current row.
     *
     * @return string|bool
     */
    protected function getFilteredRowContents()
    {
        return apply_filters(
            'FHEE__ticket_selector_chart_template__do_ticket_inside_row',
            false,
            $this->ticket,
            $this->max,
            $this->min,
            $this->required_ticket_sold_out,
            $this->ticket_price,
            $this->ticket_bundle,
            $this->ticket_status_html,
            $this->status_class,
            $this
        );
    }

}
// End of file TicketSelectorRow.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorRow.php
