<?php
namespace EventEspresso\modules\events_archive;

use EventEspresso\core\Factory;
use EventEspresso\core\libraries\iframe_display\Iframe;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EventsArchiveIframe
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EventsArchiveIframe {

	/**
	 * @var \EED_Events_Archive $EED_Events_Archive
	 */
	private $EED_Events_Archive = '';



	/**
	 * EventsArchiveIframe constructor.
	 *
	 * @param \EED_Events_Archive $EED_Events_Archive
	 */
	public function __construct( $EED_Events_Archive ) {
		$this->EED_Events_Archive = $EED_Events_Archive;
	}

	/**
	 * display
	 *
	 * @access    public
	 * @return    void
	 * @throws \EE_Error
	 */
	public function display() {
		\EE_Registry::instance()->REQ->set_espresso_page( true );
		$this->EED_Events_Archive->event_list();
		$event_list = new \EES_Espresso_Events();
		/** @var Iframe $iframe */
		$iframe = Factory::create(
			'Iframe',
			array(
				'title'   => esc_html__( 'Event List', 'event_espresso' ),
				'content' => $event_list->process_shortcode(),
			)
		);
		$iframe->addStylesheets(
			apply_filters(
				'FHEE__EventsArchiveIframe__event_list_iframe__css',
				array(
					'espresso_default' => is_readable( EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css' )
						? EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION
						: EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION,
					$this->EED_Events_Archive->theme() => get_stylesheet_directory_uri()
					                                    . $this->EED_Events_Archive->theme() . DS
					                                    . 'style.css?ver=' . EVENT_ESPRESSO_VERSION,
				)
			)
		);
		$iframe->addScripts(
			apply_filters(
				'FHEE__EED_Ticket_Selector__event_list_iframe__js',
				array(
					'gmap_api' => sprintf(
						"https://maps.googleapis.com/maps/api/js?key=%s",
						apply_filters(
							'FHEE__EEH_Maps__espresso_google_maps_js__api_key',
							\EE_Registry::instance()->CFG->map_settings->google_map_api_key
						)
					),
					'ee_gmap' => EE_HELPERS_ASSETS . 'ee_gmap.js?ver=1.0'
				)
			)
		);
		$iframe->addLocalizedVars(
			array(
				'ee_gmap' => \EEH_Maps::$gmap_vars,
			),
			'ee_gmap_vars'
		);
		$iframe->display();
	}


}
// End of file EventsArchiveIframe.php
// Location: EventEspresso\modules\events_archive/EventsArchiveIframe.php