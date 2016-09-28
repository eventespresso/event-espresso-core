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
    public function addEventEditorIframeEmbedButton()
    {
        // add button for iframe code to event editor.
        $this->addEventEditorIframeEmbedButtonFilter(
            'ticket_selector',
            esc_html__('Ticket Selector', 'event_espresso'),
            'event'
        );
    }



}
// End of file TicketSelectorIframeEmbedButton.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorIframeEmbedButton.php