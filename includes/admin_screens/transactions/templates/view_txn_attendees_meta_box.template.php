<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	<br/>
<?php //echo printr( $event_attendees, 'event_attendees' ); ?>
	<div class="admin-primary-mbox-tbl-wrap">
		<table class="admin-primary-mbox-tbl">
			<thead>
				<tr>
					<th class="jst-left"><?php _e( '#', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Event Name', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Attendee', 'event_espresso' );?></th>
					<th class="jst-rght"><?php _e( 'Price Paid', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Email', 'event_espresso' );?></th>
					<th class="jst-left"><?php _e( 'Address', 'event_espresso' );?></th>
					<th class="jst-cntr"><?php _e( 'Actions', 'event_espresso' );?></th>
				</tr>
			</thead>
			<tbody>
	<?php foreach ( $event_attendees as $event_name => $attendees ) : ?>
	<?php //echo printr( $attendee, 'attendee' ); ?>
		<?php foreach ( $attendees as $attendee ) : ?>
			<?php foreach ( $attendee as $att_nmbr => $att_details ) : ?>
				<?php //echo printr( $att_detail, '$att_detail' ); ?>
				<tr>
					<td class="jst-left"><?php echo$att_nmbr;?></td>
					<td class="jst-left"><?php echo $event_name;?></td>
					<td class="jst-left"><?php echo $att_details['fname'] . ' ' . $att_details['lname'];?></td>
					<td class="jst-rght"><?php echo $currency_sign . ' ' . number_format( $att_details['price_paid'], 2 );?></td>
					<td class="jst-left"><?php echo $att_details['email'];?></td>
					<td class="jst-left">
						<?php
							echo isset( $att_details['address'] ) ? $att_details['address'] . ', ' : '';
							echo isset( $att_details['city'] ) ? $att_details['city'] . ', ' : '';
							echo isset( $att_details['state'] ) ? $att_details['state'] . ', ' : '';
							echo isset( $att_details['zip'] ) ? $att_details['zip']  : '';
						?>
					</td>
					<th class="jst-cntr"><a href="" title="View details for this attendee">view</a></th>
				</tr>
			<?php endforeach; // $attendee?>
		<?php endforeach; // $attendees?>
	<?php endforeach; // $event_attendees?>
			</tbody>
		</table>
	</div>

</div>
