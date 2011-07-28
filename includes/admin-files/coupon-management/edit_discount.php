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

			}

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

            <?php _e('Price Discount','event_espresso'); ?>

            </strong></label>

          <input type="text" name="coupon_code_price" value="<?php echo $coupon_code_price;?>" />

        </li>

        <li>

          <?php _e('Is this a percentage discount?','event_espresso'); ?>

          <?php $values=array(					

              array('id'=>'N','text'=> __('No','event_espresso')),

              array('id'=>'Y','text'=> __('Yes','event_espresso')));				

      				echo select_input('use_percentage', $values, $use_percentage); ?> 

          

          

         

        </li>

        <li><strong>

          <?php _e('Promotional Code Description','event_espresso'); ?>

          </strong><br />

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

<?php 

}