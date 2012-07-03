<?php
//Creates the invoice pdf
function espresso_invoice_launch($session_id=0){
	global $wpdb, $org_options;
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	$REG = EEM_Registration::instance();
	$TXN = EEM_Transaction::instance();
	$registration = $REG->get_registration(array('REG_session'=>$session_id));
	$transaction = $TXN->get_transaction($registration->transaction_ID());
	$session_data = $transaction->session_data();
	printr($session_data);

	//Get the HTML file
	if (!empty($session_data['gateway_data']['payment_settings']['invoice']['invoice_css'])) {
		$invoice_file =  $session_data['gateway_data']['payment_settings']['invoice']['invoice_css'];
	} else {
		$invoice_file = 'simple.css';
	}
	//Create the logo
	if (!empty($session_data['gateway_data']['payment_settings']['invoice']['invoice_logo_url'])) {
		$invoice_logo_url = $session_data['gateway_data']['payment_settings']['invoice']['invoice_logo_url'];
	}	else {
		$invoice_logo_url = $org_options['default_logo_url'];
	}
	if ( !empty($invoice_logo_url) ){
		$image_size = getimagesize($invoice_logo_url);
		$invoice_logo_image = '<img class="logo screen" src="'.$invoice_logo_url.'" '.$image_size[3].' alt="logo" /> ';
	}
	
	function espressoLoadData($items){
		$lines=$items;
		$data=array();
		foreach($lines as $line)
			$data[]=explode(';',chop($line));

		return $data;
	}

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

	$template_args = array();
	$template_args['primary_attendee'] = $session_data['primary_attendee'];
	
	//Get the HTML as an object
	ob_start();
	espresso_display_template('templates/index.php', $template_args);
	$content = ob_get_clean();
	$content = espresso_replace_invoice_shortcodes($content, $session_data);

	//Check if debugging or mobile is set
	if (!empty($_REQUEST['html'])){
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
	global $wpdb, $org_options;
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
	if (!empty($data['event_details'])) {
		foreach ($data['event_details'] as $event) {
			foreach($event['event_meta'] as $key => $value) {
				array_push($SearchValues, "[" . $key . "]");
				array_push($ReplaceValues, stripslashes_deep($value));
			}
		}
	}

	return str_replace($SearchValues, $ReplaceValues, $content);
}
