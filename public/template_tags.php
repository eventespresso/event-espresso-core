<?php
defined('EVENT_ESPRESSO_VERSION') || exit();


/*************************** EE Conditionals ***************************/


/**
 * is_espresso_event
 * whether this is an Espresso Event post
 *
 * @param int | EE_Event $event
 * @return bool
 * @throws EE_Error
 * @throws ReflectionException
 */
function is_espresso_event($event = null)
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        // extract EE_Event object from passed param regardless of what it is (within reason of course)
        $event = EEH_Event_View::get_event($event);
        // do we have a valid event ?
        return $event instanceof EE_Event;
    }
    return false;
}

/**
 * is_espresso_event_single
 * whether this is a singular Espresso Event post
 *
 * @return bool
 */
function is_espresso_event_single()
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        global $wp_query;
        // return conditionals set by CPTs
        return $wp_query instanceof WP_Query ? $wp_query->is_espresso_event_single : false;
    }
    return false;
}

/**
 * is_espresso_event_archive
 * whether this is an archive of Espresso Event posts
 *
 * @return bool
 */
function is_espresso_event_archive()
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        global $wp_query;
        return $wp_query instanceof WP_Query ? $wp_query->is_espresso_event_archive : false;
    }
    return false;
}

/**
 * is_espresso_event_taxonomy
 * whether this is an Espresso Event category
 *
 * @return bool
 */
function is_espresso_event_taxonomy()
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        global $wp_query;
        return $wp_query instanceof WP_Query ? $wp_query->is_espresso_event_taxonomy : false;
    }
    return false;
}

/**
 * is_espresso_venue
 * whether this is an Espresso Venue post
 *
 * @param int | EE_Venue $venue
 * @return bool
 * @throws EE_Error
 * @throws ReflectionException
 */
function is_espresso_venue($venue = null)
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        // extract EE_Venue object from passed param regardless of what it is (within reason of course)
        $venue = EEH_Venue_View::get_venue($venue, false);
        // do we have a valid event ?
        return $venue instanceof EE_Venue;
    }
    return false;
}

/**
 * is_espresso_venue_single
 * whether this is a singular Espresso Venue post
 *
 * @return bool
 */
function is_espresso_venue_single()
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        global $wp_query;
        return $wp_query instanceof WP_Query ? $wp_query->is_espresso_venue_single : false;
    }
    return false;
}

/**
 * is_espresso_venue_archive
 * whether this is an archive of Espresso Venue posts
 *
 * @return bool
 */
function is_espresso_venue_archive()
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        global $wp_query;
        return $wp_query instanceof WP_Query ? $wp_query->is_espresso_venue_archive : false;
    }
    return false;
}

/**
 * is_espresso_venue_taxonomy
 * whether this is an Espresso Venue category
 *
 * @return bool
 */
function is_espresso_venue_taxonomy()
{
    if (can_use_espresso_conditionals(__FUNCTION__)) {
        global $wp_query;
        return $wp_query instanceof WP_Query ? $wp_query->is_espresso_venue_taxonomy : false;
    }
    return false;
}

/**
 * can_use_espresso_conditionals
 * tests whether the Espresso Conditional tags like is_espresso_event_single() can be called
 *
 * @param $conditional_tag
 * @return bool
 */
function can_use_espresso_conditionals($conditional_tag)
{
    if (! did_action('AHEE__EE_System__initialize')) {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            sprintf(
                esc_html__(
                    'The "%s" conditional tag can not be used until after the "init" hook has run, but works best when used within a theme\'s template files.',
                    'event_espresso'
                ),
                $conditional_tag
            ),
            '4.4.0'
        );
        return false;
    }
    return true;
}


/*************************** Event Queries ***************************/

