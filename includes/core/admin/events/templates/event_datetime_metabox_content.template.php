<div id="event-datetimes-dv" class="" >

	<table id="event-dates-and-times" class="">
		<thead>
			<tr valign="top">
				<td> <?php echo __('Event Starts on', 'event_espresso') ?> 
					<?php echo $event_date_help_link; ?>
					 </td>
				<td><?php echo __('Event Ends on', 'event_espresso') ?></td>
				<td><?php echo __('Registration Starts on', 'event_espresso') ?>
					<?php echo $registration_date_help_link; ?>
				 </td>
				<td><?php echo __('Registration Ends on', 'event_espresso') ?></td>					
				<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <td><?php echo __('Max Reg Limit', 'event_espresso'); ?></td>*/ ?>
			</tr>
		</thead>
		
		<?php $row = 1; ?>
		
		<?php foreach ($times as $time) : ?>
			<tr valign="top" id="event-dates-and-times-row-<?php echo $row; ?>" class="">
				<td class="">
					<div class="small-screen-table-label"><?php echo __('Event Starts on', 'event_espresso') ?>
						<?php echo $event_date_help_link; ?>
					 </div>
					<input id="event-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_start]" type="text" class="dtm-es-picker dtm-inp" value="<?php echo $time->start_date_and_time(  'Y-m-d '  ); ?>"/>
					<input name="event-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
					<?php /* <input id="event-start-max-date-<?php echo $row; ?>" type="hidden" value=""/> */ ?>
					<?php if ($time->ID()) { ?>
					<?php $datetime_IDs[$row] = $time->ID(); ?>
					<input id="ID-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][ID]" type="hidden" value="<?php echo $time->ID(); ?>"/>
					<?php } ?>						
					<input id="is-primary-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][is_primary]" type="hidden" value="<?php echo $time->is_primary(); ?>" />
				</td>

				<td class="">
					<div class="small-screen-table-label"><?php echo __('Event Ends on', 'event_espresso') ?></div>
					<input id="event-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_end]" type="text" class="dtm-ee-picker dtm-inp" value="<?php echo $time->end_date_and_time(  'Y-m-d '  ); ?>"/>
					<input name="event-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
					<?php /* <input id="event-end-min-date-<?php echo $row; ?>" type="hidden" value=""/> */ ?>
				</td>
				
				<td class="">
					<div class="small-screen-table-label"><?php echo __('Registration Starts on', 'event_espresso') ?></div>
					<input id="reg-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_start]" type="text" class="dtm-rs-picker dtm-inp" value="<?php echo $time->reg_start_date_and_time(  'Y-m-d '  ) ?>" />
					<input name="reg-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
				</td>

				<td class="">
					<div class="small-screen-table-label"><?php echo __('Registration Ends on', 'event_espresso') ?></div>
					<input id="reg-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_end]" type="text" class="dtm-re-picker dtm-inp" value="<?php echo $time->reg_end_date_and_time(  'Y-m-d '  ) ?>" />
					<input name="reg-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
				</td>

				<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
				<?php if ($org_options['time_reg_limit']) : ?>
					<td>
						<input type="text" id="reg-limit-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_limit]" class="small-text dtm-inp" style="text-align:right;" value="<?php echo $time->reg_limit(); ?>"/>
					</td>
				<?php endif; // time_reg_limit   ?>
				  */ ?>
				
	<!--					<td>
					<input type="text" id="tckts-left-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][tckts_left]" class="small-text dtm-inp" style="text-align:right;" value="<?php echo $time->tckts_left(); ?>"/>
				</td>-->
															
				<td class="">
					<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>
					<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <a class='display-dtm-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="<?php echo $time->ID(); ?>"  title='Display the Ticket Manager for this Date Time' style="position:relative; top:5px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;" >
						<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
					</a> */ ?>
					<?php 
					$template_args['row'] = $row;
					$clone_button = apply_filters('filter_hook_espresso_event_datetime_metabox_clone_button_template', '', $template_args);
					echo $clone_button;
					 ?>
					
			<?php if ( $row != 1 ) : ?>
					<a class='remove-xtra-time dtm-inp-btn' rel='<?php echo $row; ?>' title='<?php _e('Remove this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'>
						<img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/>
					</a>
			<?php endif; ?>
					</div>
				</td>
				
			</tr>
			<?php $row++; ?>
		<?php endforeach; // ($times as $time)  ?>
	</table>
	<br class="clear"/>
	<?php echo $add_additional_time; ?>

</div>


<?php echo $use_event_timezones_template; ?>

<input  type="hidden" name="datetime_IDs" value="<?php echo serialize( $datetime_IDs ); ?>"/>
<input  type="hidden" id="process_datetimes" name="process_datetimes" value="1"/>
<input type="hidden" id="datetime_total_rows" name="datetime_total_rows" value="<?php echo $row; ?>" />
