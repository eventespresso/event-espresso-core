<?php 
		$x = 1;
		foreach ( $events as $event ){ ?>
			<fieldset class="reg-page-confirmation-wrap-fs">
				<legend class="spco-attendee-lgnd smaller-text lt-grey-text"><?php _e('Event #', 'event_espresso'); ?><?php echo $x; ?></legend>
				<h4><strong><?php echo $event['name']; ?></strong></h4>
				<b><?php echo $event['date'] . __(' at ', 'event_espresso') . $event['time']; ?></b><br/>
				<b><?php echo $event['ticket-price']; ?></b>
				<h5><strong><?php _e('Attendees', 'event_espresso'); ?></strong></h5>
				<ol class="confirm-page-attendees-ul">
	<?php	foreach ( $event['attendees'] as $attendee ) { ?>
					<li>
						<b><?php echo $attendee['name']; ?></b> - <?php echo $attendee['extra_att_detail']; ?>
					</li>
	<?php } ?>				
				</ol>
			</fieldset>
<?php
			$x++;
		}
?>

			<fieldset class="reg-page-confirmation-wrap-fs">
				<legend class="spco-attendee-lgnd smaller-text lt-grey-text"><?php _e('Billing Details', 'event_espresso'); ?></legend>
<?php foreach ( $billing as $key => $value ){ ?>
					<span class="reg-page-confirmation-billing-info-spn smaller-text lt-grey-text"><?php echo $key; ?></span>&nbsp;&nbsp;<?php echo $value; ?><br />
<?php } ?>	
					<br/>				
			</fieldset>