if (! function_exists('espresso_get_events')) {
    /**
     *    espresso_get_events
     *
     * @param array $params
     * @return array
     */
    function espresso_get_events($params = [])
    {
        //set default params
        $default_espresso_events_params = [
            'limit'         => 10,
            'show_expired'  => false,
            'month'         => null,
            'category_slug' => null,
            'order_by'      => 'start_date',
            'sort'          => 'ASC',
        ];
        // allow the defaults to be filtered
        $default_espresso_events_params = apply_filters(
            'espresso_get_events__default_espresso_events_params',
            $default_espresso_events_params
        );
        // grab params and merge with defaults, then extract
        $params = array_merge($default_espresso_events_params, $params);
        // run the query
        $events_query = new EventEspresso\core\domain\services\wp_queries\EventListQuery($params);
        // assign results to a variable so we can return it
        $events = $events_query->have_posts() ? $events_query->posts : [];
        // but first reset the query and postdata
        wp_reset_query();
        wp_reset_postdata();
        EED_Events_Archive::remove_all_events_archive_filters();
        unset($events_query);
        return $events;
    }
}


/*************************** EED_Ticket_Selector ***************************/


/**
 * espresso_load_ticket_selector
 *
 * @throws EE_Error
 * @throws ReflectionException
 */
function espresso_load_ticket_selector()
{
    EE_Registry::instance()->load_file(EE_MODULES . 'ticket_selector', 'EED_Ticket_Selector', 'module');
}

