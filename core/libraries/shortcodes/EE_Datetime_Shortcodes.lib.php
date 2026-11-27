<?php

use EventEspresso\core\domain\services\calendar\CalendarLinks;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EE_Datetime_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Datetime_Shortcodes lists all shortcodes related to
 * ticket specific info.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Datetime_Shortcodes.lib.php
 * @author         Darren Ethier
 */
class EE_Datetime_Shortcodes extends EE_Shortcodes
{
    /**
     * @return void
     */
    protected function _init_props()
    {
        $this->label = esc_html__('Datetime Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to datetime related data', 'event_espresso');
        $calendar_links    = LoaderFactory::getShared(CalendarLinks::class);
        $this->_shortcodes = array(
            '[DATETIME_START]' => esc_html__('The start date and time.', 'event_espresso'),
            '[DATETIME_END]' => esc_html__('The end date and time.', 'event_espresso'),
            '[DATETIME_TIMEZONE]' => esc_html__('The timezone for the date and time', 'event_espresso'),
            '[DATE_START]' => esc_html__('The datetime start date.', 'event_espresso'),
            '[DATE_END]' => esc_html__('The datetime end date.', 'event_espresso'),
            '[TIME_START]' => esc_html__('The datetime start time.', 'event_espresso'),
            '[TIME_END]' => esc_html__('The datetime end time.', 'event_espresso'),
            '[ICAL_LINK_*]' => esc_html__(
                'The datetime iCal link. The optional "link_text" attribute can be used to set custom text within the link (Default is "Add to iCal Calendar").',
                'event_espresso'
            ),
            '[ADD_TO_CALENDAR_LINKS_*]' => sprintf(
                /* translators: 1: opening code tag, 2: closing code tag, 3: comma-separated provider keys */
                esc_html__(
                    'Links to add this datetime to a calendar. The optional %1$sproviders%2$s attribute limits and orders the links, e.g. %1$sproviders="google,outlook"%2$s (available: %3$s).',
                    'event_espresso'
                ),
                '<code>',
                '</code>',
                $calendar_links instanceof CalendarLinks ? implode(', ', array_keys($calendar_links->providers())) : ''
            ),
        );
    }


    /**
     * @param string $shortcode
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    protected function _parser($shortcode)
    {
        if (! $this->_data instanceof EE_Datetime) {
            return ''; // get out cause we can only parse with the datetime object.
        }

        switch ($shortcode) {
            case '[DATETIME_START]':
                return $this->_data->get_i18n_datetime('DTT_EVT_start');

            case '[DATETIME_END]':
                return $this->_data->get_i18n_datetime('DTT_EVT_end');

            case '[DATETIME_TIMEZONE]':
                return $this->_data->get_timezone();

            case '[DATE_START]':
                return $this->_data->get_i18n_datetime('DTT_EVT_start', get_option('date_format'));

            case '[DATE_END]':
                return $this->_data->get_i18n_datetime('DTT_EVT_end', get_option('date_format'));

            case '[TIME_START]':
                return $this->_data->get_i18n_datetime('DTT_EVT_start', get_option('time_format'));

            case '[TIME_END]':
                return $this->_data->get_i18n_datetime('DTT_EVT_end', get_option('time_format'));
        }

        if (strpos($shortcode, '[ICAL_LINK_*') !== false) {
            $attrs = $this->_get_shortcode_attrs($shortcode);

            $link_text = empty($attrs['link_text'])
                ? esc_html__('Add to iCal Calendar', 'event_espresso')
                : $attrs['link_text'];

            $URL = add_query_arg(['ee' => 'download_ics_file', 'ics_id' => $this->_data->ID()], site_url());
            $URL = esc_url_raw(str_replace('http://', 'https://', $URL));

            return '<a class="ee-ical" href="' . $URL . '">' . $link_text . '</a>';
        }

        if (strpos($shortcode, '[ADD_TO_CALENDAR_LINKS_*') !== false) {
            $attrs          = $this->_get_shortcode_attrs($shortcode);
            $providers      = empty($attrs['providers']) ? [] : array_map('trim', explode(',', $attrs['providers']));
            $calendar_links = LoaderFactory::getShared(CalendarLinks::class);
            return $calendar_links instanceof CalendarLinks
                ? $calendar_links->linksHtml($calendar_links->links($this->_data, $providers))
                : '';
        }

        return '';
    }
}
