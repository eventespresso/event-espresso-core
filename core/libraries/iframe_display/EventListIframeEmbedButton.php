<?php
namespace EventEspresso\core\libraries\iframe_display;

defined('ABSPATH') || exit;



/**
 * Class EventListIframeEmbedButton
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9
 */
class EventListIframeEmbedButton extends IframeEmbedButton
{

	/**
	 * EventListIframeEmbedButton constructor.
	 */
	public function __construct() {
		parent::__construct(
			esc_html__( 'Event List', 'event_espresso' ),
            'event_list',
            'event'
		);
	}




    /**
     * Adds an iframe embed code button to the Event editor.
     * return string
     */
    public function addEventListIframeEmbedButtonSection()
    {
        return $this->addIframeEmbedButtonsSection(
            array( 'event_list' => $this->embedButtonHtml() )
        );
    }




}
// End of file EventListIframeEmbedButton.php
// Location: EventEspresso\core\libraries\iframe_display/EventListIframeEmbedButton.php