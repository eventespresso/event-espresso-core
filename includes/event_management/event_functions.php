<?php


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
		</div>
		<!-- /submitpost -->
	</div>
	<?php
}

function espresso_event_editor_primary_questions_group_meta_box($event) {
	$question_groups = $event->question_groups;
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
				$group_name = $question_group->group_name;
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
			if ($num_rows > 10) {
				echo '<div style="height:250px;overflow:auto;">';
			}
			foreach ($event_categories as $category) {
				$category_id = $category->id;
				$category_name = $category->category_name;

				$in_event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id='" . $event_id . "' AND cat_id='" . $category_id . "'");
				foreach ($in_event_categories as $in_category) {
					$in_event_category = $in_category->cat_id;
				}
				if (empty($in_event_category))
					$in_event_category = '';
				?>
				<p id="event-category-<?php echo $category_id; ?>">
					<label for="in-event-category-<?php echo $category_id; ?>" class="selectit">
						<input value="' . $category_id . '" type="checkbox" name="event_category[]" id="in-event-category-<?php echo $category_id; ?>"<?php echo ($in_event_category == $category_id ? ' checked="checked"' : "" ); ?>/>
						<?php echo $category_name; ?>
					</label>
				</p>
				<?php
			}
			if ($num_rows > 10) {
				echo '</div>';
			}
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

function espresso_event_editor_title_div($event) {
	?>
	<div id="titlediv">
		<div id="titlewrap">
			<h5 style="margin: 1em .5em .1em;"><?php _e('Event Title', 'event_espresso'); ?></h5>
			<input id="title" type="text" autocomplete="off" value="<?php echo $event->event_name; ?>" tabindex="1" size="30" name="event">
		</div>
		<!-- /titlewrap -->

		<div class="inside">
			<div id="edit-slug-box" style="height:auto;">

				<strong><?php _e('Permalink:', 'event_espresso'); ?></strong>

				<span id="sample-permalink">
					<?php echo $event->page_url; ?><input size="50" type="text" tabindex="2" name="slug" id="slug" value ="<?php echo $event->slug; ?>" />
				</span>

				<a class="button" onclick="prompt('Shortcode:', jQuery('#shortcode').val()); return false;" href="#"><?php _e('Shortcode'); ?></a>
				<a class="button" onclick="prompt('Short URL:', jQuery('#shortlink').val()); return false;" href="#"><?php _e('Short URL'); ?></a>
				<a class="button" onclick="prompt('Full URL:', jQuery('#fulllink').val()); return false;" href="#"><?php _e('Full URL'); ?></a>
				<a class="button" onclick="prompt('Unique Event Identifier:', jQuery('#identifier').val()); return false;" href="#"><?php _e('Identifier'); ?></a>
				<a class="button" target="_blank" href="<?php echo $event->page_url . $event->slug; ?>/"><?php _e('View Post'); ?></a>

				<input id="shortcode" type="hidden" value='[SINGLEEVENT single_event_id="<?php echo $event->event_identifier; ?>"]'>
				<input id="shortlink" type="hidden" value="<?php echo add_query_arg(array('ee' => $event->id), $event->page_url); ?>">
				<input id="fulllink" type="hidden" value="<?php echo $event->page_url . $event->slug; ?>">
				<input id="identifier" type="hidden" value="<?php echo $event->event_identifier; ?>">

			</div>
			<!-- /edit-slug-box -->
		</div>
	</div>
	<?php
}

function espresso_event_editor_desc_div($event) {
	?>
	<div id="postdivrich" class="postarea">
		<?php
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
			wp_editor(espresso_admin_format_content($event->event_desc), 'event_desc');
		}
		?>
		<table id="post-status-info" cellspacing="0">
			<tbody>
				<tr>
					<td id="wp-word-count"> Word count: <span class="word-count"></span></td>
					<td class="autosave-info"><span class="autosave-message"></span><span id="last-edit"></span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<?php
}

