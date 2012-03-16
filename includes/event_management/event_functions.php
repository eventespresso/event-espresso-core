<?php

function event_espresso_timereg_editor($event_id = 0) {
	global $wpdb;
	$time_counter = 1;
	?>

	<ul id="staticTimeInput">

		<?php
		if ($event_id > 0) {
			$timesx = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");
			foreach ($timesx as $timex) {
				echo '<li><p><label for="add-reg-start">' . __('Reg Start Time', 'event_espresso') . '</label> <input size="10"  type="text" id="add-reg-start" name="registration_startT" value="' . event_date_display($timex->registration_startT, get_option('time_format')) . '" /></p><p> <label for="ad-reg-end"> ' . __('Reg End Time', 'event_espresso') . ' </label><input size="10"  type="text" name="registration_endT" value="' . event_date_display($timex->registration_endT, get_option('time_format')) . '"></p></li>';
			}
		} else {
			?>
			<li>
				<p><label for="add-reg-start"><?php _e('Reg Start Time', 'event_espresso'); ?></label> <input size="10"  type="text" id="add-reg-start" name="registration_startT" /></p>
				<p><label for="registration_endT"> <?php _e('Reg End Time', 'event_espresso'); ?></label> <input size="10"  type="text" id="registration_endT" name="registration_endT" /></p>
			</li>
			<?php
		}
		?>
	</ul>
	<?php
}

function event_espresso_time_editor($event_id = 0) {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$time_counter = 1;
	//echo get_option('time_format');
	?>

	<ul id="dynamicTimeInput">

		<?php
		$times = $wpdb->get_results("SELECT * FROM " . EVENTS_START_END_TABLE . " WHERE event_id = '" . $event_id . "' ORDER BY id");
		if ($wpdb->num_rows > 0) {
			foreach ($times as $time) {
				echo '<li><p><label for="add-start-time">' . __('Start', 'event_espresso') . ' ' . $time_counter++ . '</label><input size="10"  type="text" id="add-start-time" name="start_time[]" value="' . event_date_display($time->start_time, get_option('time_format')) . '" /></p><p> <label for="add-end-time"> ' . __('End', 'event_espresso') . '</label> <input size="10"  type="text" id="add-end-time" name="end_time[]" value="' . event_date_display($time->end_time, get_option('time_format')) . '"> ' . ($org_options['time_reg_limit'] == 'Y' ? __('Qty', 'event_espresso') . ' <input size="3"  type="text" name="time_qty[]" value="' . $time->reg_limit . '">' : '') . '</p><input class="remove-item xtra-time" type="button" value="Remove" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" /></li>';
			}
		} else {
			?>
			<li>
				<p><label for="add-start-time"><?php _e('Start', 'event_espresso'); ?></label> <input size="10"  type="text" id="add-start-time" name="start_time[]" /></p>
				<p><label for="add-end-time"> <?php _e('End', 'event_espresso'); ?></label> <input size="10"  type="text" id="add-end-time" name="end_time[]" /> <?php echo (isset($org_options['time_reg_limit']) && $org_options['time_reg_limit'] == 'Y' ? __('Qty', 'event_espresso') . '<input size="3"  type="text" name="time_qty[]" />' : '') ?></p>
			</li>
			<?php
		}
		?>
	</ul>
	<?php
	global $espresso_premium;
	if ($espresso_premium != true)
		return;
	?>
	<input type="button" class="button" id="add-time" value="<?php _e('Add Additional Time', 'event_espresso'); ?>" onClick="addTimeInput('dynamicTimeInput');">
	<script type="text/javascript">
		//Dynamic form fields
		var counter = <?php echo $time_counter++ ?>;
		function addTimeInput(divName){
			var newdiv = document.createElement('li');
			newdiv.innerHTML = "<p><label for='add-start-time-"+ (counter) +"'><?php _e('Start', 'event_espresso'); ?> " + (counter) + "</label> <input type='text'id='add-start-time-"+ (counter) +"' size='10' name='start_time[]'></p><p> <label for='add-end-time-"+ (counter) +"'> <?php _e('End', 'event_espresso'); ?></label> <input type='text' id='add-end-time-"+ (counter) +"' size='10' name='end_time[]'> <?php echo $org_options['time_reg_limit'] ? __('Qty ', 'event_espresso') . " <input type='text'  size='3' name='time_qty[]'>" : ''; ?></p><input class='remove-this xtra-time' id='remove-added-time' type='button' value='Remove' onclick='this.parentNode.parentNode.removeChild(this.parentNode);'/>";
			document.getElementById(divName).appendChild(newdiv);
			counter++;
		}
	</script>
	<?php
}

