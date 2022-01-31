<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use EE_Tax_Config;
use EE_Ticket_Selector_Config;
use EEH_HTML;
use EEH_Template;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use ReflectionException;

/**
 * Class TicketSelectorRowStandard
 * class for loading template and resolving template args for a single ticket row within a standard ticket selector
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class TicketSelectorRowStandard extends TicketSelectorRow
{

    /**
     * @var TicketDetails
     */
    protected $ticket_details;

    /**
     * @var EE_Ticket_Selector_Config
     */
    protected $template_settings;

    /**
     * @var EE_Tax_Config
     */
    protected $tax_settings;

    /**
     * @var boolean
     */
    protected $prices_displayed_including_taxes;

    /**
     * @var int
     */
    protected $row;

    /**
     * @var int
     */
    protected $cols;

    /**
     * @var boolean
     */
    protected $hidden_input_qty = false;

    /**
     * @var string
     */
    protected $ticket_datetime_classes;


    /**
     * TicketDetails constructor.
     *
     * @param TicketDetails $ticket_details
     * @param EE_Tax_Config $tax_settings
     * @param int           $total_tickets
     * @param int           $max_attendees
     * @param int           $row
     * @param int           $cols
     * @param boolean       $required_ticket_sold_out
     * @param string        $event_status
     * @param string        $ticket_datetime_classes
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    public function __construct(
        TicketDetails $ticket_details,
        EE_Tax_Config $tax_settings,
        $total_tickets,
        $max_attendees,
        $row,
        $cols,
        $required_ticket_sold_out,
        $event_status,
        $ticket_datetime_classes
    ) {
        $this->ticket_details = $ticket_details;
        $this->template_settings = $ticket_details->getTemplateSettings();
        $this->tax_settings = $tax_settings;
        $this->row = $row;
        $this->cols = $cols;
        $this->ticket_datetime_classes = $ticket_datetime_classes;
        parent::__construct(
            $ticket_details->getTicket(),
            $max_attendees,
            $ticket_details->getDateFormat(),
            $event_status,
            $required_ticket_sold_out,
            $total_tickets
        );
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
     * @throws ReflectionException
     */
    public function getHtml()
    {
        $this->min = 0;
        $this->max = $this->ticket->max();
        $remaining = $this->ticket->remaining();
        $this->setTicketMinAndMax($remaining);
        // set flag if ticket is required (flag is set to start date so that future tickets are not blocked)
        $this->required_ticket_sold_out = $this->ticket->required() && ! $remaining
            ? $this->ticket->start_date()
            : $this->required_ticket_sold_out;
        $this->setTicketPriceDetails();
        $this->setTicketStatusClasses($remaining);
        $filtered_row_html = $this->getFilteredRowHtml();
        if ($filtered_row_html !== false) {
            return $filtered_row_html;
        }
        $ticket_selector_row_html = EEH_HTML::tr(
            '',
            '',
            "tckt-slctr-tbl-tr {$this->status_class}{$this->ticket_datetime_classes} "
            . espresso_get_object_css_class($this->ticket)
        );
        $filtered_row_content = $this->getFilteredRowContents();
        if ($filtered_row_content !== false) {
            if ($this->max_attendees === 1) {
                return $ticket_selector_row_html
                       . $filtered_row_content
                       . $this->ticketQtyAndIdHiddenInputs()
                       . EEH_HTML::trx();
            }
            return $ticket_selector_row_html
                   . $filtered_row_content
                   . EEH_HTML::trx();
        }
        $this->hidden_input_qty = $this->max_attendees > 1;

        $ticket_selector_row_html .= $this->ticketNameTableCell();
        $ticket_selector_row_html .= $this->ticketPriceTableCell();
        $ticket_selector_row_html .= EEH_HTML::td(
            '',
            '',
            'tckt-slctr-tbl-td-qty cntr',
            '',
            'headers="quantity-' . $this->EVT_ID . '"'
        );
        $this->setTicketStatusDisplay($remaining);
        if (empty($this->ticket_status_display)) {
            if ($this->max_attendees === 1) {
                // only ONE attendee is allowed to register at a time
                $ticket_selector_row_html .= $this->onlyOneAttendeeCanRegister();
            } elseif ($this->max > 0) {
                $ticket_selector_row_html .= $this->ticketQuantitySelector();
            }
        }
        $ticket_selector_row_html .= $this->ticket_status_display;
        $ticket_selector_row_html .= $this->ticketQtyAndIdHiddenInputs();
        $ticket_selector_row_html .= $this->ticket_details->display(
            $this->ticket_price,
            $remaining,
            $this->cols
        );
        $ticket_selector_row_html .= EEH_HTML::tdx();
        $ticket_selector_row_html .= EEH_HTML::trx();


        $this->row++;
        return $ticket_selector_row_html;
    }


    /**
     * getTicketPriceDetails
     *
     * @return void
     * @throws EE_Error
     */
    protected function setTicketPriceDetails()
    {
        $this->ticket_price = $this->tax_settings->prices_displayed_including_taxes
            ? $this->ticket->get_ticket_total_with_taxes()
            : $this->ticket->get_ticket_subtotal();
        $this->ticket_bundle = false;
        $ticket_min = $this->ticket->min();
        // for ticket bundles, set min and max qty the same
        if ($ticket_min !== 0 && $ticket_min === $this->ticket->max()) {
            $this->ticket_price *= $ticket_min;
            $this->ticket_bundle = true;
        }
        $this->ticket_price = apply_filters(
            'FHEE__ticket_selector_chart_template__ticket_price',
            $this->ticket_price,
            $this->ticket
        );
    }


    /**
     * ticketNameTableCell
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function ticketNameTableCell()
    {
        $html = EEH_HTML::td(
            '',
            '',
            'tckt-slctr-tbl-td-name',
            '',
            'headers="details-' . $this->EVT_ID . '"'
        );
        $html .= EEH_HTML::strong($this->ticket->get_pretty('TKT_name'));
        $html .= $this->ticket_details->getShowHideLinks();
        if ($this->ticket->required()) {
            $html .= EEH_HTML::p(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__ticket_required_message',
                    esc_html__('This ticket is required and must be purchased.', 'event_espresso')
                ),
                '',
                'ticket-required-pg'
            );
        }
        $html .= EEH_HTML::tdx();
        return $html;
    }


    /**
     * ticketPriceTableCell
     *
     * @return string
     * @throws EE_Error
     */
    protected function ticketPriceTableCell()
    {
        $html = '';
        if (apply_filters('FHEE__ticket_selector_chart_template__display_ticket_price_details', true)) {
            $html .= EEH_HTML::td(
                '',
                '',
                'tckt-slctr-tbl-td-price jst-rght',
                '',
                'headers="price-' . $this->EVT_ID . '"'
            );
            $html .= EEH_HTML::span(
                EEH_Template::format_currency($this->ticket_price),
                '',
                'tckt-price--nowrap'
            );
            $html .= $this->ticket->taxable()
                ? EEH_HTML::span('*', '', 'taxable-tickets-asterisk grey-text')
                : '';
            $html .= '&nbsp;';
            // phpcs:disable WordPress.WP.I18n.NoEmptyStrings
            $html .= EEH_HTML::span(
                $this->ticket_bundle
                    ? apply_filters(
                        'FHEE__ticket_selector_chart_template__per_ticket_bundle_text',
                        esc_html__(' / bundle', 'event_espresso')
                    )
                    : apply_filters(
                        'FHEE__ticket_selector_chart_template__per_ticket_text',
                        esc_html__('', 'event_espresso')
                    ),
                '',
                'smaller-text no-bold'
            );
            $html .= '&nbsp;';
            $html .= EEH_HTML::tdx();
            $this->cols++;
        }
        return $html;
    }


    /**
     * onlyOneAttendeeCanRegister
     *
     * @return string
     * @throws EE_Error
     */
    protected function onlyOneAttendeeCanRegister()
    {
        $this->hidden_input_qty = false;
        // display submit button since we have tickets available
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');

        $TKT   = $this->ticket->ID();
        $label = esc_html__('Select this ticket', 'event_espresso');
        $name  = "tkt-slctr-qty-{$this->EVT_ID}";
        $class = "ticket-selector-tbl-qty-slct";
        $id    = "{$class}-{$this->EVT_ID}-{$this->row}";
        $checked = $this->total_tickets === 1 ? ' checked="checked"' : '';

        $html = "<label class='ee-a11y-screen-reader-text' for='{$id}' >{$label}</label>";
        $html .= "<input type='radio'{$checked} name='{$name}' id='{$id}' class='{$class}' value='{$TKT}-1' title='' />";
        return $html;
    }


    /**
     * ticketQuantitySelector
     *
     * @return string
     * @throws EE_Error
     */
    protected function ticketQuantitySelector()
    {
        $this->hidden_input_qty = false;
        // display submit button since we have tickets available
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');

        $TKT = $this->ticket->ID();
        $label = esc_html__('Quantity', 'event_espresso');
        $class = 'ticket-selector-tbl-qty-slct';
        $id = "{$class}-{$this->EVT_ID}-{$this->row}";

        $html = "<label class='ee-a11y-screen-reader-text' for='{$id}' >{$label}</label>";
        $html .= "<select name='tkt-slctr-qty-{$this->EVT_ID}[{$TKT}]' id='{$id}' class='{$class}'>";
        // this ensures that non-required tickets with non-zero MIN QTYs don't HAVE to be purchased
        if ($this->min !== 0 && ! $this->ticket->required()) {
            $html .= "<option value='0'>&nbsp;0&nbsp;</option>";
        }
        // offer ticket quantities from the min to the max
        for ($i = $this->min; $i <= $this->max; $i++) {
            $html .= "<option value='{$i}'>&nbsp;{$i}&nbsp;</option>";
        }
        $html .= "</select>";
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
        $EVT = $this->EVT_ID;
        $TKT = $this->ticket->ID();
        // depending on group reg we need to change the format for qty
        if ($this->hidden_input_qty) {
            $html .= "<input type='hidden' name='tkt-slctr-qty-{$EVT}[]' value='0' />";
        }
        $html .= "<input type='hidden' name='tkt-slctr-ticket-id-{$EVT}[]' value='{$TKT}' />";
        return $html;
    }
}
