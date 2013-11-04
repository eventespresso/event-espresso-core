<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event List 
 * EVENT_LIST 
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EES_Event_List  extends EES_Shortcode {
	
	private $_css_class = NULL;

	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		// this will trigger the EED_Event_list->event_list() method during the pre_get_posts hook point, which allows us initialize things, enqueue assets, etc
		$this->EE->REQ->set( 'ee', 'event_list' );
	}



	/**
	 * 	process_shortcode - EVENT_LIST - Returns a list of events
	 * 	[EVENT_LIST]
	 * 	[EVENT_LIST limit=1]
	 * 	[EVENT_LIST css_class=my-custom-class]
	 * 	[EVENT_LIST show_expired=true]
	 * 	[EVENT_LIST show_deleted=true]
	 * 	[EVENT_LIST category_identifier=your_category_identifier]
	 * 	[EVENT_LIST order_by=date(start_date),id]
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
		// grab attributes and merge with defaults, then extract
//		extract( shortcode_atts( 
//			array(
//				'limit' => 10,
//				'css_class' => NULL,
//				'show_expired' => FALSE,
//				'show_deleted' => FALSE,
//				'start_date' => NULL,
//				'category_slug' => NULL,
//				'order_by' => NULL,
//				'sort' => NULL,
//				'default_view' =>'text-list'
//			), 
//			$attributes 
//		));
//		
//		// Show Expired ?
//		$this->EE->REQ->set( 'elf_expired_chk', $show_expired );
//		// Category
//		 $this->EE->REQ->set( 'elf_category_dd', $category_slug );
//		// Start Date
//		$this->EE->REQ->set( 'elf_month_dd', $start_date );
//		// default_view
//		$this->EE->REQ->set( 'elf_default_view', $default_view );
//		// add the css class
//		$this->_css_class = $css_class;
//		add_filter( 'EED_Event_List__event_list_css__event_list_css_array', array( $this, 'event_list_css' ));
		
		global $wp_query;
		$wp_query = new WP_Query( array( 
			'post_type' => 'espresso_events' 
		));
		
		ob_start();
		include( EVENT_LIST_TEMPLATES_PATH . EED_Event_List::get_template_part() );
		$this->EE->REQ->add_output( ob_get_clean() );
		//wp_reset_query();
		wp_reset_postdata();		
	
		return $this->EE->REQ->get_output();		
	}	



	/**
	 * 	event_list_css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list_css( $event_list_css =array() ) {
		if ( ! empty( $this->_css_class )) {
			$event_list_css[] = $this->_css_class;
		}
		return $event_list_css;
	}



}
// End of file EES_Event_List.shortcode.php
// Location: /shortcodes/EES_Event_List.shortcode.php