if (! function_exists('espresso_ticket_selector')) {
    /**
     * espresso_ticket_selector
     *
     * @param null $event
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_ticket_selector($event = null)
    {
        if (! apply_filters('FHEE_disable_espresso_ticket_selector', false)) {
            espresso_load_ticket_selector();
            EED_Ticket_Selector::set_definitions();
            echo EED_Ticket_Selector::display_ticket_selector($event); // already escaped
        }
    }
}


if (! function_exists('espresso_view_details_btn')) {
    /**
     * espresso_view_details_btn
     *
     * @param null $event
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_view_details_btn($event = null)
    {
        if (! apply_filters('FHEE_disable_espresso_view_details_btn', false)) {
            espresso_load_ticket_selector();
            echo EED_Ticket_Selector::display_ticket_selector($event, true); // already escaped
        }
    }
}


/*************************** EEH_Event_View ***************************/

if (! function_exists('espresso_load_event_list_assets')) {
    /**
     * espresso_load_event_list_assets
     * ensures that event list styles and scripts are loaded
     *
     * @return void
     */
    function espresso_load_event_list_assets()
    {
        $event_list = EED_Events_Archive::instance();
        add_action('AHEE__EE_System__initialize_last', [$event_list, 'load_event_list_assets'], 10);
        add_filter('FHEE_enable_default_espresso_css', '__return_true');
    }
}


if (! function_exists('espresso_event_reg_button')) {
    /**
     * espresso_event_reg_button
     * returns the "Register Now" button if event is active,
     * an inactive button like status banner if the event is not active
     * or a "Read More" button if so desired
     *
     * @param null $btn_text_if_active
     * @param bool $btn_text_if_inactive
     * @param bool $EVT_ID
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_reg_button($btn_text_if_active = null, $btn_text_if_inactive = false, $EVT_ID = false)
    {
        $event = EEH_Event_View::get_event($EVT_ID);
        if (! $event instanceof EE_Event) {
            return;
        }
        $event_status = $event->get_active_status();
        switch ($event_status) {
            case EE_Datetime::sold_out :
                $btn_text = __('Sold Out', 'event_espresso');
                $class    = 'ee-pink';
                break;
            case EE_Datetime::expired :
                $btn_text = __('Event is Over', 'event_espresso');
                $class    = 'ee-grey';
                break;
            case EE_Datetime::inactive :
                $btn_text = __('Event Not Active', 'event_espresso');
                $class    = 'ee-grey';
                break;
            case EE_Datetime::cancelled :
                $btn_text = __('Event was Cancelled', 'event_espresso');
                $class    = 'ee-red';
                break;
            case EE_Datetime::upcoming :
            case EE_Datetime::active :
            default :
                $btn_text = ! empty($btn_text_if_active)
                    ? $btn_text_if_active
                    : __('Register Now', 'event_espresso');
                $class    = 'ee-green';
        }
        if ($event_status < 1 && ! empty($btn_text_if_inactive)) {
            $btn_text = $btn_text_if_inactive;
            $class    = 'ee-grey';
        }
        ?>
        <a class="ee-button ee-register-button <?php echo esc_attr($class); ?>"
           href="<?php espresso_event_link_url($EVT_ID); ?>"
            <?php echo EED_Events_Archive::link_target(); // already escaped
            ?>
        >
            <?php echo esc_html($btn_text); ?>
        </a>
        <?php
    }
}


if (! function_exists('espresso_display_ticket_selector')) {
    /**
     * espresso_display_ticket_selector
     * whether or not to display the Ticket Selector for an event
     *
     * @param bool $EVT_ID
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_display_ticket_selector($EVT_ID = false)
    {
        return EEH_Event_View::display_ticket_selector($EVT_ID);
    }
}


if (! function_exists('espresso_event_status_banner')) {
    /**
     * espresso_event_status
     * returns a banner showing the event status if it is sold out, expired, or inactive
     *
     * @param bool $EVT_ID
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_status_banner($EVT_ID = false)
    {
        return EEH_Event_View::event_status($EVT_ID);
    }
}


if (! function_exists('espresso_event_status')) {
    /**
     * espresso_event_status
     * returns the event status if it is sold out, expired, or inactive
     *
     * @param int  $EVT_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_status($EVT_ID = 0, $echo = true)
    {
        return EEH_Event_View::event_active_status($EVT_ID, $echo);
    }
}


if (! function_exists('espresso_event_categories')) {
    /**
     * espresso_event_categories
     * returns the terms associated with an event
     *
     * @param int  $EVT_ID
     * @param bool $hide_uncategorized
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_categories($EVT_ID = 0, $hide_uncategorized = true, $echo = true)
    {
        if ($echo) {
            echo EEH_Event_View::event_categories($EVT_ID, $hide_uncategorized); // already escaped
            return '';
        }
        return EEH_Event_View::event_categories($EVT_ID, $hide_uncategorized);
    }
}


if (! function_exists('espresso_event_tickets_available')) {
    /**
     * espresso_event_tickets_available
     * returns the ticket types available for purchase for an event
     *
     * @param int  $EVT_ID
     * @param bool $echo
     * @param bool $format
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_tickets_available($EVT_ID = 0, $echo = true, $format = true)
    {
        $tickets = EEH_Event_View::event_tickets_available($EVT_ID);
        if (is_array($tickets) && ! empty($tickets)) {
            // if formatting then $html will be a string, else it will be an array of ticket objects
            $html =
                $format ? '<ul id="ee-event-tickets-ul-' . esc_attr($EVT_ID) . '" class="ee-event-tickets-ul">' : [];
            foreach ($tickets as $ticket) {
                if ($ticket instanceof EE_Ticket) {
                    if ($format) {
                        $html .= '<li id="ee-event-tickets-li-'
                                 . esc_attr($ticket->ID())
                                 . '" class="ee-event-tickets-li">';
                        $html .= esc_html($ticket->name()) . ' ';
                        $html .= EEH_Template::format_currency(
                            $ticket->get_ticket_total_with_taxes()
                        ); // already escaped
                        $html .= '</li>';
                    } else {
                        $html[] = $ticket;
                    }
                }
            }
            if ($format) {
                $html .= '</ul>';
            }
            if ($echo && $format) {
                echo $html; // already escaped
                return '';
            }
            return $html;
        }
        return '';
    }
}

if (! function_exists('espresso_event_date_obj')) {
    /**
     * espresso_event_date_obj
     * returns the primary date object for an event
     *
     * @param bool $EVT_ID
     * @return EE_Datetime|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_date_obj($EVT_ID = false)
    {
        return EEH_Event_View::get_primary_date_obj($EVT_ID);
    }
}


if (! function_exists('espresso_event_date')) {
    /**
     * espresso_event_date
     * returns the primary date for an event
     *
     * @param string $date_format
     * @param string $time_format
     * @param bool   $EVT_ID
     * @param bool   $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_date($date_format = '', $time_format = '', $EVT_ID = false, $echo = true)
    {
        $date_format = ! empty($date_format) ? $date_format : get_option('date_format');
        $time_format = ! empty($time_format) ? $time_format : get_option('time_format');
        $date_format = apply_filters('FHEE__espresso_event_date__date_format', $date_format);
        $time_format = apply_filters('FHEE__espresso_event_date__time_format', $time_format);
        if ($echo) {
            echo EEH_Event_View::the_event_date($date_format, $time_format, $EVT_ID); // already escaped
            return '';
        }
        return EEH_Event_View::the_event_date($date_format, $time_format, $EVT_ID);

    }
}


if (! function_exists('espresso_list_of_event_dates')) {
    /**
     * espresso_list_of_event_dates
     * returns a unordered list of dates for an event
     *
     * @param int    $EVT_ID
     * @param string $date_format
     * @param string $time_format
     * @param bool   $echo
     * @param null   $show_expired
     * @param bool   $format
     * @param bool   $add_breaks
     * @param null   $limit
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_list_of_event_dates(
        $EVT_ID = 0,
        $date_format = '',
        $time_format = '',
        $echo = true,
        $show_expired = null,
        $format = true,
        $add_breaks = true,
        $limit = null
    ) {
        global $allowedtags;
	    $arguments = apply_filters(
            'FHEE__espresso_list_of_event_dates__arguments',
            [ $EVT_ID, $date_format, $time_format, $echo, $show_expired, $format, $add_breaks, $limit ]
        );
        [$EVT_ID, $date_format, $time_format, $echo, $show_expired, $format, $add_breaks, $limit] = $arguments;
        $date_format = ! empty($date_format) ? $date_format : get_option('date_format');
        $time_format = ! empty($time_format) ? $time_format : get_option('time_format');
        $date_format = apply_filters('FHEE__espresso_list_of_event_dates__date_format', $date_format);
        $time_format = apply_filters('FHEE__espresso_list_of_event_dates__time_format', $time_format);
        $datetimes   = EEH_Event_View::get_all_date_obj($EVT_ID, $show_expired, false, $limit);
        if (! $format) {
            return apply_filters('FHEE__espresso_list_of_event_dates__datetimes', $datetimes);
        }
        $newline = $add_breaks ? '<br />' : '';
        if (is_array($datetimes) && ! empty($datetimes)) {
            global $post;
			$cols = count($datetimes);
			$cols = $cols >= 3 ? 'big' : 'small';
			$ul_class = "ee-event-datetimes-ul ee-event-datetimes-ul--{$cols}";
			$html = '<ul id="ee-event-datetimes-ul-' . esc_attr($post->ID) . '" class="'. $ul_class.'">';

            foreach ($datetimes as $datetime) {
                if ($datetime instanceof EE_Datetime) {

                    $datetime_name        = $datetime->name();
                    $datetime_html        = ! empty($datetime_name)
                        ? '
                        <strong class="ee-event-datetimes-li-date-name">
                          ' . esc_html($datetime_name) . '
                       </strong>' . $newline
                        : '';

                    $datetime_html .= '
                        <span class="ee-event-datetimes-li-daterange">
							<span class="dashicons dashicons-calendar"></span>&nbsp;'
							. $datetime->date_range($date_format). '
						</span>
                        <br/>
                        <span class="ee-event-datetimes-li-timerange">
							<span class="dashicons dashicons-clock"></span>&nbsp;'
							. $datetime->time_range($time_format) . '
						</span>
                        ';

                    $venue = $datetime->venue();
                    if ($venue instanceof EE_Venue) {
                    	$venue_name      = esc_html($venue->name());
                        $datetime_html .= '<br /><span class="ee-event-datetimes-li-venue">';
                        $datetime_html .= '<span class="dashicons dashicons-admin-home"></span>&nbsp;';
                        $datetime_html .= '<a href="'. esc_url_raw($venue->get_permalink()) .'" ';
                        $datetime_html .= 'alt="'. $venue_name .'" target="_blank">';
                        $datetime_html .= $venue_name . '</a></span>';
                    }

                    $datetime_description = $datetime->description();
                    $datetime_html .= ! empty($datetime_description)
                        ? '
                        <span class="ee-event-datetimes-li-date-desc">
                            ' . wp_kses($datetime_description, $allowedtags) . '
                        </span>' . $newline
                        : '';

                    $datetime_html = apply_filters(
                        'FHEE__espresso_list_of_event_dates__datetime_html',
                        $datetime_html,
                        $datetime,
                        $arguments
                    );

                    $DTD_ID        = esc_attr($datetime->ID());
                    $active_status = esc_attr('ee-event-datetimes-li-' . $datetime->get_active_status());

                    $html .= '
                    <li id="ee-event-datetimes-li-' . $DTD_ID . '" class="ee-event-datetimes-li ' . $active_status . '">
                        ' . $datetime_html . '
                    </li>';
                }
            }
            $html .= '</ul>';
            $html = apply_filters('FHEE__espresso_list_of_event_dates__html', $html, $arguments, $datetime);
        } else {
            $html =
                '
            <p>
                <span class="dashicons dashicons-marker pink-text"></span>
                ' . esc_html__(
                    'There are no upcoming dates for this event.',
                    'event_espresso'
                ) . '
            </p>
            <br/>';
        }
        if ($echo) {
            echo $html; // already escaped
            return '';
        }
        return $html;
    }
}


if (! function_exists('espresso_event_end_date')) {
    /**
     * espresso_event_end_date
     * returns the last date for an event
     *
     * @param string $date_format
     * @param string $time_format
     * @param bool   $EVT_ID
     * @param bool   $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_end_date($date_format = '', $time_format = '', $EVT_ID = false, $echo = true)
    {
        $date_format = ! empty($date_format) ? $date_format : get_option('date_format');
        $time_format = ! empty($time_format) ? $time_format : get_option('time_format');
        $date_format = apply_filters('FHEE__espresso_event_end_date__date_format', $date_format);
        $time_format = apply_filters('FHEE__espresso_event_end_date__time_format', $time_format);
        if ($echo) {
            echo EEH_Event_View::the_event_end_date($date_format, $time_format, $EVT_ID); // already escaped
            return '';
        }
        return EEH_Event_View::the_event_end_date($date_format, $time_format, $EVT_ID);
    }
}

if (! function_exists('espresso_event_date_range')) {
    /**
     * espresso_event_date_range
     * returns the first and last chronologically ordered dates for an event (if different)
     *
     * @param string $date_format
     * @param string $time_format
     * @param string $single_date_format
     * @param string $single_time_format
     * @param bool   $EVT_ID
     * @param bool   $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_date_range(
        $date_format = '',
        $time_format = '',
        $single_date_format = '',
        $single_time_format = '',
        $EVT_ID = false,
        $echo = true
    ) {
        // set and filter date and time formats when a range is returned
        $date_format = ! empty($date_format) ? $date_format : get_option('date_format');
        $date_format = apply_filters('FHEE__espresso_event_date_range__date_format', $date_format);
        // get the start and end date with NO time portion
        $the_event_date     = EEH_Event_View::the_earliest_event_date($date_format, '', $EVT_ID);
        $the_event_end_date = EEH_Event_View::the_latest_event_date($date_format, '', $EVT_ID);
        // now we can determine if date range spans more than one day
        if ($the_event_date != $the_event_end_date) {
            $time_format = ! empty($time_format) ? $time_format : get_option('time_format');
            $time_format = apply_filters('FHEE__espresso_event_date_range__time_format', $time_format);
            $html        = sprintf(
            /* translators: 1: first event date, 2: last event date */
                esc_html__('%1$s - %2$s', 'event_espresso'),
                EEH_Event_View::the_earliest_event_date($date_format, $time_format, $EVT_ID),
                EEH_Event_View::the_latest_event_date($date_format, $time_format, $EVT_ID)
            );
        } else {
            // set and filter date and time formats when only a single datetime is returned
            $single_date_format = ! empty($single_date_format) ? $single_date_format : get_option('date_format');
            $single_time_format = ! empty($single_time_format) ? $single_time_format : get_option('time_format');
            $single_date_format =
                apply_filters('FHEE__espresso_event_date_range__single_date_format', $single_date_format);
            $single_time_format =
                apply_filters('FHEE__espresso_event_date_range__single_time_format', $single_time_format);
            $html               =
                EEH_Event_View::the_earliest_event_date($single_date_format, $single_time_format, $EVT_ID);
        }
        if ($echo) {
            echo $html; // already escaped
            return '';
        }
        return $html;
    }
}

