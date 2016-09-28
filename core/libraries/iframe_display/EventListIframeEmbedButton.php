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
     * @return string
     */
    public function embedButton()
    {
        return $this->embedButtonHtml(
            esc_html__('Event List', 'event_espresso'),
            esc_html__('event_list', 'event_espresso')
        );
    }



    /**
     * Adds an iframe embed code button to the Event editor.
     */
    public function addEventEditorIframeEmbedButton()
    {
        // add button for iframe code to event editor.
        $this->addEventEditorIframeEmbedButtonFilter(
            'event_list',
            esc_html__('Event', 'event_espresso'),
            esc_html__('event', 'event_espresso')
        );
    }




    /**
     * Adds an iframe embed code button to the Event editor.
     * return string
     */
    public function addEventListIframeEmbedButtonSection()
    {
        return $this->addIframeEmbedButtonsSection(
            array( 'event_list' => $this->embedButton() )
        );
    }




}
// End of file EventListIframeEmbedButton.php
// Location: EventEspresso\core\libraries\iframe_display/EventListIframeEmbedButton.php