<?php
function espresso_system_check() {
    return true;
}

if ( !function_exists( 'event_espresso_custom_questions_output' ) ){
    function event_espresso_custom_questions_output( $atts ) {
    global $wpdb;

     extract( $atts );
//Get the questions for the attendee

		$sql = "SELECT ea.answer, eq.question FROM " . EVENTS_ANSWER_TABLE . " ea ";
		$sql .= " LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id ";
		$sql .= " WHERE ea.attendee_id = '" . $attendee_id . "' ";
		$all_questions == TRUE ? '':$sql .= " AND system_name IS NULL ";
		$show_admin == TRUE ? '':$sql .= " AND eq.admin_only = 'N' ";
		$sql .= " ORDER BY eq.sequence asc ";
								
        $questions = $wpdb->get_results( $sql );
        //echo $wpdb->last_query . '<br />';

        $email_questions = '';
        $q_counter = 0;
        $q_num_rows = $wpdb->num_rows;
        if ( $q_num_rows > 0 )
        {
            
            foreach ( $questions as $question ) {
                $email_questions .= $question->answer != '' ? wpautop( '<strong>' . $question->question . ':</strong><br /> ' . str_replace( ',', '<br />', $question->answer ) ) : '';
                $q_counter++;
                if ( $q_counter == $q_num_rows )
                   return $email_questions;
            }
        }
        return $email_questions;
    }

}

if ( !function_exists( 'espresso_venue_dd' ) ){
	function espresso_venue_dd($current_value=0){
		global $espresso_premium; if ($espresso_premium != true) return;
		global $wpdb, $espresso_manager, $current_user;
        
        $sql = "(SELECT ev.*, el.name AS locale FROM " . EVENTS_VENUE_TABLE . " ev LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " lr ON lr.venue_id = ev.id LEFT JOIN " . EVENTS_LOCALE_TABLE . " el ON el.id = lr.locale_id ";
		
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_group_admin' ) ){
		if(	$espresso_manager['event_manager_venue'] == "Y" ){
			//	show only venues inside their assigned locales.
            $group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
            $group = unserialize($group);
			$sql .= " WHERE lr.locale_id IN (" . implode(",", $group) . ")";
			$sql .= ") UNION ( ";
			$sql .= "SELECT ev.*, el.name AS locale FROM ". EVENTS_VENUE_TABLE . " ev LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " lr ON lr.venue_id = ev.id LEFT JOIN " . EVENTS_LOCALE_TABLE . " el ON el.id = lr.locale_id ";
		}
	}
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin' ) ){
        $sql .= " JOIN $wpdb->users u on u.ID = ev.wp_user ";
		$is_user = true;
    }
	if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_group_admin' ) ){
		if(	$espresso_manager['event_manager_venue'] == "Y" ){
			$sql .= " WHERE lr.locale_id IN (" . implode(",", $group) . ")";
			$group_admin = true;
		}
	}
	if ($is_user == true && $group_admin == true){
		$sql .= " OR ev.wp_user = ".$current_user->ID ;
	}elseif($is_user == true){
		$sql .= " WHERE ev.wp_user = ".$current_user->ID ;
	}
	$sql .= " GROUP BY ev.id ";
    $sql .= ")";
        
		//echo $sql;
		$venues = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;


