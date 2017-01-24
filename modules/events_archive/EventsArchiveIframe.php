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
        $EED_Events_Archive->event_list();
        $event_list = new \EES_Espresso_Events();
        parent::__construct(
            esc_html__( 'Event List', 'event_espresso' ),
            $event_list->process_shortcode()
        );
        $this->addStylesheets(
            apply_filters(
                'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__css',
                array(
                    'espresso_default'           => is_readable( EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css' )
                        ? EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION
                        : EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION,
                ),
                $this
            )
        );
        $this->addScripts(
            apply_filters(
                'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__js',
                array(
                    'gmap_api' => sprintf(
                        'https://maps.googleapis.com/maps/api/js?key=%s',
                        apply_filters(
                            'FHEE__EEH_Maps__espresso_google_maps_js__api_key',
                            \EE_Registry::instance()->CFG->map_settings->google_map_api_key
                        )
                    ),
                    'ee_gmap'  => EE_HELPERS_ASSETS . 'ee_gmap.js?ver=1.0',
                ),
                $this
            )
        );
        $this->addLocalizedVars(
            array(
                'ee_gmap' => \EEH_Maps::$gmap_vars,
            ),
            'ee_gmap_vars'
        );
    }



}
// End of file EventsArchiveIframe.php
// Location: EventEspresso\modules\events_archive/EventsArchiveIframe.php