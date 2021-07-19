<?php

namespace EventEspresso\modules\events_archive;

use EE_Error;
use EE_Registry;
use EED_Events_Archive;
use EEH_Maps;
use EventEspresso\core\domain\entities\shortcodes\EspressoEvents;
use EventEspresso\core\libraries\iframe_display\Iframe;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\CurrentPage;
use ReflectionException;

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
     * @param EED_Events_Archive $EED_Events_Archive
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct($EED_Events_Archive)
    {
        /** @var CurrentPage $current_page */
        $current_page = LoaderFactory::getLoader()->getShared(CurrentPage::class);
        $current_page->setEspressoPage(true);
        add_filter('FHEE__EED_Events_Archive__event_list_iframe', '__return_true');
        $EED_Events_Archive->event_list();
        /** @var EspressoEvents $event_list */
        $event_list = EE_Registry::instance()->create('EventEspresso\core\domain\entities\shortcodes\EspressoEvents');
        parent::__construct(
            esc_html__('Event List', 'event_espresso'),
            $event_list->processShortcode()
        );
        $this->addStylesheets(
            apply_filters(
                'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__css',
                [
                    'espresso_default' => is_readable(EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css')
                        ? EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION
                        : EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION,
                ],
                $this
            )
        );
        $this->addScripts(
            apply_filters(
                'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__js',
                [
                    'gmap_api' => sprintf(
                        'https://maps.googleapis.com/maps/api/js?key=%s',
                        apply_filters(
                            'FHEE__EEH_Maps__espresso_google_maps_js__api_key',
                            EE_Registry::instance()->CFG->map_settings->google_map_api_key
                        )
                    ),
                    'ee_gmap'  => EE_HELPERS_ASSETS . 'ee_gmap.js?ver=1.0',
                ],
                $this
            )
        );
        $this->addLocalizedVars(
            [
                'ee_gmap' => EEH_Maps::$gmap_vars,
            ],
            'ee_gmap_vars'
        );
    }
}
