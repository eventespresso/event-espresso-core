<?php
namespace EventEspresso\modules\ticket_selector;

defined('ABSPATH') || exit;



/**
 * Class TicketSelectorSimple
 * there's one ticket, and max attendees is set to one,
 * so if the event is free, then this is a "simple" ticket selector
 * a.k.a. "Dude Where's my Ticket Selector?"
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.18
 */
class TicketSelectorSimple extends TicketSelector
{

    /**
     * @var \EE_Ticket $ticket
     */
    protected $ticket;



    /**
     * TicketSelectorSimple constructor.
     *
     * @param \EE_Event  $event
     * @param \EE_Ticket $ticket
     * @param int        $max_attendees
     * @param array      $template_args
     */
    public function __construct(\EE_Event $event, \EE_Ticket $ticket, $max_attendees, array $template_args)
    {
        $this->ticket = $ticket;
        parent::__construct($event, array($this->ticket), $max_attendees, $template_args);
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
    }



    /**
     * sets any and all template args that are required for this Ticket Selector
     *
     * @return void
     */
    protected function addTemplateArgs()
    {
        unset($this->template_args['tickets']);
        $this->template_args['ticket'] = $this->ticket;
        $ticket_selector_row = new TicketSelectorRowSimple(
            $this->ticket,
            $this->max_attendees,
            $this->template_args['date_format']
        );
        $this->template_args['ticket_status_display'] = $ticket_selector_row->getTicketStatusDisplay();
        $this->template_args['template_path'] = TICKET_SELECTOR_TEMPLATES_PATH . 'simple_ticket_selector.template.php';
    }


}
// End of file TicketSelectorSimple.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorSimple.php