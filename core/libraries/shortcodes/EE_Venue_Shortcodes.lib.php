<?php

use EventEspresso\core\exceptions\EntityNotFoundException;

/**
 * EE_Venue_Shortcodes
 * this is a child class for the EE_Shortcodes library.  The EE_Venue_Shortcodes lists all shortcodes related to venue
 * specific info. NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in
 * EE_Shortcodes parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Venue_Shortcodes.lib.php
 * @author         Darren Ethier
 * ------------------------------------------------------------------------
 */
class EE_Venue_Shortcodes extends EE_Shortcodes
{


    /**
     * Will hold the EE_Event if available
     *
     * @var EE_Event
     */
    protected $_event;

    /**
     * Will hold the EE_Venue if available
     *
     * @var EE_Venue
     */
    protected $_venue;


    /**
     * Initialize properties
     */
    protected function _init_props()
    {
        $this->label = esc_html__('Venue Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to venue related data', 'event_espresso');
        $this->_shortcodes = array(
            '[VENUE_TITLE]'             => esc_html__('The title for the event venue', 'event_espresso'),
            '[VENUE_DESCRIPTION]'       => esc_html__('The description for the event venue', 'event_espresso'),
            '[VENUE_URL]'               => esc_html__('A url to a webpage for the venue', 'event_espresso'),
            '[VENUE_DETAILS_URL]'       => sprintf(
                esc_html__(
                    'This shortcode outputs the url or website address to the venue details page on this website. This differs from %s which outputs what is entered in the "url" field in the venue details page.',
                    'event_espresso'
                ),
                '[VENUE_URL]'
            ),
            '[VENUE_IMAGE]'             => esc_html__('An image representing the event venue', 'event_espresso'),
            '[VENUE_PHONE]'             => esc_html__('The phone number for the venue', 'event_espresso'),
            '[VENUE_ADDRESS]'           => esc_html__('The address for the venue', 'event_espresso'),
            '[VENUE_ADDRESS2]'          => esc_html__('Address 2 for the venue', 'event_espresso'),
            '[VENUE_CITY]'              => esc_html__('The city the venue is in', 'event_espresso'),
            '[VENUE_STATE]'             => esc_html__('The state the venue is located in', 'event_espresso'),
            '[VENUE_COUNTRY]'           => esc_html__('The country the venue is located in', 'event_espresso'),
            '[VENUE_FORMATTED_ADDRESS]' => esc_html__(
                'This just outputs the venue address in a semantic address format.',
                'event_espresso'
            ),
            '[VENUE_ZIP]'               => esc_html__('The zip code for the venue address', 'event_espresso'),
            '[VENUE_META_*]'            => esc_html__(
                'This is a special dynamic shortcode. After the "*", add the exact name for your custom field, if there is a value set for that custom field within the venue then it will be output in place of this shortcode.',
                'event_espresso'
            ),
            '[GOOGLE_MAP_URL]'          => esc_html__(
                'URL for the google map associated with the venue.',
                'event_espresso'
            ),
            '[GOOGLE_MAP_LINK]'         => esc_html__('Link to a google map for the venue', 'event_espresso'),
            '[GOOGLE_MAP_IMAGE]'        => esc_html__('Google map for venue wrapped in image tags', 'event_espresso'),
        );
    }


    /**
     * Parse incoming shortcode
     *
     * @param string $shortcode
     * @return string
     * @throws EE_Error
     * @throws EntityNotFoundException
     */
    protected function _parser($shortcode)
    {
        $this->_venue = $this->_get_venue();
        // If there is no venue object by now then get out.
        if (! $this->_venue instanceof EE_Venue) {
            return '';
        }

        switch ($shortcode) {
            case '[VENUE_TITLE]':
                return $this->_venue('title');
                break;

            case '[VENUE_DESCRIPTION]':
                return $this->_venue('description');
                break;

            case '[VENUE_URL]':
                return $this->_venue('url');
                break;

            case '[VENUE_IMAGE]':
                return $this->_venue('image');
                break;

            case '[VENUE_PHONE]':
                return $this->_venue('phone');
                break;

            case '[VENUE_ADDRESS]':
                return $this->_venue('address');
                break;

            case '[VENUE_ADDRESS2]':
                return $this->_venue('address2');
                break;

            case '[VENUE_CITY]':
                return $this->_venue('city');
                break;

            case '[VENUE_COUNTRY]':
                return $this->_venue('country');
                break;

            case '[VENUE_STATE]':
                return $this->_venue('state');
                break;

            case '[VENUE_ZIP]':
                return $this->_venue('zip');
                break;

            case '[VENUE_FORMATTED_ADDRESS]':
                return $this->_venue('formatted_address');
                break;

            case '[GOOGLE_MAP_URL]':
                return $this->_venue('gmap_url');
                break;

            case '[GOOGLE_MAP_LINK]':
                return $this->_venue('gmap_link');
                break;

            case '[GOOGLE_MAP_IMAGE]':
                return $this->_venue('gmap_link_img');
                break;

            case '[VENUE_DETAILS_URL]':
                return $this->_venue('permalink');
                break;
        }

        if (strpos($shortcode, '[VENUE_META_*') !== false) {
            $shortcode = str_replace('[VENUE_META_*', '', $shortcode);
            $shortcode = trim(str_replace(']', '', $shortcode));

            // pull the meta value from the venue post
            $venue_meta = $this->_venue->get_post_meta($shortcode, true);

            return ! empty($venue_meta) ? $venue_meta : '';
        }
    }

