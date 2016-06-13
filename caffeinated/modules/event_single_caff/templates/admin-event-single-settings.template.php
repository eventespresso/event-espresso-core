<?php
add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' );
$values = EEH_Form_Fields::prep_answer_options(
	array(
		array( 'id' => 1, 'text' => __( 'Yes', 'event_espresso' ) ),
		array( 'id' => 0, 'text' => __( 'No', 'event_espresso' ) )
	)
);
?>

	<!--*************************   Event Single  ****************************-->

	<h2 class="ee-admin-settings-hdr">
		<?php _e('Single Event Pages', 'event_espresso'); ?>  <?php //echo EEH_Template::get_help_tab_link('event_single_settings_info');?>
	</h2>
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="display_status_banner_single">
						<?php _e('Display Status Banner', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'display_status_banner_single', $display_status_banner_single, $values, 'display_status_banner_single', 'display_status_banner_single' ); ?>
					<p class="description"><?php _e( 'Selecting "Yes" will inject an Event Status banner with the title whenever Events are displaying on the single event page.', 'event_espresso' ); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue">
						<?php _e( 'Display Venue Details', 'event_espresso' ); ?><?php echo EEH_Template::get_help_tab_link('display_addresses_in_reg_form_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'display_venue', $display_venue, $values, 'display_venue', 'display_venue' ); ?>
					<p class="description"><?php _e( 'Do not use this if you are using the venue shortcodes in your event description.', 'event_espresso' ); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Single_use_sortable_display_order">
						<?php _e( 'Use Custom Display Order?', 'event_espresso' ); ?>
					</label>
				</th>
				<td>
					<?php
						echo EEH_Form_Fields::select(
							'use_sortable_display_order',
							$use_sortable_display_order,
							$values,
							'EED_Events_Single_use_sortable_display_order',
							'EED_Events_Single_use_sortable_display_order'
						);
					?>
					<p class="description ">
						<?php
						echo sprintf(
							__( '%1$sPlease Note:%2$s%3$sIf you are currently using filters to customize the display order for elements within the Event Single page display, then you do NOT activate this feature until those filters have been removed or disabled. If this feature is activated while still using such filters, duplicate event content such as the ticket selector, datetimes, or venue information could be displayed on the frontend of the site. Please verify that this is not the case after activating this feature.', 'event_espresso' ),
							'<span class="important-notice">',
							'</span>',
							'<br />'
						);
						?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Display Order', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link('display_addresses_in_reg_form_info');?>
				</th>
				<td>

					<?php wp_nonce_field( 'espresso_update_event_single_order', 'espresso_update_event_single_order_nonce', false ); ?>
					<?php echo $event_single_display_order; ?>

					<p class="description"><?php _e('Drag and Drop the above to determine the display order of the Event Description, Date and Times, Ticket Selector, and Venue Information on the single event page.', 'event_espresso'); ?></p>

				</td>
			</tr>

		</tbody>
	</table>

