<?php
//Displays reCAPTCHA form
$values=array(					
	array('id'=>'N','text'=> __('No','event_espresso')),
	array('id'=>'Y','text'=> __('Yes','event_espresso'))
);
?>
<div class="metabox-holder">
  <div class="postbox">
		<div title="Click to toggle" class="handlediv"><br /></div>
    <h3 class="hndle">
      <?php _e('Optional Event Settings','event_espresso'); ?>
    </h3>
			<div class="inside">
    <div class="padding">
      <ul>
        <li>
          <label for="surcharge">
            <?php _e(' Default Surcharge (this value will be automatically filled in for each price type when creating an event): ','event_espresso'); ?>
          </label>
          <input type="text" name="surcharge" size="2" value="<?php echo (!is_numeric($org_options['surcharge']))?'0.00':$org_options['surcharge'];?>" />
          <select name="surcharge_type">
            <option value = "flat_rate" <?php selected($org_options['surcharge_type'], 'flat_rate') ?>><?php _e('Flat Rate', 'event_espresso'); ?></option>
            <option value = "pct" <?php selected($org_options['surcharge_type'], 'pct') ?>><?php _e('Percent', 'event_espresso'); ?></option>
          </select>
          <label for="surcharge_text">
            <?php _e('Display text (eg. Surcharge or Service Fee:','event_espresso'); ?>
          </label>
          <input type="text" name="surcharge_text" value="<?php echo isset($org_options['surcharge_text'])? $org_options['surcharge_text']:__('Surcharge', 'event_espresso');?>" />
        </li>
        <li>
          <label for="default_payment_status">
            <?php
					  $default_payment_status = array(
							array('id'=>'Incomplete','text'=> 'Incomplete'),
							array('id' => 'Pending', 'text' => 'Pending'),
							array('id' => 'Completed', 'text' => 'Completed')
						);
 _e(' Default Payment Status (this value will be automatically filled in for each person\'s payment status, until payment is made, for each event): ','event_espresso'); ?>
          </label>
          <?php echo select_input('default_payment_status', $default_payment_status, $org_options['default_payment_status'])?>
        </li>
        <li>
          <label for="espresso_dashboard_widget">
            <?php _e('Show the Upcoming Events widget in the dashboard?','event_espresso'); ?>
          </label>
          <?php	echo select_input('espresso_dashboard_widget', $values, isset($org_options['espresso_dashboard_widget']) ? $org_options['espresso_dashboard_widget'] : '');?>
          <?php _e('Show the next', 'event_espresso'); ?>
          <input name="events_in_dasboard" size="5" style="width:50px;" type="text" value="<?php echo isset($org_options['events_in_dasboard']) || $org_options['events_in_dasboard'] == ''? '30':stripslashes_deep($org_options['events_in_dasboard']);?>" />
          <?php _e('days of events in the dashboard.', 'event_espresso'); ?>
        </li>
        <li>
          <label for="time_reg_limit">
            <?php _e('Use registration limits on time slots?<br />
							<em class="important">(This function is experimental and may not function as expected. You should adjust your attendee limit accordingly.)</em>','event_espresso'); ?>
          </label>
          <?php	echo select_input('time_reg_limit', $values, isset($org_options['time_reg_limit']) ? $org_options['time_reg_limit'] : '');?>
        </li>
        <li>
          <label>
            <?php _e('Use a custom time zone for each event?','event_espresso'); ?>
          </label>
          <?php echo select_input('use_event_timezones', $values, isset($org_options['use_event_timezones']) ? $org_options['use_event_timezones'] : ''); ?> <br />
        </li>

					<li>
          <label for="use_attendee_pre_approval">
            <?php _e('Enable attendee pre-approval feature?','event_espresso'); ?>
          </label>
          <?php echo select_input('use_attendee_pre_approval', $values, isset($org_options['use_attendee_pre_approval']) ? $org_options['use_attendee_pre_approval'] : ''); ?> </li>
        
        <li>
          <label>
            <?php _e('Show payment options for "Pending Payments" on the Payment Overview page?','event_espresso'); ?>
          </label>
          <?php echo select_input('show_pending_payment_options', $values, isset($org_options['show_pending_payment_options']) ? $org_options['show_pending_payment_options'] : ''); ?> <br />
        </li>
        <li>
          <label>
            <?php _e('Use the Venue Manager?','event_espresso'); ?>
          </label>
          <?php echo select_input('use_venue_manager', $values, isset($org_options['use_venue_manager']) ? $org_options['use_venue_manager'] : ''); ?> <br />
        </li>
        <li>
          <label>
            <?php _e('Use the Staff Manager?','event_espresso'); ?>
          </label>
          <?php echo select_input('use_personnel_manager', $values, isset($org_options['use_personnel_manager']) ? $org_options['use_personnel_manager'] : ''); ?> <br />
        </li>
        <li>
          <label>
            <?php _e('Show a link to Event Espresso in your event pages?','event_espresso'); ?>
          </label>
          <?php echo select_input('show_reg_footer', $values, isset($org_options['show_reg_footer'])?$org_options['show_reg_footer']:''); ?>
          <?php _e('Affiliate ID:', 'event_espresso'); ?>
          <input name="affiliate_id" size="10" style="width:70px;" type="text" value="<?php echo isset($org_options['affiliate_id'])&&$org_options['affiliate_id'] != ''? stripslashes_deep($org_options['affiliate_id']):'0';?>" />
          <?php _e('(optional)', 'event_espresso'); ?>
        </li>
      </ul>
      <p>
        <input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_3" />
      </p>
    </div>
		</div>
 </div>
</div>
