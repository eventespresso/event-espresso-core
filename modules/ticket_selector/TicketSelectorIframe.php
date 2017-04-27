<?php
namespace EventEspresso\modules\ticket_selector;

use EventEspresso\core\libraries\iframe_display\Iframe;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
    exit( 'No direct script access allowed' );
}



/**
 * Class TicketSelectorIframe
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class TicketSelectorIframe extends Iframe
{

    /**
     * TicketSelectorIframe constructor.
     *
     * @throws \DomainException
     * @throws \EE_Error
     */
    public function __construct()
    {
        \EE_Registry::instance()->REQ->set_espresso_page( true );
        /** @type \EEM_Event $EEM_Event */
        $EEM_Event = \EE_Registry::instance()->load_model( 'Event' );
        $event = $EEM_Event->get_one_by_ID(
            \EE_Registry::instance()->REQ->get( 'event', 0 )
        );
        $ticket_selector = new DisplayTicketSelector();
        $ticket_selector->setIframe( true );
        parent::__construct(
            esc_html__( 'Ticket Selector', 'event_espresso' ),
            $ticket_selector->display( $event )
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
        if ( ! apply_filters('FHEE__EED_Ticket_Selector__ticket_selector_iframe__load_theme_css', false, $this)) {
            $this->addStylesheets( array('site_theme' => '' ) );
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
        $this->addLocalizedVars(
            array(
                'ticket_selector_iframe' => true,
                'EEDTicketSelectorMsg'   => __(
                    'Please choose at least one ticket before continuing.',
                    'event_espresso'
                ),
            )
        );
    }

}
// End of file TicketSelectorIframe.php
// Location: /TicketSelectorIframe.php