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
				</tr>
			</thead>
			<tbody>
		<?php if ( isset( $event_attendees ) && is_array( $event_attendees )) : ?>
			<?php foreach ( $event_attendees as $event => $attendees ) : ?>
				<?php foreach ( $attendees as $att_nmbr => $attendee ) : ?>
					<?php //echo printr( $attendee, '$attendee' ); 
						$att = $attendee['att_obj'];
						$reg = $attendee['reg_obj'];
					?>
				<tr>
					<td class="jst-left"><?php echo$att_nmbr;?></td>
					<td class="jst-left"><?php echo $event;?></td>
					<td class="jst-left">
						<?php 
						$attendee_name = $att->fname() != '' ? $att->fname() : $attendee['fname'];
						$attendee_name .= $att->lname() != '' ? ' ' . $att->lname() : ' ' . $attendee['lname'];
						$att_link = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$att->ID() ), ATT_ADMIN_URL ), 'edit_attendee_nonce' ); 
						?>
						<a href="<?php echo $att_link; ?>" title="<?php _e( 'View details for this attendee', 'event_espresso' );?>">
							<?php echo $attendee_name;?>
						</a>					
					</td>
					<?php $price_paid = is_object( $reg ) && $reg->price_paid() != '' ? $reg->price_paid() : $attendee['price_paid']; ?>
					<td class="jst-rght"><?php echo $currency_sign . ' ' . number_format( $price_paid, 2 );?></td>
					<td class="jst-left"><?php echo $att->email() != '' ? $att->email() : $attendee['email'];?></td>
					<td class="jst-left">
						<?php
							echo $att->address() != '' ? $att->address() . ', ' : '';
							echo $att->city() != '' ? $att->city() . ', ' : '';
							echo $att->state_ID() != '' ? $att->state_ID() . ', ' : '';
							echo $att->zip();
						?>
					</td>
				</tr>
				<?php endforeach; // $attendees?>
			<?php endforeach; // $event_attendees?>
		<?php endif; // isset( $event_attendees )?>
			</tbody>
		</table>
	</div>

</div>
