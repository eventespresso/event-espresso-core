<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use EE_Event;
use EE_Ticket;
use EEH_Template;
use EEH_URL;
use Exception;
use ReflectionException;

/**
 * Class TicketSelector
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
abstract class TicketSelector
{

    /**
     * @var EE_Event
     */
    protected $event;

    /**
     * @var EE_Ticket[]
     */
    protected $tickets;

    /**
     * @var int
     */
    protected $max_attendees;

    /**
     * @var array
     */
    protected $template_args;

    /**
     * @var int
     */
    protected $ticket_rows = 0;


    /**
     * TicketSelectorSimple constructor.
     *
     * @param EE_Event    $event
     * @param EE_Ticket[] $tickets
     * @param int          $max_attendees
     * @param array        $template_args
     */
    public function __construct(EE_Event $event, array $tickets, $max_attendees, array $template_args)
    {
        $this->event = $event;
        $this->tickets = $tickets;
        $this->max_attendees = $max_attendees;
        $this->template_args = $template_args;
        $this->addTemplateArgs();
    }


    /**
     * sets any and all template args that are required for this Ticket Selector
     *
     * @return void
     */
    abstract protected function addTemplateArgs();


    /**
     * loadTicketSelectorTemplate
     *
     * @return string
     */
    protected function loadTicketSelectorTemplate()
    {
        try {
            $this->template_args['hidden_inputs'] = $this->getHiddenInputs();
            return EEH_Template::locate_template(
                apply_filters(
                    'FHEE__EE_Ticket_Selector__display_ticket_selector__template_path',
                    $this->template_args['template_path'],
                    $this->event
                ),
                $this->template_args
            );
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        return '';
    }


    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString()
    {
        return $this->loadTicketSelectorTemplate();
    }


    /**
     * getHiddenInputs
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getHiddenInputs()
    {
        $html = '<input type="hidden" name="noheader" value="true"/>';
        $html .= '<input type="hidden" name="tkt-slctr-return-url-' . $this->event->ID() . '"';
        $html .= ' value="' . EEH_URL::current_url() . $this->template_args['anchor_id'] . '"/>';
        $html .= '<input type="hidden" name="tkt-slctr-rows-' . $this->event->ID();
        $html .= '" value="' . $this->ticket_rows . '"/>';
        $html .= '<input type="hidden" name="tkt-slctr-max-atndz-' . $this->event->ID();
        $html .= '" value="' . $this->template_args['max_atndz'] . '"/>';
        $html .= '<input type="hidden" name="tkt-slctr-event-id" value="' . $this->event->ID() . '"/>';
        return $html;
    }
}