    /**
     * This retrieves the EE_Venue from the available data object.
     *
     * @return EE_Venue|null
     * @throws EE_Error
     * @throws EntityNotFoundException
     */
    private function _get_venue()
    {

        // we need the EE_Event object to get the venue.
        $this->_event = $this->_data instanceof EE_Event ? $this->_data : null;

        // if no event, then let's see if there is a reg_obj.  If there IS, then we'll try and grab the event from the
        // reg_obj instead.
        if (! $this->_event instanceof EE_Event) {
            $aee = $this->_data instanceof EE_Messages_Addressee ? $this->_data : null;
            $aee = $this->_extra_data instanceof EE_Messages_Addressee ? $this->_extra_data : $aee;

            $this->_event = $aee instanceof EE_Messages_Addressee && $aee->reg_obj instanceof EE_Registration
                ? $aee->reg_obj->event()
                : null;

            // if still empty do we have a ticket data item?
            $this->_event = ! $this->_event instanceof EE_Event
                            && $this->_data instanceof EE_Ticket
                            && $this->_extra_data['data'] instanceof EE_Messages_Addressee
                ? $this->_extra_data['data']->tickets[ $this->_data->ID() ]['EE_Event']
                : $this->_event;

            // if STILL empty event, let's try to get the first event in the list of events via EE_Messages_Addressee
            // and use that.
            $this->_event = ! $this->_event instanceof EE_Event && $aee instanceof EE_Messages_Addressee
                ? reset($aee->events)
                : $this->_event;
        }

        // If we have an event object use it to pull the venue.
        if ($this->_event instanceof EE_Event) {
            return $this->_event->get_first_related('Venue');
        }

        return null;
    }

    /**
     * This retrieves the specified venue information
     *
     * @param string $field What Venue field to retrieve
     * @return string What was retrieved!
     * @throws EE_Error
     * @throws EntityNotFoundException
     */
    private function _venue($field)
    {

        if (! $this->_venue instanceof EE_Venue) {
            return '';
        } //no venue so get out.

        switch ($field) {
            case 'title':
                return $this->_venue->get('VNU_name');
                break;

            case 'description':
                return $this->_venue->get('VNU_desc');
                break;

            case 'url':
                $url = $this->_venue->get('VNU_url');
                return empty($url) ? $this->_venue->get_permalink() : $url;
                break;

            case 'permalink':
                return $this->_venue->get_permalink();
                break;

            case 'image':
                return '<img src="' . $this->_venue->feature_image_url(array(200, 200,))
                       . '" alt="' . sprintf(
                           esc_attr__('%s Feature Image', 'event_espresso'),
                           $this->_venue->get('VNU_name')
                       ) . '" />';
                break;

            case 'phone':
                return $this->_venue->get('VNU_phone');
                break;

            case 'address':
                return $this->_venue->get('VNU_address');
                break;

            case 'address2':
                return $this->_venue->get('VNU_address2');
                break;

            case 'city':
                return $this->_venue->get('VNU_city');
                break;

            case 'state':
                $state = $this->_venue->state_obj();
                return is_object($state) ? $state->get('STA_name') : '';
                break;

            case 'country':
                $country = $this->_venue->country_obj();
                return is_object($country) ? $country->get('CNT_name') : '';
                break;

            case 'zip':
                return $this->_venue->get('VNU_zip');
                break;

            case 'formatted_address':
                return EEH_Address::format($this->_venue);
                break;

            case 'gmap_link':
            case 'gmap_url':
            case 'gmap_link_img':
                $atts = $this->get_map_attributes($this->_venue, $field);
                return EEH_Maps::google_map_link($atts);
                break;
        }
        return '';
    }


    /**
     * Generates the attributes for retrieving a google_map artifact.
     *
     * @param EE_Venue $venue
     * @param string   $field
     * @return array
     * @throws EE_Error
     */
    protected function get_map_attributes(EE_Venue $venue, $field = 'gmap_link')
    {
        $state = $venue->state_obj();
        $country = $venue->country_obj();
        $atts = array(
            'id'      => $venue->ID(),
            'address' => $venue->get('VNU_address'),
            'city'    => $venue->get('VNU_city'),
            'state'   => is_object($state) ? $state->get('STA_name') : '',
            'zip'     => $venue->get('VNU_zip'),
            'country' => is_object($country) ? $country->get('CNT_name') : '',
            'type'    => $field === 'gmap_link' ? 'url' : 'map',
            'map_w'   => 200,
            'map_h'   => 200,
        );
        if ($field === 'gmap_url') {
            $atts['type'] = 'url_only';
        }
        return $atts;
    }
}