function espresso_event_editor_date_time_metabox($event) {

	global $org_options, $espresso_premium;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
	$DTM = EEM_Datetime::instance();

	// grab event times
	if (!$times = $DTM->get_all_event_dates($event->id)) {
		$times = array(new EE_Datetime($event->id, true, time(), time() + (60 * 60 * 24 * 30), 'E', NULL));
	}
	// grab reg times
	if (!$reg_times = $DTM->get_all_reg_dates($event->id)) {
		$reg_times = array(new EE_Datetime($event->id, true, time(), time() + (60 * 60 * 24 * 30), 'R', NULL));
	}
	?>


	<div id="event-datetimes-dv" class="" >
	
		<h5 id="event-datetimes-h5" ><?php _e('Event', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'event_date_info'); ?></h5>
		

		<table id="event-dates-and-times">
			<tr valign="top">
				<td><?php echo __('Start Date', 'event_espresso') ?><span style="display:inline-block; position:relative; top:-2px; height:16px; margin:0 0 0 .5em;"><?php echo apply_filters('filter_hook_espresso_help', 'event_date_info'); ?></span></td>
				<td><?php echo __('End Date', 'event_espresso') ?></td>
				<td><?php echo __('Start Time', 'event_espresso') ?></td>
				<td><?php echo __('End Time', 'event_espresso') ?></td>
				<?php if ($org_options['time_reg_limit']) : ?>
					<td><?php echo __('Reg Limit', 'event_espresso') ?></td>
				<?php endif; // time_reg_limit   ?>
			</tr>
			<?php $row = 1; ?>
			<?php foreach ($times as $time) : ?>
				<tr valign="top" id="event-dates-and-times-row-<?php echo $row; ?>">
					<td>
						<input id="start-date-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][startdate]" type="text" class="datepicker" value="<?php echo $time->start_date(); ?>" />
						<?php if ($time->ID()) { ?>
							<input id="ID-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][ID]" type="hidden" value="<?php echo $time->ID(); ?>" />
						<?php } ?>						
					</td>
					<td>
						<input id="end-date-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][enddate]" type="text" class="datepicker" value="<?php echo $time->end_date(); ?>" />
					</td>
					<td>
						<input id="add-start-time-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][starttime]" type="text" class="medium-text time-picker" value="<?php echo $time->start_time(); ?>" />
					</td>
					<td>
						<input id="add-end-time-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][endtime]" type="text" class="medium-text time-picker" value="<?php echo $time->end_time(); ?>" />
					</td>
					<?php if ($org_options['time_reg_limit']) : ?>
						<td>
							<input type="text" id="time_qty-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][startreg_limit]" class="small-text" style="text-align:right;" value="<?php echo $time->reg_limit(); ?>"/>
						</td>
					<?php endif; // time_reg_limit   ?>
					<?php if ($row > 1) : ?>
						<td><input class='remove-xtra-time' rel='<?php echo $row; ?>' type='button' value='Remove'  title='Remove this Event Time' /></td>
					<?php else : ?>
						<td></td>
					<?php endif; ?>
				</tr>
				<?php $row++; ?>
			<?php endforeach; // ($times as $time)  ?>
		</table>
		<br class="clear"/>
		<input type="button" class="button" id="add-time" value="<?php _e('Add Additional Time', 'event_espresso'); ?>" />
		<br class="clear"/><br/>

		<?php if ($espresso_premium) : ?>
			<script type="text/javascript">
				(function($) {
					var counter = <?php echo $row; ?>;

					$('#add-time').click(function() {

						var newRow = "<tr valign='top' id='event-dates-and-times-row-"+(counter)+"'><td><input id='start-date-"+(counter)+"' name='start_date' type='text' class='datepicker' disabled='disabled' value='<?php echo $time->start_date() ?>' /></td><td><input id='end-date-"+(counter)+"' name='end_date' type='text' class='datepicker' disabled='disabled' value='<?php echo $time->end_date() ?>' /></td><td><input id='add-start-time-"+(counter)+"' name='start_time[]' type='text' class='medium-text time-picker' value='' /></td><td><input id='add-end-time-"+(counter)+"' name='end_time[]' type='text' class='medium-text time-picker' value='' /></td><?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='time_qty-"+(counter)+"' name='time_qty[]' class='small-text' style='text-align:right;' value=''/></td><?php endif; ?><td><input class='remove-xtra-time' rel='"+(counter)+"' type='button' value='Remove'  title='Remove this Event Time' /></td></tr>";

						$('#event-dates-and-times tr:last').after( newRow );
						counter++;
					});

					$('.remove-xtra-time').live("click", function(){
						var whichRow = '#event-dates-and-times-row-' + $(this).attr('rel');
						$(whichRow).remove();
						counter--;
					});

				})(jQuery);
			</script>
		<?php endif; // $espresso_premium ?>

	</div>

	<div id="registration-datetimes-dv" class="">
		<h5 id="registration-datetimes-h5" ><?php _e('Registration', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'reg_date_info'); ?></h5>

		<table id="reg-dates-and-times">
			<tr valign="top">
				<td><?php echo __('Start Date', 'event_espresso') ?></td>
				<td><?php echo __('End Date', 'event_espresso') ?></td>
				<td><?php echo __('Start Time', 'event_espresso') ?></td>
				<td><?php echo __('End Time', 'event_espresso') ?></td>
			</tr>
			<?php $row = 1; ?>
			<?php foreach ($reg_times as $reg_time) : ?>
				<tr valign="top" id="reg-dates-and-times-row-<?php echo $row; ?>">
					<td>
						<input id="registration_start" name="registration_start" type="text" class="medium-text datepicker" value="<?php echo $reg_time->start_date() ?>" />
						<?php if ($reg_time->ID()) { ?>
							<input id="ID-<?php echo $row; ?>" name="registration_id" type="hidden" value="<?php echo $reg_time->ID(); ?>" />
						<?php } ?>
					</td>
					<td>
						<input id="registration_end" name="registration_end" type="text" class="medium-text datepicker" value="<?php echo $reg_time->end_date() ?>" />
					</td>
					<td>
						<input id="add-reg-start-time-<?php echo $row; ?>" name="registration_startT" type="text" class="medium-text time-picker" value="<?php echo $reg_time->start_time(); ?>" />
					</td>
					<td>
						<input id="add-reg-end-time-<?php echo $row; ?>" name="registration_endT" type="text" class="medium-text time-picker" value="<?php echo $reg_time->end_time(); ?>" />
					</td>
				</tr>
				<?php $row++; ?>
			<?php endforeach; // $reg_times  ?>
		</table>

		<br class="clear"/>
	</div>
	<div id="timezones-datetimes-dv" class="">

		<?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones'] ) && $espresso_premium === TRUE) : ?>
			<span class="run-in"> <?php _e('Current Time:', 'event_espresso'); ?> </span>
			<span class="current-date"> <?php echo date(get_option('date_format')) . ' ' . date(get_option('time_format')); ?></span>
			<?php echo apply_filters('filter_hook_espresso_help', 'current_time_info'); ?>
			<a class="change-date-time" href="options-general.php" target="_blank"><?php _e('Change timezone and date format settings?', 'event_espresso'); ?></a>
		<?php endif; ?>

		<?php if (!empty($org_options['use_event_timezones']) && $espresso_premium === TRUE) : ?>
			<h6> <?php _e('Event Timezone:', 'event_espresso') ?> </h6>
			<?php echo eventespresso_ddtimezone($event->id) ?>
		<?php endif; ?>

	</div>
	<!--</div>-->
	<?php
}





