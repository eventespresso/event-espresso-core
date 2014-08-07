<div class="padding">

	<?php do_action( 'AHEE__admin_option_settings__template__before', $template_args ); ?>

	<?php /* @todo put back once we have a dashboard widget to use
	<h4 class="ee-admin-settings-hdr">
		<?php _e('WordPress Dashboard', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>

				<th>
					<label for="use_dashboard_widget">
						<?php _e('Upcoming Events Widget', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('use_dashboard_widget', $values, $use_dashboard_widget ); ?>
					<p class="description">
						<?php _e('Activates the Upcoming Events Widget in the WordPress Dashboard so that you can see a list of upcoming events as soon as you log in.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('How many days into the future?', 'event_espresso'); ?>
				</th>
				<td>
					<input name="events_in_dashboard" size="5" style="width:50px;" type="text" value="<?php echo $events_in_dasboard; ?>" />
				</td>
			</tr>

		</tbody>
	</table>

<?php *
	 */
/* @todo: implement in 4.2 or whenever timezones-per-event get implemented.
 * When implementing this, it would probably be more proper to add a filter here
 * and use it from general_settings in the caffeinated folder

if( defined('CAFFEINATED') && CAFFEINATED ) : ?>
	<h4 class="ee-admin-settings-hdr">
		<?php _e('Time and Date Settings', 'event_espresso'); ?>
	</h4>
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label>
					<?php _e('Custom Time Zone for Each Event', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('use_event_timezones', $values, $use_event_timezones ); ?>
					<p class="description">
					<?php _e('This allows you to set a custom time zone for each event. Modificatiosn to your site may be required for this to work properly.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>
		</tbody>
	</table>
<?php endif; */ ?>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Promote Event Espresso', 'event_espresso'); ?> <span id="affiliate_info"><?php echo EEH_Template::get_help_tab_link('affiliate_info'); ?></span>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Link to Event Espresso in your Registration Page?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('show_reg_footer', $values, $show_reg_footer ); ?>
				</td>
			</tr>

			<tr>
				<th>
					<?php printf( __('Event Espresso %sAffiliate%s ID', 'event_espresso'), '<a href="http://eventespresso.com/affiliates/" target="_blank">', '</a>' ); ?>
				</th>
				<td>
					<input name="affiliate_id" class="regular-text" type="text" value="<?php echo $affiliate_id; ?>" />
					<br />
					<p class="description">
						<?php _e('Earn cash for promoting Event Espresso.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Help Tour Global Activation', 'event_espresso'); ?> <span id="help_tour_activation"><?php echo EEH_Template::get_help_tab_link('help_tour_activation_info'); ?></span>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('This toggles whether the Event Espresso help tours are active globally or not', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('help_tour_activation', $values, $help_tour_activation ); ?>
				</td>
			</tr>
		</tbody>
	</table>


</div>