if (! function_exists('espresso_next_upcoming_datetime_obj')) {
    /**
     * espresso_next_upcoming_datetime_obj
     * returns the next upcoming datetime object for an event
     *
     * @param int $EVT_ID
     * @return EE_Datetime|null
     * @throws EE_Error
     */
    function espresso_next_upcoming_datetime_obj($EVT_ID = 0)
    {
        return EEH_Event_View::get_next_upcoming_date_obj($EVT_ID);
    }
}

if (! function_exists('espresso_next_upcoming_datetime')) {
    /**
     * espresso_next_upcoming_datetime
     * returns the start date and time for the next upcoming event.
     *
     * @param string $date_format
     * @param string $time_format
     * @param int    $EVT_ID
     * @param bool   $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_next_upcoming_datetime($date_format = '', $time_format = '', $EVT_ID = 0, $echo = true)
    {

        $date_format = ! empty($date_format) ? $date_format : get_option('date_format');
        $date_format = apply_filters('FHEE__espresso_next_upcoming_datetime__date_format', $date_format);

        $time_format = ! empty($time_format) ? $time_format : get_option('time_format');
        $time_format = apply_filters('FHEE__espresso_next_upcoming_datetime__time_format', $time_format);

        $datetime_format = trim($date_format . ' ' . $time_format);

        $datetime = espresso_next_upcoming_datetime_obj($EVT_ID);

        if (! $datetime instanceof EE_Datetime) {
            return '';
        }
        if ($echo) {
            echo $datetime->get_i18n_datetime('DTT_EVT_start', $datetime_format); // already escaped
            return '';
        }
        return $datetime->get_i18n_datetime('DTT_EVT_start', $datetime_format);
    }
}

if (! function_exists('espresso_event_date_as_calendar_page')) {
    /**
     * espresso_event_date_as_calendar_page
     * returns the primary date for an event, stylized to appear as the page of a calendar
     *
     * @param bool $EVT_ID
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_date_as_calendar_page($EVT_ID = false)
    {
        EEH_Event_View::event_date_as_calendar_page($EVT_ID);
    }
}


if (! function_exists('espresso_event_link_url')) {
    /**
     * espresso_event_link_url
     *
     * @param int  $EVT_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_link_url($EVT_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Event_View::event_link_url($EVT_ID); // already escaped
            return '';
        }
        return EEH_Event_View::event_link_url($EVT_ID);
    }
}


if (! function_exists('espresso_event_has_content_or_excerpt')) {
    /**
     *    espresso_event_has_content_or_excerpt
     *
     * @access    public
     * @param bool $EVT_ID
     * @return    boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_has_content_or_excerpt($EVT_ID = false)
    {
        return EEH_Event_View::event_has_content_or_excerpt($EVT_ID);
    }
}


if (! function_exists('espresso_event_content_or_excerpt')) {
    /**
     * espresso_event_content_or_excerpt
     *
     * @param int  $num_words
     * @param null $more
     * @param bool $echo
     * @return string
     */
    function espresso_event_content_or_excerpt($num_words = 55, $more = null, $echo = true)
    {
        if ($echo) {
            echo EEH_Event_View::event_content_or_excerpt($num_words, $more); // already escaped
            return '';
        }
        return EEH_Event_View::event_content_or_excerpt($num_words, $more);
    }
}