function espresso_event_editor_pricing_metabox($event) {

	global $org_options;

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Event_Price.model.php');
	$EVP = EEM_Event_Price::instance();

	$prices = $PRC->get_all_event_prices_for_admin($event->id);
	//echo printr( $prices, '$prices' );

	$table_class = apply_filters('filter_hook_espresso_pricing_table_class_filter', 'event_editor_pricing');
	?>


	<div id="ticket-prices-dv" class="inside">

	<table class="<?php echo $table_class; ?>">
		<thead>
			<tr>
				<td style="width:3%; text-align:center;"><b><?php _e('Order'); ?></b></td>
				<td style="width:15%; padding:0 .5em;"><b><?php _e('Name'); ?></b></td>
				<td style="width:17.5%; padding:0 .5em;"><b><?php _e('Type'); ?></b></td>
				<td style="width:39.5%; padding:0 .5em;"><b><?php _e('Description'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Amount'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('%'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Members'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Discount'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Active?'); ?></b></td>
			</tr>
		</thead>
		<tr>
			<td style="width:3%; height:3.5em; text-align:center;">
				<input name="price[order]" id="price_order" type="text" class="" value="" style="width:100%; text-align:center;" />
			</td>
			<td style="width:15%; height:3.5em; text-align:left;">
				<input name="price[name]" id="price_name" type="text" class="" value="" style="width:100%;" />
			</td>
			<td style="width:17.5%; height:3.5em; text-align:left;">
				<input name="price[type]" id="price_type" type="text" class="" value="" style="width:100%;" />
			</td>
			<td style="width:39.5%; height:3.5em; text-align:left;">
				<input name="price[desc]" id="price_desc" type="text" class="" value="" style="width:100%;" />
			</td>
			<td style="width:5%; height:3.5em; text-align:center;">
				<input name="price[amount]" id="price_amount" type="text" class="" value="" style="width:100%; text-align:center;" />
			</td>
			<td style="width:5%; height:3.5em; text-align:center;">
				<input name="price[percent]" id="price_percent" type="checkbox" class="" value=""" />
			</td>
			<td style="width:5%; height:3.5em; text-align:center;">
				<input name="price[members]" id="price_members" type="checkbox" class="" value=""  />
			</td>
			<td style="width:5%; height:3.5em; text-align:center;">
				<input name="price[discount]" id="price_discount" type="checkbox" class="" value="" />
			</td>
			<td style="width:5%; height:3.5em; text-align:center;">
				<input name="price[active]" type="checkbox" title="Activate Price"/>
			</td>
		</tr>
	</table>


	<table class="event_editor_pricing">
		<thead>
			<tr>
				<td style="width:3%; text-align:center;"><b><?php _e('Order'); ?></b></td>
				<td style="width:15%; padding:0 .5em;"><b><?php _e('Name'); ?></b></td>
				<td style="width:17.5%; padding:0 .5em;"><b><?php _e('Type'); ?></b></td>
				<td style="width:39.5%; padding:0 .5em;"><b><?php _e('Description'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Amount'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('%'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Members'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Discount'); ?></b></td>
				<td style="width:5%; text-align:center;"><b><?php _e('Active?'); ?></b></td>
			</tr>
		</thead>
		<?php
		$row = 1;
		foreach ($prices as $is_active_and_price_object) :
			$checked = ($is_active_and_price_object['active']) ? ' checked="checked"' : '';
			$price = $is_active_and_price_object['price']; ?>
			<tr>
                <td class="order-column" style="width:3%; height:2.5em; vertical-align:top; text-align:center;"> 
                  <?php echo $PRT->type[$price->type()]->order(); ?>             
              </td> 
              <td class="name-column" style="width:15%; height:2.5em; padding:0 .5em; vertical-align:top;"> 
                  <?php echo $price->name(); ?> 
              </td> 
              <td class="type-column" style="width:17.5%; height:2.5em; padding:0 .5em; vertical-align:top;"> 
                  <?php echo $PRT->type[$price->type()]->name(); ?> 
              </td> 
              <td class="desc-column" style="width:39.5%; height:2.5em; padding:0 .5em; vertical-align:top;"> 
                  <?php echo $price->desc(); ?> 
              </td> 
              <td class="amount-column" style="width:5%; height:2.5em; vertical-align:top; text-align:center;"> 
                  <?php echo ($PRT->type[$price->type()]->is_percent()) ? $price->amount() . '%' : $org_options['currency_symbol'] . $price->amount(); ?> 
              </td> 
              <td class="percent-column" style="width:5%; height:2.5em; vertical-align:top; text-align:center;"> 
                  <?php echo ($PRT->type[$price->type()]->is_percent()) ? 'Yes' : ''; ?> 
              </td> 
                <td class="member-column" style="width:5%; height:2.5em; vertical-align:top; text-align:center;"> 
                  <?php echo ($PRT->type[$price->type()]->is_member()) ? 'Yes' : ''; ?> 
              </td> 
              <td class="discount-column" style="width:5%; height:2.5em; vertical-align:top; text-align:center;"> 
                  <?php echo ($PRT->type[$price->type()]->is_discount()) ? 'Yes' : ''; ?> 
              </td> 
              <td class="check-column" style="width:5%; height:2.5em; vertical-align:top; text-align:center;"> 
                  <input name="active_prices[<?php echo $price->ID();?>]" type="checkbox" title="Activate Price <?php echo $price->name(); ?>"<?php echo $checked;?>/>
									<input name="listed_prices[<?php echo $price->ID();?>]" type="hidden" />
              </td>
			</tr>
			<?php
			$row++;
		endforeach;
		?>
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
		<table class="form-table">
			<tr>
				<?php
				if (function_exists('espresso_venue_dd') && $org_options['use_venue_manager'] && $espresso_premium) {
					$ven_type = 'class="use-ven-manager"';
					?>
				<td valign="top" <?php echo $ven_type ?>><fieldset id="venue-manager">
							<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
							<?php if (!espresso_venue_dd()) : ?>
								<p class="info">
									<b><?php _e('You have not created any venues yet.', 'event_espresso'); ?></b>
								</p>
								<p><a href="admin.php?page=event_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
							<?php else: ?>
								<?php echo espresso_venue_dd($event->venue_id) ?>
							<?php endif; ?>
						</fieldset>
					</td>
					<?php
				} else {
					$ven_type = 'class="manual-venue"';
					?>
					<td valign="top" <?php echo $ven_type ?>>
						<fieldset>
							<legend>
								<?php _e('Physical Location', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="phys-addr">
									<?php _e('Address:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $event->address ?>" name="address" />
								<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label>
								<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $event->address2 ?>" name="address2" />
								<label for="phys-city">
									<?php _e('City:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $event->city ?>" name="city" />
								<label for="phys-state">
									<?php _e('State:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $event->state ?>" name="state" />
								<label for="zip-postal">
									<?php _e('Zip/Postal Code:', 'event_espresso'); ?>
								</label>
								<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $event->zip ?>" name="zip" />
								<label for="phys-country">
									<?php _e('Country:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $event->country ?>" name="country" />
								<br/>
								<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
								<br />
								<?php echo $event->google_map_link; ?> </p>
						</fieldset>
					</td>
					<td valign="top" <?php echo $ven_type; ?>>

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
				<td valign="top" <?php echo $ven_type ?>>
					<fieldset id="virt-location">
						<legend>
							<?php _e('Virtual Location', 'event_espresso'); ?>
						</legend>
						<p>
							<label for="virt-phone" style="display:inline-block; width:100px;">
								<?php _e('Phone:', 'event_espresso'); ?>
							</label>
							<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $event->phone ?>" name="phone" />
						</p>
						<p>
							<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
								<?php _e('URL of Event:', 'event_espresso'); ?>
							</label>
							<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo stripslashes_deep($event->virtual_url) ?></textarea>
						</p>
						<p>
							<label for="call-in-num" style="display:inline-block; width:100px;">
								<?php _e('Call in Number:', 'event_espresso'); ?>
							</label>
							<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo stripslashes_deep($event->virtual_phone) ?>" name="virtual_phone" />
						</p>
					</fieldset>
				</td>
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

	add_action('action_hook_espresso_event_editor_title_div', 'espresso_event_editor_title_div');

	add_action('action_hook_espresso_event_editor_desc_div', 'espresso_event_editor_desc_div');

	//add_action('action_hook_espresso_event_editor_date_time_div', 'espresso_event_editor_date_time_metabox');

	add_meta_box('espresso_event_editor_date_time', __('Dates &amp; Times', 'event_espresso'), 'espresso_event_editor_date_time_metabox', 'toplevel_page_events', 'normal', 'high');

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

function espresso_save_buttons($event) {
	?>
	<div id="event_editor_major_buttons_wrapper">
		<?php wp_nonce_field('espresso_form_check', 'ee__event_editor'); ?>
		<input class="button-primary" type="submit" name="save" value="<?php _e('Save', 'event_espresso'); ?>" id="save" />
		<input class="button-primary" type="submit" name="save_and_close" value="<?php _e('Save And Close', 'event_espresso'); ?>" id="save_and_close" />
		<?php if ($event->recurrence_id > 0) : ?>
			<a class="submitdelete deletion button-primary" href="admin.php?page=events&amp;action=delete_recurrence_series&recurrence_id=<?php echo $event->recurrence_id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
				<?php _e('Delete all events in this series', 'event_espresso'); ?>
			</a>
		<?php else: ?>
			<a class="submitdelete deletion button-primary" href="admin.php?page=events&amp;action=delete&event_id=<?php echo $event->id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
				<?php _e('Delete Event', 'event_espresso'); ?>
			</a>
		<?php endif; ?>
	</div>
	<?php
}

add_action('action_hook_espresso_save_buttons', 'espresso_save_buttons');
