<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );






function espresso_frontend_init() {
//	$attendee = EE_Attendee::new_instance(array('ATT_fname'=>'mike'));
//	$attendee->save();
//	echo 'echodump of $attendee';
//	var_dump($attendee);
	
//	$an_event = EEM_Event::instance()->get_one();
//	echo 'echodump of $an_event';
//	var_dump($an_event);
//	$a_datetime = $an_event->get_first_related('Datetime');
//	echo 'echodump of $a_datetime';
//	var_dump($a_datetime);
//	$a_price = EEM_Price::instance()->get_one(array(array('Price_Type.PBT_ID'=>  EEM_Price_Type::base_type_base_price)));//$an_event->get_first_related('Price', array(array('OR'=>array('Price_Type.PBT_ID'=>  EEM_Price_Type::base_type_base_price,'EVT_ID'=>0))));
//	echo 'echodump of $a_price';
//	var_dump($a_price);
	
//	$transaction = EE_Transaction::new_instance(array(
//		'TXN_total'=>$a_price->amount()));
//echo 'echodump of $transaction';
//var_dump($transaction);
//	$transaction->save();
//	
//	$reg = EE_Registration::new_instance(array(
//		'ATT_ID'=>$attendee->ID(),
//		'EVT_ID'=>$an_event->ID(),
//		'DTT_ID'=>$a_datetime->ID(),
//		'PRC_ID'=>$a_price->ID(),
//		'STS_ID'=>EEM_Registration::status_id_approved,
//		'REG_final_price'=>$a_price->amount(),
//		));
//	$reg->save();
	
	
	
//	var_dump(EEM_CPT_Base::get_post_statuses());
//	$att = EE_Attendee::new_instance(array('ATT_fname'=>'rodrigo','ATT_lname'=>'nelson','STA_ID'=>23));
//	//$att->save();
//	$attednees = EEM_Attendee::instance()->get_all(array(array('State.STA_ID'=>23)));
//	foreach($attednees as $attendee){
//		echo '$attendee';
//		var_dump($attendee);
//		$state = $attendee->state_obj();
//		echo '$state';
//		var_dump($state);
//	}
//	require_once('EEM_Question_Group.model.php');
//	var_dump(EEM_Question_Group::instance()->get_all(array('force_join'=>array('Question'),'limit'=>9)));
//	require_once('EEM_Event.model.php');
//	EEM_Event::instance()->get_all(array(array('Venue.VNU_ID'=>12,'Registration.Transaction.Payment.PAY_ID'=>23)));
//	EEM_EVent::instance()->get_all(array('order_by'=>array('Venue.VNU_ID'=>'asc')));
//	EEM_Event::instance()->get_all(array(array('Registration.Transaction.TXN_ID'=>3)));
//	EEM_Event::instance()->get_all(array(array('OR'=>array('EVT_ID'=>3,'Venue.VNU_name'=>'monkey_tree'))));
//	require_once('EE_Event.class.php');
//	EEM_Event::instance()->get_all(array(array(
//		'EVT_ID'=>12,
//		
//		'Venue.VNU_name'=>'wee',
//		'OR'=>array(
//			'Registration.Attendee.ATT_fname'=>'stee',
//			'Registration.Transaction.TXN_total'=>34,
//			'Registration.Transaction.TXN_total*'=>35
//		),
//		'NOT'=>array('Registration.Transaction.Payment.PAY_amount'=>array('<',34))
//	),'limit'=>23,'force_join'=>array('Venue','Term_Taxonomy.Term'),'group_by'=>array('Venue.VNU_ID','EVT_name'),
//		'having'=>array('EVT_ID'=>array('IN',array(12,13,14))),
//		'order_by'=>array('Registration.Answer.Question.QST_ID'=>'ASC')));
//
//		$e = EE_Event::new_instance(array(
//		'EVT_name'=>'baboon party'
//	));
//	$e->save();
//	$e->add_event_category('Baboob Party Time!!', 'all for the baoobn');
//	$e->remove_event_category('Baboob Party Time!!');
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	
	global $espresso_reg_page;
	if ( $espresso_reg_page = espresso_test_for_reg_page() ) {
		do_action('AHEE_load_reg_page_files');
	}
			


}





function espresso_test_for_reg_page() {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$this_is_a_reg_page = FALSE;
	
	// array of critical EE pages
	$critical_page_ids = array(
		'event_page_id' => $org_options['event_page_id'],
		'return_url' => $org_options['return_url'],
		'cancel_return' => $org_options['cancel_return'],
		'notify_url' => $org_options['notify_url']
	);

	// check for page id in $request
	$page_id = isset( $_GET['page_id'] ) ? absint( $_GET['page_id'] ) : FALSE; 
	// no page_id in GET?
	if ( ! $page_id ) {
		// grab request uri and explode it to remove query string
		$request_uri = explode( '?', $_SERVER['REQUEST_URI'] );
		// create array from url segments, not including domain
		$uri_segments = explode( '/', trim( esc_url_raw( $request_uri[0] ),  '/' ));
		// flip it so that we can work from the outer most segment in
		$uri_segments = array_reverse( $uri_segments );
		foreach( $uri_segments as $uri_segment ) {
			// can we get a page_id ?
			if ( $page_id =espresso_get_page_id_from_slug( $uri_segment )) {
				break;
			}
		}
	} 
	//echo '<h4>$page_id : ' . $page_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	if ( $page_id ) {
		$this_is_a_reg_page = espresso_critical_pages( $page_id );
	} else if ( get_option('show_on_front') == 'page' ) {
		// first check if a page is being used for the frontpage && grab that page's id
		$frontpage = get_option('page_on_front');
		//echo '<h4>$frontpage : ' . $frontpage . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		// is it a critical page ?
		$this_is_a_reg_page = espresso_critical_pages( $frontpage );
	}
	//echo '<h4>$this_is_a_reg_page : ' . $this_is_a_reg_page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	// either we've found an EE page, or we simply aren't on one
	return $this_is_a_reg_page;
}





