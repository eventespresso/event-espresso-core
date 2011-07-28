<div id="espresso_confirmation_display">	
<?php //Pending Approval Page Template ?>
    <h3><?php echo $fname ?>,</h3>
    <h3><?php _e('Your registration is not complete until admin approves.', 'event_espresso'); ?></h3>
        
	<p>
        <strong class="event_espresso_name"><?php _e('Amount due: ', 'event_espresso'); ?></strong> 
        <span class="event_espresso_value"><?php echo $org_options['currency_symbol']?><?php echo $event_cost; ?></span>
	</p>
	<p><strong><?php _e('Your Registration ID:', 'event_espresso'); ?> </strong><?php echo $registration_id ?></p>
</div>