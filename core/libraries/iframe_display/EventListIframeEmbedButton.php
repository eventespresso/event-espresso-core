<?php
namespace EventEspresso\core\libraries\iframe_display;

defined('ABSPATH') || exit;



/**
 * Class EventListIframeEmbedButton
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EventListIframeEmbedButton extends IframeEmbedButton
{



    /**
     * Adds an iframe embed code button to the Event editor.
     */
    public static function addEventEditorIframeEmbedButton()
    {
        // add button for iframe code to event editor.
        IframeEmbedButton::addEventEditorIframeEmbedButtonFilter(
            'event_list',
            esc_html__('Event', 'event_espresso'),
            esc_html__('event', 'event_espresso')
        );
    }




    /**
     * Adds an iframe embed code button to the Event editor.
     * return string
     */
    public static function addEventListIframeEmbedButton()
    {
        // add button for iframe code to event editor.
        $html = '';
        //make sure this is ONLY when editing and the event id has been set.
        if (\EE_Registry::instance()->REQ->get('page') === 'espresso_events') {
            $html .= \EEH_HTML::h3(esc_html__('iFrame Embed Code', 'event_espresso'));
            $html .= \EEH_HTML::p(
                esc_html__(
                    'Click the following button(s) to generate iframe HTML that will allow you to embed your event content within the content of other websites.',
                    'event_espresso'
                )
            );
            $html .= ' &nbsp; ' . IframeEmbedButton::embedButtonHtml(
                    esc_html__('Event List', 'event_espresso'),
                    esc_html__('event_list', 'event_espresso')
                ) . ' ';
            \EE_Registry::$i18n_js_strings['iframe_embed_title'] = esc_html__(
                'copy and paste the following into any other site\'s content to display this event:',
                'event_espresso'
            );
        }
        return apply_filters(
            'FHEE__Iframe__addEventListIframeEmbedButton__html',
            $html
        );
    }




}
// End of file EventListIframeEmbedButton.php
// Location: EventEspresso\core\libraries\iframe_display/EventListIframeEmbedButton.php