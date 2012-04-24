<?php
if (!function_exists('espresso_venue_dd')) {

	function espresso_venue_dd($current_value = 0) {
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		global $wpdb, $espresso_manager, $espresso_wp_user;

		$WHERE = " WHERE ";
		$sql = "SELECT ev.*, el.name AS locale FROM " . EVENTS_VENUE_TABLE . " ev ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " lr ON lr.venue_id = ev.id ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_TABLE . " el ON el.id = lr.locale_id ";

		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_group_admin' )) {
			if ($espresso_manager['event_manager_venue']) {
				//show only venues inside their assigned locales.
				$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
				$group = unserialize($group);
				$sql .= " $WHERE lr.locale_id IN (" . implode(",", $group) . ")";
				$sql .= " OR ev.wp_user = " . $espresso_wp_user;
				$WHERE = " AND ";
			}
		}
		$sql .= " GROUP BY ev.id ORDER by name";

		$venues = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			$field = '<label>' . __('Select from Venue Manager list', 'event_espresso') . '</label>';
			$field .= '<select name="venue_id[]" id="venue_id" class="chzn-select"  >\n';
			$field .= '<option value="0">' . __('Select a Venue', 'event_espresso') . '</option>';
			$div = "";
			$help_div = "";
			$i = 0;
			foreach ($venues as $venue) {

				$i++;
				$selected = $venue->id == $current_value ? 'selected="selected"' : '';
				if ($venue->locale != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->locale) . ') </option>\n';
				} else if ($venue->city != '' && $venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->city) . ', ' . stripslashes_deep($venue->state) . ') </option>\n';
				} else if ($venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->state) . ') </option>\n';
				} else {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' </option>\n';
				}

				$hidden = "display:none;";
				if ($selected)
					$hidden = '';
				$div .= "
	<fieldset id='eebox_" . $i . "' class='eebox' style='" . $hidden . "'>
		<ul class='address-view'>
			<li>
				<p><span>Address:</span> " . stripslashes($venue->address) . "<br/>
				<span></span> " . stripslashes($venue->address2) . "<br/>
				<span>City:</span> " . stripslashes($venue->city) . "<br/>
				<span>State:</span> " . stripslashes($venue->state) . "<br/>
				<span>Zip:</span> " . stripslashes($venue->zip) . "<br/>
				<span>Country:</span> " . stripslashes($venue->country) . "<br/>
				<span>Venue ID:</span> " . $venue->id . "<br/></p>
				This venues shortcode <b class='highlight'>[ESPRESSO_VENUE id='" . $venue->id . "']</b><br/>";
				$div .= '<a href="admin.php?page=event_venues&action=edit&id=' . $venue->id . '" target="_blank">' . __('Edit this venue', 'event_espresso') . '</a> | <a class="thickbox link" href="#TB_inline?height=300&width=400&inlineId=venue_info">Shortcode</a></li></ul>';
				$div .= "</fieldset>";
			}
			$field .= "</select>";
			$help_div .= '<div id="venue_info" style="display:none">';
			$help_div .= '<div class="TB-ee-frame">';
			$help_div .= '<h2>' . __('Venue Shortcode', 'event_espresso') . '</h2>';
			$help_div .= '<p>' . __('Add the following shortcode into the description to show the venue for this event.', 'event_espresso') . '<br/>';
			$help_div .= '[ESPRESSO_VENUE]<br/>';
			$help_div .=  __('To use this venue in a page or post. Use the following shortcode.', 'event_espresso') . '<br/>';
			$help_div .= '[ESPRESSO_VENUE id="selected_venue_id"]</p>';
			$help_div .= '<p>Example with Optional Parameters:<br />[ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]</p>';
			$help_div .= '<p><strong><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#venue_shortcode" target="_blank">More Examples</a></strong></p>';
			$help_div .= '</div>';
			$help_div .= '</div>';
			ob_start();
			?>
			<script>
				jQuery("#venue_id").change( function(){
					var selected = jQuery("#venue_id option:selected");
					var rel = selected.attr("rel");
					jQuery(".eebox").hide();
					jQuery("#eebox_"+rel).show();
				});
			</script>
			<?php
			$js = ob_get_contents();
			ob_end_clean();
			$html = '<table><tr><td>' . $field . '</td></tr><tr><td>' . $div . '</td></tr></table>' . $help_div . $js;
			return $html;
		}
	}

}

