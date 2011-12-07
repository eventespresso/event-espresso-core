<?php

function edit_event_discount(){

	global $wpdb;
	$discount_id = $_REQUEST['discount_id'];
	 $event_discounts = $wpdb->get_results("SELECT * FROM " . EVENTS_DISCOUNT_CODES_TABLE . " WHERE id = " . $discount_id);
			foreach ($event_discounts as $event_discount){
				$discount_id = $event_discount->id;
				$coupon_code = $event_discount->coupon_code;
				$coupon_code_price = $event_discount->coupon_code_price;
				$coupon_code_description = $event_discount->coupon_code_description;
				$use_percentage = $event_discount->use_percentage;
				
				$quantity = $event_discount->quantity;
				$use_limit = $event_discount->use_limit;
				$use_exp_date = $event_discount->use_exp_date;
				$exp_date = $event_discount->exp_date;
			}
	$values=array(					
		array('id'=>'N','text'=> __('No','event_espresso')),
		array('id'=>'Y','text'=> __('Yes','event_espresso'))
	);
?>

<!--Add discount display-->

<div class="metabox-holder">
	<div class="postbox">
		<h3>
			<?php _e('Edit Code','event_espresso'); ?>
			</h3>
		<div class="inside">
			<form id="edit-promo-code" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
			<h4><?php echo $coupon_code ?></h4>
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="coupon_code">
								<?php _e('Promotional Code ','event_espresso'); ?>
								<?php echo apply_filters('espresso_help', 'coupon_code_info') ?>
							</label></th>
							<td><input class="regular-text" type="text" name="coupon_code" size="25" value="<?php echo $coupon_code;?>"></td>
						</tr>
						<tr>
							<th><label for="use_limit">
								<?php _e('Limited Quantity','event_espresso'); ?>
								<?php echo apply_filters('espresso_help', 'qty_info') ?>
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
								<?php echo apply_filters('espresso_help', 'exp_date_info') ?>
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
							<td><input class="regular-text" type="text" name="coupon_code_price" size="7" value="<?php echo $coupon_code_price;?>" /></td>
						</tr>
						<tr>
							<th><label for="use_percentage">
								<?php _e('Percentage Discount','event_espresso'); ?>
								<?php echo apply_filters('espresso_help', 'discount_amount_info') ?>
							</label></th>
							<td><?php echo select_input('use_percentage', $values, $use_percentage); ?></td>
						</tr>
						<tr>
							<th><label for="coupon_code_description">
								<?php _e('Short Description','event_espresso'); ?>
								<?php echo apply_filters('espresso_help', 'description_info') ?>
								</label></th>
							<td><textarea rows="5" cols="30" name="coupon_code_description" id="coupon_code_description_new"><?php echo $coupon_code_description; ?></textarea></td>
						</tr>
						
					</tbody>
				</table>
				<input type="hidden" name="discount_id" value="<?php echo $discount_id; ?>">
				<input type="hidden" name="action" value="update">
				<p>
							<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update','event_espresso'); ?>" id="update_discount" />
							<?php wp_nonce_field( 'espresso_form_check', 'edit_promocode' ) ?>
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
