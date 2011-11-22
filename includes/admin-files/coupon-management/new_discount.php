<?php
function add_new_event_discount(){
	$values=array(					
				array('id'=>'N','text'=> __('No','event_espresso')),
				array('id'=>'Y','text'=> __('Yes','event_espresso')));
	?>

<div class="metabox-holder">
	<div class="postbox">
		<h3>
			<?php _e('Add a New Promotional Code','event_espresso'); ?>
		</h3>
		<div class="inside">
			<form id="new-promo-code" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="coupon_code">
									<?php _e('Promotional Code ','event_espresso'); ?>
									<?php apply_filters('espresso_help', 'coupon_code_info') ?>
								</label></th>
							<td><input class="regular-text" type="text" name="coupon_code" size="25" value="<?php echo $coupon_code;?>"></td>
						</tr>
						<tr>
							<th><label for="use_limit">
									<?php _e('Limited Quantity','event_espresso'); ?>
									<?php apply_filters('espresso_help', 'qty_info') ?>
								</label></th>
							<td><?php echo select_input('use_limit', $values, $use_limit); ?></td>
						</tr>
						<tr>
							<th><label for="quantity">
									<?php _e('Quantity','event_espresso'); ?>
								</label></th>
							<td><input class="regular-text" type="text" name="quantity" size="7" value="<?php echo $quantity;?>"></td>
						</tr>
						<tr>
							<th><label for="use_exp_date">
									<?php _e('Expiration Active','event_espresso'); ?>
									<?php apply_filters('espresso_help', 'exp_date_info') ?>
								</label></th>
							<td><?php echo select_input('use_exp_date', $values, $use_exp_date); ?></td>
						</tr>
						<tr>
							<th><label for="exp_date">
									<?php _e('Expiration Date','event_espresso'); ?>
								</label></th>
							<td><input type="text" class="datepicker" size="12" id="exp_date" name="exp_date" value="<?php echo isset($exp_date)?$exp_date:''; ?>" /></td>
						</tr>
						<tr>
							<th><label for="coupon_code_price">
									<?php _e('Price Discount','event_espresso'); ?>
								</label></th>
							<td><input class="regular-text" type="text" name="coupon_code_price" size="7" /></td>
						</tr>
						<tr>
							<th><label for="use_percentage">
									<?php _e('Percentage Discount','event_espresso'); ?>
									<?php apply_filters('espresso_help', 'discount_amount_info') ?>
								</label></th>
							<td><?php echo select_input('use_percentage', $values, 'N'); ?></td>
						</tr>
						<tr>
							<th><label>
									<?php _e('Short Description','event_espresso'); ?>
									<?php apply_filters('espresso_help', 'description_info') ?>
								</label></th>
							<td><textarea rows="5" cols="30" name="coupon_code_description" id="coupon_code_description_new"></textarea></td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" name="action" value="add">
				<p>
					<input class="button-secondary" type="submit" name="add_new_discount" value="<?php _e('Submit','event_espresso'); ?>" id="add_new_discount" />
					<?php wp_nonce_field( 'espresso_form_check', 'add_new_promocode' ) ?>
				</p>
			</form>
		</div>
	</div>
</div>
<script type="text/javascript" charset="utf-8">
	//<![CDATA[
		jQuery(document).ready(function() {

			jQuery(".datepicker" ).datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
				showButtonPanel: true
			});
		});				
	//]]>
</script>
<?php 
}