#		return "<pre>".print_r( $venues,true )."</pre>";
/*
            [id] => 3
            [name] => Home
            [identifier] => 
            [address] => 101-1414 Government Street
            [address2] => 
            [city] => Penticton
            [state] => BC
            [zip] => V2A 4W1
            [country] => Canada
            [meta] => a:6:{s:7:"contact";s:0:"";s:5:"phone";s:0:"";s:7:"twitter";s:0:"";s:5:"image";s:0:"";s:7:"website";s:0:"";s:11:"description";s:0:"";}
            [locale] => 
            [wp_user] => 0
*/
		//echo $current_value;
		if ($num_rows > 0) {
			$field = '<label>' . __('Select from Venue Manager list', 'event_espresso') . '</label>';
			$field .= '<select name="venue_id[]" id="venue_id">\n';
			$field .= '<option value="0">'.__('Select a Venue', 'event_espresso').'</option>';
			$div = "";
			$i = 0;
			foreach ($venues as $venue){
                
				$i++;
				$selected = $venue->id == $current_value ? 'selected="selected"' : '';
                if ($venue->locale != '') {
                    $field .= '<option rel="'.$i.'" '. $selected .' value="' . $venue->id .'">' . $venue->name . ' (' . $venue->locale . ') </option>\n';
                } else if ($venue->city != '' && $venue->state != '') {
                    $field .= '<option rel="'.$i.'" '. $selected .' value="' . $venue->id .'">' . $venue->name . ' (' . $venue->city. ', ' . $venue->state . ') </option>\n';
                } else if ($venue->state != '') {
                    $field .= '<option rel="'.$i.'" '. $selected .' value="' . $venue->id .'">' . $venue->name . ' (' . $venue->state . ') </option>\n';
                } else {
                    $field .= '<option rel="'.$i.'" '. $selected .' value="' . $venue->id .'">' . $venue->name . ' </option>\n';
                }
				
				$hidden = "display:none;";
				if( $selected ) $hidden = '';
				$div .= "<fieldset id='eebox_".$i."' class='eebox' style='".$hidden."'>";
				$div .= "<ul class='address-view'><li><p><span>Address:</span> ".$venue->address."</p>";
				$div .= "<p><span>Address 2:</span> ".$venue->address2."</p>";
				$div .= "<p><span>City:</span> ".$venue->city."</p>";
				$div .= "<p><span>State:</span> ".$venue->state."</p>";
				$div .= "<p><span>Zip:</span> ".$venue->zip."</p>";
				$div .= "<p><span>Country:</span> ".$venue->country."</p>";
				$div .= '<p><a href="admin.php?page=event_venues&action=edit&id='.$venue->id.'" target="_blank">'.__('Edit this venue', 'event_espresso').'</a> | <a class="ev_reg-fancylink" href="#venue_info">Shortcode</a></p></li></ul>';
				$div .= "</fieldset>";
			}
			$field .= "</select>";
			ob_start();
			echo '<div id="venue_info" style="display:none">';
			echo '<h2>'.__('Venue Shortcode', 'event_espresso').'</h2>';
			echo '<p>'.__('Add the following shortcode into the description to show the venue for this event.', 'event_espresso').'</p>';
			echo '<p>[ESPRESSO_VENUE]</p>';
			echo '<p>Example with Optional Parameters:<br />
			[ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]</p>';
			
			echo '<p><strong><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#venue_shortcode" target="_blank">More Examples</a></strong></p>';
			echo '</div>';
		
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
			$html = '<table><tr><td>' . $field .'</td></tr><tr><td>'.$div.'</td></tr></table>'.$js;
			return $html;
		}
	}
}

if ( !function_exists( 'espresso_personnel_cb' ) ){
	function espresso_personnel_cb($event_id = 0){
		global $espresso_premium; if ($espresso_premium != true) return;
		global $wpdb;
		$sql = "SELECT id, name, role, meta FROM " . EVENTS_PERSONNEL_TABLE;
		if (function_exists('espresso_member_data') ) {
			$wpdb->get_results("SELECT wp_user FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");
			$wp_user = $wpdb->last_result[0]->wp_user !='' ? $wpdb->last_result[0]->wp_user:espresso_member_data('id');
			$sql .= " WHERE ";
			if ($wp_user == 0 || $wp_user == 1){
				$sql .= " (wp_user = '0' OR wp_user = '1') ";
			}else{
				$sql .= " wp_user = '" . $wp_user ."' ";
			}
		}
		$event_personnel = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0){
			$html= '';
			foreach ($event_personnel as $person){
				$person_id = $person->id;
				$person_name = $person->name;
				$person_role = $person->role;
							
				$meta = unserialize($person->meta);
				$person_organization = $meta['organization']!=''? $meta['organization'] :'';
				//$person_title = $meta['title']!=''? $meta['title']:'';
				$person_info = $person_role!=''?' ['. $person_role . ']':'';
	
				$in_event_personnel = $wpdb->get_results("SELECT * FROM " . EVENTS_PERSONNEL_REL_TABLE . " WHERE event_id='".$event_id."' AND person_id='".$person_id."'");
				foreach ($in_event_personnel as $in_person){
					$in_event_person = $in_person->person_id;
				}
				
				$html .= '<p id="event-person-' . $person_id . '" class="event-staff-list"><label for="in-event-person-' . $person_id . '" class="selectit"><input value="' . $person_id . '" type="checkbox" name="event_person[]" id="in-event-person-' . $person_id . '"' . ($in_event_person == $person_id ? ' checked="checked"' : "" ) . '/> <a href="admin.php?page=event_staff&amp;action=edit&amp;id='.$person_id.'"  target="_blank" title="'.$person_organization.'">' . $person_name .'</a> '. $person_info.'</label></p>';
				
			}
			
			$top_div ='';
			$bottom_div ='';
		
			if ($num_rows > 10){
				$top_div = '<div style="height:250px;overflow:auto;">';
				$bottom_div = '</div>';
			}
			
			$manage = '<p><a href="admin.php?page=event_staff" target="_blank">'.__('Manage Staff Members', 'event_espresso').'</a> | <a class="ev_reg-fancylink" href="#staff_info">Shortcode</a> </p>';
			
			echo '<div id="staff_info" style="display:none">';
			echo '<h2>'.__('Staff Shortcode', 'event_espresso').'</h2>';
			echo '<p>'.__('Add the following shortcode into the description to show the staff for this event.', 'event_espresso').'</p>';
			echo '<p>[ESPRESSO_STAFF]</p>';
			echo '<p>Example with Optional Parameters:<br />
			[ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]</p>';
			
			echo '<p><strong><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#staff_shortcode" target="_blank">More Examples</a></strong></p>';
			echo '</div>';
			
			$html = $top_div.$html.$bottom_div.$manage;
			return $html;
				
		}else{
			return '<a href="admin.php?page=event_staff&amp;action=add_new_person">'.__('Please add at least one person.', 'event_espresso').'</a>';
		}
	}
}