if (! function_exists('espresso_event_phone')) {
    /**
     * espresso_event_phone
     *
     * @param int  $EVT_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_phone($EVT_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Event_View::event_phone($EVT_ID); // already escaped
            return '';
        }
        return EEH_Event_View::event_phone($EVT_ID);
    }
}


if (! function_exists('espresso_edit_event_link')) {
    /**
     * espresso_edit_event_link
     * returns a link to edit an event
     *
     * @param int  $EVT_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_edit_event_link($EVT_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Event_View::edit_event_link($EVT_ID); // already escaped
            return '';
        }
        return EEH_Event_View::edit_event_link($EVT_ID);
    }
}


if (! function_exists('espresso_organization_name')) {
    /**
     * espresso_organization_name
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_name($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('name'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('name');
    }
}

if (! function_exists('espresso_organization_address')) {
    /**
     * espresso_organization_address
     *
     * @param string $type
     * @return string
     */
    function espresso_organization_address($type = 'inline')
    {
        if (EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config) {
            $address = new EventEspresso\core\domain\entities\GenericAddress(
                EE_Registry::instance()->CFG->organization->address_1,
                EE_Registry::instance()->CFG->organization->address_2,
                EE_Registry::instance()->CFG->organization->city,
                EE_Registry::instance()->CFG->organization->STA_ID,
                EE_Registry::instance()->CFG->organization->zip,
                EE_Registry::instance()->CFG->organization->CNT_ISO
            );
            return EEH_Address::format($address, $type);
        }
        return '';
    }
}

