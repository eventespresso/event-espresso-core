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
				array('id'=>'Y','text'=> __('Yes','event_espresso')));
	?>

<!--Add event display-->

<div class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Edit Code:','event_espresso'); ?>
      <?php echo $coupon_code ?></h3>
    <div class="inside">
      <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="discount_id" value="<?php echo $discount_id; ?>">
        <input type="hidden" name="action" value="update">
        <ul>
          <li>
            <label><strong>
              <?php _e('Promotional Code:','event_espresso'); ?>
              </strong></label>
            <input type="text" name="coupon_code" size="25" value="<?php echo $coupon_code;?>">
          </li>
          <li>
            <label><strong>
              <?php _e('Limited quantity?','event_espresso'); ?>
              </strong></label>
            <?php 
      			echo select_input('use_limit', $values, $use_limit); ?>
                <label><strong>
              <?php _e('Quantity:','event_espresso'); ?>
              </strong></label>
            <input type="text" name="quantity" size="7" value="<?php echo $quantity;?>">
          </li>
          
          <li>
            <label><strong>
              <?php _e('Expires?','event_espresso'); ?>
              </strong></label>
            <?php 
      			echo select_input('use_exp_date', $values, $use_exp_date); ?>
                <label><strong>
              <?php _e('Expiration Date:','event_espresso'); ?>
              </strong></label>
            <input type="text" class="datepicker" size="12" id="exp_date" name="exp_date" value="<?php echo isset($exp_date)?$exp_date:''; ?>"/>
          </li>
      
          <li>
            <label><strong>
              <?php _e('Price Discount','event_espresso'); ?>
              </strong></label>
            <input type="text" name="coupon_code_price" size="7" value="<?php echo $coupon_code_price;?>" />
             <label><strong><?php _e('Percentage discount?','event_espresso'); ?></strong></label>
            <?php 
      			echo select_input('use_percentage', $values, $use_percentage); ?>
          </li>
         
          <li><label><strong>
            <?php _e('Promotional Code Description','event_espresso'); ?>
            </strong></label><br />
            <textarea rows="5" cols="30" name="coupon_code_description" id="coupon_code_description_new"><?php echo $coupon_code_description; ?></textarea>
          </li>
          <li>
            <p>
              <input class="button-secondary" type="submit" name="Submit" value="<?php _e('Update','event_espresso'); ?>" id="update_discount" />
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