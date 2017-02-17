<?php
namespace EventEspresso\modules\ticket_selector;

defined('ABSPATH') || exit;



/**
 * Class TicketDetails
 * class for loading template and resolving template args for the ticket details template
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class TicketDetails
{


    /**
     * @var \EE_Ticket $ticket
     */
    protected $ticket;

    /**
     * @var \EE_Ticket_Selector_Config $template_settings
     */
    protected $template_settings;

    /**
     * @var string $date_format
     */
    protected $date_format;

    /**
     * @var string $time_format
     */
    protected $time_format;

    /**
     * @var boolean $event_is_expired
     */
    protected $event_is_expired;



    /**
     * TicketDetails constructor.
     *
     * @param \EE_Ticket                 $ticket
     * @param \EE_Ticket_Selector_Config $template_settings
     * @param array                      $template_args
     */
    public function __construct(
        \EE_Ticket $ticket,
        \EE_Ticket_Selector_Config $template_settings,
        array $template_args
    )
    {
        $this->ticket            = $ticket;
        $this->template_settings = $template_settings;
        $this->date_format       = $template_args['date_format'];
        $this->time_format       = $template_args['time_format'];
        $this->event_is_expired  = $template_args['event_is_expired'];
    }



    /**
     * @return \EE_Ticket
     */
    public function getTicket()
    {
        return $this->ticket;
    }



    /**
     * @return bool
     */
    public function showTicketDetails()
    {
        return $this->template_settings->show_ticket_details;
    }



    /**
     * @return \EE_Ticket_Selector_Config
     */
    public function getTemplateSettings()
    {
        return $this->template_settings;
    }



    /**
     * @return string
     */
    public function getDateFormat()
    {
        return $this->date_format;
    }



    /**
     * @return string
     */
    public function getTimeFormat()
    {
        return $this->time_format;
    }



    /**
     * @return string
     */
    public function getShowHideLinks()
    {
        if ( ! $this->showTicketDetails()) {
            return '';
        }
        return \EEH_HTML::link(
            '',
            sprintf(__('show%1$sdetails%1$s+', 'event_espresso'), '&nbsp;'),
            esc_attr(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__show_ticket_details_link_title',
                    __('click to show additional ticket details', 'event_espresso')
                )
            ),
            "display-{$this->cssId()}",
            'display-tckt-slctr-tkt-details display-the-hidden lt-grey-text smaller-text hide-if-no-js',
            '',
            'rel="' . $this->cssId() . '"'
        ) . \EEH_HTML::link(
            '',
            sprintf(__('hide%1$sdetails%1$s-', 'event_espresso'), '&nbsp;'),
            esc_attr(
                apply_filters(
                    'FHEE__ticket_selector_chart_template__hide_ticket_details_link_title',
                    __('click to hide additional ticket details', 'event_espresso')
                )
            ),
            "hide-{$this->cssId()}",
            'hide-tckt-slctr-tkt-details hide-the-displayed lt-grey-text smaller-text hide-if-no-js',
            'display:none;',
            'rel="' . $this->cssId() . '"'
        );
    }



    /**
     * @return string
     */
    public function cssId()
    {
        return apply_filters(
            'FHEE__ticket_selector_chart_template__ticket_details_css_id',
            "tckt-slctr-tkt-details-{$this->ticket->get_event_ID()}-{$this->ticket->ID()}"
        );
    }



    /**
     * @param float $ticket_price
     * @param int   $remaining
     * @param int   $cols
     * @return string
     */
    public function display(
        $ticket_price = 0.00,
        $remaining,
        $cols = 2
    ) {
        $template_args = array();
        $template_args['ticket'] = $this->ticket;
        $template_args['ticket_price'] = $ticket_price;
        $template_args['remaining'] = $remaining;
        $template_args['cols'] = $cols;
        $template_args['show_ticket_details'] = $this->template_settings->show_ticket_details;
        $template_args['show_ticket_sale_columns'] = $this->template_settings->show_ticket_sale_columns;
        $template_args['ticket_details_row_class'] = espresso_get_object_css_class($this->ticket, '', 'details');
        $template_args['ticket_details_css_id'] = $this->cssId();
        $template_args['display_ticket_price'] = $ticket_price !== 0 && apply_filters(
            'FHEE__ticket_selector_chart_template__display_ticket_price_details',
            true
        );
        $template_args['price_breakdown_heading'] = apply_filters(
            'FHEE__ticket_selector_chart_template__ticket_details_price_breakdown_heading',
            esc_html__('Price', 'event_espresso')
        );
        $template_args['date_format'] = $this->date_format;
        $template_args['time_format'] = $this->time_format;
        $template_args['event_is_expired'] = $this->event_is_expired;

        return \EEH_Template::locate_template(
            apply_filters(
                'FHEE__EventEspresso_modules_ticket_selector_TicketDetails__display__template_path',
                TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_details.template.php',
                $this->ticket
            ),
            $template_args
        );
    }

}
// End of file TicketDetails.php
// Location: EventEspresso\modules\ticket_selector/TicketDetails.php