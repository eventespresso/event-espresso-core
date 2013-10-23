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
 * EE_CPT_Event_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/CPTs/EE_CPT_Event_Strategy.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Event_Strategy {


	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * $CPT - the current page, if it utilizes CPTs
	 *	@var 	object	
	 * 	@access 	protected
	 */
	protected $CPT = NULL;
	


	
	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct( $arguments ) {
		extract( $arguments );
		$this->EE = $EE;
		$this->CPT = $CPT;

		add_filter( 'posts_fields', array( $this, 'posts_fields' ));
		add_filter( 'posts_join',	array( $this, 'posts_join' ));
		add_filter( 'posts_where',	array( $this, 'posts_where' ));
		add_action( 'loop_start', array( $this, 'loop_start' ), 1 );
	}



	/**
	 * 	posts_fields
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_fields( $SQL ) {
		// adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
		$SQL .= ', ' . EEM_Datetime::instance()->table() . '.* ' ;
		return $SQL;
	}



	/**
	 * 	posts_join
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_join( $SQL ) {
		global $wpdb;
		// adds something like " LEFT JOIN wp_esp_datetime ON ( wp_esp_datetime.EVT_ID = wp_posts.ID ) " to WP Query JOIN statement
		$SQL .= ' JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . EEM_Datetime::instance()->table() . '.EVT_ID = ' . $wpdb->posts . '.ID ) ';
		return $SQL;
	}



	/**
	 * 	posts_where
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_where( $SQL ) {
		global $wpdb;
		// adds something like " AND wp_esp_datetime.DTT_is_primary = 1 " to WP Query WHERE statement
		// TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
		$SQL .= ' AND ' . EEM_Datetime::instance()->table() . '.DTT_is_primary = 1 ';
		return $SQL;
	}



	/**
	 * 	loop_start
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function loop_start( WP_Query $wp_query ) {
		$this->EE->load_helper('Event_View');
//		$wp_query = EEH_Event_View::get_event_datetimes_and_tickets_for_WP_Query( $wp_query );
	}




	/**
	 * 	get_EE_post_type_metadata
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_EE_post_type_metadata( $meta_value = NULL, $post_id, $meta_key, $single ) {

		return $meta_value;

	}


}






// End of file EE_CPT_Event_Strategy.core.php
// Location: /core/CPTs/EE_CPT_Event_Strategy.core.php