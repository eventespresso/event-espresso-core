<?php

/**
 * Class Invoice
 *
 * @deprecated 4.9.13
 * @package       Event Espresso
 */
class Invoice {

	/**
	 *
	 * @var EE_Registration
	 */
	private $registration;
	/**
	 *
	 * @var EE_Transaction
	 */
	private $transaction;
	/**
	 *
	 * @var EE_Payment_Method
	 */
	private $invoice_payment_method;
	private $EE;



	/**
	 * Invoice constructor.
	 *
	 * @deprecated 4.9.13
	 * @param int $url_link
	 */
	public function __construct($url_link = 0) {
		EE_Error::doing_it_wrong(
			__CLASS__,
			esc_html__(
				'This class has been deprecated and replaced by the new Messages library.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		if ( $this->registration = EE_Registry::instance()->load_model( 'Registration' )->get_registration_for_reg_url_link( $url_link)) {
			$this->transaction = $this->registration->transaction();

			$payment_settings = EE_Config::instance()->gateway->payment_settings;//get_user_meta(EE_Registry::instance()->CFG->wp_user, 'payment_settings', TRUE);
			$this->invoice_payment_method = EEM_Payment_Method::instance()->get_one_of_type( 'Invoice' );
		} else {
			EE_Error::add_error( __( 'Your request appears to be missing some required data, and no information for your transaction could be retrieved.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}

	}

	public function send_invoice( $download = FALSE ) {
		$template_args = array();
		$EE = EE_Registry::instance();

		//allow the request to override the default theme defined in the invoice settings
		$theme_requested = ( isset( $_REQUEST['theme'] ) && $_REQUEST['theme'] > 0 && $_REQUEST['theme'] < 8 ) ? absint( $_REQUEST['theme'] ) : null;
		$themes = array(
										1 => "simple.css",
										2 => "bauhaus.css",
										3 => "ejs.css",
										4 => "horizon.css",
										5 => "lola.css",
										6 => "tranquility.css",
										7 => "union.css"
									);
		//Get the CSS file
		if( isset( $themes[ $theme_requested ] ) ) {
			$template_args['invoice_css'] = $themes[ $theme_requested ];
		}else{
			$template_args['invoice_css'] = $this->invoice_payment_method->get_extra_meta( 'legacy_invoice_css', TRUE, 'simple.css' );
		}

		if (is_dir(EVENT_ESPRESSO_GATEWAY_DIR . '/invoice')) {
			$template_args['base_url'] = EVENT_ESPRESSO_GATEWAY_URL . 'Invoice/lib/templates/';
		} else {
			$template_args['base_url'] = EE_GATEWAYS . '/Invoice/lib/templates/';
		}
		$primary_attendee = $this->transaction->primary_registration()->attendee();

		$template_args['organization'] = $EE->CFG->organization->get_pretty( 'name' );
		$template_args['street'] = empty( $EE->CFG->organization->address_2 ) ? $EE->CFG->organization->get_pretty( 'address_1' ) : $EE->CFG->organization->get_pretty( 'address_1' ) . '<br>' . $EE->CFG->organization->get_pretty( 'address_2' );
		$template_args['city'] = $EE->CFG->organization->get_pretty( 'city' );
		$template_args['state'] = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $EE->CFG->organization->STA_ID );
		$template_args['country'] = EE_Registry::instance()->load_model( 'Country' )->get_one_by_ID( $EE->CFG->organization->CNT_ISO );
		$template_args['zip'] = $EE->CFG->organization->get_pretty( 'zip' );
		$template_args['email'] = $EE->CFG->organization->get_pretty( 'email' );

		$template_args['registration_code'] = $this->registration->reg_code();
		$template_args['registration_date'] = $this->registration->date();
		$template_args['name'] = $primary_attendee->full_name();
		$template_args['attendee_address'] = $primary_attendee->address();
		$template_args['attendee_address2'] = $primary_attendee->address2();
		$template_args['attendee_city'] = $primary_attendee->city();
		$attendee_state = $primary_attendee->state_obj();
		if($attendee_state){
			$attendee_state_name = $attendee_state->name();
		}else{
			$attendee_state_name = '';
		}
		$template_args['attendee_state'] = $attendee_state_name;
		$template_args['attendee_zip'] = $primary_attendee->zip();

		$template_args['ship_name'] = $template_args['name'];
		$template_args['ship_address'] = $template_args['attendee_address'];
		$template_args['ship_city'] = $template_args['attendee_city'];
		$template_args['ship_state'] = $template_args['attendee_state'];
		$template_args['ship_zip'] = $template_args['attendee_zip'];

		$template_args['total_cost'] = number_format($this->transaction->total(), 2, '.', '');
		$template_args['transaction'] = $this->transaction;
		$template_args['amount_pd'] = $this->transaction->paid();
		$template_args['amount_owed'] = $this->transaction->total() - $this->transaction->paid();
		$template_args['payments'] = $this->transaction->approved_payments();
		$template_args['net_total'] = '';
		$template_args['edit_reg_info_url'] = $this->registration->edit_attendee_information_url();
		$template_args['retry_payment_url'] = $this->registration->payment_overview_url();
		$template_args['show_line_item_description'] = $this->check_if_any_line_items_have_a_description($this->transaction->total_line_item());
		if ($template_args['amount_pd'] != $template_args['total_cost']) {
			//$template_args['net_total'] = $this->espressoInvoiceTotals( __('SubTotal', 'event_espresso'), $this->transaction->total());//$this->session_data['cart']['REG']['sub_total']);
			$tax_items = $this->transaction->tax_items();
			if(!empty($tax_items) ){
				foreach ($tax_items as $tax) {
					$template_args['net_total'] .= $this->espressoInvoiceTotals( $tax->name(), $tax->total());
				}
			}

			$difference = $template_args['amount_pd'] - $template_args['total_cost'];
			if ($difference < 0) {
				$text = __('Discount', 'event_espresso');
			} else {
				$text = __('Extra', 'event_espresso');
			}
			$template_args['discount'] = $this->espressoInvoiceTotals( $text, $difference );
		}

		$template_args['currency_symbol'] = $EE->CFG->currency->sign;
		$template_args['template_payment_instructions'] = wpautop(stripslashes_deep(html_entity_decode($this->invoice_payment_method->get_extra_meta( 'pdf_instructions', TRUE ), ENT_QUOTES)));
		$template_args['shameless_plug'] = apply_filters( 'FHEE_Invoice__send_invoice__shameless_plug',true );
		if(isset($_GET['receipt'])){
			//receipt-specific stuff
			$events_for_txn = EEM_Event::instance()->get_all(array(array('Registration.TXN_ID'=>$this->transaction->ID())));
			$ticket_line_items_per_event = array();
			$registrations_per_line_item = array();
			$venues_for_events = array();
			foreach($events_for_txn as $event_id => $event){
				$line_items_for_this_event = EEM_Line_Item::instance()->get_all(array(array('Ticket.Datetime.EVT_ID'=>$event_id,'TXN_ID'=>$this->transaction->ID())));
				$ticket_line_items_per_event[$event_id] = $line_items_for_this_event;
				foreach($line_items_for_this_event as $line_item_id => $line_item){
					$ticket = $line_item->ticket();
					$registrations_for_this_ticket = EEM_Registration::instance()->get_all(array(array('TKT_ID'=>$ticket->ID(),'TXN_ID'=>$this->transaction->ID())));
					$registrations_per_line_item[$line_item_id] = $registrations_for_this_ticket;
				}
				$venues_for_events = array_merge($venues_for_events, $event->venues());
			}
			$tax_total_line_item = EEM_Line_Item::instance()->get_one(array(array('TXN_ID'=>$this->transaction->ID(),'LIN_type'=>  EEM_Line_Item::type_tax_sub_total)));
			$questions_to_skip = array(EEM_Attendee::system_question_fname,EEM_Attendee::system_question_lname,  EEM_Attendee::system_question_email);


			$template_args['events_for_txn'] = $events_for_txn;
			$template_args['ticket_line_items_per_event'] = $ticket_line_items_per_event;
			$template_args['registrations_per_line_item'] = $registrations_per_line_item;
			$template_args['venues_for_events'] = $venues_for_events;
			$template_args['tax_total_line_item'] = $tax_total_line_item;
			$template_args['questions_to_skip'] = $questions_to_skip;
//			d($template_args);
			$template_args['download_link'] = $this->registration->receipt_url('download');
		}else{
			//it's just an invoice we're accessing
			$template_args['download_link'] = $this->registration->invoice_url('download');
		}

		//Get the HTML as an object
		$templates_relative_path = 'modules/gateways/Invoice/lib/templates/';
		$template_header = EEH_Template::locate_template( $templates_relative_path . 'invoice_header.template.php', $template_args, TRUE, TRUE );
		if(isset($_GET['receipt'])){
			$template_body = EEH_Template::locate_template( $templates_relative_path . 'receipt_body.template.php', $template_args, TRUE, TRUE );
		}else{
			$template_body = EEH_Template::locate_template( $templates_relative_path . 'invoice_body.template.php', $template_args, TRUE, TRUE );
		}


		$template_footer = EEH_Template::locate_template( $templates_relative_path . 'invoice_footer.template.php', $template_args, TRUE, TRUE );

		$copies =  ! empty( $_REQUEST['copies'] ) ? $_REQUEST['copies'] : 1;

		$content = $this->espresso_replace_invoice_shortcodes($template_header);
		for( $x = 1; $x <= $copies; $x++ ) {
			$content .= $this->espresso_replace_invoice_shortcodes($template_body);
		}
		$content .= $this->espresso_replace_invoice_shortcodes($template_footer);

		//Check if debugging or mobile is set
		if (!empty($_REQUEST['html'])) {
			echo $content;
			exit(0);
		}
		$invoice_name = $template_args['organization'] . ' ' . __('Invoice #', 'event_espresso') . $template_args['registration_code'] . __(' for ', 'event_espresso') . $template_args['name'];
		$invoice_name = str_replace( ' ', '_', $invoice_name );
		//Create the PDF
		if(array_key_exists('html',$_GET)){
			echo $content;
		}else{
			//only load dompdf if nobody else has yet...
			if( ! defined('DOMPDF_DIR')){
				define('DOMPDF_ENABLE_REMOTE', TRUE);
				define('DOMPDF_ENABLE_JAVASCRIPT', FALSE);
				define('DOMPDF_ENABLE_CSS_FLOAT', TRUE);
				require_once(EE_THIRD_PARTY . 'dompdf/dompdf_config.inc.php');
			}
			$dompdf = new DOMPDF();
			$dompdf->load_html($content);
			$dompdf->render();
			$dompdf->stream($invoice_name . ".pdf", array( 'Attachment' => $download ));
		}
		exit(0);
	}
	/**
	 * Checks if this line item, or any of its children, actually has a description.
	 * If none do, then the template can decide to not show any description column
	 * @param EE_Line_Item $line_item
	 * @return boolean
	 */
	function check_if_any_line_items_have_a_description(EE_Line_Item $line_item){
		if($line_item->desc()){
			return true;
		}else{
			foreach($line_item->children() as $child_line_item){
				if($this->check_if_any_line_items_have_a_description($child_line_item)){
					return true;
				}
			}
			//well, if I and my children don't have descriptions, I guess not
			return false;
		}
	}

//Perform the shortcode replacement
	function espresso_replace_invoice_shortcodes( $content ) {

		$EE = EE_Registry::instance();
		//Create the logo
		$invoice_logo_url = $this->invoice_payment_method->get_extra_meta('pdf_logo_image', TRUE,  $EE->CFG->organization->logo_url );
		if (!empty($invoice_logo_url)) {
			$image_size = getimagesize($invoice_logo_url);
			$invoice_logo_image = '<img class="logo screen" src="' . $invoice_logo_url . '" ' . $image_size[3] . ' alt="logo" /> ';
		} else {
			$invoice_logo_image = '';
		}
		$SearchValues = array(
				"[organization]",
				"[registration_code]",
				"[transaction_id]",
				"[name]",
				"[base_url]",
				"[download_link]",
				"[invoice_logo_image]",
				"[street]",
				"[city]",
				"[state]",
				"[zip]",
				"[email]",
				"[vat]",
				"[registration_date]",
				"[instructions]",
		);
		$primary_attendee = $this->transaction->primary_registration()->attendee();
		$org_state = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $EE->CFG->organization->STA_ID );
		if($org_state){
			$org_state_name = $org_state->name();
		}else{
			$org_state_name = '';
		}
		$ReplaceValues = array(
				$EE->CFG->organization->get_pretty( 'name' ),
				$this->registration->reg_code(),
				$this->transaction->ID(),
				$primary_attendee->full_name(),
				(is_dir(EVENT_ESPRESSO_GATEWAY_DIR . '/invoice')) ? EVENT_ESPRESSO_GATEWAY_URL . 'Invoice/lib/templates/' : EE_GATEWAYS_URL . 'Invoice/lib/templates/',
				$this->registration->invoice_url(),//home_url() . '/?download_invoice=true&amp;id=' . $this->registration->reg_url_link(),
				$invoice_logo_image,
				empty( $EE->CFG->organization->address_2 ) ? $EE->CFG->organization->get_pretty( 'address_1' ) : $EE->CFG->organization->get_pretty( 'address_1' ) . '<br>' . $EE->CFG->organization->get_pretty( 'address_2' ),
				$EE->CFG->organization->get_pretty( 'city' ),
				$org_state_name,
				$EE->CFG->organization->get_pretty( 'zip' ),
				$EE->CFG->organization->get_pretty( 'email' ),
				$EE->CFG->organization->vat,
				$this->registration->get_i18n_datetime( 'REG_date', get_option( 'date_format' ) ),
				$this->invoice_payment_method->get_extra_meta( 'pdf_instructions', TRUE ),
		);

		return str_replace($SearchValues, $ReplaceValues, $content);
	}

	public function espressoLoadData($items) {
		$lines = $items;
		$data = array();
		foreach ($lines as $line)
			$data[] = explode(';', chop($line));

		return $data;
	}



	public function espressoInvoiceTotals($text, $total_cost) {

		$html = '';
		if ($total_cost < 0) {
			$total_cost = (-1) * $total_cost;
		}
		$find = array( ' ' );
		$replace = array( '-' );
		$row_id = strtolower( str_replace( $find, $replace, $text ));
		$html .= '<tr id="'.$row_id.'-tr"><td colspan="4">&nbsp;</td>';
		$html .= '<td class="item_r">' . $text . '</td>';
		$html .= '<td class="item_r">' . $total_cost . '</td>';
		$html .= '</tr>';
		return $html;
	}

}
