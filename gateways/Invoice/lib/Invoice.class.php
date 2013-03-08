<?php

//Creates the invoice pdf
class Invoice {

	private $registration;
	private $transaction;
	private $session_data;
	private $invoice_settings;

	public function __construct($url_link = 0) {
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
		$REG = EEM_Registration::instance();
		$TXN = EEM_Transaction::instance();
		if ( $this->registration = $REG->get_registration(array('REG_url_link' => $url_link))) {
			$this->transaction = $TXN->get_transaction($this->registration->transaction_ID());
			$this->session_data = $this->transaction->session_data();
			$this->invoice_settings = $this->session_data['gateway_data']['payment_settings']['Invoice'];
		} else {
			echo "error message";
		}

	}

	public function send_invoice( $download = FALSE ) {
		global $org_options;
//printr($this->registration);
//printr($this->transaction);
//printr($this->session_data);
//printr($this->invoice_settings);
//exit;
		$template_args = array();

		$theme = ( isset( $_REQUEST['theme'] ) && $_REQUEST['theme'] > 0 && $_REQUEST['theme'] < 8 ) ? absint( $_REQUEST['theme'] ) : 1;		
		$themes = array(
										1 => "simple.css",
										2 => "bauhaus.css",
										3 => "ejs.css",
										4 => "horizon.css", 
										5 => "lola.css",
										6 => "tranquility.css",
										7 => "union.css"
									);
		$this->invoice_settings['invoice_css'] = $themes[ $theme ];
		//echo '<h1>invoice_css : ' . $this->invoice_settings['invoice_css'] . '</h1>';

		//Get the CSS file
		if (!empty($this->invoice_settings['invoice_css'])) {
			$template_args['invoice_css'] = $this->invoice_settings['invoice_css'];
		} else {
			$template_args['invoice_css'] = 'simple.css';
		}

		//Create the logo
/*		if (!empty($this->invoice_settings['invoice_logo_url'])) {
			$invoice_logo_url = $this->invoice_settings['invoice_logo_url'];
		} else {
			$invoice_logo_url = $org_options['default_logo_url'];
		}
		if (!empty($invoice_logo_url)) {
			$image_size = getimagesize($invoice_logo_url);
			$template_args['invoice_logo_image'] = '<img class="logo screen" src="' . $invoice_logo_url . '" ' . $image_size[3] . ' alt="logo" /> ';
		} else {
			$template_args['invoice_logo_image'] = '';
		}*/

		if (is_dir(EVENT_ESPRESSO_GATEWAY_DIR . '/invoice')) {
			$template_args['base_url'] = EVENT_ESPRESSO_GATEWAY_URL . 'invoice/lib/templates/';
		} else {
			$template_args['base_url'] = EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/invoice/lib/templates/';
		}
		
		$template_args['organization'] = stripslashes_deep($org_options['organization']);
		$template_args['street'] = empty($org_options['organization_street2']) ? $org_options['organization_street1'] : $org_options['organization_street1'] . '<br>' . $org_options['organization_street2'];
		$template_args['city'] = $org_options['organization_city'];
		$template_args['state'] = $org_options['organization_state'];
		$template_args['zip'] = $org_options['organization_zip'];
		$template_args['email'] = $org_options['contact_email'];
		$template_args['download_link'] = home_url() . '/?invoice_launch=true&amp;id=' . $this->registration->reg_url_link();
		$template_args['registration_code'] = $this->registration->reg_code();
		$template_args['registration_date'] = date_i18n(get_option('date_format'), $this->registration->date());
		$template_args['name'] = stripslashes_deep($this->session_data['primary_attendee']['fname'] . ' ' . $this->session_data['primary_attendee']['lname']);
		$attendee = $this->session_data['cart']['REG']['items'][$this->session_data['primary_attendee']['line_item_id']]['attendees']['1'];
		$template_args['attendee_address'] = empty($attendee['address']) ? '' : stripslashes_deep($attendee['address']);
		$template_args['attendee_address'] = empty($attendee['address2']) ? $template_args['attendee_address'] : $template_args['attendee_address'] . '<br/>' . stripslashes_deep($attendee['address2']);
		$template_args['attendee_city'] = empty($attendee['city']) ? '' : stripslashes_deep($attendee['city']);
		$template_args['attendee_state'] = empty($attendee['state']) ? '' : stripslashes_deep($attendee['state']);
		$template_args['attendee_zip'] = empty($attendee['zip']) ? '' : stripslashes_deep($attendee['zip']);
		
		$template_args['ship_name'] = $template_args['name'];
		$template_args['ship_address'] = $template_args['attendee_address'];
		$template_args['ship_city'] = $template_args['attendee_city'];
		$template_args['ship_state'] = $template_args['attendee_state'];
		$template_args['ship_zip'] = $template_args['attendee_zip'];
		
		$template_args['total_cost'] = $this->transaction->total();
		$template_args['amount_pd'] = $this->transaction->paid();
		
		if ($template_args['amount_pd'] != $template_args['total_cost']) {
			$template_args['net_total'] = $this->espressoInvoiceTotals( __('SubTotal', 'event_espresso'), $this->session_data['cart']['REG']['sub_total']);
			foreach ($this->session_data['taxes'] as $tax) {
				$template_args['net_total'] .= $this->espressoInvoiceTotals( $tax['name'], $tax['amount']);
			}
						
			$difference = $template_args['amount_pd'] - $template_args['total_cost'];
			if ($difference < 0) {
				$text = __('Discount', 'event_espresso');
			} else {
				$text = __('Extra', 'event_espresso');
			}
			$template_args['discount'] = $this->espressoInvoiceTotals( $text, $difference );
		}
		
		$template_args['currency_symbol'] = $org_options['currency_symbol'];
		$template_args['table_output'] = $this->espressoImprovedTable();
		$template_args['pdf_instructions'] = wpautop(stripslashes_deep(html_entity_decode($this->invoice_settings['pdf_instructions'], ENT_QUOTES)));

		//Get the HTML as an object
		$template_header = espresso_display_template( dirname(__FILE__) . '/templates/invoice_header.template.php', $template_args, TRUE );
		$template_body = espresso_display_template( dirname(__FILE__) . '/templates/invoice_body.template.php', $template_args, TRUE );
		$template_footer = espresso_display_template( dirname(__FILE__) . '/templates/invoice_footer.template.php', $template_args, TRUE );
		
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
		define('DOMPDF_ENABLE_REMOTE', TRUE);
		define('DOMPDF_ENABLE_JAVASCRIPT', FALSE);
		define('DOMPDF_ENABLE_CSS_FLOAT', TRUE);
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . '/tpc/dompdf/dompdf_config.inc.php');
		$dompdf = new DOMPDF();
		$dompdf->load_html($content);
		$dompdf->render();		
		$dompdf->stream($invoice_name . ".pdf", array( 'Attachment' => $download ));
		exit(0);
	}

