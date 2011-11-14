<?php
//Creates the invoice pdf
function espresso_invoice_launch($attendee_id=0, $registration_id=0){
	global $wpdb, $org_options;
	$data = new stdClass;


	//Get the event record
    $sql = "SELECT ed.* ";
    $sql .= " FROM " . EVENTS_DETAIL_TABLE . " ed ";
    $sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.event_id=ed.id ";
    $sql .= " WHERE ea.id = '" . $attendee_id . "' AND ea.registration_id = '" . $registration_id . "' ";
	//echo $sql;
    $data->event = $wpdb->get_row($sql, OBJECT);

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
	$data->event->invoice_file = (!empty($data->event->invoice_file) && $data->event->invoice_file > '0') ? $data->event->invoice_file : 'basic.php';
	//echo $data->event->invoice_file;

	//Create the logo
	$data->event->invoice_logo_url = empty($data->event->invoice_logo_url) ? $org_options['default_logo_url']: $data->event->invoice_logo_url;
	$image_size = getimagesize($data->event->invoice_logo_url);
	$data->event->invoice_logo_image = '<img src="'.$data->event->invoice_logo_url.'" '.$image_size[3].' alt="logo" /> ';

	//Build the invoice name
	$invoice_name = sanitize_title_with_dashes($data->attendee->id.' '.$data->attendee->fname.' '.$data->attendee->lname);

	//Get the HTML as an object
    ob_start();
	if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "invoice/index.php")) {
		require_once(EVENT_ESPRESSO_UPLOAD_DIR . 'invoice/'.$data->event->invoice_file);
	} else {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/invoice/templates/'.$data->event->invoice_file);
	}
	$content = ob_get_clean();
	$content = espresso_replace_invoice_shortcodes($content, $data);

	//Check if debugging or mobile is set
	if ( (isset($_REQUEST['debug']) && $_REQUEST['debug']==true) || stripos($_SERVER['HTTP_USER_AGENT'], 'mobile') !== false ){
		echo $content;
		exit(0);
	}

	//Create the PDF
	define('DOMPDF_ENABLE_REMOTE',true);
	require_once(EVENT_ESPRESSO_PLUGINFULLPATH . '/class/dompdf/dompdf_config.inc.php');
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
    $SearchValues = array(
		//Attendee/Event Information
        "[att_id]",
		"[event_id]",
        "[event_identifier]",
        "[registration_id]",
		"[registration_date]",
        "[fname]",
        "[lname]",
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

		//Dates
        "[start_date]",
        "[start_time]",
        "[end_date]",
        "[end_time]",

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

		//Dates
        event_date_display($data->attendee->start_date),
        event_date_display($data->attendee->event_time, get_option('time_format')),
        event_date_display($data->attendee->end_date),
        event_date_display($data->attendee->end_time, get_option('time_format')),

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
			array_push($SearchValues,"[".'question_'.$k."]");
			array_push($ReplaceValues,$k);

			//Output the answer
			array_push($SearchValues,"[".'answer_'.$k."]");
			array_push($ReplaceValues,$v);
		}
	}

	//Get the event meta
	//echo '<p>'.print_r($data->event->event_meta).'</p>';
	if (!empty($data->event->event_meta)){
		foreach($data->event->event_meta as $k=>$v){
			array_push($SearchValues,"[".$k."]");
			array_push($ReplaceValues,stripslashes_deep($v));
		}
	}

    return str_replace($SearchValues, $ReplaceValues, $content);
}