<?php

/**
 * EEH_Maps
 * This is a helper utility class that provides different helpers related to mapping and displaying location related
 * data.
 *
 * @package        Event Espresso
 * @subpackage     /helpers/EEH_Maps.helper.php
 * @author         Hugo Ashmore, Brent Christensen, Darren Ethier
 */
class EEH_Maps
{
    /**
     * Smallest width and height, in px, that the Maps Embed API accepts.
     *
     * @since 5.0.61
     */
    public const EMBED_MAP_MIN_SIZE = 200;

    // array of map settings
    public static $gmap_vars = [];


    /**
     * The map settings. `EE_Config::_initialize_config()` guarantees the instance.
     *
     * @return EE_Map_Config the shared map settings object
     * @since 5.0.61
     */
    private static function mapSettings(): EE_Map_Config
    {
        return EE_Config::instance()->map_settings;
    }


    /**
     * Whether Google Maps is on in the map settings.
     *
     * @return bool true when the site shows venue maps
     * @since 5.0.61
     */
    public static function mapsEnabled(): bool
    {
        return (bool) EEH_Maps::mapSettings()->use_google_maps;
    }


    /**
     * The Google Maps API key after the `FHEE__EEH_Maps__espresso_google_maps_js__api_key` filter, trimmed.
     * An empty string means that no Google map may load.
     *
     * @return string the key, or an empty string
     * @since 5.0.61
     */
    public static function mapsApiKey(): string
    {
        return trim(
            (string) apply_filters(
                'FHEE__EEH_Maps__espresso_google_maps_js__api_key',
                EEH_Maps::mapSettings()->google_map_api_key
            )
        );
    }


    /**
     * Whether venue maps use the Maps JavaScript API: Advanced mode with an API key.
     * Only then may a page load the Google map scripts.
     *
     * @return bool true for Advanced mode with a key
     * @since 5.0.61
     */
    public static function usesAdvancedMaps(): bool
    {
        return EEH_Maps::mapsApiKey() !== '' && EEH_Maps::mapSettings()->isAdvancedMode();
    }


    /**
     * The wrapper CSS classes for a map alignment value.
     *
     * @param string $ee_map_align Left, right, center or none. Anything else counts as none.
     * @return string the wrapper classes
     * @since 5.0.61
     */
    private static function mapAlignClass(string $ee_map_align): string
    {
        switch ($ee_map_align) {
            case "left":
                return 'ee-gmap-align-left left';
            case "right":
                return 'ee-gmap-align-right right';
            case "center":
                return 'ee-gmap-align-center center';
            case "none":
            default:
                return 'ee-gmap-align-none';
        }
    }


