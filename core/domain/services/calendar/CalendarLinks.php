<?php

namespace EventEspresso\core\domain\services\calendar;

use EE_Datetime;
use EE_Error;
use EE_Event;
use EE_Venue;
use EEH_Address;
use EEH_Venue_View;
use ReflectionException;
use WP_Exception;
use WP_Post;

/**
 * Builds "Add to Calendar" URLs (ICS download, Google, Outlook.com, Office 365, Yahoo) for an EE_Datetime.
 * All start/end values are UTC instants taken from the raw datetime timestamps.
 *
 * @package EventEspresso\core\domain\services\calendar
 * @since   5.0.63
 */
class CalendarLinks
{
    public const DESCRIPTION_MAX_LENGTH = 500;

    public const PROVIDER_GOOGLE = 'google';

    public const PROVIDER_ICS = 'ics';

    public const PROVIDER_OFFICE365 = 'office365';

    public const PROVIDER_OUTLOOK = 'outlook';

    public const PROVIDER_YAHOO = 'yahoo';

    public const ROUTE_ICS_DATETIME = 'download_ics_file';

    public const ROUTE_ICS_EVENT = 'download_event_ics_file';

    public const URL_PARAM_ICS_DATETIME = 'ics_id';

    public const URL_PARAM_ICS_EVENT = 'event_id';

    public const FORMAT_BASIC = 'Ymd\THis\Z';

    private const FORMAT_ISO = 'Y-m-d\TH:i:s\Z';

    /**
     * @var array<string, string>|null filtered providers, resolved once per request
     */
    private ?array $providers = null;


    /**
     * Supported providers keyed by provider key, with translated labels.
     *
     * @return array<string, string>
     */
    public function providers(): array
    {
        if ($this->providers === null) {
            $this->providers = (array) apply_filters(
                'FHEE__EventEspresso_core_domain_services_calendar_CalendarLinks__providers__providers',
                [
                    CalendarLinks::PROVIDER_ICS       => __('iCal / Outlook (.ics)', 'event_espresso'),
                    CalendarLinks::PROVIDER_GOOGLE    => __('Google Calendar', 'event_espresso'),
                    CalendarLinks::PROVIDER_OUTLOOK   => __('Outlook.com', 'event_espresso'),
                    CalendarLinks::PROVIDER_OFFICE365 => __('Office 365', 'event_espresso'),
                    CalendarLinks::PROVIDER_YAHOO     => __('Yahoo Calendar', 'event_espresso'),
                ]
            );
        }
        return $this->providers;
    }


    /**
     * Label + URL for each requested provider (all providers when empty). Unknown or empty-URL providers are skipped.
     * With $event, the "ics" entry is that event's all-dates ICS file instead of the single datetime's.
     *
     * @param EE_Datetime   $datetime
     * @param string[]      $providers provider keys; all providers when empty
     * @param EE_Event|null $event
     * @return array<string, array{label: string, url: string}>
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    public function links(EE_Datetime $datetime, array $providers = [], ?EE_Event $event = null): array
    {
        $labels    = $this->providers();
        $providers = ! empty($providers) ? $providers : array_keys($labels);
        $links     = [];
        foreach ($providers as $provider) {
            $provider = sanitize_key($provider);
            // a provider removed by the providers filter stays hidden, even when named
            if (! isset($labels[ $provider ])) {
                continue;
            }
            $url = $this->url($datetime, $provider, $event);
            if ($url === '') {
                continue;
            }
            $links[ $provider ] = [
                'label' => $labels[ $provider ],
                'url'   => $url,
            ];
        }
        return $links;
    }


    /**
     * URL for a single provider, or '' if the provider is unknown.
     * With $event, "ics" is that event's all-dates ICS file instead of the single datetime's.
     *
     * @param EE_Datetime   $datetime
     * @param string        $provider
     * @param EE_Event|null $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    public function url(EE_Datetime $datetime, string $provider, ?EE_Event $event = null): string
    {
        switch ($provider) {
            case CalendarLinks::PROVIDER_ICS:
                $url = $event instanceof EE_Event ? $this->eventIcsUrl($event) : $this->icsUrl($datetime);
                break;
            case CalendarLinks::PROVIDER_GOOGLE:
                $url = $this->googleUrl($datetime);
                break;
            case CalendarLinks::PROVIDER_OUTLOOK:
                $url = $this->outlookUrl($datetime, 'https://outlook.live.com/calendar/0/action/compose');
                break;
            case CalendarLinks::PROVIDER_OFFICE365:
                $url = $this->outlookUrl($datetime, 'https://outlook.office.com/calendar/0/action/compose');
                break;
            case CalendarLinks::PROVIDER_YAHOO:
                $url = $this->yahooUrl($datetime);
                break;
            default:
                $url = '';
        }
        return (string) apply_filters(
            'FHEE__EventEspresso_core_domain_services_calendar_CalendarLinks__url__url',
            $url,
            $provider,
            $datetime,
            $event
        );
    }


    /**
     * Unescaped URL for the single-datetime ICS download route.
     *
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function icsUrl(EE_Datetime $datetime): string
    {
        return add_query_arg(
            [
                'ee'                                  => CalendarLinks::ROUTE_ICS_DATETIME,
                CalendarLinks::URL_PARAM_ICS_DATETIME => $datetime->ID(),
            ],
            site_url()
        );
    }


    /**
     * Unescaped URL for the event-level ICS download route (all non-trashed datetimes).
     *
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function eventIcsUrl(EE_Event $event): string
    {
        return add_query_arg(
            [
                'ee'                               => CalendarLinks::ROUTE_ICS_EVENT,
                CalendarLinks::URL_PARAM_ICS_EVENT => $event->ID(),
            ],
            site_url()
        );
    }


    /**
     * Plain-text location: the datetime's venue, else the event's venue; inline address, else venue name.
     * Empty when the current visitor may not see the venue (private or password protected).
     *
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    public function location(EE_Datetime $datetime): string
    {
        $venue = $datetime->venue();
        if (! $venue instanceof EE_Venue) {
            $event = $datetime->event();
            $venue = $event instanceof EE_Event ? $event->venue() : null;
        }
        $venue = $venue instanceof EE_Venue ? EEH_Venue_View::get_venue($venue->ID()) : null;
        if (! $venue instanceof EE_Venue) {
            return '';
        }
        $address = trim(wp_strip_all_tags(EEH_Address::format($venue, 'inline', false, false)));
        return $address !== '' ? $address : $venue->name();
    }


    /**
     * True if the event is in a public post status and not password protected.
     *
     * @param EE_Event $event
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function isEventPublic(EE_Event $event): bool
    {
        $status = get_post_status_object($event->status());
        if (! $status || empty($status->public)) {
            return false;
        }
        $post = $event->wp_post();
        return $post instanceof WP_Post && $post->post_password === '';
    }


    /**
     * Email-safe inline HTML: plain <a> tags with absolute URLs, joined by $separator.
     *
     * @param array<string, array{label: string, url: string}> $links as returned by links()
     * @param string                                           $separator
     * @return string
     */
    public function linksHtml(array $links, string $separator = ' | '): string
    {
        return implode(
            esc_html($separator),
            array_map(
                static fn(string $provider, array $link) => '<a class="ee-add-to-calendar-link '
                    . 'ee-add-to-calendar-link--' . esc_attr($provider) . '" href="' . esc_url($link['url']) . '">'
                    . esc_html($link['label'])
                    . '</a>',
                array_keys($links),
                $links
            )
        );
    }


