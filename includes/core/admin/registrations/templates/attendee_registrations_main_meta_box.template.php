<div class="admin-primary-mbox-dv">
	<br/>
<?php 
//echo printr( $registrations, 'registrations' ); 
global $org_options;
?>
	<div class="admin-primary-mbox-tbl-wrap">
		<table class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( 'Event Name', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'REG ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'TXN ID', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Reg Code', 'event_espresso' );?></th>
					<th class="jst-rght"><?php _e( 'Ticket Price', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
			<?php foreach( $registrations as $registration ) : ?>
				<tr>
					<th class="jst-left">
					<?php 
						$event_url = add_query_arg( array( 'action' => 'edit_event', 'event_id' => $registration->event_ID() ), admin_url( 'admin.php?page=espresso_events' ));
						echo '<a href="'. $event_url .'"  title="'. __( 'Edit Event', 'event_espresso' ) .'">' . $registration->event_name() . '</a>';
					?>
					</th>
					<th class="jst-left">
					<?php 
							$reg_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$registration->ID() ), REG_ADMIN_URL );	
							echo '
							<a href="'.$reg_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">
								View Registration ' . $registration->ID() . '  
								<!--<img width="13" height="13" alt="View Registration" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/edit.png">-->
							</a>';
					?>
					</th>
					<th class="jst-left">
					<?php 
						$txn_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'txn'=>$registration->transaction_ID() ), TXN_ADMIN_URL );
						echo '
						<a href="'.$txn_url.'" title="' . __( 'View Transaction Details', 'event_espresso' ) . '">
							View Transaction ' . $registration->transaction_ID() . '  
							<!--<img width="16" height="16" alt="' . __( 'View Transaction', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/money.png">-->
						</a>';						
					?>
					</th>
					<th class="jst-left"><?php echo $registration->reg_code();?></th>
					<th class="jst-rght"><?php echo $org_options['currency_symbol'] . $registration->price_paid();?></th>
				</tr>
			<?php endforeach; ?>
			</tbody>
		</table>
	</div>
</div>
