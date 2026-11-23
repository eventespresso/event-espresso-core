<?php

namespace EventEspresso\modules\events_archive;

use EE_Error;
use EE_Registry;
use EED_Events_Archive;
use EED_Ticket_Selector;
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
        $shortcode_content = $event_list->processShortcode();
        if (empty($shortcode_content)) {
            return;
        }
        parent::__construct(
            esc_html__('Event List', 'event_espresso'),
            $shortcode_content
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
        $this->addInlineStyles('ticket_selector', EED_Ticket_Selector::accentColorStyles());
        // Simple mode draws the map in an iframe and needs no scripts; no key, no Google map
        $advanced_map = EEH_Maps::usesAdvancedMaps();
        $this->addScripts(
            apply_filters(
                'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__js',
                $advanced_map
                    ? [
                        'gmap_api' => sprintf(
                            'https://maps.googleapis.com/maps/api/js?key=%s',
                            EEH_Maps::mapsApiKey()
                        ),
                        'ee_gmap'  => EE_HELPERS_ASSETS . 'ee_gmap.js?ver=1.0',
                    ]
                    : [],
                $this
            )
        );
        if ($advanced_map) {
            $this->addLocalizedVars(
                [
                    'ee_gmap' => EEH_Maps::$gmap_vars,
                ],
                'ee_gmap_vars'
            );
        }
    }
}
