<?php

use EventEspresso\core\services\address\AddressInterface;

/**
 * Class EEH_Schema
 * This class is a collection of static methods for applying schema.org formatting to passed items
 *
 * @package       Event Espresso
 * @subpackage    /core/helpers/
 * @author        Brent Christensen
 */
class EEH_Schema
{
    /**
     * generates JSON-based linked data for an event
     *
     * @param EE_Event $event
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function add_json_linked_data_for_event(EE_Event $event)
    {
        // Check we have a valid datetime for the event
        if (! $event->primary_datetime() instanceof EE_Datetime) {
            return;
        }

        $template_args                      = [
            'event_tickets'  => [],
            'venue_name'     => '',
            'venue_url'      => '',
            'venue_locality' => '',
            'venue_region'   => '',
            'venue_address'  => '',
        ];
        $template_args['event_permalink']   = $event->get_permalink();
        $template_args['event_name']        = $event->name();
        $template_args['event_description'] = wp_strip_all_tags($event->short_description(200));
        // clone datetime so that date formats don't override those for the original datetime
        $primary_datetime             = clone $event->primary_datetime();
        $template_args['event_start'] = $primary_datetime->start_date(DateTimeInterface::ATOM);
        $template_args['event_end']   = $primary_datetime->end_date(DateTimeInterface::ATOM);
        unset($primary_datetime);
        switch ($event->status()) {
            case EEM_Event::cancelled:
                $event_status = 'EventCancelled';
                break;
            case EEM_Event::postponed:
                $event_status = 'EventPostponed';
                break;
            default:
                $event_status = 'EventScheduled';
        }
        $template_args['event_attendance_mode'] = 'OfflineEventAttendanceMode';
        $template_args['event_status']          = 'https://schema.org/' . $event_status;
        $template_args['currency']              = EE_Registry::instance()->CFG->currency->code;
        foreach ($event->tickets() as $original_ticket) {
            // clone tickets so that date formats don't override those for the original ticket
            $ticket                                              = clone $original_ticket;
            $ID                                                  = $ticket->ID();
            $template_args['event_tickets'][ $ID ]['start_date'] = $ticket->start_date(DateTimeInterface::ATOM, null);
            $template_args['event_tickets'][ $ID ]['end_date']   = $ticket->end_date(DateTimeInterface::ATOM, null);
            $template_args['event_tickets'][ $ID ]['price']      = number_format(
                $ticket->price(),
                EE_Registry::instance()->CFG->currency->dec_plc,
                EE_Registry::instance()->CFG->currency->dec_mrk,
                ''
            );
            switch ($ticket->ticket_status()) {
                case 'TKO':
                    $availability = 'InStock';
                    break;
                case 'TKS':
                    $availability = 'SoldOut';
                    break;
                default:
                    $availability = null;
                    break;
            }
            $template_args['event_tickets'][ $ID ]['availability'] = $availability;
            unset($ticket);
        }
        $VNU_ID = espresso_venue_id();
        if (! empty($VNU_ID) && ! espresso_is_venue_private($VNU_ID)) {
            $venue                           = EEH_Venue_View::get_venue($VNU_ID);
            $template_args['venue_name']     = get_the_title($VNU_ID);
            $template_args['venue_url']      = get_permalink($VNU_ID);
            $template_args['venue_locality'] = $venue->city();
            $template_args['venue_region']   = $venue->state_name();
            $template_args['venue_address']  = $venue->address();
            if ($venue->virtual_url() !== '') {
                $template_args['event_attendance_mode'] = 'OnlineEventAttendanceMode';
            }
            if ($venue->virtual_url() !== '' && $venue->address() !== '') {
                $template_args['event_attendance_mode'] = 'MixedEventAttendanceMode';
            }
        }
        $template_args['event_image'] = $event->feature_image_url();
        $template_args                = apply_filters(
            'FHEE__EEH_Schema__add_json_linked_data_for_event__template_args',
            $template_args,
            $event,
            $VNU_ID
        );
        extract($template_args);
        include EE_TEMPLATES . 'json_linked_data_for_event.template.php';
    }


    /**
     *    location
     *    The location of the event, organization or action.
     *    Should include the Venue name AND schema formatted address info
     *
     * @param string|null $location
     * @return string
     */
    public static function location(?string $location = ''): string
    {
        return ! empty($location)
            ? "<div itemprop='location' itemscope itemtype='https://schema.org/Place'>$location</div>"
            : '';
    }


