<div id="espresso_confirmation_display" class="event-display-boxes">	
<?php //Pending Approval Page Template ?>
	<h3><?php echo $fname ?>,</h3>
		<p class="instruct"><?php _e('Your registration is not complete until admin approves.', 'event_espresso'); ?></p>
		<p>
			<span class="event_espresso_name section-title"><?php _e('Amount due: ', 'event_espresso'); ?></span> 
			<span class="event_espresso_value"><?php echo $org_options['currency_symbol']?><?php echo $event_cost; ?></span>
		</p>
		<p><span class="section-title"><?php _e('Your Registration ID:', 'event_espresso'); ?> </span><?php echo $registration_id ?></p>
</div>