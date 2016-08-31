<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	<br/>
<?php //echo EEH_Debug_Tools::printr( $event_attendees, 'event_attendees' ); ?>
	<div class="admin-primary-mbox-tbl-wrap">
		<table id="txn-admin-transaction-attendees-table" class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( '#', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Name and Ticket', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Registrant', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Ticket Price', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Email', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Address', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
		<?php if ( isset( $event_attendees ) && is_array( $event_attendees )) : ?>
			<?php foreach ( $event_attendees as $registration => $attendee ) : ?>
				<tr class="ee-status-strip reg-status-<?php echo $attendee['STS_ID']; ?>" style="display: table-row;">
					<td class="jst-left"><?php echo $attendee['att_num'];?></td>
					<td class="jst-left"><?php echo $attendee['event_ticket_name'];?></td>
					<td class="jst-left">
						<?php
						$att_link = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$registration), REG_ADMIN_URL );
						?>
						<a href="<?php echo $att_link; ?>" title="<?php _e( 'View details for this registrant', 'event_espresso' );?>">
							<?php echo $attendee['attendee']?>
						</a>
					</td>
					<td class="jst-rght"><?php echo $attendee['ticket_price']; ?></td>
					<td class="jst-left"><?php echo $attendee['email']; ?></td>
					<td class="jst-left"><?php echo $attendee['address']; ?>
					</td>
				</tr>
			<?php endforeach; // $event_attendees?>
		<?php endif; // isset( $event_attendees )?>
			</tbody>
		</table>
	</div>

</div>
