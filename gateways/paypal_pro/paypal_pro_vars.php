<?php
$paypal_pro_settings = get_option('event_espresso_paypal_pro_settings');
$use_sandbox = empty($paypal_pro_settings['paypal_pro_use_sandbox']) ? false : $paypal_pro_settings['paypal_pro_use_sandbox'];
if ($use_sandbox == true) {
    echo '<p>Test Master Card # 5424180818927383</p>';
    echo '<p>Exp: 10/2012</p>';
    echo '<p>CVV2: 123 </p>';
    echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
}
?>

<p><strong><?php _e('Billing Information', 'event_espresso') ?></strong></p>
<form id="paypal_pro_payment_form" name="paypal_pro_payment_form" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?>">
    <p>
        <label for="first_name"><?php _e('First Name', 'event_espresso'); ?></label>
        <input name="first_name" type="text" id="first_name" class="required" value="<?php echo $fname ?>" />
    </p>
    <p>
        <label for="last_name"><?php _e('Last Name', 'event_espresso'); ?></label>
        <input name="last_name" type="text" id="last_name" class="required" value="<?php echo $lname ?>" />
    </p>
    <p>
        <label for="email"><?php _e('Email Address', 'event_espresso'); ?></label>
        <input name="email" type="text" id="email" class="required" value="<?php echo $attendee_email ?>" />
    </p>
    <p>
        <label for="address"><?php _e('Address', 'event_espresso'); ?></label>
        <input name="address" type="text" id="address" class="required" value="<?php echo $address ?>" />
    </p>
    <p>
        <label for="city"><?php _e('City', 'event_espresso'); ?></label>
        <input name="city" type="text" id="city" class="required" value="<?php echo $city ?>" />
    </p>
    <p>
        <label for="state"><?php _e('State', 'event_espresso'); ?></label>
        <input name="state" type="text" id="state" class="required" value="<?php echo $state ?>" />
    </p>
    <p>
        <label for="zip"><?php _e('Zip', 'event_espresso'); ?></label>
        <input name="zip" type="text" id="zip" class="required" value="<?php echo $zip ?>" />
    </p>
    <p><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></p>
    <p>
        <label for="card_num"><?php _e('Card Card Type', 'event_espresso'); ?></label>
        <select name ="creditcardtype" class="required">

<?php
foreach (explode(",", $paypal_pro_settings['paypal_api_credit_cards']) as $k => $v)
    echo "<option value='$v'>$v</option>";
?>

        </select>

    </p>
    <p>
        <label for="card_num"><?php _e('Card Number', 'event_espresso'); ?></label>
        <input type="text" name="card_num" class="required" id="card_num" />
    </p>


    <p>
        <label for="card_num"><?php _e('Expiration Month', 'event_espresso'); ?></label>
        <select name ="expmonth" class="required">

<?php
for ($i = 1; $i < 13; $i++)
    echo "<option value='$i'>$i</option>";
?>

        </select>

    </p>

    <p>
        <label for=""><?php _e('Expiration Year', 'event_espresso'); ?></label>
        <select name ="expyear" class="required">

<?php
$curr_year = date("Y");
for ($i = 0; $i < 10; $i++) {
    $disp_year = $curr_year + $i;
    echo "<option value='$disp_year'>$disp_year</option>";
}
?>

        </select>

    </p>

    <p>
        <label for="cvv"><?php _e('CVV Code', 'event_espresso'); ?></label>
        <input type="text" name="cvv" id="exp_date" />
    </p>
    <input name="amount" type="hidden" value="<?php echo number_format($event_cost, 2) ?>" />
    <input name="paypal_pro" type="hidden" value="true" />
    <input name="id" type="hidden" value="<?php echo $attendee_id ?>" />

    <input name="paypal_pro_submit" type="submit" value="<?php _e('Complete Purchase', 'event_espresso'); ?>" />
    <span id="processing"></span>
</form>

<div style=" clear:both; margin-bottom:10px;"></div>


<script>

    jQuery(function(){

        jQuery('#paypal_pro_payment_form').validate();

        jQuery('#paypal_pro_payment_form').submit(function(){

            if (jQuery('#paypal_pro_payment_form').valid()){
                jQuery('#processing').html('<img src="' + EEGlobals.plugin_url + 'images/ajax-loader.gif">');
                //jQuery(':input[name="paypal_pro_submit"]').attr('disabled', 'disabled');
            }

        })




    });


</script>