    /**
     * google_map - renders the venue map for the saved map mode:
     * the Embed API iframe in Simple mode, the Maps JavaScript API map in Advanced mode
     *
     * @param array $ee_gmaps_opts Map options: map_ID, location, place_name (Simple mode only), ee_map_width,
     *                             ee_map_height, ee_map_zoom, ee_map_align, ee_map_nav_display, ee_map_nav_size and
     *                             ee_map_type_control.
     * @return string the map HTML, or an empty string without an API key (or, in Simple mode, without a location)
     */
    public static function google_map(array $ee_gmaps_opts): string
    {
        $api_key = EEH_Maps::mapsApiKey();
        // no key, no Google map
        if ($api_key === '') {
            return '';
        }

        $ee_map_width = ! empty($ee_gmaps_opts['ee_map_width'])
            ? absint($ee_gmaps_opts['ee_map_width'])
            : EE_Map_Config::DEFAULT_MAP_WIDTH_EVENT_LIST;

        $ee_map_height = ! empty($ee_gmaps_opts['ee_map_height'])
            ? absint($ee_gmaps_opts['ee_map_height'])
            : EE_Map_Config::DEFAULT_MAP_HEIGHT_EVENT_LIST;

        $ee_map_zoom = ! empty($ee_gmaps_opts['ee_map_zoom'])
            ? absint($ee_gmaps_opts['ee_map_zoom'])
            : EE_Map_Config::DEFAULT_MAP_ZOOM_EVENT_LIST;

        $map_align = EEH_Maps::mapAlignClass((string) ($ee_gmaps_opts['ee_map_align'] ?? ''));

        if (! EEH_Maps::mapSettings()->isAdvancedMode()) {
            return EEH_Maps::embedMap(
                [
                    'location'   => $ee_gmaps_opts['location'] ?? '',
                    'place_name' => $ee_gmaps_opts['place_name'] ?? '',
                    'width'      => $ee_map_width,
                    'height'     => $ee_map_height,
                    'zoom'       => $ee_map_zoom,
                    'align'      => $map_align,
                ],
                $api_key
            );
        }

        $ee_map_nav_display = ! empty($ee_gmaps_opts['ee_map_nav_display']) ? 'true' : 'false';

        $ee_map_nav_size = ! empty($ee_gmaps_opts['ee_map_nav_size'])
            ? sanitize_text_field($ee_gmaps_opts['ee_map_nav_size'])
            : 'default';

        $ee_map_type_control = ! empty($ee_gmaps_opts['ee_map_type_control'])
            ? sanitize_text_field($ee_gmaps_opts['ee_map_type_control'])
            : 'default';

        EEH_Maps::$gmap_vars[ $ee_gmaps_opts['map_ID'] ] = [
            'map_ID'              => $ee_gmaps_opts['map_ID'],
            'ee_map_zoom'         => $ee_map_zoom,
            'ee_map_nav_display'  => $ee_map_nav_display,
            'ee_map_nav_size'     => $ee_map_nav_size,
            'ee_map_type_control' => $ee_map_type_control,
            'location'            => $ee_gmaps_opts['location'],
        ];

        $style = 'width: ' . $ee_map_width . 'px; height: ' . $ee_map_height . 'px;';
        $html  = '
            <div class="ee-gmap-wrapper ' . esc_attr($map_align) . '">
                <div class="ee-gmap"
                     id="map_canvas_' . esc_attr($ee_gmaps_opts['map_ID']) . '"
                     style="' . esc_attr($style) . '"
                 ></div>
            </div>';

        wp_enqueue_script('gmap_api');
        wp_enqueue_script('ee_gmap');
        add_action('wp_footer', ['EEH_Maps', 'footer_enqueue_script']);
        return $html;
    }


    /**
     * The Simple mode map: a Maps Embed API "place" iframe pinned on the location.
     * The `width` and `height` attributes size the map on pages without `espresso_default.css`.
     * On EE pages the `.ee-gmap-embed` rule makes it fill its container at the inline aspect ratio.
     *
     * @param array  $options Keys: location, place_name, width, height, zoom (ints) and align (wrapper classes).
     * @param string $api_key The filtered, non-empty API key.
     * @return string the iframe HTML, or an empty string without a location
     * @since 5.0.61
     */
    private static function embedMap(array $options, string $api_key): string
    {
        $location = trim((string) $options['location']);
        // no address, no map
        if ($location === '') {
            return '';
        }
        // a name lets Google pin a listed place; the address keeps an unlisted name at the venue
        $place_name = trim((string) $options['place_name']);
        if ($place_name !== '') {
            $location = $place_name . ', ' . $location;
        }
        $width  = max((int) $options['width'], EEH_Maps::EMBED_MAP_MIN_SIZE);
        $height = max((int) $options['height'], EEH_Maps::EMBED_MAP_MIN_SIZE);
        // add_query_arg() does not encode values, so encode them first
        $src = add_query_arg(
            rawurlencode_deep(
                [
                    'key'  => $api_key,
                    'q'    => $location,
                    'zoom' => $options['zoom'],
                ]
            ),
            'https://www.google.com/maps/embed/v1/place'
        );
        $title = sprintf(
            // translators: %s: the venue address
            esc_attr__('Map of %s', 'event_espresso'),
            esc_attr($location)
        );
        // inline because each map has its own size; .ee-gmap-embed in espresso_default.css holds the shared rules
        $style = 'max-width: ' . $width . 'px; aspect-ratio: ' . $width . ' / ' . $height . ';';
        return '
            <div class="ee-gmap-wrapper ' . esc_attr($options['align']) . '">
                <iframe class="ee-gmap ee-gmap-embed"
                        src="' . esc_url($src) . '"
                        title="' . $title . '"
                        width="' . $width . '"
                        height="' . $height . '"
                        loading="lazy"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                        style="' . esc_attr($style) . '"
                ></iframe>
            </div>';
    }


    /**
     * enqueue_script
     *
     * @return void
     */
    public static function footer_enqueue_script(): void
    {
        wp_localize_script('ee_gmap', 'ee_gmap_vars', EEH_Maps::$gmap_vars);
    }


