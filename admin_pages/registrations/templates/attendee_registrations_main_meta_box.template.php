<div class="admin-primary-mbox-dv">
	<br/>

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
					<td class="jst-left">
					<?php
						$event_url = add_query_arg( array( 'action' => 'edit', 'post' => $registration->event_ID() ), admin_url( 'admin.php?page=espresso_events' ));
						echo '<a href="'. $event_url .'"  title="'. __( 'Edit Event', 'event_espresso' ) .'">' . $registration->event_name() . '</a>';
					?>
					</td>
					<td class="jst-left">
					<?php
							$reg_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$registration->ID() ), REG_ADMIN_URL );
							echo '
							<a href="'.$reg_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">
								View Registration ' . $registration->ID() . '
							</a>';
					?>
					</td>
					<td class="jst-left">
					<?php
						$txn_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$registration->transaction_ID() ), TXN_ADMIN_URL );
						echo '
						<a href="'.$txn_url.'" title="' . __( 'View Transaction Details', 'event_espresso' ) . '">
							View Transaction ' . $registration->transaction_ID() . '
						</a>';
					?>
					</td>
					<td class="jst-left"><?php echo $registration->reg_code();?></td>
					<td class="jst-rght"><?php echo EEH_Template::format_currency( $registration->price_paid() );?></td>
				</tr>
			<?php endforeach; ?>
			</tbody>
		</table>
	</div>
</div>
