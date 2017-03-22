<?php
namespace EventEspresso\core\libraries\iframe_display;

defined( 'ABSPATH' ) || exit;



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
    public function __construct()
    {
        parent::__construct(
            esc_html__( 'Upcoming Event List', 'event_espresso' ),
            'event_list'
        );
    }



	public function addEmbedButton() {
        add_filter(
			'FHEE__EE_Admin_Page___display_admin_list_table_page__after_list_table__template_args_array',
			array( $this, 'addEventListIframeEmbedButtonSection' )
		);
		add_action(
			'admin_enqueue_scripts',
			array( $this, 'embedButtonAssets' ),
			10
		);
	}



	/**
	 * Adds an iframe embed code button to the Event editor.
	 * return string
	 *
	 * @param array $after_list_table
	 * @return array
	 */
    public function addEventListIframeEmbedButtonSection( array $after_list_table )
    {
        return \EEH_Array::insert_into_array(
    		$after_list_table,
		    array(
			    'iframe_embed_buttons' => $this->addIframeEmbedButtonsSection(
				    array( 'event_list' => $this->embedButtonHtml() )
			    )
		    ),
		    'legend'
	    );
    }



}
// End of file EventListIframeEmbedButton.php
// Location: EventEspresso\core\libraries\iframe_display/EventListIframeEmbedButton.php