if (! function_exists('espresso_organization_email')) {
    /**
     * espresso_organization_email
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_email($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('email'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('email');
    }
}

if (! function_exists('espresso_organization_logo_url')) {
    /**
     * espresso_organization_logo_url
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_logo_url($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('logo_url'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('logo_url');
    }
}

if (! function_exists('espresso_organization_facebook')) {
    /**
     * espresso_organization_facebook
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_facebook($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('facebook'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('facebook');
    }
}

if (! function_exists('espresso_organization_twitter')) {
    /**
     * espresso_organization_twitter
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_twitter($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('twitter'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('twitter');
    }
}

if (! function_exists('espresso_organization_linkedin')) {
    /**
     * espresso_organization_linkedin
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_linkedin($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('linkedin'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('linkedin');
    }
}

if (! function_exists('espresso_organization_pinterest')) {
    /**
     * espresso_organization_pinterest
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_pinterest($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('pinterest'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('pinterest');
    }
}

if (! function_exists('espresso_organization_google')) {
    /**
     * espresso_organization_google
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_google($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('google'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('google');
    }
}

if (! function_exists('espresso_organization_instagram')) {
    /**
     * espresso_organization_instagram
     *
     * @param bool $echo
     * @return string
     * @throws EE_Error
     */
    function espresso_organization_instagram($echo = true)
    {
        if ($echo) {
            echo EE_Registry::instance()->CFG->organization->get_pretty('instagram'); // already escaped
            return '';
        }
        return EE_Registry::instance()->CFG->organization->get_pretty('instagram');
    }
}


