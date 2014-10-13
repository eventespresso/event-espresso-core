<?php
/**
 * @var $payment_method EE_Payment_Method
 * @var $activate_url string url to activate this payment method
 */
?>
<div class="padding">
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label><?php _e('Click to Activate', 'event_espresso'); ?></label>
				</th>
				<td>
					
					<a id="activate_<?php echo $payment_method->slug()?>" class="espresso-button-green button-primary" href="<?php echo $activate_url?>">
						<?php printf(__("Activate %s Payment Method?", "event_espresso"),$payment_method->admin_name()); ?>
					</a>
				</td>
			</tr>
		</tbody>
	</table>
</div>