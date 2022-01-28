<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use EE_Event;
use EE_Tax_Config;
use EE_Ticket;
use EE_Ticket_Selector_Config;
use ReflectionException;

/**
 * Class TicketSelectorStandard
 * regular ticket selector that displays one row for each ticket
 * with a dropdown for selecting the desired ticket quantity
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.18
 */
class TicketSelectorStandard extends TicketSelector
{

    /**
     * @var string $date_format
     */
    protected $date_format;

    /**
     * @var string $time_format
     */
    protected $time_format;

    /**
     * @var EE_Ticket_Selector_Config $ticket_selector_config
     */
    protected $ticket_selector_config;

    /**
     * @var EE_Tax_Config $tax_config
     */
    protected $tax_config;


    /**
     * TicketSelectorSimple constructor.
     *
     * @param EE_Ticket_Selector_Config $ticket_selector_config
     * @param EE_Tax_Config             $tax_config
     * @param EE_Event                  $event
     * @param EE_Ticket[]               $tickets
     * @param int                       $max_attendees
     * @param array                     $template_args
     * @param string                    $date_format
     * @param string                    $time_format
     */
    public function __construct(
        EE_Ticket_Selector_Config $ticket_selector_config,
        EE_Tax_Config $tax_config,
        EE_Event $event,
        array $tickets,
        int $max_attendees,
        array $template_args,
        $date_format = 'Y-m-d',
        $time_format = 'g:i a'
    ) {
        $this->ticket_selector_config = $ticket_selector_config;
        $this->tax_config             = $tax_config;
        $this->date_format            = $date_format;
        $this->time_format            = $time_format;
        parent::__construct($event, $tickets, $max_attendees, $template_args);
    }


    /**
     * sets any and all template args that are required for this Ticket Selector
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function addTemplateArgs()
    {
        $this->ticket_rows        = 0;
        $all_ticket_rows_html     = '';
        $required_ticket_sold_out = false;
        // flag to indicate that at least one taxable ticket has been encountered
        $taxable_tickets                          = false;
        $datetime_selector                        = null;
        $this->template_args['datetime_selector'] = '';
        if (
            $this->ticket_selector_config->getShowDatetimeSelector()
            !== EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
        ) {
            $datetime_selector                        = new DatetimeSelector(
                $this->event,
                $this->tickets,
                $this->ticket_selector_config,
                $this->date_format,
                $this->time_format
            );
            $this->template_args['datetime_selector'] = $datetime_selector->getDatetimeSelector();
        }
        $total_tickets = count($this->tickets);
        // loop through tickets
        foreach ($this->tickets as $ticket) {
            if ($ticket instanceof EE_Ticket) {
                $this->ticket_rows++;
                $cols                = 2;
                $taxable_tickets     = $ticket->taxable() ? true : $taxable_tickets;
                $ticket_selector_row = new TicketSelectorRowStandard(
                    new TicketDetails($ticket, $this->ticket_selector_config, $this->template_args),
                    $this->tax_config,
                    $total_tickets,
                    $this->max_attendees,
                    $this->ticket_rows,
                    $cols,
                    $required_ticket_sold_out,
                    $this->template_args['event_status'],
                    $datetime_selector instanceof DatetimeSelector
                        ? $datetime_selector->getTicketDatetimeClasses($ticket)
                        : ''
                );
                $ticket_row_html     = $ticket_selector_row->getHtml();
                // check if something was actually returned
                if (! empty($ticket_row_html)) {
                    // add any output to the cumulative HTML
                    $all_ticket_rows_html .= $ticket_row_html;
                }
                if (empty($ticket_row_html) || ! $ticket_selector_row->isOnSale()) {
                    // decrement the ticket row count since it looks like one has been removed
                    $this->ticket_rows--;
                }

                $required_ticket_sold_out = $ticket_selector_row->getRequiredTicketSoldOut();
            }
        }
        $this->template_args['row']                              = $this->ticket_rows;
        $this->template_args['ticket_row_html']                  = $all_ticket_rows_html;
        $this->template_args['taxable_tickets']                  = $taxable_tickets;
        $this->template_args['prices_displayed_including_taxes'] = $this->tax_config->prices_displayed_including_taxes;


        /**
         * Filters the text printed for the header of the price column in the ticket selector table
         *
         * @param string 'Price' The translatable text to display in the table header for price
         * @param int $EVT_ID The Event ID
         * @since 4.7.2
         *
         */
        $this->template_args['table_header_price'] = apply_filters(
            'FHEE__ticket_selector_chart_template__table_header_price',
            esc_html__('Price', 'event_espresso'),
            $this->event->ID()
        );

        /**
         * Filters the text printed for the header of the quantity column in the ticket selector table
         *
         * @param string 'Qty' The translatable text to display in the table header for the Quantity of tickets
         * @param int $EVT_ID The Event ID
         * @since 4.7.2
         *
         */
        $this->template_args['table_header_qty'] = apply_filters(
            'FHEE__ticket_selector_chart_template__table_header_qty',
            esc_html__('Qty', 'event_espresso'),
            $this->event->ID()
        );
        $this->template_args['template_path'] = TICKET_SELECTOR_TEMPLATES_PATH . 'standard_ticket_selector.template.php';
        remove_all_filters('FHEE__EE_Ticket_Selector__hide_ticket_selector');
    }
}