    /**
     * registers scripts for maps
     *
     * @return void
     */
    public static function espresso_google_map_js(): void
    {
        // Simple mode draws the map in an iframe and needs no scripts
        if (! EEH_Maps::usesAdvancedMaps()) {
            return;
        }
        $api_url = sprintf(
            "https://maps.googleapis.com/maps/api/js?callback=ee_gmap_callback&key=%s",
            EEH_Maps::mapsApiKey()
        );
        wp_register_script(
            'ee_gmap',
            plugin_dir_url(__FILE__) . 'assets/ee_gmap.js',
            ['jquery'],
            '1.1',
            true
        );
        wp_register_script(
            'gmap_api',
            esc_url_raw($api_url),
            ['ee_gmap'],
            null,
            true
        );
    }


    /**
     * creates a Google Map Link
     *
     * @param array $atts Array of attributes required for the map link generation. For type map in Simple
     *                    mode, embed_location (the inline address) and embed_place_name select the Embed map.
     * @return string (link to map!)
     */
    public static function google_map_link(array $atts): string
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        extract($atts);
        /** @var string $address */
        /** @var string $city */
        /** @var string $state */
        /** @var string $zip */
        /** @var string $country */
        $address         = "$address";
        $city            = "$city";
        $state           = "$state";
        $zip             = "$zip";
        $country         = "$country";
        $text            = isset($text) ? "$text" : "";
        $type            = isset($type) ? "$type" : "";
        $map_w           = isset($map_w) ? "$map_w" : 400;
        $map_h           = isset($map_h) ? "$map_h" : 400;
        $id              = $id ?? 'not_set';
        $map_image_class = $map_image_class ?? 'ee_google_map_view';

        $address_string = ($address != '' ? $address : '')
                          . ($city != '' ? ',' . $city : '')
                          . ($state != '' ? ',' . $state : '')
                          . ($zip != '' ? ',' . $zip : '')
                          . ($country != '' ? ',' . $country : '');

        $google_map = htmlentities2('https://maps.google.com/maps?q=' . urlencode($address_string));

        switch ($type) {
            case 'text':
            default:
                $text = $text == '' ? esc_html__('Map and Directions', 'event_espresso') : $text;
                break;

            case 'url_only':
            case 'url':
                $text = $google_map;
                break;

            case 'map':
                $map_settings = EEH_Maps::mapSettings();
                // Simple mode makes no Static Maps request. A caller that can show an iframe passes embed_location
                // and gets the Embed map. The messages shortcode passes none, so an email gets no map image.
                if (! $map_settings->isAdvancedMode()) {
                    $embed_key = EEH_Maps::mapsApiKey();
                    return $embed_key !== '' && ! empty($atts['embed_location'])
                        ? EEH_Maps::embedMap(
                            [
                                'location'   => $atts['embed_location'],
                                'place_name' => $atts['embed_place_name'] ?? '',
                                'width'      => (int) $map_w,
                                'height'     => (int) $map_h,
                                'zoom'       => EE_Map_Config::DEFAULT_MAP_ZOOM_EVENT_POST,
                                'align'      => EEH_Maps::mapAlignClass('none'),
                            ],
                            $embed_key
                        )
                        : '';
                }
                $api_key = trim(
                    (string) apply_filters(
                        'FHEE__EEH_Maps__espresso_google_maps_link__api_key',
                        $map_settings->google_map_api_key
                    )
                );
                // no key, no map image
                if ($api_key === '') {
                    return '';
                }

                $scheme = is_ssl() ? 'https://' : 'http://';

                return '
                <a class="a_map_image_link" 
                   href="' . esc_url_raw($google_map) . '" 
                   target="_blank" 
                   rel="noopener noreferrer"
                >
                    <img alt="' . esc_html__('Map and Directions', 'event_espresso') . '"
                         class="map_image_link" 
                         id="venue_map_' . $id . '" ' . $map_image_class . ' 
                         src="'
                       . htmlentities2(
                           $scheme
                           . 'maps.googleapis.com/maps/api/staticmap?center='
                           . urlencode($address_string)
                           . '&amp;zoom=14&amp;size='
                           . $map_w . 'x' . $map_h
                           . '&amp;markers=color:green|label:|'
                           . urlencode($address_string)
                           . '&amp;sensor=false&amp;key='
                           . $api_key
                       ) . '"
                     />
                 </a>';
        }

        return $type === 'url_only'
            ? $text
            : '<a href="' . esc_url_raw($google_map) . '" target="_blank" rel="noopener noreferrer">' . $text . '</a>';
    }
}
