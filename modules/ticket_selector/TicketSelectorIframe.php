<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Error;
use EEM_Event;
use EventEspresso\core\libraries\iframe_display\Iframe;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\RequestInterface;

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
     * @param EEM_Event        $event_model
     * @param CurrentPage      $current_page
     * @param RequestInterface $request
     * @throws EE_Error
     */
    public function __construct(EEM_Event $event_model, CurrentPage $current_page, RequestInterface $request)
    {
        $current_page->setEspressoPage(true);
        $ticket_selector = LoaderFactory::getLoader()->getNew(DisplayTicketSelector::class);
        $ticket_selector->setIframe();
        $event = $event_model->get_one_by_ID($request->getRequestParam('event', 0, 'int'));
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
                    'EEDTicketSelectorMsg'   => wp_strip_all_tags(
                        __(
                            'Please choose at least one ticket before continuing.',
                            'event_espresso'
                        )
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