    /**
     *    name
     *    The name of the Event or Venue.
     *
     * @param string|null $name
     * @return string
     */
    public static function name(?string $name = ''): string
    {
        return ! empty($name)
            ? "<span itemprop='name'>$name</span>"
            : '';
    }


    /**
     *    streetAddress
     *    The street address. For example, 1600 Amphitheatre Pkwy.
     *
     * @param AddressInterface|null $obj_with_address
     * @return string
     */
    public static function streetAddress(AddressInterface $obj_with_address = null): string
    {
        $address = $obj_with_address->address();
        return ! empty($address)
            ? "<span itemprop='streetAddress'>$address</span>"
            : '';
    }


    /**
     *    postOfficeBoxNumber
     *    The post office box number for PO box addresses.
     *
     * @param AddressInterface|null $obj_with_address
     * @return string
     */
    public static function postOfficeBoxNumber(AddressInterface $obj_with_address = null): string
    {
        $address2 = $obj_with_address->address2();
        // regex check for some form of PO Box or P.O. Box, etc, etc, etc
        if (
            preg_match(
                "/^\s*((P(OST)?.?\s*(O(FF(ICE)?)?)?.?\s+(B(IN|OX))?)|B(IN|OX))/i",
                $address2
            )
        ) {
            return ! empty($address2)
                ? "<span itemprop='postOfficeBoxNumber'>$address2</span>"
                : '';
        }
        return $address2;
    }


    /**
     *    addressLocality
     *    The locality (city, town, etc). For example, Mountain View.
     *
     * @param AddressInterface|null $obj_with_address
     * @return string
     */
    public static function addressLocality(AddressInterface $obj_with_address = null): string
    {
        $city = $obj_with_address->city();
        return ! empty($city)
            ? "<span itemprop='addressLocality'>$city</span>"
            : '';
    }


    /**
     *    addressRegion
     *    The region (state, province, etc). For example, CA.
     *
     * @param AddressInterface|null $obj_with_address
     * @return string
     */
    public static function addressRegion(AddressInterface $obj_with_address = null): string
    {
        $state = $obj_with_address->state_name();
        return ! empty($state)
            ? "<span itemprop='addressRegion'>$state</span>"
            : '';
    }


    /**
     *    addressCountry
     *    The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
     *
     * @param AddressInterface|null $obj_with_address
     * @return string
     */
    public static function addressCountry(AddressInterface $obj_with_address = null): string
    {
        $country = $obj_with_address->country_name();
        return ! empty($country)
            ? "<span itemprop='addressCountry'>$country</span>"
            : '';
    }


    /**
     *    postalCode
     *    The postal code. For example, 94043.
     *
     * @param AddressInterface|null $obj_with_address
     * @return string
     */
    public static function postalCode(AddressInterface $obj_with_address = null): string
    {
        $postal_code = $obj_with_address->zip();
        return ! empty($postal_code)
            ? "<span itemprop='postalCode'>$postal_code</span>"
            : '';
    }


    /**
     *    telephone
     *    The telephone number.
     *
     * @param string|null $phone_nmbr
     * @return string
     */
    public static function telephone(?string $phone_nmbr = ''): string
    {
        return ! empty($phone_nmbr)
            ? "<span itemprop='telephone'>$phone_nmbr</span>"
            : '';
    }


    /**
     *  URL of the item as a clickable link
     *
     * @param string|null $url        - the URL that the link will resolve to
     * @param string|null $text       - the text that will be used for the visible link
     * @param array       $attributes - array of additional link attributes in  attribute_name => value pairs. ie:
     *                                array(
     *                                'title' => 'click here', 'class' => 'link-class' )
     * @return string (link)
     */
    public static function url(?string $url = '', ?string $text = '', array $attributes = []): string
    {
        // Check the URL includes a scheme
        $parsed_url = parse_url($url);
        if (empty($parsed_url['scheme'])) {
            $url = 'https://' . ltrim($url, '/');
        }
        $atts = '';
        foreach ($attributes as $attribute => $value) {
            $atts .= ' ' . $attribute . '="' . $value . '"';
        }
        $text = $text !== null && $text !== ''
            ? $text
            : esc_url($url);
        return ! empty($url)
            ? '<a itemprop="url" href="' . esc_url_raw($url) . '"' . $atts . '>' . $text . '</a>'
            : '';
    }
}