if ( !function_exists( 'espresso_personnel_dd' ) ){
	function espresso_personnel_dd(){
		global $espresso_premium; if ($espresso_premium != true) return;
		global $wpdb;
			$sql = "SELECT name, title FROM EVENTS_PERSONNEL_TABLE ";//. EVENTS_DETAIL_TABLE;
			$sql .= " WHERE name != '' GROUP BY name ";
			
			$people = $wpdb->get_results($sql);
			$num_rows = $wpdb->num_rows;
			//return print_r( $events );
			if ($num_rows > 0) {
				$field = '<select name="event_primary_person id="event_primary_person">\n';
				$field .= '<option value="0">'.__('Select a Person', 'event_espresso').'</option>';
				
				foreach ($people as $person){
					$selected = $event->name == $current_value ? 'selected="selected"' : '';
					$meta = unserialize($person->meta);
					$title = $meta['title']!=''? ' (' . $meta['title'] . ')':'';
					$field .= '<option '. $selected .' value="' . $person->id .'">' . $person->name .  $title . '</option>\n';
				}
				$field .= "</select>";
				$html = '<p>' .__('Primary','event_espresso') . ': ' . $field .'</p>';
				return $html;
			}
	}
}
if (!function_exists('espresso_chart_display')){
	function espresso_chart_display($event_id, $type){
		global $wpdb, $org_options;
		$retVAl = array();
		switch ($type){
			case 'total_reg':
				//Total Registrations/Transactions
				$title = __('Total Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM ".EVENTS_ATTENDEE_TABLE." a WHERE event_id =".$event_id." GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
			break;
			
			case 'total_completed':
				//Completed Registrations/Transactions
				$title = __('Completed Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM ".EVENTS_ATTENDEE_TABLE." a WHERE event_id =".$event_id." AND payment_status='Completed' GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
			break;
			
			case 'total_pending':
				//Pending Registrations/Transactions
				$title = __('Pending Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM ".EVENTS_ATTENDEE_TABLE." a WHERE event_id =".$event_id." AND payment_status='Pending' GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
			break;
			
			case 'total_incomplete':
				//Incomplete Registrations/Transactions
				$title = __('Incomplete Registrations/Transactions', 'event_espresso');
				$sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM ".EVENTS_ATTENDEE_TABLE." a WHERE event_id =".$event_id." AND (payment_status='Incomplete' OR payment_status='Payment Declined') GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
			break;
		}
		
		$results = $wpdb->get_results($sql);
		if ($wpdb->num_rows == 0) {
			echo '<p class="red_alert">'.sprintf(__('%s results are missing for this event.', 'event_espresso'), $title).'</p>';
			return;
		}
		foreach ($results as $row) {
			$retVal[] = $row;
		}
	 
		$attendees = '';
		$amount ='';
		$date = '';
		foreach($retVal as $rec ){
			$amount .= $rec->amount.',';
			$date .= "'".$rec->date."', ";
			$attendees .= $rec->quantity.", ";
		}
	 //echo "<pre>".print_r($retVal,true)."</pre>";
	  ?>
		<script>
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
						label: '<?php echo $org_options['currency_symbol'] ?> <?php _e('Amount', 'event_espresso'); ?>',
						pointLabels: { formatString:'<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?>%.2f' },
					}],
					legend: {
						show: true,
						location: 'ne',     // compass direction, nw, n, ne, e, se, s, sw, w.
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

if (!function_exists('event_espresso_meta_edit')){
	function event_espresso_meta_edit($event_meta='') {
		global $wpdb, $org_options;
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		$good_meta = array();
		$hiddenmeta = array("", "venue_id", "additional_attendee_reg_info", "add_attendee_question_groups", "date_submitted", "event_host_terms", "default_payment_status");
		$meta_counter = 1;
		
		$default_meta = $event_meta==''?array("event_hashtag"=>"","event_format"=>"","event_livestreamed"=>""):array();
		$event_meta = $event_meta==''?array():$event_meta;
		$event_meta = array_merge($event_meta, $default_meta);
		//print_r( $event_meta );
		$good_meta = $event_meta;
		//print_r( $good_meta );
		?>
		<ul id="dynamicMetaInput">
			<?php
			if ($event_meta != '') {
				foreach ($event_meta as $k => $v) {
					?>
					<?php
					if (in_array($k, $hiddenmeta)) {
						//				echo "<input type='hidden' name='emeta[]' value='{$v}' />";
						unset($good_meta[$k]);
					} else {
						?>
						<li>
							<label><?php _e('Key: ', 'event_espresso'); ?></label> <select id="emeta[]" name="emeta[]">
					<?php foreach ($good_meta as $k2 => $v2) { ?>
									<option value="<?php echo $k2; ?>" <?php echo ($k2 == $k ? "SELECTED" : null); ?>><?php echo $k2; ?></option>
								<?php } ?>
							</select>
							<label for="meta-value"><?php _e('Value: ', 'event_espresso'); ?></label> <input  size="20" type="text" value="<?php echo $v; ?>" name="emetad[]" id="emetad[]" />
						<?php
						echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_regis') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />';
						?>
						</li>
						<?php
						$meta_counter++;
					}
					?>
				<?php }
				echo '<li><label for="emeta-box">' . __('Key: ', 'event_espresso'); ?></label><input id="emeta-box" size="20" type="text" value="" name="emeta[]" id="emeta[]"> <label for="emetaad[]"><?php _e('Value: ', 'event_espresso'); ?> </label><input size="20" type="text" value="" name="emetad[]" id="emetad[]"><?php
			echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_regis') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />' . '</li>';
		} else {
			echo '<li for="emeta-box"><label for="emeta[]">' . __('Key: ', 'event_espresso');
			?></label> <input size="20" type="text" value="" name="emeta[]" id="emeta[]"> <?php _e('Value: ', 'event_espresso'); ?><input size="20" type="text" value="" name="emetad[]" id="emetad[]"><?php
			echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_regis') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />' . '</li>';
			// $meta_counter++;
		}
		?>
		</ul>
	
		<p><input type="button" class="button" value="<?php _e('Add A Meta Box', 'event_espresso'); ?>" onClick="addMetaInput('dynamicMetaInput');"></p>
	
		<script type="text/javascript">
			//Dynamic form fields
			var meta_counter = <?php echo $meta_counter > 1 ? $meta_counter - 1 : $meta_counter++; ?>;
			function addMetaInput(divName){
				var next_counter = counter_staticm(meta_counter);
				var newdiv = document.createElement('li');
				newdiv.innerHTML = "<?php _e('Key:', 'event_espresso'); ?><input size='20' type='text' value='' name='emeta[]' id='emeta[]'>&nbsp;<?php _e('Value:', 'event_espresso'); ?><input size='20' type='text' value='' name='emetad[]' id='emetad[]'><?php echo '<img class=\"remove-item\" title=\"' . __('Remove this meta box', 'event_regis') . '\" onclick=\"this.parentNode.parentNode.removeChild(this.parentNode);\" src=\"' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif\" alt=\"' . __('Remove Meta', 'event_espresso') . '\" />'; ?>";
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