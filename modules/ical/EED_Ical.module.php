<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * EED_Ical Class
 *
 * adds a link that will import an event's details into any calendar that supports the iCal format
 *
 * @package       Event Espresso
 * @subpackage    /modules/ical/
 * @author        Brent Christensen
 * @method EED_Ical get_instance($module_name)
 */
class EED_Ical extends EED_Module
{
    const iCal_datetime_format = 'Ymd\THis\Z';


    /**
     * @return EED_Ical|EED_Module
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks()
    {
        // create download buttons
        add_filter(
            'FHEE__espresso_list_of_event_dates__datetime_html',
            ['EED_Ical', 'generate_add_to_iCal_button'],
            10,
            2
        );
        // process ics download request
        EE_Config::register_route('download_ics_file', 'EED_Ical', 'download_ics_file');
    }


    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks_admin()
    {
    }


    /**
     *    run - initial module setup
     *
     * @param WP $WP
     * @return    void
     */
    public function run($WP)
    {
    }


    /**
     * @param $html
     * @param $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_add_to_iCal_button($html, $datetime)
    {
        // first verify a proper datetime object has been received
        if ($datetime instanceof EE_Datetime) {
            // set whether a link or submit button is shown
            $iCal_type = apply_filters('FHEE__EED_Ical__generate_add_to_iCal_button__iCal_type', 'submit');
            // generate a link to the route we registered in set_hooks()
            $URL = add_query_arg(['ee' => 'download_ics_file', 'ics_id' => $datetime->ID()], site_url());
            $URL = esc_url_Raw($URL);
            // what type ?
            switch ($iCal_type) {
                // submit buttons appear as buttons and are very compatible with a theme's style
                case 'submit':
                    $html .= '<form id="download-iCal-frm-' . $datetime->ID();
                    $html .= '" class="download-iCal-frm" action="' . $URL . '" method="post" >';
                    $html .= '<input type="submit" class="ee-ical-sbmt" value="&#xf145;" title="';
                    $html .= esc_html__('Add to iCal Calendar', 'event_espresso') . '"/>';
                    $html .= '</form>';
                    break;
                // buttons are just links that have been styled to appear as buttons,
                // but may not be blend with a theme as well as submit buttons
                case 'button':
                    $html .= '<a class="ee-ical-btn small ee-button ee-roundish" href="' . $URL;
                    $html .= '" title="' . esc_html__('Add to iCal Calendar', 'event_espresso') . '">';
                    $html .= ' <span class="dashicons dashicons-calendar"></span>';
                    $html .= '</a>';
                    break;
                // links are just links that use the calendar dashicon
                case 'icon':
                    $html .= '<a class="ee-ical-lnk" href="' . $URL . '" title="';
                    $html .= esc_html__('Add to iCal Calendar', 'event_espresso') . '">';
                    $html .= ' <span class="dashicons dashicons-calendar"></span>';
                    $html .= '</a>';
                    break;
            }
        }
        return $html;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function download_ics_file()
    {
        $request = self::getRequest();
        if ($request->requestParamIsSet('ics_id')) {
            $DTT_ID   = $request->getRequestParam('ics_id', 0, 'int');
            $datetime = EEM_Datetime::instance()->get_one_by_ID($DTT_ID);
            if ($datetime instanceof EE_Datetime) {
                // get related event, venues, and event categories
                $event = $datetime->event();
                if ($event instanceof EE_Event) {
                    // get related category Term object and it's name
                    $category = $event->first_event_category();
                    if ($category instanceof EE_Term) {
                        $category = $category->name();
                    }
                    $location = '';
                    // get first related venue and convert to CSV string
                    $venue = $event->venues(['limit' => 1]);
                    if (is_array($venue) && ! empty($venue)) {
                        $venue = array_shift($venue);
                        if ($venue instanceof EE_Venue) {
                            $location = espresso_venue_raw_address('inline', $venue->ID(), false);
                        }
                    }

                    // Generate filename
                    $filename = $event->slug() . '-' . $datetime->start_date('Y-m-d') . '.ics';

                    // Check the datetime status has not been cancelled and set the ics value accordingly
                    $status = $datetime->get_active_status();
                    $status = $status === EE_Datetime::cancelled ? 'CANCELLED' : 'CONFIRMED';

                    // Create array of ics details, escape strings, convert timestamps to ics format, etc
                    $ics_data = [
                        'ORGANIZER_NAME' => EE_Registry::instance()->CFG->organization->name,
                        'UID'            => md5($event->name() . $event->ID() . $datetime->ID()),
                        'ORGANIZER'      => EE_Registry::instance()->CFG->organization->email,
                        'DTSTAMP'        => date(EED_Ical::iCal_datetime_format),
                        'LOCATION'       => $location,
                        'SUMMARY'        => $event->name(),
                        'DESCRIPTION'    => wp_strip_all_tags($event->description()),
                        'STATUS'         => $status,
                        'CATEGORIES'     => $category,
                        'URL;VALUE=URI'  => get_permalink($event->ID()),
                        'DTSTART'        => date(EED_Ical::iCal_datetime_format, $datetime->start()),
                        'DTEND'          => date(EED_Ical::iCal_datetime_format, $datetime->end()),
                    ];

                    // Filter the values used within the ics output.
                    // NOTE - all values within ics_data will be escaped automatically.
                    $ics_data = apply_filters('FHEE__EED_Ical__download_ics_file_ics_data', $ics_data, $datetime);

                    // Escape all ics data
                    foreach ($ics_data as $key => $value) {
                        // Description is escaped differently from all all values
                        if ($key === 'DESCRIPTION') {
                            $ics_data[ $key ] = EED_Ical::_escape_ICal_description(wp_strip_all_tags($value));
                        } else {
                            $ics_data[ $key ] = EED_Ical::_escape_ICal_data($value);
                        }
                    }

                    // Pull the organizer name from ics_data and remove it from the array.
                    $organizer_name = isset($ics_data['ORGANIZER_NAME'])
                        ? $ics_data['ORGANIZER_NAME']
                        : '';
                    unset($ics_data['ORGANIZER_NAME']);

                    // set headers
                    header('Content-type: text/calendar; charset=utf-8');
                    header('Content-Disposition: attachment; filename="' . $filename . '"');
                    header('Cache-Control: private, max-age=0, must-revalidate');
                    header('Pragma: public');
                    header('Content-Type: application/octet-stream');
                    header('Content-Type: application/force-download');
                    header('Cache-Control: no-cache, must-revalidate');
                    header('Content-Transfer-Encoding: binary');
                    header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); // past date
                    ini_set('zlib.output_compression', '0');
                    // echo the output
                    echo "BEGIN:VCALENDAR\r\n";
                    echo "VERSION:2.0\r\n";
                    echo "PRODID:-//{$organizer_name}//NONSGML PDA Calendar Version 1.0//EN\r\n";
                    echo "CALSCALE:GREGORIAN\r\n";
                    echo "BEGIN:VEVENT\r\n";

                    // Output all remaining values from ics_data.
                    foreach ($ics_data as $key => $value) {
                        echo wp_kses($key . ':' . $value, AllowedTags::getAllowedTags()) . "\r\n";
                    }

                    echo "END:VEVENT\r\n";
                    echo "END:VCALENDAR\r\n";
                }
            }
        }
        die();
    }


    /**
     *    _escape_ICal_data
     *
     * @param string $string
     * @return    string
     */
    private static function _escape_ICal_data($string = '')
    {
        return preg_replace('/([\,;])/', '\\\$1', $string);
    }


    /**
     *    _escape_ICal_description
     *
     * @param string $description
     * @return    string
     */
    private static function _escape_ICal_description($description = '')
    {
        // Escape special chars within the description
        $description = EED_Ical::_escape_ICal_data($description);
        // Remove line breaks and output in iCal format
        return str_replace(["\r\n", "\n"], '\n', $description);
    }
}
