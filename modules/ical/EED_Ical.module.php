<?php

use EventEspresso\core\domain\services\calendar\CalendarLinks;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
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
    const iCal_datetime_format = CalendarLinks::FORMAT_BASIC;


    /**
     * @return EED_Ical|EED_Module
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    private static function calendarLinks(): CalendarLinks
    {
        return LoaderFactory::getShared(CalendarLinks::class);
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
        EED_Module::registerRoute(CalendarLinks::ROUTE_ICS_DATETIME, 'EED_Ical', 'download_ics_file');
        EED_Module::registerRoute(CalendarLinks::ROUTE_ICS_EVENT, 'EED_Ical', 'download_event_ics_file');
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
     * @throws WP_Exception
     */
    public static function generate_add_to_iCal_button($html, $datetime)
    {
        // first verify a proper datetime object has been received
        if ($datetime instanceof EE_Datetime) {
            // set whether a link or submit button is shown
            $iCal_type = apply_filters('FHEE__EED_Ical__generate_add_to_iCal_button__iCal_type', 'submit');
            $URL       = esc_url_raw(EED_Ical::calendarLinks()->url($datetime, CalendarLinks::PROVIDER_ICS));
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
     * Route: single datetime ICS. Outputs nothing for trashed datetimes or non-public events.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    public static function download_ics_file()
    {
        $DTT_ID   = self::getRequest()->getRequestParam(CalendarLinks::URL_PARAM_ICS_DATETIME, 0, DataType::INTEGER);
        $datetime = EED_Ical::viewableDatetime($DTT_ID);
        if ($datetime instanceof EE_Datetime) {
            $event = $datetime->event();
            EED_Ical::sendIcsFile(
                $event->slug() . '-' . $datetime->start_date('Y-m-d') . '.ics',
                EED_Ical::icsCalendar([$datetime])
            );
        }
        die();
    }


    /**
     * Route: all non-trashed datetimes of a public event in one ICS file.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    public static function download_event_ics_file(): void
    {
        $EVT_ID = self::getRequest()->getRequestParam(CalendarLinks::URL_PARAM_ICS_EVENT, 0, DataType::INTEGER);
        $event  = EED_Ical::viewableEvent($EVT_ID);
        if ($event instanceof EE_Event) {
            $content = EED_Ical::icsCalendar(EED_Ical::eventDatetimes($event));
            if ($content !== '') {
                EED_Ical::sendIcsFile($event->slug() . '.ics', $content);
            }
        }
        die();
    }


    /**
     * Datetime by ID if it is not trashed and its event is public, else null.
     *
     * @param int $DTT_ID
     * @return EE_Datetime|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function viewableDatetime(int $DTT_ID): ?EE_Datetime
    {
        if ($DTT_ID < 1) {
            return null;
        }
        $datetime = EEM_Datetime::instance()->get_one([['DTT_ID' => $DTT_ID, 'DTT_deleted' => false]]);
        if (! $datetime instanceof EE_Datetime) {
            return null;
        }
        $event = $datetime->event();
        return $event instanceof EE_Event && EED_Ical::calendarLinks()->isEventPublic($event)
            ? $datetime
            : null;
    }


    /**
     * Event by ID if it is public (public post status, no password), else null.
     *
     * @param int $EVT_ID
     * @return EE_Event|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function viewableEvent(int $EVT_ID): ?EE_Event
    {
        if ($EVT_ID < 1) {
            return null;
        }
        $event = EEM_Event::instance()->get_one_by_ID($EVT_ID);
        return $event instanceof EE_Event && EED_Ical::calendarLinks()->isEventPublic($event)
            ? $event
            : null;
    }


    /**
     * Non-trashed datetimes for the event, ordered by start.
     *
     * @param EE_Event $event
     * @return EE_Datetime[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function eventDatetimes(EE_Event $event): array
    {
        return EEM_Datetime::instance()->get_all(
            [
                [
                    'EVT_ID'      => $event->ID(),
                    'DTT_deleted' => false,
                ],
                'order_by' => [
                    'DTT_EVT_start' => 'ASC',
                    'DTT_ID'        => 'ASC',
                ],
            ]
        );
    }


    /**
     * Full VCALENDAR with one VEVENT per datetime; '' if no datetime has an event.
     *
     * @param EE_Datetime[] $datetimes
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    public static function icsCalendar(array $datetimes): string
    {
        $organizer_name = null;
        $vevents        = '';
        foreach ($datetimes as $datetime) {
            $ics_data = $datetime instanceof EE_Datetime ? EED_Ical::icsEventData($datetime) : [];
            if (empty($ics_data)) {
                continue;
            }
            // organizer name comes from the first VEVENT
            if ($organizer_name === null) {
                $organizer_name = $ics_data['ORGANIZER_NAME'] ?? '';
            }
            unset($ics_data['ORGANIZER_NAME']);
            $vevents .= "BEGIN:VEVENT\r\n";
            foreach ($ics_data as $key => $value) {
                $vevents .= wp_kses($key . ':' . $value, AllowedTags::getAllowedTags()) . "\r\n";
            }
            $vevents .= "END:VEVENT\r\n";
        }
        if ($organizer_name === null) {
            return '';
        }
        return "BEGIN:VCALENDAR\r\n"
            . "VERSION:2.0\r\n"
            . "PRODID:-//{$organizer_name}//NONSGML PDA Calendar Version 1.0//EN\r\n"
            . "CALSCALE:GREGORIAN\r\n"
            . $vevents
            . "END:VCALENDAR\r\n";
    }


    /**
     * Filtered and escaped VEVENT values for a datetime (includes ORGANIZER_NAME), or [] without an event.
     *
     * @param EE_Datetime $datetime
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    private static function icsEventData(EE_Datetime $datetime): array
    {
        $event = $datetime->event();
        if (! $event instanceof EE_Event) {
            return [];
        }
        // get related category Term object and it's name
        $category = $event->first_event_category();
        if ($category instanceof EE_Term) {
            $category = $category->name();
        }
        // Check the datetime status has not been cancelled and set the ics value accordingly
        $status = $datetime->get_active_status();
        $status = $status === EE_Datetime::cancelled ? 'CANCELLED' : 'CONFIRMED';

        $ics_data = [
            'ORGANIZER_NAME' => EE_Registry::instance()->CFG->organization->name,
            'UID'            => md5($event->name() . $event->ID() . $datetime->ID()),
            'ORGANIZER'      => EE_Registry::instance()->CFG->organization->email,
            'DTSTAMP'        => date(EED_Ical::iCal_datetime_format),
            'LOCATION'       => EED_Ical::calendarLinks()->location($datetime),
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

        foreach ($ics_data as $key => $value) {
            // Description is escaped differently from all other values
            $ics_data[ $key ] = $key === 'DESCRIPTION'
                ? EED_Ical::_escape_ICal_description(wp_strip_all_tags($value))
                : EED_Ical::_escape_ICal_data($value);
        }
        return $ics_data;
    }


    /**
     * @param string $filename
     * @param string $content already kses'd per line
     * @return void
     */
    private static function sendIcsFile(string $filename, string $content): void
    {
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
        echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }


    /**
     *    _escape_ICal_data
     *
     * @param string|null $string
     * @return    string
     */
    private static function _escape_ICal_data($string = '')
    {
        return preg_replace('/([\,;])/', '\\\$1', (string) $string);
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