function espresso_get_current_full_url( $return_all = FALSE ) {  
	$current_URL = ! isset( $_SERVER['HTTPS'] ) || $_SERVER['HTTPS'] != 'on' ? 'http://' : 'https://';
	if ( isset( $_SERVER['SERVER_PORT'] ) && $_SERVER['SERVER_PORT'] != '80' ) {
		$current_URL .= $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . $_SERVER['REQUEST_URI'];		
	} else {
		$current_URL .= $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	}
	$current_URL .= esc_url_raw( $current_URL );	
	if ( $return_all ) {
		return $current_URL;
	} else {
		$current_URL = explode( '?', $current_URL );	
	    return $current_URL[0];		
	}
}





function espresso_get_page_id_from_slug( $event_page_slug = FALSE ) {
	// find post if it exists
	$event_page = get_page_by_path( $event_page_slug );
	// grab page_id if it's set
	$page_id = isset( $event_page->ID ) ? absint( $event_page->ID ) : FALSE;
	return $page_id;
}





function espresso_critical_pages( $page_id, $event_page_slug = FALSE ) {

	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$critical_page_ids = array(
			$org_options['event_page_id'] => 'event_page_id',
			$org_options['notify_url'] => 'notify_url',
			$org_options['return_url'] => 'return_url',
			$org_options['cancel_return'] => 'cancel_return'
	);
	//printr( $critical_page_ids, '$critical_page_ids  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

	if ( isset( $critical_page_ids[ $page_id ] )) {
		$current_ee_page = $page_id;
		switch( $critical_page_ids[ $page_id ] ) {
			case 'event_page_id' :
					$this_is_a_reg_page = TRUE;
					add_action( 'wp', 'event_espresso_run', 100 );
					add_action ( 'AHEE_event_registration', 'event_details_page', 10, 2 );
					return TRUE;
				break;
			case 'notify_url' :
					$this_is_a_reg_page = TRUE;
					//add_action( 'wp', 'event_espresso_txn', 101 );
					return TRUE;
				break;			
			case 'return_url' :
					$this_is_a_reg_page = TRUE;
					//add_action( 'wp', 'espresso_thank_you_page', 102 );
					return TRUE;
				break;
		}
		
	}
	
	return FALSE;

}


	


function event_espresso_run( $wp ) {

	//printr( $wp, '$wp  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	do_action('AHEE_event_espresso_run_start');
	// grab some globals
	global $espresso_content;

	// begin output buffering
	ob_start();

	// Get action type
	$e_reg = isset($_REQUEST['e_reg']) ? sanitize_text_field( $_REQUEST['e_reg'] ) : '';
	//echo '<h4>$e_reg : ' . $e_reg . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

	switch ($e_reg) {

		case 'process_ticket_selections' :
			do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = process_ticket_selections'  );
			require_once(EE_CLASSES . 'EE_Ticket_Selector.class.php');
			EE_Ticket_Selector::process_ticket_selections();
			break;

		case 'register' :
			do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = register'  );
			remove_all_actions('AHEE_regevent_default_action');
			remove_all_actions('AHEE_event_registration');
			do_action('AHEE_event_reg_checkout');
			break;

		case 'edit_attendee' :
			do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = edit_attendee'  );
			remove_all_actions('AHEE_regevent_default_action');
			remove_all_actions('AHEE_event_registration');
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
			attendee_edit_record();
			break;

		default :		

			espresso_require_template('init.php');

			// check if this is an event list or an event detail page by looking for event slug
			$event_detail_page = get_query_var('event_slug') ? TRUE : FALSE;

			if ( $event_detail_page or isset( $_REQUEST['ee'] ) ) {
				do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = event_detail_page'  );
				//This is the form page for registering the attendee
				require_once(espresso_get_registration_page_template());
				do_action ( 'AHEE_event_registration' );
			} else {
				do_action('AHEE_log', __FILE__, __FUNCTION__, ' e_reg = event_list'  );
//				if ( file_exists( EE_MODULES . 'event_list' . DS . 'EED_Event_List.module.php' )) {
//					require_once( EE_MODULES . 'event_list' . DS . 'EED_Event_List.module.php' );
//				}				
//				require_once(espresso_get_event_list_template());
//				add_action ( 'AHEE_regevent_default_action', 'display_all_events', 10, 1 );
//				do_action ( 'AHEE_regevent_default_action', $e_reg );
			}

	}

	$espresso_content =  ob_get_clean();
	if ( espresso_events_on_frontpage() ) {
		add_filter( 'the_content', 'return_espresso_content' );
		remove_filter('template_redirect', 'redirect_canonical'); 
	} else {
		add_shortcode( 'ESPRESSO_EVENTS', 'return_espresso_content' );
	}	

}





function return_espresso_content( $content ) {
	global $espresso_content;
	return $espresso_content;
}




function espresso_widget() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	espresso_require_template('init.php');
	require(espresso_get_widget_template());
	//The widget can be over-ridden with the custom files addon
	register_widget('Event_Espresso_Widget');
}





/**
 * event_espresso_require_template()
 *
 * @param mixed $template_file_name // Name of template file.
 * @param bool $must_exist		  // Error if neither file exist.
 * @param bool $as_require_once	 // True for require_once(), False for require()
 * @return void	// No return value. File already included.
 *
 * Usage: event_espresso_require_template('shopping_cart.php')
 */
function espresso_require_template($template_file_name, $must_exist = true, $as_require_once = true) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
}
add_action('AHEE_require_template', 'espresso_require_template');