    /**
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    private function googleUrl(EE_Datetime $datetime): string
    {
        return $this->buildUrl(
            'https://calendar.google.com/calendar/render',
            [
                'action'   => 'TEMPLATE',
                'text'     => $this->title($datetime),
                'dates'    => gmdate(CalendarLinks::FORMAT_BASIC, $datetime->start())
                    . '/' . gmdate(CalendarLinks::FORMAT_BASIC, $datetime->end()),
                'details'  => $this->description($datetime),
                'location' => $this->location($datetime),
            ]
        );
    }


    /**
     * Outlook.com and Office 365 share one deeplink format.
     *
     * @param EE_Datetime $datetime
     * @param string      $base
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    private function outlookUrl(EE_Datetime $datetime, string $base): string
    {
        return $this->buildUrl(
            $base,
            [
                'path'     => '/calendar/action/compose',
                'rru'      => 'addevent',
                'subject'  => $this->title($datetime),
                'startdt'  => gmdate(CalendarLinks::FORMAT_ISO, $datetime->start()),
                'enddt'    => gmdate(CalendarLinks::FORMAT_ISO, $datetime->end()),
                'body'     => $this->description($datetime),
                'location' => $this->location($datetime),
            ]
        );
    }


    /**
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    private function yahooUrl(EE_Datetime $datetime): string
    {
        return $this->buildUrl(
            'https://calendar.yahoo.com/',
            [
                'v'      => '60',
                'title'  => $this->title($datetime),
                'st'     => gmdate(CalendarLinks::FORMAT_BASIC, $datetime->start()),
                'et'     => gmdate(CalendarLinks::FORMAT_BASIC, $datetime->end()),
                'desc'   => $this->description($datetime),
                'in_loc' => $this->location($datetime),
            ]
        );
    }


    /**
     * @param string $base
     * @param array  $params empty values are dropped
     * @return string
     */
    private function buildUrl(string $base, array $params): string
    {
        $params = array_filter(
            $params,
            static fn($value) => $value !== ''
        );
        return $base . '?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
    }


    /**
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function title(EE_Datetime $datetime): string
    {
        $event = $datetime->event();
        $title = $event instanceof EE_Event ? $event->name() : $datetime->name();
        return html_entity_decode($title, ENT_QUOTES, 'UTF-8');
    }


    /**
     * Single-line plain-text excerpt (or description) trimmed to DESCRIPTION_MAX_LENGTH, then the event URL.
     * Line breaks are collapsed because esc_url() strips encoded newlines. No text for password-protected events.
     *
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws WP_Exception
     */
    private function description(EE_Datetime $datetime): string
    {
        $event = $datetime->event();
        if (! $event instanceof EE_Event) {
            return '';
        }
        $text = '';
        $post = $event->wp_post();
        if (! $post instanceof WP_Post || $post->post_password === '') {
            $text = $event->short_description(null, null, true);
            $text = $text !== '' ? $text : $event->description();
            $text = html_entity_decode(wp_strip_all_tags(strip_shortcodes($text)), ENT_QUOTES, 'UTF-8');
            $text = trim((string) preg_replace('/\s+/u', ' ', $text));
        }
        if (mb_strlen($text) > CalendarLinks::DESCRIPTION_MAX_LENGTH) {
            $text = mb_substr($text, 0, CalendarLinks::DESCRIPTION_MAX_LENGTH);
            // drop the partial last word
            $text = preg_replace('/\s+\S*$/u', '', $text) . '…';
        }
        return trim($text . ' ' . $event->get_permalink());
    }
}
