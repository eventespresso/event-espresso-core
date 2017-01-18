<?php
namespace EventEspresso\modules\ticket_selector;

use EventEspresso\core\libraries\iframe_display\IframeEmbedButton;

defined( 'ABSPATH' ) || exit;



/**
 * Class TicketSelectorIframeEmbedButton
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9
 */
class TicketSelectorIframeEmbedButton extends IframeEmbedButton
{

    /**
     * TicketSelectorIframeEmbedButton constructor.
     */
    public function __construct()
    {
        parent::__construct(
            esc_html__( 'Ticket Selector', 'event_espresso' ),
            'ticket_selector'
        );
    }



    /**
     * Adds an iframe embed code button to the Event editor.
     */
    public function addEventEditorIframeEmbedButton()
    {
        // add button for iframe code to event editor.
        $this->addEventEditorIframeEmbedButtonFilter();
    }



}
// End of file TicketSelectorIframeEmbedButton.php
// Location: EventEspresso\modules\ticket_selector/TicketSelectorIframeEmbedButton.php