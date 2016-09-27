<?php
namespace EventEspresso\modules\ticket_selector;

use EventEspresso\core\libraries\iframe_display\IframeEmbedButton;

defined('ABSPATH') || exit;



/**
 * Class TicketSelectorIframeEmbedButton
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class TicketSelectorIframeEmbedButton extends IframeEmbedButton
{


    /**
     * Adds an iframe embed code button to the Event editor.
     */
    public static function addEventEditorIframeEmbedButton()
    {
        // add button for iframe code to event editor.
        IframeEmbedButton::addEventEditorIframeEmbedButtonFilter(
            'ticket_selector',
            esc_html__('Ticket Selector', 'event_espresso'),
            'event'
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
                    'Click the following button(s) to generate iframe HTML that will allow you to embed a Ticket Selector within the content of other websites.',
                    'event_espresso'
                )
            );
            $html .= ' &nbsp; ' . IframeEmbedButton::embedButtonHtml(
                    'Ticket Selector',
                    'ticket_selector'
                ) . ' ';
            \EE_Registry::$i18n_js_strings['iframe_embed_title'] = esc_html__(
                'copy and paste the following into any other site\'s content to display a Ticket Selector for this event:',
                'event_espresso'
            );
        }
        return apply_filters(
            'FHEE__Iframe__addEventListIframeEmbedButton__html',
            $html
        );
    }




}
// End of file TicketSelectorIframeEmbedButton.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorIframeEmbedButton.php