function espresso_email_dd($type = 'all', $id = NULL) {
	global $wpdb;
	switch ($type) {
		case 'confirmation':
		case 'payment':
			$emails = $wpdb->get_results("SELECT * FROM " . EVENTS_EMAIL_TABLE . " WHERE email_type='" . $type . "' ORDER BY id", OBJECT_K);
			break;
		case 'all':
			$emails = $wpdb->get_results("SELECT * FROM " . EVENTS_EMAIL_TABLE . " ORDER BY id", OBJECT_K);
			break;
	}
	$num_rows = $wpdb->num_rows;
	$field = '';
	if ($num_rows > 0) {
		if (empty($id))
			$id = $emails[key($emails)]->id;
		$field = '<label>' . __('Select from Email Manager list', 'event_espresso') . '</label>';
		$field .= '<select name="' . $type . '_email_id" id="email_id" class="chzn-select"  >\n';
		foreach ($emails as $key => $email) {
			$selected = ($id == $email->id) ? 'selected="selected"' : '';
			$field .= '<option rel="' . $key . '" ' . $selected . ' value="' . $email->id . '">' . stripslashes_deep($email->email_name) . ' </option>\n';
		}
		$field .= "</select>";
	}
	return $field;
}

if (!function_exists('espresso_personnel_cb')) {

	function espresso_personnel_cb($event_id = 0, $orig_user = 0, $orig_event_staff = 0) {
		global $wpdb;
		if ($orig_event_staff != 0) {
			//print_r( $orig_event_staff );
			$p_id = '';
			foreach ($orig_event_staff as $k => $v) {
				$p_id .= "'" . $v . "',";
			}
			$p_id = rtrim($p_id, ",");
		}
		if ($event_id != 0) {
			$sql = "SELECT id, name, role, meta FROM " . EVENTS_PERSONNEL_TABLE;
			if (function_exists('espresso_member_data')) {
				$wpdb->get_results("SELECT wp_user FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");
				$wp_user = $wpdb->last_result[0]->wp_user != '' ? $wpdb->last_result[0]->wp_user : espresso_member_data('id');
				$sql .= " WHERE ";
				$sql .= "(";
				if ($wp_user == 0 || $wp_user == 1) {
					$sql .= " (wp_user = '0' OR wp_user = '1') ";
				} else {

					$sql .= " wp_user = '" . $wp_user . "' ";
					if ($orig_user != 0) {
						$sql .= " OR wp_user = '" . $orig_user . "' ";
					}
				}
				if ($orig_event_staff != 0) {
					$sql .= " OR id IN (" . $p_id . ") ";
				}
				$sql .= ")";
			}
			//echo $sql;
			$event_personnel = $wpdb->get_results($sql);
			$num_rows = $wpdb->num_rows;
		} else
			$num_rows = 0;
		if ($num_rows > 0) {
			$html = '';
			foreach ($event_personnel as $person) {
				$person_id = $person->id;
				$person_name = $person->name;
				$person_role = $person->role;

				$meta = unserialize($person->meta);
				$person_organization = (isset($meta['organization']) && $meta['organization'] != '') ? $meta['organization'] : '';
				//$person_title = $meta['title']!=''? $meta['title']:'';
				$person_info = (isset($person_role) && $person_role != '') ? ' [' . $person_role . ']' : '';

				$in_event_personnel = $wpdb->get_results("SELECT * FROM " . EVENTS_PERSONNEL_REL_TABLE . " WHERE event_id='" . $event_id . "' AND person_id='" . $person_id . "'");
				$in_event_person = '';
				foreach ($in_event_personnel as $in_person) {
					$in_event_person = $in_person->person_id;
				}

				$html .= '<p id="event-person-' . $person_id . '" class="event-staff-list"><label for="in-event-person-' . $person_id . '" class="selectit"><input value="' . $person_id . '" type="checkbox" name="event_person[]" id="in-event-person-' . $person_id . '"' . ($in_event_person == $person_id ? ' checked="checked"' : "" ) . '/> <a href="admin.php?page=event_staff&amp;action=edit&amp;id=' . $person_id . '"  target="_blank" title="' . $person_organization . '">' . $person_name . '</a> ' . $person_info . '</label></p>';
			}

			$top_div = '';
			$bottom_div = '';

			if ($num_rows > 10) {
				$top_div = '<div style="height:250px;overflow:auto;">';
				$bottom_div = '</div>';
			}

			$manage = '<p><a href="admin.php?page=event_staff" target="_blank">' . __('Manage Staff Members', 'event_espresso') . '</a> | <a class="thickbox link" href="#TB_inline?height=300&width=400&inlineId=staff_info">Shortcode</a> </p>';

			echo '<div id="staff_info" style="display:none">';
			echo '<div class="TB-ee-frame">';
			echo '<h2>' . __('Staff Shortcode', 'event_espresso') . '</h2>';
			echo '<p>' . __('Add the following shortcode into the description to show the staff for this event.', 'event_espresso') . '</p>';
			echo '<p>[ESPRESSO_STAFF]</p>';
			echo '<p>Example with Optional Parameters:<br />
			[ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]</p>';

			echo '<p><strong><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#staff_shortcode" target="_blank">More Examples</a></strong></p>';
			echo '</div>';
			echo '</div>';

			$html = $top_div . $html . $bottom_div . $manage;
			return $html;
		} else {
			return '<a href="admin.php?page=event_staff&amp;action=add_new_person">' . __('Please add at least one person.', 'event_espresso') . '</a>';
		}
	}

}

