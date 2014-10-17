<?php
/**
 * @var $payment_method EE_Payment_Method
 * @var $edit_url string URL to send form submission to
 */
?>
<div class="padding">
	<form method="post" action="<?php echo $edit_url; ?>">
		<table class="form-table">
			<tbody>
				<tr>
					<th></th>
					<td>
						<span class="description">
							<?php printf( __("All fields marked with an asterisk %s are required.", 'event_espresso'), '(*)' );?>
						</span>
					</td>
				</tr>
		<?php if ( $payment_method->type_obj()->requires_https()) : ?>
				<tr>
					<th>
						<label><strong style="color:#F00"><?php _e('IMPORTANT', 'event_espresso'); ?></strong></label>
					</th>
					<td>
						<strong><?php _e('You are responsible for your own website security and Payment Card Industry Data Security Standards (PCI DSS) compliance.', 'event_espresso');?></strong><br />
						<?php _e('Learn more about ', 'event_espresso');?>
						<a href="https://www.pcisecuritystandards.org/merchants/index.php">
							<?php _e('PCI DSS compliance', 'event_espresso');?>
						</a>
					</td>
				</tr>
		<?php endif; ?>
			</tbody>
		</table>

		<?php echo $form->get_html_and_js();?>

		<table class="form-table">
			<tbody>
				<tr>
					<th></th>
					<td>
						<h4><?php _e('Update or Deactivate', 'event_espresso');?></h4>
						<input
							id="save_<?php echo $payment_method->slug(); ?>_settings"
							class="button-primary"
							type="submit"
							name="Submit"
							value="<?php printf(__("Update %s Payment Settings", "event_espresso"),$payment_method->admin_name());?>"
							style=""
							/>
							<a id="deactivate_<?php echo $payment_method->slug(); ?>" class="espresso-button button-secondary" type="submit" href="<?php echo $deactivate_url?>">
								<?php printf(__("Deactivate %s Payments?", "event_espresso"),$payment_method->admin_name()); ?>
							</a>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
	<br />
	<br />
</div>