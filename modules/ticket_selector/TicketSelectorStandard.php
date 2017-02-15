<?php
namespace EventEspresso\modules\ticket_selector;

defined('ABSPATH') || exit;



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
     * @var \EE_Ticket_Selector_Config $ticket_selector_config
     */
    protected $ticket_selector_config;

    /**
     * @var \EE_Tax_Config $tax_config
     */
    protected $tax_config;



    /**
     * TicketSelectorSimple constructor.
     *
     * @param \EE_Event                  $event
     * @param \EE_Ticket[]               $tickets
     * @param int                        $max_attendees
     * @param array                      $template_args
     * @param string                     $date_format
     * @param string                     $time_format
     * @param \EE_Ticket_Selector_Config $ticket_selector_config
     * @param \EE_Tax_Config             $tax_config
     */
    public function __construct(
        \EE_Event $event,
        array $tickets,
        $max_attendees,
        array $template_args,
        $date_format = 'Y-m-d',
        $time_format = 'g:i a',
        \EE_Ticket_Selector_Config $ticket_selector_config = null,
        \EE_Tax_Config $tax_config = null
    ) {
        $this->date_format = $date_format;
        $this->time_format = $time_format;
        // get EE_Ticket_Selector_Config and TicketDetails
        $this->ticket_selector_config = isset (\EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector)
            ? \EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector
            : new \EE_Ticket_Selector_Config();
        // $template_settings->setDatetimeSelectorThreshold(2);
        // \EEH_Debug_Tools::printr($template_settings->getShowDatetimeSelector(), 'getShowDatetimeSelector', __FILE__, __LINE__);
        // \EEH_Debug_Tools::printr($template_settings->getDatetimeSelectorThreshold(), 'getDatetimeSelectorThreshold', __FILE__, __LINE__);
        $this->tax_config = isset (\EE_Registry::instance()->CFG->tax_settings)
            ? \EE_Registry::instance()->CFG->tax_settings
            : new \EE_Tax_Config();
        parent::__construct($event, $tickets, $max_attendees, $template_args);
    }



    /**
     * sets any and all template args that are required for this Ticket Selector
     *
     * @return void
     * @throws \EE_Error
     */
    protected function addTemplateArgs()
    {
        $row = 1;
        $ticket_row_html = '';
        $required_ticket_sold_out = false;
        // flag to indicate that at least one taxable ticket has been encountered
        $taxable_tickets = false;
        $datetime_selector = null;
        $this->template_args['datetime_selector'] = '';
        if (
            $this->ticket_selector_config->getShowDatetimeSelector()
            !== \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
        ) {
            $datetime_selector = new DatetimeSelector(
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
        foreach ($this->tickets as $TKT_ID => $ticket) {
            if ($ticket instanceof \EE_Ticket) {
                $cols = 2;
                $taxable_tickets = $ticket->taxable() ? true : $taxable_tickets;
                $ticket_selector_row = new TicketSelectorRowStandard(
                    new TicketDetails($ticket, $this->ticket_selector_config, $this->template_args),
                    $this->tax_config,
                    $total_tickets,
                    $this->max_attendees,
                    $row,
                    $cols,
                    $required_ticket_sold_out,
                    $this->template_args['event_status'],
                    $datetime_selector instanceof DatetimeSelector
                        ? $datetime_selector->getTicketDatetimeClasses($ticket)
                        : ''
                );
                $ticket_row_html .= $ticket_selector_row->getHtml();
                $required_ticket_sold_out = $ticket_selector_row->getRequiredTicketSoldOut();
                $row++;
            }
        }
        $this->template_args['row'] = $row;
        $this->template_args['ticket_row_html'] = $ticket_row_html;
        $this->template_args['taxable_tickets'] = $taxable_tickets;
        $this->template_args['prices_displayed_including_taxes'] = $this->tax_config->prices_displayed_including_taxes;
        $this->template_args['template_path'] = TICKET_SELECTOR_TEMPLATES_PATH . 'standard_ticket_selector.template.php';
        remove_all_filters('FHEE__EE_Ticket_Selector__hide_ticket_selector');
    }



}
// End of file TicketSelectorStandard.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorStandard.php