//Perform the shortcode replacement
	function espresso_replace_invoice_shortcodes( $content ) {
		global $org_options;
		//Create the logo
		if (!empty($this->invoice_settings['invoice_logo_url'])) {
			$invoice_logo_url = $this->invoice_settings['invoice_logo_url'];
		} else {
			$invoice_logo_url = $org_options['default_logo_url'];
		}
		if (!empty($invoice_logo_url)) {
			$image_size = getimagesize($invoice_logo_url);
			$invoice_logo_image = '<img class="logo screen" src="' . $invoice_logo_url . '" ' . $image_size[3] . ' alt="logo" /> ';
		} else {
			$invoice_logo_image = '';
		}
		$SearchValues = array(
				"[organization]",
				"[registration_code]",
				"[name]",
				"[base_url]",
				"[download_link]",
				"[invoice_logo_image]",
				"[street]",
				"[city]",
				"[state]",
				"[zip]",
				"[email]",
				"[registration_date]"
		);

		$ReplaceValues = array(
				stripslashes_deep($org_options['organization']),
				$this->registration->reg_code(),
				stripslashes_deep($this->session_data['primary_attendee']['fname'] . ' ' . $this->session_data['primary_attendee']['lname']),
				(is_dir(EVENT_ESPRESSO_GATEWAY_DIR . '/invoice')) ? EVENT_ESPRESSO_GATEWAY_URL . 'invoice/lib/templates/' : EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/invoice/lib/templates/',
				home_url() . '/?download_invoice=true&amp;id=' . $this->registration->reg_url_link(),
				$invoice_logo_image,
				empty($org_options['organization_street2']) ? $org_options['organization_street1'] : $org_options['organization_street1'] . '<br>' . $org_options['organization_street2'],
				$org_options['organization_city'],
				$org_options['organization_state'],
				$org_options['organization_zip'],
				$org_options['contact_email'],
				date_i18n(get_option('date_format'), $this->registration->date())
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

	public function espressoImprovedTable() {
		global $org_options;
		$html = '';
		$c = false;
//		echo '<div style="font-size:1.5em">';
//		printr( $this->session_data['cart']['REG']['items'], 'items' );
//		echo '</div>';
		//Data
		foreach ($this->session_data['cart']['REG']['items'] as $line_item ) {
			//printr( $line_item, '$line_item  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			foreach ( $line_item['attendees'] as $attendee) {
				$html .= '<tr class="item ' . (($c = !$c) ? ' odd' : '') . '">';
				$html .= '<td class="item_l">1</td>';
				$html .= '<td class="item_l">' . $line_item['name'] . '</td>';
				$html .= '<td class="item_l">' . $line_item['options']['price_desc'] . '</td>';
				$html .= '<td class="item_l">' . $line_item['options']['date'] . ' @ ' . $line_item['options']['time'] . '</td>';
				$html .= '<td class="item_l">' . $attendee[1] . ' ' . $attendee[1] . '</td>';
				$html .= '<td class="item_r"><span class="crncy-sign">' . $org_options['currency_symbol'] . '</span>' . $attendee['price_paid'] . '</td>';
				$html .= '</tr>';
			}
		}
		return $html;
	}

	public function espressoInvoiceTotals($text, $total_cost) {
		global $org_options;
		$html = '';
		$minus = '';
		if ($total_cost < 0) {
			$minus = '-';
			$total_cost = (-1) * $total_cost;
		}
		$find = array( ' ' );
		$replace = array( '-' );
		$row_id = strtolower( str_replace( $find, $replace, $text ));
		$html .= '<tr id="'.$row_id.'-tr"><td colspan="4">&nbsp;</td>';
		$html .= '<td class="item_r">' . $text . '</td>';
		$html .= '<td class="item_r"><span class="crncy-sign">' . $org_options['currency_symbol'] . '</span>' . $minus . number_format($total_cost, 2, '.', '') . '</td>';
		$html .= '</tr>';
		return $html;
	}

}
