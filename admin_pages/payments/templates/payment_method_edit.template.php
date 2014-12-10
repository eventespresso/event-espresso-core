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
						<?php if ( ! $payment_method->usable_for_currency( $site_currency_code) ) : ?>
						<tr>
							<th>
								<label><strong style="color:#F00"><?php _e('IMPORTANT', 'event_espresso'); ?></strong></label>
							</th>
							<td>
								<strong><?php printf( __('This payment method does not support the currency set on your site (%s) and so will not appear as an payment option to registrants. Please activate a different payment method or change your site\'s country and associated currency.', 'event_espresso'), $site_currency_code ) ;?></strong><br />
							</td>
						</tr>
						<?php endif; ?>

						<?php $form = $payment_method->type_obj()->settings_form(); echo $form->get_html_and_js();?>



						<tr>
							<th>
									<input
											id="save_<?php echo $payment_method->slug(); ?>_settings"
											class="button-primary"
											type="submit"
											name="Submit"
											value="<?php printf(__("Update %s Payment Settings", "event_espresso"),$payment_method->admin_name());?>"
											style="margin:1em 4em 2em 0"
										/>
							</th>
							<td>
								<p>
									<a id="deactivate_<?php echo $payment_method->slug(); ?>" class="espresso-button button-secondary" type="submit" href="<?php echo $deactivate_url?>">
										<?php printf(__("Deactivate %s Payments?", "event_espresso"),$payment_method->admin_name()); ?>
									</a>
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
</div>