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
     * TicketSelectorIframe constructor
     *
     * @throws \DomainException
     * @throws \EE_Error
     */
    public function __construct()
    {
        /** @type \EEM_Event $EEM_Event */
        $EEM_Event = \EE_Registry::instance()->load_model( 'Event' );
        $event = $EEM_Event->get_one_by_ID(
            \EE_Registry::instance()->REQ->get( 'event', 0 )
        );
        if ( ! $event instanceof \EE_Event) {
            throw new \DomainException(
                esc_html__('A valid Event was not found.', 'event_espresso')
            );
        }
        \EE_Registry::instance()->REQ->set_espresso_page(true);
        \EED_Ticket_Selector::load_tckt_slctr_assets();
        $ticket_selector = new DisplayTicketSelector();
        $ticket_selector->setIframe( true );
        parent::__construct(
            esc_html__( 'Ticket Selector', 'event_espresso' ),
            $ticket_selector->display( $event )
        );
    }

}
// End of file TicketSelectorIframe.php
// Location: /TicketSelectorIframe.php