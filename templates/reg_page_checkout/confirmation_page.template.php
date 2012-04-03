<?php 
		$x = 1;
		foreach ( $events as $event ){ ?>
			<fieldset class="reg-page-confirmation-wrap-fs">
				<legend class="mer-reg-page-attendee-lgnd smaller-text lt-grey-text"><?php _e('Event #', 'event_espresso'); ?><?php echo $x; ?></legend>
				<h4><strong><?php echo $event['name']; ?></strong></h4>
				<h6><?php echo $event['date']; ?> at <?php echo $event['time']; ?></h6>
				<h6><?php echo $event['ticket-price']; ?></h6>
				<h5><strong><?php _e('Attendees', 'event_espresso'); ?></strong></h5>
				<ol class="confirm-page-attendees-ul">
	<?php	foreach ( $event['attendees'] as $attendee ) { ?>
					<li>
						<b><?php echo $attendee['name']; ?></b> - <?php echo $attendee['extra_att_detail']; ?>
<?php 		
/*					$d = 1;
					foreach ( $attendee as $key => $value ) {
						if ( is_numeric( $key ) && $value != '' ) {
							echo $value;
							if ( $d < count( $attendee )) {
								echo ', ';
							}
						} 
						$d++;
					}	*/				
?>
					</li>
	<?php } ?>				
				</ol>
			</fieldset>
<?php
			$x++;
		}
?>

			<fieldset class="reg-page-confirmation-wrap-fs">
				<legend class="mer-reg-page-attendee-lgnd smaller-text lt-grey-text"><?php _e('Billing Details', 'event_espresso'); ?></legend>
<?php foreach ( $billing as $key => $value ){ ?>
					<span class="reg-page-confirmation-billing-info-spn smaller-text lt-grey-text"><?php echo $key; ?></span>&nbsp;&nbsp;<?php echo $value; ?><br />
<?php } ?>	
					<br/>				
			</fieldset>