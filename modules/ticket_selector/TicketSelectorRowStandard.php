<?php
namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use EventEspresso\core\exceptions\UnexpectedEntityException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class TicketSelectorRowStandard
 * class for loading template and resolving template args for a single ticket row within a standard ticket selector
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class TicketSelectorRowStandard extends TicketSelectorRow
{

    /**
     * @var TicketDetails $ticket_details
     */
    protected $ticket_details;

    /**
     * @var \EE_Ticket_Selector_Config $template_settings
     */
    protected $template_settings;

    /**
     * @var \EE_Tax_Config $tax_settings
     */
    protected $tax_settings;

    /**
     * @var boolean $prices_displayed_including_taxes
     */
    protected $prices_displayed_including_taxes;

    /**
     * @var int $row
     */
    protected $row;

    /**
     * @var int $cols
     */
    protected $cols;

    /**
     * @var boolean $hidden_input_qty
     */
    protected $hidden_input_qty;

    /**
     * @var string $ticket_datetime_classes
     */
    protected $ticket_datetime_classes;



    /**
     * TicketDetails constructor.
     *
     * @param TicketDetails  $ticket_details
     * @param \EE_Tax_Config $tax_settings
     * @param int            $total_tickets
     * @param int            $max_atndz
     * @param int            $row
     * @param int            $cols
     * @param boolean        $required_ticket_sold_out
     * @param string         $event_status
     * @param string         $ticket_datetime_classes
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    public function __construct(
        TicketDetails $ticket_details,
        \EE_Tax_Config $tax_settings,
        $total_tickets,
        $max_atndz,
        $row,
        $cols,
        $required_ticket_sold_out,
        $event_status,
        $ticket_datetime_classes
    ) {
        $this->ticket = $ticket_details->getTicket();
        $this->ticket_details = $ticket_details;
        $this->template_settings = $ticket_details->getTemplateSettings();
        $this->tax_settings = $tax_settings;
        $this->total_tickets = $total_tickets;
        $this->max_atndz = $max_atndz;
        $this->row = $row;
        $this->cols = $cols;
        $this->date_format = $ticket_details->getDateFormat();
        $this->ticket_datetime_classes = $ticket_datetime_classes;
        parent::__construct($this->ticket, $max_atndz, $this->date_format, $event_status, $required_ticket_sold_out);
    }



    /**
     * other ticket rows will need to know if a required ticket is sold out,
     * so that they are not offered for sale
     *
     * @return boolean
     */
    public function getRequiredTicketSoldOut()
    {
        return $this->required_ticket_sold_out;
    }



    /**
     * @return int
     */
    public function getCols()
    {
        return $this->cols;
    }



    /**
     * getHtml
     *
     * @return string
     * @throws EE_Error
     */
    public function getHtml()
    {
        $min = 0;
        $max = $this->ticket->max();
        $remaining = $this->ticket->remaining();
        if ($this->ticket->is_on_sale() && $this->ticket->is_remaining()) {
            list($min, $max) = $this->setTicketMinAndMax($remaining);
        } else {
            // set flag if ticket is required (flag is set to start date so that future tickets are not blocked)
            $this->required_ticket_sold_out = $this->ticket->required() && ! $remaining
                ? $this->ticket->start_date()
                : $this->required_ticket_sold_out;
        }
        list($ticket_price, $ticket_bundle) = $this->getTicketPriceDetails();
        list($tkt_status, $ticket_status, $status_class) = $this->getTicketStatusClasses($remaining);
        /**
         * Allow plugins to hook in and abort the generation and display of this row to do
         * something else if they want.
         * For an addon to abort things, all they have to do is register a filter with this hook, and
         * return a value that is NOT false.  Whatever is returned gets echoed instead of the
         * current row.
         *
         * @var string|bool
         */
        $ticket_selector_row_html = apply_filters(
            'FHEE__ticket_selector_chart_template__do_ticket_entire_row',
            false,
            $this->ticket,
            $max,
            $min,
            $this->required_ticket_sold_out,
            $ticket_price,
            $ticket_bundle,
            $ticket_status,
            $status_class
        );
        if ($ticket_selector_row_html !== false) {
            return $ticket_selector_row_html;
        }
        $ticket_selector_row_html = \EEH_HTML::tr(
            '', '',
            "tckt-slctr-tbl-tr {$status_class}{$this->ticket_datetime_classes} " . espresso_get_object_css_class($this->ticket)
        );
        /**
         * Allow plugins to hook in and abort the generation and display of the contents of this
         * row to do something else if they want.
         * For an addon to abort things, all they have to do is register a filter with this hook, and
         * return a value that is NOT false.  Whatever is returned gets echoed instead of the
         * current row.
         *
         * @var string|bool
         */
        $new_row_cells_content = apply_filters(
            'FHEE__ticket_selector_chart_template__do_ticket_inside_row',
            false,
            $this->ticket,
            $max,
            $min,
            $this->required_ticket_sold_out,
            $ticket_price,
            $ticket_bundle,
            $ticket_status,
            $status_class
        );
        if ($new_row_cells_content !== false && $this->max_atndz === 1) {
            return $ticket_selector_row_html
                   . $new_row_cells_content
                   . $this->ticketQtyAndIdHiddenInputs()
                   . \EEH_HTML::trx();
        }
        if ($new_row_cells_content !== false) {
            return $ticket_selector_row_html
                   . $new_row_cells_content
                   . \EEH_HTML::trx();
        }
        $this->hidden_input_qty = $this->max_atndz > 1 ? true : false;

        $ticket_selector_row_html .= $this->ticketNameTableCell();
        $ticket_selector_row_html .= $this->ticketPriceTableCell($ticket_price, $ticket_bundle);
        $ticket_selector_row_html .= \EEH_HTML::td('', '', 'tckt-slctr-tbl-td-qty cntr');
        $this->setTicketStatusDisplay($tkt_status, $ticket_status, $remaining);
        if (empty($this->ticket_status_display)) {
            if ($this->max_atndz === 1) {
                // only ONE attendee is allowed to register at a time
                $ticket_selector_row_html .= $this->onlyOneAttendeeCanRegister();
            } else if ($max > 0) {
                $ticket_selector_row_html .= $this->ticketQuantitySelector($min, $max);
            }
        }
        $ticket_selector_row_html .= $this->ticket_status_display;
        $ticket_selector_row_html .= $this->ticketQtyAndIdHiddenInputs();
        $ticket_selector_row_html .= $this->ticket_details->display($ticket_price, $remaining, $this->cols);
        $ticket_selector_row_html .= \EEH_HTML::tdx();
        $ticket_selector_row_html .= \EEH_HTML::trx();


        $this->row++;
        return $ticket_selector_row_html;
    }



    /**
     * setTicketMinAndMax
     *
     * @param int $remaining
     * @return array
     * @throws EE_Error
     */
    protected function setTicketMinAndMax($remaining)
    {
        // offer the number of $tickets_remaining or $this->max_atndz, whichever is smaller
        $max = min($remaining, $this->max_atndz);
        // but... we also want to restrict the number of tickets by the ticket max setting,
        // however, the max still can't be higher than what was just set above
        $max = $this->ticket->max() > 0 ? min($this->ticket->max(), $max) : $max;
        // and we also want to restrict the minimum number of tickets by the ticket min setting
        $min = $this->ticket->min() > 0 ? $this->ticket->min() : 0;
        // and if the ticket is required, then make sure that min qty is at least 1
        $min = $this->ticket->required() ? max($min, 1) : $min;
        return array($min, $max);
    }



    /**
     * getTicketPriceDetails
     *
     * @return array
     * @throws EE_Error
     */
    protected function getTicketPriceDetails()
    {
        $ticket_price = $this->tax_settings->prices_displayed_including_taxes
            ? $this->ticket->get_ticket_total_with_taxes()
            : $this->ticket->get_ticket_subtotal();
        $ticket_bundle = false;
        $ticket_min = $this->ticket->min();
        // for ticket bundles, set min and max qty the same
        if ($ticket_min !== 0 && $ticket_min === $this->ticket->max()) {
            $ticket_price *= $ticket_min;
            $ticket_bundle = true;
        }
        $ticket_price = apply_filters(
            'FHEE__ticket_selector_chart_template__ticket_price',
            $ticket_price,
            $this->ticket
        );
        return array($ticket_price, $ticket_bundle);
    }




    /**
     * ticketNameTableCell
     *
     * @return string
     * @throws EE_Error
     */
    protected function ticketNameTableCell()
    {
        $html = \EEH_HTML::td('', '', 'tckt-slctr-tbl-td-name');
        $html .= \EEH_HTML::strong($this->ticket->get_pretty('TKT_name'));
        $html .= $this->ticket_details->getShowHideLinks();
        if ($this->ticket->required()) {
            $html .= \EEH_HTML::p(
                    apply_filters(
                            'FHEE__ticket_selector_chart_template__ticket_required_message',
                            esc_html__('This ticket is required and must be purchased.', 'event_espresso')
                    ),
                    '', 'ticket-required-pg'
            );
        }
        $html .= \EEH_HTML::tdx();
        return $html;
    }



    /**
     * ticketPriceTableCell
     *
     * @param float $ticket_price
     * @param bool  $ticket_bundle
     * @return string
     * @throws EE_Error
     */
    protected function ticketPriceTableCell($ticket_price, $ticket_bundle)
    {
        $html = '';
        if (apply_filters('FHEE__ticket_selector_chart_template__display_ticket_price_details', true)) {
            $html .= \EEH_HTML::td('', '', 'tckt-slctr-tbl-td-price jst-rght');
            $html .= \EEH_Template::format_currency($ticket_price);
            $html .= $this->ticket->taxable()
                ? \EEH_HTML::span( '*', '', 'taxable-tickets-asterisk grey-text' )
                : '';
            $html .= '&nbsp;';
            $html .= \EEH_HTML::span(
                $ticket_bundle
                    ? apply_filters(
                        'FHEE__ticket_selector_chart_template__per_ticket_bundle_text',
                        __(' / bundle', 'event_espresso')
                    )
                    : apply_filters(
                        'FHEE__ticket_selector_chart_template__per_ticket_text',
                        __('', 'event_espresso')
                    ),
                '', 'smaller-text no-bold'
            );
            $html .= '&nbsp;';
            $html .= \EEH_HTML::tdx();
            $this->cols++;
        }
        return $html;
    }



    /**
     * onlyOneAttendeeCanRegister
     *
     * @return string
     */
    protected function onlyOneAttendeeCanRegister()
    {
        // display submit button since we have tickets available
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
        $this->hidden_input_qty = false;
        $html = '<input type="radio" name="tkt-slctr-qty-' . $this->EVT_ID . '"';
        $html .= ' id="ticket-selector-tbl-qty-slct-' . $this->EVT_ID . '-' . $this->row . '"';
        $html .= ' class="ticket-selector-tbl-qty-slct" value="' . $this->row . '-1"';
        $html .= $this->total_tickets === 1 ? ' checked="checked"' : '';
        $html .= ' title=""/>';
        return $html;
    }



    /**
     * ticketQuantitySelector
     *
     * @param int $min
     * @param int $max
     * @return string
     * @throws EE_Error
     */
    protected function ticketQuantitySelector($min = 0, $max = 0)
    {
        // display submit button since we have tickets available
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
        $this->hidden_input_qty = false;
        $html = '<select name="tkt-slctr-qty-' . $this->EVT_ID . '[]"';
        $html .= ' id="ticket-selector-tbl-qty-slct-' . $this->EVT_ID . '-' . $this->row . '"';
        $html .= ' class="ticket-selector-tbl-qty-slct">';
        // this ensures that non-required tickets with non-zero MIN QTYs don't HAVE to be purchased
        if ($min !== 0 && ! $this->ticket->required()) {
            $html .= '<option value="0">&nbsp;0&nbsp;</option>';
        }
        // offer ticket quantities from the min to the max
        for ($i = $min; $i <= $max; $i++) {
            $html .= '<option value="' . $i . '">&nbsp;' . $i . '&nbsp;</option>';
        }
        $html .= '</select>';
        return $html;
    }



    /**
     * getHiddenInputs
     *
     * @return string
     * @throws EE_Error
     */
    protected function ticketQtyAndIdHiddenInputs()
    {
        $html = '';
        // depending on group reg we need to change the format for qty
        if ($this->hidden_input_qty) {
            $html .= '<input type="hidden" name="tkt-slctr-qty-' . $this->EVT_ID . '[]" value="0"/>';
        }
        $html .= '<input type="hidden" name="tkt-slctr-ticket-id-' . $this->EVT_ID . '[]"';
        $html .= ' value="' . $this->ticket->ID() . '"/>';
        return $html;
    }

}
// End of file TicketSelectorRowStandard.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorRowStandard.php