<?php
function add_new_event_discount(){
	?>
<div class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Add a New Promotional Code','event_espresso'); ?>
    </h3>
<div class="inside">
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
      <input type="hidden" name="action" value="add">
      <ul>
        <li>
          <label>
            <?php _e('Promotional Code','event_espresso'); ?>
          </label>
          <input type="text" name="coupon_code" size="25">
        </li>
        <li>
          <label>
            <?php _e('Price Discount','event_espresso'); ?>
          </label>
          <input type="text" name="coupon_code_price">
        </li>
        <li>
          <?php _e('Is this a percentage discount?','event_espresso'); ?>
          <input type="radio" name="use_percentage" <?php echo ($use_percentage=='Y')? 'checked' : '' ?> value="Y">
          <?php _e('Yes','event_espresso'); ?>
          <input type="radio" name="use_percentage" <?php echo ($use_percentage=='N')? 'checked' : '' ?> checked="checked" value="N">
          <?php _e('No','event_espresso'); ?>
        </li>
        <li>
          <?php _e('Promotional Code Description','event_espresso'); ?>
          <br />
          <textarea rows="5" cols="300" name="coupon_code_description" id="coupon_code_description_new"  class="my_ed"></textarea>
        </li>
        <li>
          <p>
            <input class="button-secondary" type="submit" name="add_new_discount" value="<?php _e('Submit','event_espresso'); ?>" id="add_new_discount" />
          </p>
        </li>
      </ul>
    </form>
</div>
  </div>
</div>
<?php 
}