function event_espresso_multi_price_update($event_id) {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$price_counter = 1;
	?>
	<fieldset>
		<legend><?php _e('Standard Pricing', 'event_espresso'); ?></legend>
		<ul id="dynamicPriceInput">
			<?php
			$prices = $wpdb->get_results("SELECT price_type, event_cost, surcharge, surcharge_type FROM " . EVENTS_PRICES_TABLE . " WHERE event_id = '" . $event_id . "' ORDER BY id");
			if ($wpdb->num_rows > 0) {
				foreach ($prices as $price) {
					echo '<li><p>';
					if (!isset($price->price_type))
						$price->price_type = "General Admission";
					if (!isset($price->event_cost))
						$price->event_cost = "0.00";
					echo '<label for="add-price-type-' . $price_counter++ . '">' . __('Name', 'event_espresso') . ' ' . $price_counter++ . '</label> <input size="10" id="add-price-type' . $price_counter++ . '" type="text" name="price_type[]" value="' . $price->price_type . '" /> ';
					$org_options['currency_symbol'] = isset($org_options['currency_symbol']) ? $org_options['currency_symbol'] : '';
					echo '<label for="add-price">' . __('Price', 'event_espresso') . ' ' . $org_options['currency_symbol'] . '</label><input size="5" id="add-price" type="text" name="event_cost[]" value="' . $price->event_cost . '" /></p> ';

					echo '<p><label for="add-surcharge">' . __('Surcharge', 'event_espresso') . '</label> <input size="5" id="add-surcharge" type="text"  name="surcharge[]" value="' . $price->surcharge . '" /></p> ';
					echo '<p><label for="surcharge-type">' . __('Surcharge Type', 'event_espresso') . '</label>';
					?>
					<select id="surcharge-type" name="surcharge_type[]">
						<option value = "flat_rate" <?php selected($price->surcharge_type, 'flat_rate') ?>><?php _e('Flat Rate', 'event_espresso'); ?></option>
						<option value = "pct" <?php selected($price->surcharge_type, 'pct') ?>><?php _e('Percent', 'event_espresso'); ?></option>
					</select>

					<?php
					echo '</p>';
					echo '<img class="remove-item" title="' . __('Remove this Price', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Price', 'event_espresso') . '" />';
					echo '</li>';
				}
			}else {
				?>
				<li id="add-price-name">

					<p>
						<label for="add-price-type-<?php echo $price_counter ?>"><?php _e('Name', 'event_espresso'); ?><?php echo $price_counter ?></label>
						<input size="10" id="add-price-type-<?php echo $price_counter ?>" type="text"  name="price_type[]" value="General Admission">

						<label for="add-event-cost"><?php _e('Price', 'event_espresso'); ?><?php echo isset($org_options['currency_symbol']) ? $org_options['currency_symbol'] : '' ?></label>
						<input size="5" id="add-event-cost" type="text"  name="event_cost[]" value="0.00">
					</p>
					<p>
						<label for="add-surcharge"><?php _e('Surcharge', 'event_espresso'); ?></label>
						<input size="5"  type="text"  id="add-surcharge" name="surcharge[]" value="<?php echo $org_options['surcharge'] ?>" >
					</p>
					<p>
						<label for="add-surcharge-type"> <?php _e('Surcharge Type', 'event_espresso'); ?></label>
						<select id="add-surcharge-type" name="surcharge_type[]">
							<option value = "flat_rate" <?php selected($org_options['surcharge_type'], 'flat_rate') ?>><?php _e('Flat Rate', 'event_espresso'); ?></option>
							<option value = "pct" <?php selected($org_options['surcharge_type'], 'pct') ?>><?php _e('Percent', 'event_espresso'); ?></option>
						</select>
					</p>
					<?php echo '<img class="remove-item" title="' . __('Remove this Price', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/remove.gif" alt="' . __('Remove Price', 'event_espresso') . '" />'; ?>


				</li>
				<?php
			}
			?>
		</ul>
		<p>
			(<?php _e('enter 0.00 for free events, enter 2 place decimal i.e.', 'event_espresso'); ?> <?php echo isset($org_options['currency_symbol']) ? $org_options['currency_symbol'] : ''; ?> 7.00)
		</p>
		<?php
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		?>
		<p><input class="button" type="button" value="<?php _e('Add A Price', 'event_espresso'); ?>" onClick="addPriceInput('dynamicPriceInput');"></p>
	</fieldset>
	<script type="text/javascript">
		//Dynamic form fields
		var price_counter = <?php echo $price_counter > 1 ? $price_counter - 1 : $price_counter++; ?>;
		function addPriceInput(divName){
			var next_counter = counter_static(price_counter);
			var newdiv =  document.createElement("li");
			newdiv.innerHTML = "<p><label for='add-price-type-" + (next_counter) + "'><?php _e('Name', 'event_espresso'); ?> " + (next_counter) + "</label> <input type='text' size='10' name='price_type[]' /> <label for='add-price" + (next_counter) + "'><?php _e('Price', 'event_espresso'); ?> <?php echo $org_options['currency_symbol'] ?> </label><input id='add-price-" + (next_counter) + "' type='text' size='5' name='event_cost[]' /> </p><p><label for='add-surcharge-" + (next_counter) + "' ><?php _e('Surcharge', 'event_espresso'); ?></label> <input size='5' id='add-surcharge-" + (next_counter) + "' type='text'  name='surcharge[]' value='<?php echo $org_options['surcharge'] ?>' /></p> <p><label for='add-surcharge-type-" + (next_counter) + "'><?php _e('Surcharge Type', 'event_espresso'); ?> <select id='add-surcharge-type-" + (next_counter) + "' name='surcharge_type[]'><option value = 'flat_rate' <?php selected($org_options['surcharge_type'], 'flat_rate') ?>><?php _e('Flat Rate', 'event_espresso'); ?></option><option value = 'pct' <?php selected($org_options['surcharge_type'], 'pct') ?>><?php _e('Percent', 'event_espresso'); ?></option></select></p> <?php echo "<img class='remove-item' title='" . __('Remove this Price', 'event_espresso') . "' onclick='this.parentNode.parentNode.removeChild(this.parentNode);' src='" . EVENT_ESPRESSO_PLUGINFULLURL . "images/icons/remove.gif' alt='" . __('Remove Price', 'event_espresso') . '\' />'; ?>";
			document.getElementById(divName).appendChild(newdiv);
			counter++;
		}

		function counter_static(price_counter) {
			if ( typeof counter_static.counter == 'undefined' ) {

				counter_static.counter = price_counter;
			}


			return ++counter_static.counter;
		}
	</script>
	<?php
}

function espresso_event_editor_quick_overview_meta_box($event) {
	?>
	<div class="inside">
		<div class="submitbox" id="submitpost">
			<div id="minor-publishing">
				<div id="minor-publishing-actions" class="clearfix">
					<div id="preview-action"> <a class="preview button" href="<?php echo espresso_reg_url($event->id, $event->slug); ?>" target="_blank" id="event-preview" tabindex="5">
							<?php _e('View Event', 'event_espresso'); ?>
						</a>
						<input type="hidden" name="event-preview" id="event-preview" value="" />
					</div>
					<div id="copy-action"> <a class="preview button" href="admin.php?page=events&amp;action=copy_event&event_id=<?php echo $event->id ?>" id="post-copy" tabindex="4" onclick="return confirm('<?php _e('Are you sure you want to copy ' . $event->event_name . '?', 'event_espresso'); ?>')">
							<?php _e('Duplicate Event', 'event_espresso'); ?>
						</a>
						<input  type="hidden" name="event-copy" id="event-copy" value="" />
					</div>
				</div>
				<!-- /minor-publishing-actions -->

				<div id="misc-publishing-actions">
					<div class="misc-pub-section curtime" id="visibility"> <span id="timestamp">
							<?php _e('Start Date', 'event_espresso'); ?>
							<b> <?php echo event_date_display($event->start_date); ?></b> </span> </div>
					<div class="misc-pub-section">
						<label for="post_status">
							<?php _e('Current Status:', 'event_espresso'); ?>
						</label>
						<span id="post-status-display"> <?php echo $event->status['display']; ?></span></div>

					<div class="misc-pub-section" id="visibility">
						<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/group.png" width="16" height="16" alt="<?php _e('View Attendees', 'event_espresso'); ?>" />
						<a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=' . $event->id . '"><?php _e('Attendees', 'event_espresso'); ?></a>:
						<?php echo get_number_of_attendees_reg_limit($event->id, 'num_attendees_slash_reg_limit'); ?>
					</div>

					<?php $class = apply_filters('filter_hook_espresso_event_editor_email_attendees_class', 'misc-pub-section'); ?>

					<div class="misc-pub-section <?php echo $class; ?>" id="visibility2">
						<a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event->id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_go.png" width="16" height="16" alt="<?php _e('Newsletter', 'event_espresso'); ?>" />
						</a>
						<a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event->id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
							<?php _e('Email Event Attendees', 'event_espresso'); ?>
						</a>
					</div>
					<?php
					do_action('action_hook_espresso_event_editor_overview_add', $event);
					?>
				</div>
				<!-- /misc-publishing-actions -->
			</div>
			<!-- /minor-publishing -->

			<div id="major-publishing-actions" class="clearfix">
				<?php if ($event->recurrence_id > 0) : ?>
					<div id="delete-action"> &nbsp; <a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete_recurrence_series&recurrence_id=<?php echo $event->recurrence_id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
							<?php _e('Delete all events in this series', 'event_espresso'); ?>
						</a> </div>
				<?php else: ?>
					<div id="delete-action"> <a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete&event_id=<?php echo $event->id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
							<?php _e('Delete Event', 'event_espresso'); ?>
						</a> </div>
				<?php endif;
				do_action('action_hook_espresso_event_editor_publishing_action'); ?>
			</div>
			<!-- /major-publishing-actions -->
		</div>
		<!-- /submitpost -->
	</div>
	<?php
}

function espresso_event_editor_primary_questions_group_meta_box($event) {
	global $wpdb;
	$question_groups = $event->question_groups;
	$event_id = $event->id;
	?>
	<div class="inside">
		<p><strong>
				<?php _e('Question Groups', 'event_espresso'); ?>
			</strong><br />
			<?php _e('Add a pre-populated', 'event_espresso'); ?>
			<a href="admin.php?page=form_groups" target="_blank">
				<?php _e('group', 'event_espresso'); ?>
			</a>
			<?php _e('of', 'event_espresso'); ?>
			<a href="admin.php?page=form_builder" target="_blank">
				<?php _e('questions', 'event_espresso'); ?>
			</a>
			<?php _e('to your event. The personal information group is required for all events.', 'event_espresso'); ?>
		</p>
		<?php
		if ($event->num_rows > 0) {
			reset($event->q_groups);
			$html = '';
			foreach ($event->q_groups as $question_group) {
				$question_group_id = $question_group->id;
				$question_group_description = $question_group->group_description;
				$group_name = $question_group->group_name;
				//$checked = $question_group->system_group == 1 ? ' checked="checked" ' : '';
				$checked = (is_array($question_groups) && array_key_exists($question_group_id, $question_groups)) || $question_group->system_group == 1 ? ' checked="checked" ' : '';
				$visibility = $question_group->system_group == 1 ? 'style="visibility:hidden"' : '';
				$group_id = isset($group_id) ? $group_id : '';
				$html .= '<p id="event-question-group-' . $question_group_id . '"><input value="' . $question_group_id . '" type="checkbox" ' . $checked . $visibility . ' name="question_groups[' . $question_group_id . ']" ' . $checked . ' /> <a href="admin.php?page=form_groups&amp;action=edit_group&amp;group_id=' . $question_group_id . '" title="edit" target="_blank">' . $group_name . '</a></p>';
			}
			if ($event->num_rows > 10) {
				$top_div = '<div style="height:250px;overflow:auto;">';
				$bottom_div = '</div>';
			} else {
				$top_div = '';
				$bottom_div = '';
			}
			$html = $top_div . $html . $bottom_div;
			echo $html;
		} else {
			echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
		}
		do_action('action_hook_espresso_event_editor_questions_notice');
		?>
	</div>
	<?php
}

function espresso_event_editor_categories_meta_box($event) {
	$event_id = $event->id;
	global $wpdb;
	?>
	<div class="inside">
		<?php
		$sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE;
		$sql = apply_filters('filter_hook_espresso_event_editor_categories_sql', $sql);
		$event_categories = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0) {
			foreach ($event_categories as $category) {
				$category_id = $category->id;
				$category_name = $category->category_name;

				$in_event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id='" . $event_id . "' AND cat_id='" . $category_id . "'");
				foreach ($in_event_categories as $in_category) {
					$in_event_category = $in_category->cat_id;
				}
				if (empty($in_event_category))
					$in_event_category = '';
				ob_start();
				?>
				<p id="event-category-<?php echo $category_id; ?>">
					<label for="in-event-category-<?php echo $category_id; ?>" class="selectit">
						<input value="' . $category_id . '" type="checkbox" name="event_category[]" id="in-event-category-<?php echo $category_id; ?>"<?php echo ($in_event_category == $category_id ? ' checked="checked"' : "" ); ?>/>
						<?php echo $category_name; ?>
					</label>
				</p>
				<?php
				$html = ob_get_contents();
				ob_end_clean();
			}
			if ($num_rows > 10) {
				ob_start();
				?>
				<div style="height:250px;overflow:auto;">
					<?php echo $html; ?>
				</div>
				<?php
				$html = ob_get_contents();
				ob_end_clean();
			}
			echo $html;
		} else {
			_e('No Categories', 'event_espresso');
		}
		?>
		<p>
			<a href="admin.php?page=event_categories" target="_blank">
				<?php _e('Manage Categories', 'event_espresso'); ?>
			</a>
		</p>
	</div>
	<?php
}

function espresso_event_editor_title_metabox($event) {
	global $org_options;
	?>
	<div id="titlewrap">
		<label class="screen-reader-text" for="title">
			<?php _e('Event Title', 'event_espresso'); ?>
		</label>
		<input type="text" name="event" size="30" tabindex="1" value="<?php echo $event->event_name; ?>" id="title" autocomplete="off" />
	</div>
	<!-- /titlewrap -->
	<div class="inside">
		<div id="edit-slug">
			<p>
				<strong> <?php _e('Permalink:', 'event_espresso'); ?> </strong> <?php echo get_permalink($org_options['event_page_id']) ?><input size="30" type="text" tabindex="2" name="slug" id="slug" value ="<?php echo $event->slug; ?>" /><br />
				<?php echo '<a href="#" class="button" onclick="prompt(&#39;Event Shortcode:&#39;, \'[SINGLEEVENT single_event_id=&#34;' . $event->event_identifier . '&#34;]\'); return false;">' . __('Shortcode') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Short URL:&#39;, \'' . espresso_short_reg_url($event->id) . '\'); return false;">' . __('Short URL') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Full URL:&#39;, \'' . espresso_reg_url($event->id, $event->slug) . '\'); return false;">' . __('Full URL') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Unique Event Identifier:&#39;, \'' . $event->event_identifier . '\'); return false;">' . __('Identifier') . '</a>' ?>
			</p>
		</div>
		<!-- /edit-slug-box -->
	</div>
	<?php
}

function espresso_event_editor_description_metabox($event) {
	if (function_exists('wp_editor')) {
		$args = array("textarea_rows" => 5, "textarea_name" => "event_desc", "editor_class" => "my_editor_custom");
		wp_editor(espresso_admin_format_content($event->event_desc), "event_desc", $args);
	} else {
		/*
		  This is the editor used by WordPress. It is very very hard to find documentation for this thing, so I pasted everything I could find below.
		  param: string $content Textarea content.
		  param: string $id Optional, default is 'content'. HTML ID attribute value.
		  param: string $prev_id Optional, default is 'title'. HTML ID name for switching back and forth between visual editors.
		  param: bool $media_buttons Optional, default is true. Whether to display media buttons.
		  param: int $tab_index Optional, default is 2. Tabindex for textarea element.
		 */
		//the_editor($content, $id = 'content', $prev_id = 'title', $media_buttons = true, $tab_index = 2)
		//the_editor(espresso_admin_format_content($event_desc), $id = 'event_desc'/* , $prev_id = 'title', $media_buttons = true, $tab_index = 3 */);
		the_editor(espresso_admin_format_content($event->event_desc), $id = 'event_desc'/* , $prev_id = 'title', $media_buttons = true, $tab_index = 3 */);
	}
	?>
	<table id="post-status-info" cellspacing="0">
		<tbody>
			<tr>
				<td id="wp-word-count"></td>
				<td class="autosave-info"><span id="autosave">&nbsp;</span></td>
			</tr>
		</tbody>
	</table>
	<?php
}

function espresso_event_editor_date_time_metabox($event) {
	global $espresso_premium;
	?>
	<div class="inside">
		<table width="100%" border="0" cellpadding="5">
			<tr valign="top">
				<td class="a"><fieldset id="add-reg-dates">
						<legend>
							<?php _e('Registration Dates', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'reg_date_info'); ?> </legend>
						<p>
							<label for="registration_start"> <?php echo __('Registration Start:', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="registration_start" name="registration_start"  value="<?php echo $event->registration_start ?>" />
						</p>
						<p>
							<label for="registration_end"><?php echo __('Registration End:', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="registration_end" name="registration_end"  value="<?php echo $event->registration_start ?>" />
						</p>
					</fieldset>
					<fieldset>
						<legend>
							<?php _e('Event Dates', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'event_date_info'); ?> </legend>
						<p>
							<label for="start_date"><?php echo __('Event Start Date', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="start_date" name="start_date" value="<?php echo $event->start_date ?>" />
						</p>
						<p>
							<label for="end_date"><?php echo __('Event End Date', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="end_date" name="end_date" value="<?php echo $event->end_date ?>" />
						</p>
					</fieldset>
					<?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones']) && $espresso_premium == true) { ?>
						<p><span class="run-in">
								<?php _e('Current Time:', 'event_espresso'); ?>
							</span> <span class="current-date"> <?php echo date(get_option('date_format')) . ' ' . date(get_option('time_format')); ?></span> <?php echo apply_filters('filter_hook_espresso_help', 'current_time_info'); ?> <a class="change-date-time" href="options-general.php" target="_blank">
								<?php _e('Change timezone and date format settings?', 'event_espresso'); ?>
							</a></p>
					<?php } ?>
					<?php if (isset($org_options['use_event_timezones']) && $org_options['use_event_timezones'] == 'Y' && $espresso_premium == true) { ?>
						<fieldset id="event-timezone">
							<p>
								<label>
									<?php _e('Event Timezone:', 'event_espresso') ?>
								</label>
								<?php echo eventespresso_ddtimezone($event->id) ?></p>
						</fieldset>
					<?php } ?></td>
				<?php // ADD TIME REGISTRATION   ?>
				<td class="b"><fieldset id="add-register-times">
						<legend>
							<?php _e('Registration Times', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'reg_date_info'); ?> </legend>
						<?php echo event_espresso_timereg_editor($event->id); ?>
					</fieldset>
					<fieldset id="add-event-times">
						<legend>
							<?php _e('Event Times', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'event_times_info'); ?> </legend>
						<?php echo event_espresso_time_editor($event->id); ?>
					</fieldset></td>
			</tr>
		</table>
	</div>
	<?php
}

function espresso_event_editor_pricing_metabox($event) {
	global $espresso_premium;
	(get_option('events_members_active') == 'true') ? $members_active = 'class="members-active"' : $members_active = '';
	?>
	<div class="inside">
		<table <?php echo $members_active ?> width="100%" border="0" cellpadding="5">
			<tr valign="top">
				<td id="standard-pricing" class="a"><?php event_espresso_multi_price_update($event->id); //Standard pricing          ?></td>
				<?php
				//If the members addon is installed, define member only event settings
				if (get_option('events_members_active') == 'true' && $espresso_premium == true) {
					?>
					<td id="member-pricing" class="b"><?php echo event_espresso_member_only_pricing($event->id); //Show the the member only pricing options.            ?></td>
				<?php } ?>
			</tr>
		</table>
	</div>
	<?php
}

function espresso_event_editor_venue_metabox($event) {
	global $org_options, $espresso_premium;
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="inside">
		<table width="100%" border="0" cellpadding="5">
			<tr valign="top">

				<?php
				if (function_exists('espresso_venue_dd') && $org_options['use_venue_manager'] == 'Y' && $espresso_premium == true) {
					$ven_type = 'class="use-ven-manager"';
					?>
					<td <?php echo $ven_type ?>><fieldset id="venue-manager">
							<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
							<?php if (!espresso_venue_dd()) : ?>
								<p class="info"><b>
										<?php _e('You have not created any venues yet.', 'event_espresso'); ?>
									</b></p>
								<p><a href="admin.php?page=event_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
							<?php else: ?>
								<?php echo espresso_venue_dd($event->venue_id) ?>
							<?php endif; ?>
						</fieldset></td>
					<?php
				} else {
					$ven_type = 'class="manual-venue"';
					?>
					<td <?php echo $ven_type ?>><fieldset>
							<legend>
								<?php _e('Physical Location', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="phys-addr">
									<?php _e('Address:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $event->address ?>" name="address" />
							</p>
							<p>
								<label for="phys-addr-2">
									<?php _e('Address 2:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $event->address2 ?>" name="address2" />
							</p>
							<p>
								<label for="phys-city">
									<?php _e('City:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $event->city ?>" name="city" />
							</p>
							<p>
								<label for="phys-state">
									<?php _e('State:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $event->state ?>" name="state" />
							</p>
							<p>
								<label for="zip-postal">
									<?php _e('Zip/Postal Code:', 'event_espresso'); ?>
								</label>
								<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $event->zip ?>" name="zip" />
							</p>
							<p>
								<label for="phys-country">
									<?php _e('Country:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $event->country ?>" name="country" />
							</p>
							<p>
								<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
								<br />
								<?php echo $event->google_map_link; ?> </p>
						</fieldset></td>
					<td <?php echo $ven_type; ?>>

						<fieldset>

							<legend>
								<?php _e('Venue Information', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="ven-title">
									<?php _e('Title:', 'event_espresso'); ?>
								</label>
								<input size="20"id="ven-title" tabindex="106"  type="text"  value="<?php echo stripslashes_deep($event->venue_title) ?>" name="venue_title" />
							</p>
							<p>
								<label for="ven-website">
									<?php _e('Website:', 'event_espresso'); ?>
								</label>
								<input size="20" id="ven-website" tabindex="107"  type="text"  value="<?php echo stripslashes_deep($event->venue_url) ?>" name="venue_url" />
							</p>
							<p>
								<label for="ven-phone">
									<?php _e('Phone:', 'event_espresso'); ?>
								</label>
								<input size="20" id="ven-phone" tabindex="108"  type="text"  value="<?php echo stripslashes_deep($event->venue_phone) ?>" name="venue_phone" />
							</p>
							<p>
								<label for="ven-image">
									<?php _e('Image:', 'event_espresso'); ?>
								</label>
								<input size="20" id="ven-image" tabindex="110"  type="text"  value="<?php echo stripslashes_deep($event->venue_image) ?>" name="venue_image" />
							</p>
						<?php } ?>
				</td>

				<td <?php echo $ven_type ?>><fieldset id="virt-location">
						<legend>
							<?php _e('Virtual Location', 'event_espresso'); ?>
						</legend>
						<p>
							<label for="virt-phone">
								<?php _e('Phone:', 'event_espresso'); ?>
							</label>
							<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $event->phone ?>" name="phone" />
						</p>
						<p>
							<label for="url-event">
								<?php _e('URL of Event:', 'event_espresso'); ?>
							</label>
							<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo stripslashes_deep($event->virtual_url) ?></textarea>
						</p>
						<p>
							<label for="call-in-num">
								<?php _e('Call in Number:', 'event_espresso'); ?>
							</label>
							<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo stripslashes_deep($event->virtual_phone) ?>" name="virtual_phone" />
						</p>
					</fieldset></td>
			</tr>

		</table>
		<p>
			<label for="enable_for_gmap">
				<?php _e('Enable event address in Google Maps? ', 'event_espresso') ?>
			</label>
			<?php echo select_input('enable_for_gmap', $values, isset($event->event_meta['enable_for_gmap']) ? $event->event_meta['enable_for_gmap'] : '', 'id="enable_for_gmap"') ?> </p>
	</div>
	<?php
}

function espresso_event_editor_email_metabox($event) {
	?>
	<div class="inside">
		<table class="form-table">
			<tbody>
				<tr>
					<td class="custom_emails"><fieldset id="email-manager">
							<legend><?php echo __('Email Information', 'event_espresso') ?></legend>
							<p class="info">Choose a payment confirmation email:</p>
							<?php echo espresso_email_dd('payment', $event->payment_email_id); ?>
							<p class="info">Choose a registration confirmation email:</p>
							<?php echo espresso_email_dd('confirmation', $event->confirmation_email_id); ?>
						</fieldset></td>
					<td>
						<p><a href="admin.php?page=event_emails"><?php echo __('Add emails to the Email Manager', 'event_espresso') ?></a></p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<?php
}

function espresso_register_event_editor_meta_boxes() {
	global $espresso_premium;

	add_meta_box('espresso_event_editor_title', __('Event Title', 'event_espresso'), 'espresso_event_editor_title_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_description', __('Event Description', 'event_espresso'), 'espresso_event_editor_description_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_date_time', __('Event Date/Times', 'event_espresso'), 'espresso_event_editor_date_time_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_pricing', __('Event Pricing', 'event_espresso'), 'espresso_event_editor_pricing_metabox', 'toplevel_page_events', 'normal', 'core');

	add_meta_box('espresso_event_editor_venue', __('Venue Details', 'event_espresso'), 'espresso_event_editor_venue_metabox', 'toplevel_page_events', 'normal', 'core');

	add_meta_box('espresso_event_editor_email', __('Email Confirmation:', 'event_espresso'), 'espresso_event_editor_email_metabox', 'toplevel_page_events', 'advanced', 'core');

	add_meta_box('espresso_event_editor_quick_overview', __('Quick Overview', 'event_espresso'), 'espresso_event_editor_quick_overview_meta_box', 'toplevel_page_events', 'side', 'high');

	add_meta_box('espresso_event_editor_primary_questions', __('Questions for Primary Attendee', 'event_espresso'), 'espresso_event_editor_primary_questions_group_meta_box', 'toplevel_page_events', 'side', 'core');

	add_meta_box('espresso_event_editor_categories', __('Event Category', 'event_espresso'), 'espresso_event_editor_categories_meta_box', 'toplevel_page_events', 'side', 'default');

	add_action('admin_footer', 'espresso_admin_page_footer');
}

add_action('current_screen', 'espresso_register_event_editor_meta_boxes');

function espresso_event_editor_footer() {
	include_once('help.php');
	?>
	<script type="text/javascript" charset="utf-8">

		//<![CDATA[
		jQuery(document).ready(function() {

			jQuery(".datepicker" ).datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
				showButtonPanel: true
			}); // close doc.ready

			var header_clicked = false;
			jQuery('#upload_image_button').click(function() {
				formfield = jQuery('#upload_image').attr('name');
				tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
				jQuery('p.event-featured-thumb').addClass('old');
				header_clicked = true;
				return false;
			});

	<?php do_action('action_hook_espresso_premium_event_editor_footer'); ?>
		});
		//]]>
	</script>
	<?php
}

add_action('action_hook_espresso_event_editor_footer', 'espresso_event_editor_footer');