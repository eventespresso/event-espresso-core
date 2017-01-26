<a id="other-attendees"></a>
<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	<br/>
<?php //echo EEH_Debug_Tools::printr( $event_attendees, 'event_attendees' ); ?>
<?php echo $attendee_notice; ?>
<?php if ( !empty($attendees) ) : ?>
	<div class="admin-primary-mbox-tbl-wrap">
		<table id="reg-admin-transaction-attendees-table" class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( '#', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Name', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Attendee', 'event_espresso' );?></th>
					<th class="jst-rght"><?php _e( 'Price Paid', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Email', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Address', 'event_espresso' );?></th>
					<!--<th class="jst-cntr"><?php _e( 'Actions', 'event_espresso' );?></th>-->
				</tr>
			</thead>
			<tbody>

			<?php foreach ( $attendees as $att_nmbr => $attendee ) : ?>

				<tr class="ee-status-strip reg-status-<?php echo $attendee['STS_ID']; ?>" style="display: table-row;">
					<td class="jst-left"><?php echo $att_nmbr;?></td>
					<td class="jst-left"><?php echo $attendee['event_name'];?></td>
					<td class="jst-left">
						<a href="<?php echo $attendee['att_link']; ?>" title="<?php esc_attr_e( 'View details for this attendee', 'event_espresso' );?>">
							<?php echo $attendee['fname'] . ' ' . $attendee['lname'];?>
						</a>
					</td>
					<td class="jst-rght"><?php echo $currency_sign . ' ' . number_format( $attendee['final_price'], 2 );?></td>
					<td class="jst-left"><?php echo $attendee['email'];?></td>
					<td class="jst-left"><?php echo $attendee['address'];?></td>
					<!--<th class="jst-cntr">view</th>-->
				</tr>

			<?php endforeach; // $attendees?>

			</tbody>
		</table>
	</div>
<?php endif; ?>

</div>
