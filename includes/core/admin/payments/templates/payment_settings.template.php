<div class="padding">
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Show Additional Payment Methods for Pending Payments', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('show_pending_payment_options', $values, $show_pending_payment_options ); ?>
					<p class="description">
						<?php _e("If a payment is marked as 'Pending Payment' (which is always the case for Payment Methods like 'Invoice', 'Bank', and 'Check'), then give registrants the option to try paying with a different payment method.", 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>
</div>
