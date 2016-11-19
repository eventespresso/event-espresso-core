<?php
namespace EventEspresso\modules\events_archive;

use EventEspresso\core\libraries\iframe_display\Iframe;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
    exit( 'No direct script access allowed' );
}



/**
 * Class EventsArchiveIframe
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9
 */
class EventsArchiveIframe extends Iframe
{



    /**
     * EventsArchiveIframe constructor.
     *
     * @param \EED_Events_Archive $EED_Events_Archive
     * @throws \DomainException
     */
    public function __construct( $EED_Events_Archive )
    {
        \EE_Registry::instance()->REQ->set_espresso_page( true );
        add_filter('FHEE__EED_Events_Archive__event_list_iframe', '__return_true');
        add_filter(
            'FHEE__archive_espresso_events_template__upcoming_events_h1',
            '__return_empty_string'
        );
        $EED_Events_Archive->event_list();
        $event_list = new \EES_Espresso_Events();
        parent::__construct(
            esc_html__( 'Event List', 'event_espresso' ),
            $event_list->process_shortcode()
        );
    }



}
// End of file EventsArchiveIframe.php
// Location: EventEspresso\modules\events_archive/EventsArchiveIframe.php