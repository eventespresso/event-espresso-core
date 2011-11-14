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
            <label for="coupon_code">
              <?php _e('Promotional Code','event_espresso'); ?>
              <em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em> </label>
            <input  id="coupon_code" type="text" name="coupon_code" size="25" />
            <a class="thickbox"  href="#TB_inline?height=400&width=500&inlineId=coupon_code_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" /></a>
          </li>
          <li>
            <label><strong>
              <?php _e('Limited quantity active?','event_espresso'); ?>
              </strong></label>
            <?php 
      			echo select_input('use_limit', $values, 'N'); ?>
            <label><strong>
              <?php _e('Quantity:','event_espresso'); ?>
              </strong></label>
            <input type="text" name="quantity" size="7">
            <a class="thickbox"  href="#TB_inline?height=400&width=500&inlineId=qty_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" /></a>
          </li>
          <li>
            <label><strong>
              <?php _e('Expiration active?','event_espresso'); ?>
              </strong></label>
            <?php 
      			echo select_input('use_exp_date', $values, 'N'); ?>
            <label><strong>
              <?php _e('Expiration Date:','event_espresso'); ?>
              </strong></label>
            <input type="text" class="datepicker" size="12" id="exp_date" name="exp_date" />
            <a class="thickbox"  href="#TB_inline?height=400&width=500&inlineId=exp_date_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" /></a>
          </li>
          <li>
            <label><strong>
              <?php _e('Price Discount','event_espresso'); ?>
              </strong></label>
            <input type="text" name="coupon_code_price" size="7" value="<?php echo $coupon_code_price;?>" />
            <label><strong>
              <?php _e('Percentage discount?','event_espresso'); ?>
              </strong></label>
            <?php 
      			echo select_input('use_percentage', $values, 'N'); ?>
                <a class="thickbox"  href="#TB_inline?height=400&width=500&inlineId=discount_amount_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" /></a>
          </li>
          <li>
            <label><strong>
              <?php _e('Promotional Code Description','event_espresso'); ?>
              </strong></label> 
              <a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=description_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a><br />
            <br />
            <textarea rows="5" cols="300" name="coupon_code_description" id="coupon_code_description_new"  class="my_ed"></textarea>
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