if (!function_exists('espresso_personnel_dd')) {

	function espresso_personnel_dd() {
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		global $wpdb;
		$sql = "SELECT name, title FROM EVENTS_PERSONNEL_TABLE "; //. EVENTS_DETAIL_TABLE;
		$sql .= " WHERE name != '' GROUP BY name ";

		$people = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		//return print_r( $events );
		if ($num_rows > 0) {
			$field = '<select name="event_primary_person id="event_primary_person">\n';
			$field .= '<option value="0">' . __('Select a Person', 'event_espresso') . '</option>';

			foreach ($people as $person) {
				$selected = $event->name == $current_value ? 'selected="selected"' : '';
				$meta = unserialize($person->meta);
				$title = $meta['title'] != '' ? ' (' . $meta['title'] . ')' : '';
				$field .= '<option ' . $selected . ' value="' . $person->id . '">' . $person->name . $title . '</option>\n';
			}
			$field .= "</select>";
			$html = '<p>' . __('Primary', 'event_espresso') . ': ' . $field . '</p>';
			return $html;
		}
	}

}
if (!function_exists('espresso_chart_display')) {

	function espresso_chart_display($event_id, $type) {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$retVAl = array();
		switch ($type) {
			case 'total_reg':
				//Total Registrations/Transactions
				$title = __('Total Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM " . EVENTS_ATTENDEE_TABLE . " a WHERE event_id =" . $event_id . " GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
				break;

			case 'total_completed':
				//Completed Registrations/Transactions
				$title = __('Completed Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM " . EVENTS_ATTENDEE_TABLE . " a WHERE event_id =" . $event_id . " AND payment_status='Completed' GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
				break;

			case 'total_pending':
				//Pending Registrations/Transactions
				$title = __('Pending Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM " . EVENTS_ATTENDEE_TABLE . " a WHERE event_id =" . $event_id . " AND payment_status='Pending' GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
				break;

			case 'total_incomplete':
				//Incomplete Registrations/Transactions
				$title = __('Incomplete Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM " . EVENTS_ATTENDEE_TABLE . " a WHERE event_id =" . $event_id . " AND (payment_status='Incomplete' OR payment_status='Payment Declined') GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
				break;
		}

		$results = $wpdb->get_results($sql);
		if ($wpdb->num_rows > 0) {

			foreach ($results as $row) {
				$retVal[] = $row;
			}

			$attendees = '';
			$amount = '';
			$date = '';
			foreach ($retVal as $rec) {
				$amount .= $rec->amount . ',';
				$date .= "'" . $rec->date . "', ";
				$attendees .= $rec->quantity . ", ";
			}
			//echo "<pre>".print_r($retVal,true)."</pre>";
			?>
			<script type="text/javascript">
				jQuery(document).ready(function() {
					var line1 = [<?php echo $attendees ?>];//bottom column
					var line2 = [<?php echo $amount ?>];
					var ticks = [<?php echo $date ?>];

					plot1 = jQuery.jqplot('<?php echo $type; ?>', [line1, line2], {
						//stackSeries: true,
						title: '<?php echo $title; ?>',
						seriesDefaults:{
							renderer:jQuery.jqplot.BarRenderer,
							pointLabels: { show: true },
						},
						axes: {
							xaxis: {
								renderer: jQuery.jqplot.CategoryAxisRenderer,
								ticks: ticks
							}
						},
						series: [{
								label: '# Attendees'
							},
							{
								label: '<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?> <?php _e('Amount', 'event_espresso'); ?>',
								pointLabels: { formatString:'<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?>%.2f' },
							}],
						legend: {
							show: true,
							location: 'ne',	 // compass direction, nw, n, ne, e, se, s, sw, w.
							placement: 'outsideGrid'

						},

					});

				});
			</script>
			<!-- <?php echo $title; ?> -->

			<div id="<?php echo $type; ?>" style="margin-top:20px; margin-left:20px; width:600px; height:200px; float:left;"></div>
			<?php
		}
	}

}

if (!function_exists('event_espresso_meta_edit')) {

	function event_espresso_meta_edit($event_meta = '') {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		$good_meta = array();
		$hiddenmeta = array("", "venue_id", "additional_attendee_reg_info", "add_attendee_question_groups", "date_submitted", "event_host_terms", "default_payment_status", "display_thumb_in_lists", "display_thumb_in_regpage", "display_thumb_in_calendar", "event_thumbnail_url", "originally_submitted_by", "enable_for_gmap", "orig_event_staff");
		$meta_counter = 1;

		$default_event_meta = array();
		$default_event_meta = apply_filters('filter_hook_espresso_filter_default_event_meta', $default_event_meta);

		$default_meta = $event_meta == '' ? $default_event_meta : array();
		$event_meta = $event_meta == '' ? array() : $event_meta;
		$event_meta = array_merge($event_meta, $default_meta);
		//print_r( $event_meta );
		$good_meta = $event_meta;
		//print_r( $good_meta );
		?>
		<p>
			<?php _e('Using Event Meta boxes', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'event-meta-boxes'); ?>
		<ul id="dynamicMetaInput">
			<?php
			if ($event_meta != '') {
				foreach ($event_meta as $k => $v) {
					?>
					<?php
					if (in_array($k, $hiddenmeta)) {
						//echo "<input type='hidden' name='emeta[]' value='{$v}' />";
						unset($good_meta[$k]);
					} else {
						?>
						<li>
							<label>
					<?php _e('Key', 'event_espresso'); ?>
							</label>
							<select id="emeta[]" name="emeta[]">
								<?php foreach ($good_meta as $k2 => $v2) { ?>
									<option value="<?php echo $k2; ?>" <?php echo ($k2 == $k ? "SELECTED" : null); ?>><?php echo $k2; ?></option>
					<?php } ?>
							</select>
							<label for="meta-value">
					<?php _e('Value', 'event_espresso'); ?>
							</label>
							<input  size="20" type="text" value="<?php echo $v; ?>" name="emetad[]" id="emetad[]" />
							<?php
							echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />';
							?>
						</li>
						<?php
						$meta_counter++;
					}
					?>
					<?php
				}
				echo '<li><label for="emeta-box">' . __('Key', 'event_espresso');
				?>
			</label>
			<input id="emeta-box" size="20" type="text" value="" name="emeta[]" >
			<label for="emetaad[]">
			<?php _e('Value', 'event_espresso'); ?>
			</label>
			<input size="20" type="text" value="" name="emetad[]" id="emetad[]">
			<?php
			echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />' . '</li>';
		} else {
			echo '<li><label for="emeta[]">' . __('Key', 'event_espresso');
			?>
			</label>
			<input size="20" type="text" value="" name="emeta[]" id="emeta[]">
			<?php _e('Value', 'event_espresso'); ?>
			<input size="20" type="text" value="" name="emetad[]" id="emetad[]">
			<?php
			echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />' . '</li>';
			// $meta_counter++;
		}
		?>
		</ul>
		<p>
			<input type="button" class="button" value="<?php _e('Add A Meta Box', 'event_espresso'); ?>" onClick="addMetaInput('dynamicMetaInput');">
		</p>
		<script type="text/javascript">
			//Dynamic form fields
			var meta_counter = <?php echo $meta_counter > 1 ? $meta_counter - 1 : $meta_counter++; ?>;
			function addMetaInput(divName){
				var next_counter = counter_staticm(meta_counter);
				var newdiv = document.createElement('li');
				newdiv.innerHTML = "<label><?php _e('Key', 'event_espresso'); ?></label> <input size='20' type='text' value='' name='emeta[]' id='emeta[]'> <label><?php _e('Value', 'event_espresso'); ?></label> <input size='20' type='text' value='' name='emetad[]' id='emetad[]'><?php echo ' <img class=\"remove-item\" title=\"' . __('Remove this meta box', 'event_espresso') . '\" onclick=\"this.parentNode.parentNode.removeChild(this.parentNode);\" src=\"' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif\" alt=\"' . __('Remove Meta', 'event_espresso') . '\" />'; ?>";
				document.getElementById(divName).appendChild(newdiv);
				counter++;
			}

			function counter_staticm(meta_counter) {
				if ( typeof counter_static.counter == 'undefined' ) {

					counter_static.counter = meta_counter;
				}
				return ++counter_static.counter;
			}
		</script>
		<?php
	}

}

function espresso_attendee_counts() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	//Dates
	$curdate = date("Y-m-d");
	$pieces = explode('-', $curdate, 3);
	$this_year_r = $pieces[0];
	$this_month_r = $pieces[1];
	$days_this_month = date('t', strtotime($curdate));

	$html = '';
	$sql_clause = " WHERE ";

	$sql = "SELECT SUM(ac.cost) cost, SUM(ac.quantity) total_count FROM " . EVENTS_ATTENDEE_TABLE . " a ";
	$sql .= " LEFT JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id=a.event_id ";
	if (!empty($_REQUEST['category_id'])) {
		$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
		$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
	}
	$sql .= " JOIN " . EVENTS_ATTENDEE_COST_TABLE . " ac on ac.attendee_id = a.id ";

	if (!empty($_REQUEST['category_id'])) {
		$sql .= " $sql_clause c.id = '" . $_REQUEST['category_id'] . "' ";
		$sql_clause = " AND ";
	}
	if (!empty($_REQUEST['payment_status'])) {
		$sql .= " $sql_clause a.payment_status = '" . $_REQUEST['payment_status'] . "' ";
		$sql_clause = " AND ";
	}
	if (!empty($_REQUEST['month_range'])) {
		$pieces = explode('-', $_REQUEST['month_range'], 3);
		$year_r = $pieces[0];
		$month_r = $pieces[1];
		$sql .= " $sql_clause a.date BETWEEN '" . event_espresso_no_format_date($year_r . '-' . $month_r . '-01', $format = 'Y-m-d') . "' AND '" . event_espresso_no_format_date($year_r . '-' . $month_r . '-31', $format = 'Y-m-d') . "' ";
		$sql_clause = " AND ";
	}
	if (!empty($_REQUEST['event_id'])) {
		$sql .= " $sql_clause a.event_id = '" . $_REQUEST['event_id'] . "' ";
		$sql_clause = " AND ";
	}
	if (!empty($_REQUEST['today_a'])) {
		//$sql_a .= " $sql_clause a.date = '" . event_espresso_no_format_date($curdate,$format = 'Y-m-d') ."' ";
		$sql .= " $sql_clause a.date BETWEEN '" . $curdate . ' 00:00:00' . "' AND '" . $curdate . ' 23:59:59' . "' ";
		$sql_clause = " AND ";
	}
	if (!empty($_REQUEST['this_month_a'])) {
		$sql .= " $sql_clause a.date BETWEEN '" . event_espresso_no_format_date($this_year_r . '-' . $this_month_r . '-01', $format = 'Y-m-d') . "' AND '" . event_espresso_no_format_date($this_year_r . '-' . $this_month_r . '-' . $days_this_month, $format = 'Y-m-d') . "' ";
		$sql_clause = " AND ";
	}
	$sql .= " $sql_clause e.event_status != 'D' ";
	$data->attendee = $wpdb->get_row($sql, OBJECT);
	//echo $sql;

	$data->attendee->total_count = $data->attendee->total_count == NULL ? 0 : $data->attendee->total_count;
	$data->attendee->cost = $data->attendee->cost == NULL ? 0.00 : $data->attendee->cost;

	$html .= '<p class="attendee_counts">';
	$html .= '<strong>' . __('Total Registrations:', 'event_espresso') . '</strong> ' . $data->attendee->total_count;
	$html .= ' | ';
	$html .= '<strong>' . __('Total Revenue:', 'event_espresso') . '</strong> ' . utf8_encode(html_entity_decode($org_options['currency_symbol'])) . $data->attendee->cost;
	$html .= '</p>';
	return $html;
}

if (!function_exists('espresso_featured_image_event_admin')) {

	function espresso_featured_image_event_admin($event_meta = '') {
		global $espresso_premium;
		?>
		<!-- Add thumbnail image -->
		<div id="set-featured-image" class="postbox closed">
			<div class="handlediv" title="Click to toggle"><br />
			</div>
			<h3 class="hndle"> <span>
		<?php _e('Featured Image', 'event_espresso'); ?>
				</span> </h3>

		</div>
		<!-- /Add thumbnail image -->
		<?php
	}

}
