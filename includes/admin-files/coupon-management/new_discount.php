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
		<input type="hidden" name="action" value="add">
		<ul>
		  <li>
			<p class="inputunder">
			<label for="coupon_code">
			  <?php _e('Promotional Code','event_espresso'); ?>
			  <em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em> <?php apply_filters('espresso_help', 'coupon_code_info') ?></label>
			<input  id="coupon_code" type="text" name="coupon_code" size="25" />
			
		  </p>
			</li>
		  <li>
			<p>
			<label><strong>
			  <?php _e('Limited quantity active?','event_espresso'); ?>
			  </strong>
			</label>
			
			<?php 
	  			echo select_input('use_limit', $values, 'N'); ?>
			</p>
			<p>
			<label><strong>
			  <?php _e('Quantity: ','event_espresso'); ?><?php apply_filters('espresso_help', 'qty_info') ?>
			  </strong></label>
			<input type="text" name="quantity" size="7">
		
		  </p>
			</li>
		  
			<li>
			<p>
			<label><strong>
			  <?php _e('Expiration active?','event_espresso'); ?>
			  </strong></label>
			
	  		<?php 	echo select_input('use_exp_date', $values, 'N'); ?>
			</p>
			<p>
			<label><strong>
			  <?php _e('Expiration Date: ','event_espresso'); ?><?php apply_filters('espresso_help', 'exp_date_info') ?>
			  </strong></label>
			<input type="text" class="datepicker" size="12" id="exp_date" name="exp_date" />
		
		  </p>
			</li>
		  
			<li>
			<p>
			<label><strong>
			  <?php _e('Price Discount ','event_espresso'); ?>
			  </strong></label>
			<input type="text" name="coupon_code_price" size="7" value="<?php echo $coupon_code_price;?>" />
			</p>
			<p>
			<label><strong>
			  <?php _e('Percentage discount? ','event_espresso'); ?><?php apply_filters('espresso_help', 'discount_amount_info') ?>
			  </strong></label>
			<?php 
	  			echo select_input('use_percentage', $values, 'N'); ?>
		  </p>
			</li>
		  
			<li>
			<p>
			<label><strong>
			  <?php _e('Promotional Code Description ','event_espresso'); ?><?php apply_filters('espresso_help', 'description_info') ?>
			  </strong></label> 
			 
			<br />
			<textarea rows="5" cols="300" name="coupon_code_description" id="coupon_code_description_new"  class="my_ed"></textarea>
		  </p>
			</li>
		  
			<li>
			<p>
			  <input class="button-secondary" type="submit" name="add_new_discount" value="<?php _e('Submit','event_espresso'); ?>" id="add_new_discount" />
								<?php wp_nonce_field( 'espresso_form_check', 'add_new_promocode' ) ?>
			</p>
		  </li>
		</ul>
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

