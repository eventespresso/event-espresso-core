<?php
//Creates the invoice pdf
function espresso_invoice_launch($attendee_id=0, $registration_id=0){
	global $wpdb, $org_options, $payment_settings;

	$data = new stdClass;

	//Checks if this is a multi-event registration
	$multi_reg = false;

	//Tells the system to mark the payment status as pending
	$update_paid_status = true;

	//Create a Payment link
	$payment_link = home_url() . "/?page_id=" . $org_options['return_url'] . "&id=" . $attendee_id;

	//Perform logging actions
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	//Unset the session id
	if(isset($_SESSION['espresso_session']['id'])){
		//unset($_SESSION['espresso_session']['id']);
	}

	//Get the event record
	$sql = "SELECT ed.* ";
	$sql .= " FROM " . EVENTS_DETAIL_TABLE . " ed ";
	$sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.event_id=ed.id ";
	$sql .= " WHERE ea.id = '" . $attendee_id . "' AND ea.registration_id = '" . $registration_id . "' ";
	$data->event = $wpdb->get_row($sql, OBJECT);

	//Debug:
	//echo '<pre>$sql = '.$sql.'</pre>';

	//Retrieve the payment settings
	if ( empty($payment_settings) ){
		if ($data->event->wp_user == 0 || $data->event->wp_user == ''){
			$data->event->wp_user = 1;
		}
		$payment_settings = get_option('payment_data_'.$data->event->wp_user);
	}

	//Get the attendee record
	$sql = "SELECT ea.* FROM " . EVENTS_ATTENDEE_TABLE . " ea WHERE ea.id = '" . $attendee_id . "' ";
	$data->attendee = $wpdb->get_row($sql, OBJECT);

	//Get the primary/first attendee
	$data->primary_attendee = espresso_is_primary_attendee($data->attendee->id) == true ? true : false;

	//unserialize the event meta
	$data->event->event_meta = unserialize($data->event->event_meta);

	//Get the registration date
	$data->attendee->registration_date = $data->attendee->date;

	//Get the HTML file
	$data->event->invoice_file = !empty($payment_settings['invoice']['invoice_css']) ? $payment_settings['invoice']['invoice_css'] : 'simple.css';
	//Debug:
	//echo '<p>invoice_file = '.$payment_settings['invoice']['invoice_file'].'</p>';

	//Create the logo
	$data->event->invoice_logo_url = empty($payment_settings['invoice']['invoice_logo_url']) ? $org_options['default_logo_url']: $payment_settings['invoice']['invoice_logo_url'];
	if ( !empty($data->event->invoice_logo_url) ){
		$image_size = getimagesize($data->event->invoice_logo_url);
		$data->event->invoice_logo_image = '<img class="logo screen" src="'.$data->event->invoice_logo_url.'" '.$image_size[3].' alt="logo" /> ';
	}

	//Create an array of the registration ids
	$registration_ids = array();
	$c_sql = "SELECT * FROM ".EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE." WHERE registration_id = '".$data->attendee->registration_id."' ";
	//Debug:
	//echo $c_sql;

	$check = $wpdb->get_row($c_sql);
//Need to check this with the multi-event addon installed
	//Debug:
	//echo '<p>$check->primary_registration_id = '.$check->primary_registration_id.'</p>';

	if ( $check !== NULL ){
		$registration_id = $check->primary_registration_id;
		$registration_ids = $wpdb->get_results("SELECT registration_id FROM ".EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE." WHERE primary_registration_id = '$registration_id' ", ARRAY_A);
		$multi_reg = true;
	}else{
		$registration_ids[] = array("registration_id"=>$registration_id);
	}

	//If an admin user is downloading the invoice, we don't want to update the payment status
	$update_paid_status = isset($_REQUEST['admin']) ? false : true;

	//If the payment status is already completed, don't update the payment status
	if ($data->attendee->payment_status == "Completed"){
		$update_paid_status = false;
	}

	//Define the payment status as pending
	$data->attendee->payment_status = 'Pending';

	//Define the transaction type as invoice (INV)
	$data->attendee->txn_type = 'INV';

	//Define the date the invoice was updated
	$payment_date = date("d-m-Y");

	//Update the payment status
	if ( count($registration_ids) > 0 && $update_paid_status == true ){
		foreach($registration_ids as $reg_id){
			$sql = "UPDATE ". EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $data->attendee->payment_status . "', txn_type = '" . $data->attendee->txn_type . "', payment_date ='" . $payment_date . "'  WHERE registration_id ='" . $reg_id['registration_id'] . "'";
			$wpdb->query($sql);
		}
	}

	function espressoLoadData($items){
		$lines=$items;
		$data=array();
		foreach($lines as $line)
			$data[]=explode(';',chop($line));

		return $data;
	}

	$attendees = array();
	$total_cost = 0.00;
	foreach($registration_ids as $reg_id){
		$sql = "select ea.registration_id, ed.event_name, ed.start_date, ed.event_identifier, ea.fname, ea.lname, eac.quantity, eac.cost from ". EVENTS_ATTENDEE_TABLE ." ea
				inner join ".EVENTS_ATTENDEE_COST_TABLE." eac on ea.id = eac.attendee_id
				inner join " . EVENTS_DETAIL_TABLE . " ed on ea.event_id = ed.id
				where ea.registration_id = '".$reg_id['registration_id']."' order by ed.event_name ";

		$tmp_attendees = $wpdb->get_results($sql,ARRAY_A);

		foreach($tmp_attendees as $tmp_attendee){
			$sub_total = $tmp_attendee["cost"];
			$attendees[] = espressoLoadData(array(
				$tmp_attendee["event_name"]." [".date('m-d-Y',strtotime($tmp_attendee['start_date']))."] ". ' | '
				. $tmp_attendee["fname"]." ".$tmp_attendee["lname"] . ';'
				. $tmp_attendee["quantity"] .';'
				. doubleval($tmp_attendee["cost"]) . ';'
				. doubleval($sub_total)
				)
			);
			$total_cost += $sub_total;
			$event_identifier = $tmp_attendee["event_identifier"];
		}
	}
	//Debug
	/*echo '<p>$sub_total = '.$sub_total.'</p>';
	echo '<p>$total_cost = '.$total_cost.'</p>';*/

	function espressoInvoiceTotals($text,$total_cost){
		global $org_options;
		$html = '';
		$minus = '';
		if ( $total_cost < 0 ){
			$minus = '-';
			$total_cost = (-1)*$total_cost;
		}
		$html .= '<tr id="discount_tr"><td colspan="2">&nbsp;</td>';
		$html .= '<td class="item_r">'.$text.'</td>';
		$html .= '<td class="item_r">'.$minus.$org_options['currency_symbol'].number_format($total_cost,2, '.', '').'</td>';
		$html .= '</tr>';
		return $html;
	}


	function espressoImprovedTable($event_data){
		global $org_options;
		$html = '';
		$c = false;
		//Data
		foreach($event_data as $data){
			//Debug:
			//echo '<pre>'.print_r($data, true).'</pre>';
			$html .=  '<tr class="item '.(($c = !$c)?' odd':'').'">';
			foreach($data as $row){
				$html .=  '<td class="item_l">'.$row[1].'</td>';
				$html .=  '<td class="item_l">'.$row[0].'</td>';
				$html .=  '<td class="item_r">'.$row[2].'</td>';
				$html .=  '<td class="item_r">'.$row[3].'</td>';
			}
			$html .=  '</tr>';
		}
		return $html;
	}

	//Build the invoice name
	$invoice_name = sanitize_title_with_dashes($data->attendee->id.' '.$data->attendee->fname.' '.$data->attendee->lname);

	//Get the HTML as an object
	ob_start();
	if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "invoice/index.php")) {
		require_once(EVENT_ESPRESSO_UPLOAD_DIR . 'invoice/index.php');
	} else {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/invoice/templates/index.php');
	}
	$content = ob_get_clean();
	$content = espresso_replace_invoice_shortcodes($content, $data);

	//Check if debugging or mobile is set
	if ( (isset($_REQUEST['html']) && $_REQUEST['html']==true) ){
		echo $content;
		exit(0);
	}

	//Create the PDF
	define('DOMPDF_ENABLE_REMOTE',true);
	require_once(EVENT_ESPRESSO_PLUGINFULLPATH . '/tpc/dompdf/dompdf_config.inc.php');
	$dompdf = new DOMPDF();
	$dompdf->load_html($content);
	//$dompdf->set_paper('A4', 'landscape');
	$dompdf->render();
	$dompdf->stream($invoice_name.".pdf", array("Attachment" => false));
	exit(0);

}


