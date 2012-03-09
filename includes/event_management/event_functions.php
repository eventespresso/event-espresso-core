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

