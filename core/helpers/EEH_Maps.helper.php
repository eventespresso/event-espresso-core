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
    // array of map settings
    public static $gmap_vars = [];


    /**
     * google_map - creates a Google Map Link
     *
     * @param array $ee_gmaps_opts array of attributes required for the map link generation
     * @return string (link to map!)
     */
    public static function google_map($ee_gmaps_opts)
    {

        $ee_map_width = ! empty($ee_gmaps_opts['ee_map_width'])
            ? absint($ee_gmaps_opts['ee_map_width'])
            : 300;

        $ee_map_height = ! empty($ee_gmaps_opts['ee_map_height'])
            ? absint($ee_gmaps_opts['ee_map_height'])
            : 185;

        $ee_map_zoom = ! empty($ee_gmaps_opts['ee_map_zoom'])
            ? absint($ee_gmaps_opts['ee_map_zoom'])
            : 12;

        $ee_map_nav_display = ! empty($ee_gmaps_opts['ee_map_nav_display']) ? 'true' : 'false';

        $ee_map_nav_size = ! empty($ee_gmaps_opts['ee_map_nav_size'])
            ? sanitize_text_field($ee_gmaps_opts['ee_map_nav_size'])
            : 'default';

        $ee_map_type_control = ! empty($ee_gmaps_opts['ee_map_type_control'])
            ? sanitize_text_field($ee_gmaps_opts['ee_map_type_control'])
            : 'default';

        $static_url = ! empty($ee_gmaps_opts['ee_static_url'])
            ? esc_url_raw($ee_gmaps_opts['ee_static_url'])
            : false;

        if (! empty($ee_gmaps_opts['ee_map_align'])) {
            switch ($ee_gmaps_opts['ee_map_align']) {
                case "left":
                    $map_align = 'ee-gmap-align-left left';
                    break;
                case "right":
                    $map_align = 'ee-gmap-align-right right';
                    break;
                case "center":
                    $map_align = 'ee-gmap-align-center center';
                    break;
                case "none":
                default:
                    $map_align = 'ee-gmap-align-none';
            }
        } else {
            $map_align = 'ee-gmap-align-none';
        }


        // Determine whether user has set a hardcoded url to use and
        // if so display a Google static iframe map else run V3 api
        if ($static_url) {
            $html = '
            <div class="ee-gmap-iframewrap ee-gmap-wrapper ' . $map_align . '">
                <iframe src="' . $static_url . '&output=embed"
                        style="width: ' . $ee_map_width . 'px; height: ' . $ee_map_height . 'px;"
                        frameborder="0" 
                        scrolling="no"
                    >
                </iframe>
                <a href="' . $static_url . '">' . esc_html__('View Large map', 'event_espresso') . '</a>
            </div>
';
        } else {
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
        }
        return $html; // end auto map or static url map check
    }


    /**
     * enqueue_script
     *
     * @return void
     */
    public static function footer_enqueue_script()
    {
        wp_localize_script('ee_gmap', 'ee_gmap_vars', EEH_Maps::$gmap_vars);
    }


    /**
     * registers scripts for maps
     */
    public static function espresso_google_map_js()
    {
        $api_url = sprintf(
            "https://maps.googleapis.com/maps/api/js?key=%s",
            apply_filters(
                'FHEE__EEH_Maps__espresso_google_maps_js__api_key',
                EE_Registry::instance()->CFG->map_settings->google_map_api_key
            )
        );
        wp_register_script(
            'gmap_api',
            esc_url_raw($api_url),
            ['jquery'],
            null,
            true
        );
        wp_register_script(
            'ee_gmap',
            plugin_dir_url(__FILE__) . 'assets/ee_gmap.js',
            ['gmap_api'],
            '1.0',
            true
        );
    }


    /**
     * creates a Google Map Link
     *
     * @param array $atts array of attributes required for the map link generation
     * @return string (link to map!)
     */
    public static function google_map_link($atts)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        extract($atts);
        /** @var string $address */
        /** @var string $city */
        /** @var string $state */
        /** @var string $zip */
        /** @var string $country */
        $address         = "{$address}";
        $city            = "{$city}";
        $state           = "{$state}";
        $zip             = "{$zip}";
        $country         = "{$country}";
        $text            = isset($text) ? "{$text}" : "";
        $type            = isset($type) ? "{$type}" : "";
        $map_w           = isset($map_w) ? "{$map_w}" : 400;
        $map_h           = isset($map_h) ? "{$map_h}" : 400;
        $id              = isset($id) ? $id : 'not_set';
        $map_image_class = isset($map_image_class) ? $map_image_class : 'ee_google_map_view';

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
                $scheme = is_ssl() ? 'https://' : 'http://';

                $api_key = apply_filters(
                    'FHEE__EEH_Maps__espresso_google_maps_link__api_key',
                    EE_Registry::instance()->CFG->map_settings->google_map_api_key
                );

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