/*************************** EEH_Venue_View ***************************/


if (! function_exists('espresso_event_venues')) {
    /**
     * espresso_event_venues
     *
     * @return array  all venues related to an event
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_event_venues()
    {
        return EEH_Venue_View::get_event_venues();
    }
}


if (! function_exists('espresso_venue_id')) {
    /**
     *    espresso_venue_name
     *
     * @access    public
     * @param int $EVT_ID
     * @return    string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_id($EVT_ID = 0)
    {
        $venue = EEH_Venue_View::get_venue($EVT_ID);
        return $venue instanceof EE_Venue ? $venue->ID() : 0;
    }
}


if (! function_exists('espresso_is_venue_private')) {
    /**
     * Return whether a venue is private or not.
     *
     * @param int $VNU_ID optional, the venue id to check.
     *
     * @return bool | null
     * @throws EE_Error
     * @throws ReflectionException
     * @see EEH_Venue_View::get_venue() for more info on expected return results.
     */
    function espresso_is_venue_private($VNU_ID = 0)
    {
        return EEH_Venue_View::is_venue_private($VNU_ID);
    }
}


if (! function_exists('espresso_venue_is_password_protected')) {
    /**
     * returns true or false if a venue is password protected or not
     *
     * @param int $VNU_ID optional, the venue id to check.
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_is_password_protected($VNU_ID = 0)
    {
        EE_Registry::instance()->load_helper('Venue_View');
        return EEH_Venue_View::is_venue_password_protected($VNU_ID);
    }
}


if (! function_exists('espresso_password_protected_venue_form')) {
    /**
     * Returns a password form if venue is password protected.
     *
     * @param int $VNU_ID optional, the venue id to check.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_password_protected_venue_form($VNU_ID = 0)
    {
        EE_Registry::instance()->load_helper('Venue_View');
        return EEH_Venue_View::password_protected_venue_form($VNU_ID);
    }
}


if (! function_exists('espresso_venue_name')) {
    /**
     *    espresso_venue_name
     *
     * @access    public
     * @param int    $VNU_ID
     * @param string $link_to - options( details, website, none ) whether to turn Venue name into a clickable link to the Venue's details page or website
     * @param bool   $echo
     * @return    string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_name($VNU_ID = 0, $link_to = 'details', $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_name($link_to, $VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_name($link_to, $VNU_ID);
    }
}


if (! function_exists('espresso_venue_link')) {
    /**
     *    espresso_venue_link
     *
     * @access    public
     * @param int    $VNU_ID
     * @param string $text
     * @return    string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_link($VNU_ID = 0, $text = '')
    {
        return EEH_Venue_View::venue_details_link($VNU_ID, $text);
    }
}


if (! function_exists('espresso_venue_description')) {
    /**
     *    espresso_venue_description
     *
     * @access    public
     * @param bool $VNU_ID
     * @param bool $echo
     * @return    string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_description($VNU_ID = false, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_description($VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_description($VNU_ID);
    }
}


if (! function_exists('espresso_venue_excerpt')) {
    /**
     *    espresso_venue_excerpt
     *
     * @access    public
     * @param int  $VNU_ID
     * @param bool $echo
     * @return    string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_excerpt($VNU_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_excerpt($VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_excerpt($VNU_ID);
    }
}


if (! function_exists('espresso_venue_categories')) {
    /**
     * espresso_venue_categories
     * returns the terms associated with a venue
     *
     * @param int  $VNU_ID
     * @param bool $hide_uncategorized
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_categories($VNU_ID = 0, $hide_uncategorized = true, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_categories($VNU_ID, $hide_uncategorized); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_categories($VNU_ID, $hide_uncategorized);
    }
}


if (! function_exists('espresso_venue_address')) {
    /**
     * espresso_venue_address
     * returns a formatted block of html  for displaying a venue's address
     *
     * @param string $type 'inline' or 'multiline'
     * @param int    $VNU_ID
     * @param bool   $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_address($type = 'multiline', $VNU_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_address($type, $VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_address($type, $VNU_ID);
    }
}


if (! function_exists('espresso_venue_raw_address')) {
    /**
     * espresso_venue_address
     * returns an UN-formatted string containing a venue's address
     *
     * @param string $type 'inline' or 'multiline'
     * @param int    $VNU_ID
     * @param bool   $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_raw_address($type = 'multiline', $VNU_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_address($type, $VNU_ID, false, false); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_address($type, $VNU_ID, false, false);
    }
}


if (! function_exists('espresso_venue_has_address')) {
    /**
     * espresso_venue_has_address
     * returns TRUE or FALSE if a Venue has address information
     *
     * @param int $VNU_ID
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_has_address($VNU_ID = 0)
    {
        return EEH_Venue_View::venue_has_address($VNU_ID);
    }
}


if (! function_exists('espresso_venue_gmap')) {
    /**
     * espresso_venue_gmap
     * returns a google map for the venue address
     *
     * @param int   $VNU_ID
     * @param bool  $map_ID
     * @param array $gmap
     * @param bool  $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_gmap($VNU_ID = 0, $map_ID = false, $gmap = [], $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_gmap($VNU_ID, $map_ID, $gmap); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_gmap($VNU_ID, $map_ID, $gmap);
    }
}


if (! function_exists('espresso_venue_phone')) {
    /**
     * espresso_venue_phone
     *
     * @param int  $VNU_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_phone($VNU_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_phone($VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_phone($VNU_ID);
    }
}


if (! function_exists('espresso_venue_website')) {
    /**
     * espresso_venue_website
     *
     * @param int  $VNU_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_venue_website($VNU_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::venue_website_link($VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::venue_website_link($VNU_ID);
    }
}


if (! function_exists('espresso_edit_venue_link')) {
    /**
     * espresso_edit_venue_link
     *
     * @param int  $VNU_ID
     * @param bool $echo
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    function espresso_edit_venue_link($VNU_ID = 0, $echo = true)
    {
        if ($echo) {
            echo EEH_Venue_View::edit_venue_link($VNU_ID); // already escaped
            return '';
        }
        return EEH_Venue_View::edit_venue_link($VNU_ID);
    }
}




// End of file template_tags.php
// Location: /public/template_tags.php
