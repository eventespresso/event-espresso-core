<?php

namespace EventEspresso\modules\ticket_selector;

use DomainException;
use EE_Error;
use EE_Registry;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\iframe_display\Iframe;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class TicketSelectorIframe
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 */
class TicketSelectorIframe extends Iframe
{

    /**
     * TicketSelectorIframe constructor.
     *
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct()
    {
        EE_Registry::instance()->REQ->set_espresso_page(true);
        /** @type \EEM_Event $EEM_Event */
        $EEM_Event = EE_Registry::instance()->load_model('Event');
        $event = $EEM_Event->get_one_by_ID(
            EE_Registry::instance()->REQ->get('event', 0)
        );
        $ticket_selector = new DisplayTicketSelector();
        $ticket_selector->setIframe(true);
        parent::__construct(
            esc_html__('Ticket Selector', 'event_espresso'),
            $ticket_selector->display($event)
        );
        $this->addStylesheets(
            apply_filters(
                'FHEE__EED_Ticket_Selector__ticket_selector_iframe__css',
                array(
                    'ticket_selector_embed' => TICKET_SELECTOR_ASSETS_URL
                                               . 'ticket_selector_embed.css?ver='
                                               . EVENT_ESPRESSO_VERSION,
                    'ticket_selector'       => TICKET_SELECTOR_ASSETS_URL
                                               . 'ticket_selector.css?ver='
                                               . EVENT_ESPRESSO_VERSION,
                ),
                $this
            )
        );
        if (! apply_filters('FHEE__EED_Ticket_Selector__ticket_selector_iframe__load_theme_css', false, $this)) {
            $this->addStylesheets(array('site_theme' => ''));
        }
        $this->addScripts(
            apply_filters(
                'FHEE__EED_Ticket_Selector__ticket_selector_iframe__js',
                array(
                    'ticket_selector_iframe_embed' => TICKET_SELECTOR_ASSETS_URL
                                                      . 'ticket_selector_iframe_embed.js?ver='
                                                      . EVENT_ESPRESSO_VERSION,
                ),
                $this
            )
        );
        $js_attributes = apply_filters(
            'FHEE__EventEspresso_modules_ticket_selector_TicketSelectorIframe__construct__js_attributes',
            array(),
            $this
        );
        if (! empty($js_attributes)) {
            $this->addScriptAttributes($js_attributes);
        }
        $this->addLocalizedVars(
            apply_filters(
                'FHEE__EventEspresso_modules_ticket_selector_TicketSelectorIframe__construct__localized_vars',
                array(
                    'ticket_selector_iframe' => true,
                    'EEDTicketSelectorMsg'   => __(
                        'Please choose at least one ticket before continuing.',
                        'event_espresso'
                    ),
                )
            )
        );
        do_action(
            'AHEE__EventEspresso_modules_ticket_selector_TicketSelectorIframe__construct__complete',
            $this
        );
    }
}