//Performst the shortcode replacement
function espresso_replace_invoice_shortcodes($content, $data) {
	global $wpdb, $org_options, $payment_settings;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$SearchValues = array(
		//Attendee/Event Information
		"[att_id]",
		"[event_id]",
		"[event_identifier]",
		"[registration_id]",
		"[registration_date]",
		"[fname]",
		"[lname]",
		"[address]",
		"[address2]",
		"[city]",
		"[state]",
		"[zip]",
		"[event_name]",
		"[description]",
		"[event_link]",
		"[event_url]",

		//Payment details
		"[cost]",
		"[invoice_type]",

		//Organization details
		"[company]",
		"[co_add1]",
		"[co_add2]",
		"[co_city]",
		"[co_state]",
		"[co_zip]",
		"[contact_email]",

		//Dates
		"[start_date]",
		"[start_time]",
		"[end_date]",
		"[end_time]",
		"[invoice_date]",

		//invoice data
		"[invoice_content]",

		//Logo
		"[invoice_logo_url]",
		"[invoice_logo_image]",
	);

	$ReplaceValues = array(
		//Attendee/Event Information
		$data->attendee->id,
		$data->attendee->event_id,
		$data->event->event_identifier,
		$data->attendee->registration_id,
		event_date_display($data->attendee->registration_date),
		stripslashes_deep($data->attendee->fname),
		stripslashes_deep($data->attendee->lname),
		stripslashes_deep($data->attendee->address),
		stripslashes_deep($data->attendee->address2),
		stripslashes_deep($data->attendee->city),
		stripslashes_deep($data->attendee->state),
		stripslashes_deep($data->attendee->zip),
		stripslashes_deep($data->event->event_name),
		stripslashes_deep($data->event->event_desc),
	   	$data->event_link,
		$data->event_url,

		//Payment details
		$org_options['currency_symbol'] .' '. espresso_attendee_price(array('registration_id' => $data->attendee->registration_id, 'session_total' => true)),
		$data->attendee->price_option,

		//Organization details
		stripslashes_deep($org_options['organization']),
		$org_options['organization_street1'],
		$org_options['organization_street2'],
		$org_options['organization_city'],
		$org_options['organization_state'],
		$org_options['organization_zip'],
		$org_options['contact_email'],

		//Dates
		event_date_display($data->attendee->start_date),
		event_date_display($data->attendee->event_time, get_option('time_format')),
		event_date_display($data->attendee->end_date),
		event_date_display($data->attendee->end_time, get_option('time_format')),
		event_date_display(date(get_option('date_format'))),

		//invoice data
		wpautop(stripslashes_deep(html_entity_decode($data->event->invoice_content, ENT_QUOTES))),

		//Logo
		$data->event->invoice_logo_url,
		$data->event->invoice_logo_image, //Returns the logo wrapped in an image tag
	);

	//Get the questions and answers
	$questions = $wpdb->get_results("select qst.question as question, ans.answer as answer from ".EVENTS_ANSWER_TABLE." ans inner join ".EVENTS_QUESTION_TABLE." qst on ans.question_id = qst.id where ans.attendee_id = ".$data->attendee->id, ARRAY_A);
	//echo '<p>'.print_r($questions).'</p>';
	if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->question != NULL) {
		foreach($questions as $q){
			$k = $q['question'];
			$v = $q['answer'];

			//Output the question
			array_push($SearchValues, "[" . 'question_' . $k . "]");
			array_push($ReplaceValues, $k);

			//Output the answer
			array_push($SearchValues, "[" . 'answer_' . $k . "]");
			array_push($ReplaceValues, $v);
		}
	}

	//Get the event meta
	//echo '<p>'.print_r($data->event->event_meta).'</p>';
	if (!empty($data->event->event_meta)) {
		foreach ($data->event->event_meta as $k => $v) {
			array_push($SearchValues, "[" . $k . "]");
			array_push($ReplaceValues, stripslashes_deep($v));
		}
	}

	return str_replace($SearchValues, $ReplaceValues, $content);
}
