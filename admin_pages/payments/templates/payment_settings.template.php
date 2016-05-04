<div class="padding">
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Allow Payment-retry for Pending and Deferred Payments?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('show_pending_payment_options', $values, $show_pending_payment_options ); ?>

				</td>
			</tr>
		</tbody>
	</table>
	<p class="description" style="margin-left: 10px;">
		<?php _e("If a payment is marked as 'Pending Payment', or if payment is deferred (ie, an offline gateway like Check, Bank, or Invoice is used), then give registrants the option to retry payment. ", 'event_espresso'); ?>
	</p>
</div>
<?php
$form = new EE_Form_Section_Proper(
	array(
		'name' => 'test',
		'subsections' => array(
			'test' => new EE_Select_Ajax_Model_Rest_Input(
				array(
					'model_name' => 'Event',
				)
			)
		)
	)
);
echo $form->get_html_and_js();
