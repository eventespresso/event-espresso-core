<?php
$paytrace_settings = get_option('event_espresso_paytrace_settings');

?>
<div class="event-display-boxes">
	<p class="section-title"><?php _e('Billing Information', 'event_espresso') ?></p>
	<div class = "event_espresso_form_wrapper">
		<form id="paytrace_payment_form" name="paytrace_payment_form" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?>">
			<p>
				<label for="first_name"><?php _e('First Name', 'event_espresso'); ?></label>
				<input name="first_name" type="text" id="first_name" class="required" value="<?php echo $fname ?>" />
			</p>
			<p>
				<label for="last_name"><?php _e('Last Name', 'event_espresso'); ?></label>
				<input  name="last_name" type="text" id="last_name" class="required" value="<?php echo $lname ?>" />
			</p>
			<p>
				<label for="email"><?php _e('Email Address', 'event_espresso'); ?></label>
				<input  name="email" type="text" id="email" class="required" value="<?php echo $attendee_email ?>" />
			</p>
			<p>
				<label for="address"><?php _e('Address', 'event_espresso'); ?></label>
				<input  name="address" type="text" id="address" class="required" value="<?php echo $address ?>" />
			</p>
			<p>
				<label for="city"><?php _e('City', 'event_espresso'); ?></label>
				<input  name="city" type="text" id="city" class="required" value="<?php echo $city ?>" />
			</p>
			<p>
				<label for="state"><?php _e('State', 'event_espresso'); ?></label>
				<input  name="state" type="text" id="state" class="required" value="<?php echo $state ?>" />
			</p>
			<p>
				<label for="zip"><?php _e('Zip', 'event_espresso'); ?></label>
				<input name="zip" type="text" id="zip" class="required" value="<?php echo $zip ?>" />
			</p>
			<p class="section-title"><?php _e('Credit Card Information', 'event_espresso'); ?></p>
			<p>
				<label for="card_num"><?php _e('Card Number', 'event_espresso'); ?></label>
				<input type="text" name="cc" class="required" id="cc" />
			</p>
			<p>
				<label for="card-exp"><?php _e('Expiration Month', 'event_espresso'); ?></label>
				<select id="card-exp" name ="exp_month" class="required">
				<?php
				for ($i = 1; $i < 13; $i++)
					echo "<option value='$i'>$i</option>";
				?>
				</select>
			</p>
			<p>
				<label for="exp-year"><?php _e('Expiration Year', 'event_espresso'); ?></label>
				<select id="exp_year" name ="exp_year" class="required">
				<?php
				$curr_year = date("y");
				for ($i = 0; $i < 10; $i++) {
					$disp_year = $curr_year + $i;
					echo "<option value='$disp_year'>$disp_year</option>";
				}
				?>
				</select>
			</p>
			<p>
				<label for="cvv"><?php _e('CVV Code', 'event_espresso'); ?></label>
				<input class="required" type="text" name="csc" />
			</p>
			<input name="amount" type="hidden" value="<?php echo number_format($event_cost, 2) ?>" />
			<input name="paytrace" type="hidden" value="true" />
			<input name="id" type="hidden" value="<?php echo $attendee_id ?>" />
			<input class="btn_event_form_submit payment-submit ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" name="paytrace_submit" type="submit" value="<?php _e('Complete Purchase', 'event_espresso'); ?>" />
		</form>
	</div>
</div>
	<script type="text/javascript">

	jQuery(function(){

		jQuery('#paytrace_payment_form').validate();

 	jQuery('#paytrace_payment_form').submit(function(){

			if (jQuery('#paytrace_payment_form').valid()){
					jQuery('#processing').html('<img src="' + EEGlobals.plugin_url + 'images/ajax-loader.gif">');
			}
		})
	});

</script>