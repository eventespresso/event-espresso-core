<div class="padding">
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Show Additional Payment Options for Pending Payments', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('show_pending_payment_options', $values, $show_pending_payment_options ); ?>
					<span class="description">
						<?php _e('Shows alternate payment options for "Pending Payments" on the Payment Overview page.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>
</div>
