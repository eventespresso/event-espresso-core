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
 * CPT_Model_Query_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Model_Query_Strategy extends EE_BASE {


	/**
	 * 	EE_Registry Object
	 *	@var 	object	
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
	public function __construct( EE_Registry $EE ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// EE registry
		$this->EE = $EE;
		$this->_apply_CPT_Model_Query_Strategy();
	}



	/**
	 * 	_apply_CPT_Model_Query_Strategy
	 *
	 * 	@access private
	 * 	@return array
	 */
	private function _apply_CPT_Model_Query_Strategy() {
		// if current page is espresso page, then this is it's post name
		if ( $espresso_page = $this->EE->REQ->is_espresso_page() ) {
			//echo '<h4>$espresso_page : ' . $espresso_page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			$espresso_CPT_pages = $this->EE->REQ->get_espresso_CPT_pages();
			//printr( $espresso_CPT_pages, '$espresso_CPT_pages  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			$CPTs = EE_Register_CPTs::get_CPTs();
			if ( isset( $espresso_CPT_pages[ $espresso_page ] )) {
				$this->CPT = $CPTs[ $espresso_CPT_pages[ $espresso_page ] ];
				$this->CPT['post_type'] = $espresso_CPT_pages[ $espresso_page ];
				$this->CPT['this_page'] = $espresso_page;
//				printr( $this->CPT, '$this->CPT  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				if ( isset( $this->CPT['singular_name'] )) {
			
					$CPT_Model = 'EEM_' . $this->CPT['singular_name'];
					$this->CPT['tables'] = $CPT_Model::instance()->get_tables();
					$this->CPT['meta_table'] = isset( $this->CPT['tables'][ $this->CPT['singular_name'] . '_Meta' ] ) ? $this->CPT['tables'][ $this->CPT['singular_name'] . '_Meta' ] : FALSE;
					
					$CPT_Model_Query_Strategy_class_name = 'EE_CPT_' . $this->CPT['singular_name'] . '_Model_Query_Strategy';

					$CPT_Model_Query_Strategy = new $CPT_Model_Query_Strategy_class_name( $this->CPT );
//					printr( $CPT_Model_Query_Strategy, '$CPT_Model_Query_Strategy  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
					add_filter( 'request', array( $this, 'filter_request' ), 1 );  
//					add_filter( 'pre_get_posts', array( $this, 'pre_get_posts' ), 999 );
//					add_filter( 'posts_fields', array( $CPT_Model_Query_Strategy, 'posts_fields' ));
//					add_filter( 'posts_join',	array( $CPT_Model_Query_Strategy, 'posts_join' ));
					add_action( 'loop_start', array( $this, 'loop_start' ), 1 );

				}				
			}
		}
	}



	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_request(  $req  ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		if ( isset( $req['pagename'] ) && $req['pagename'] == $this->CPT['this_page']) {
			unset( $req['pagename'] );
		}		
 		//$req['fields'] = 'ids';
	    return $req;
	}



	/**
	 * 	pre_get_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function pre_get_posts(  $WP_Query  ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		if ( ! $WP_Query->is_main_query() && ! is_archive() ) {
			return;
		}
//		$WP_Query->set( 'post_type', array( $this->CPT['post_type'] ));
//		$WP_Query->set( 'fields', 'ids' );
//		printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $WP_Query;
	}




	/**
	 * 	wp
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function loop_start( $WP_Query ) {
		$EVT = $this->EE->load_model( 'Event' );
		$EVT_IDs = array();
		foreach( $WP_Query->posts as $WP_Post ) {
			$EVT_IDs[] = $WP_Post->ID;
		}
		$events = $EVT->get_all( array( 0 =>array( 'EVT_ID' => array( 'IN', $EVT_IDs )), 'force_join' =>array( 'Datetime', 'Price', 'Venue' )));
//		printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $EVT_IDs, '$EVT_IDs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $events, '$events  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

	}






}






/**
 * ------------------------------------------------------------------------
 *
 * EE_CPT_Event_Model_Query_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Event_Model_Query_Strategy extends EE_CPT_Model_Query_Strategy {

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
	public function __construct( $CPT ) {
		$this->CPT = $CPT;
	}




	/**
	 * 	posts_fields
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_fields( $SQL ) {
		global $wpdb;
		$SQL .= ', ' . $this->CPT['meta_table']->get_table_name() . '.*';
//		echo '<h4>$SQL : ' . $SQL . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
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
		$SQL .= 'LEFT JOIN ' . $this->CPT['meta_table']->get_table_name() . ' ON (' . $this->CPT['meta_table']->get_table_name() . '.EVT_ID = ' . $wpdb->posts . '.ID) ';
//		echo '<h4>$SQL : ' . $SQL . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		return $SQL;
	}



}





/**
 * ------------------------------------------------------------------------
 *
 * EE_CPT_Venue_Model_Query_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Venue_Model_Query_Strategy extends EE_CPT_Model_Query_Strategy {

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
	public function __construct( $CPT ) {
		$this->CPT = $CPT;
	}



	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_request(  $req  ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
 		$req['pagename'] = isset( $req['pagename'] ) && ! empty( $req['pagename'] ) ? $req['pagename'] : $this->CPT['this_page'];
 		$req['post_type'] = $this->CPT['post_type'];
		printr( $req, '$req  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	    return $req;
	}



	/**
	 * 	posts_fields
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_fields( $SQL ) {
		global $wpdb;
		$SQL .= ', ' . $this->CPT['meta_table']->get_table_name() . '.*';
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
		$SQL .= 'LEFT JOIN ' . $this->CPT['meta_table']->get_table_name() . ' ON (' . $this->CPT['meta_table']->get_table_name() . '.VNU_ID = ' . $wpdb->posts . '.ID) ';
		return $SQL;
	}



}






// End of file EE_CPT_Model_Query_Strategy.core.php
// Location: /core/EE_CPT_Model_Query_Strategy.core.php