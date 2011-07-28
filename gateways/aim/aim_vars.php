<?php
$authnet_aim_settings = get_option('event_espresso_authnet_aim_settings');
$use_sandbox = empty($authnet_aim_settings['use_sandbox']) ? false : $authnet_aim_settings['use_sandbox'];
if ($use_sandbox == true) {
    echo '<p>Test credit card # 4007000000027</p>';
    echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
}
?>

<p><strong><?php _e('Billing Information', 'event_espresso') ?></strong></p>
<form id="aim_payment_form" name="aim_payment_form" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?>">
    <p>
        <label for="first_name"><?php _e('First Name', 'event_espresso'); ?></label>
        <input name="first_name" type="text" id="first_name" value="<?php echo $fname ?>" />
    </p>
    <p>
        <label for="last_name"><?php _e('Last Name', 'event_espresso'); ?></label>
        <input name="last_name" type="text" id="last_name" value="<?php echo $lname ?>" />
    </p>
    <p>
        <label for="email"><?php _e('Email Address', 'event_espresso'); ?></label>
        <input name="email" type="text" id="email" value="<?php echo $attendee_email ?>" />
    </p>
    <p>
        <label for="address"><?php _e('Address', 'event_espresso'); ?></label>
        <input name="address" type="text" id="address" value="<?php echo $address ?>" />
    </p>
    <p>
        <label for="city"><?php _e('City', 'event_espresso'); ?></label>
        <input name="city" type="text" id="city" value="<?php echo $city ?>" />
    </p>
    <p>
        <label for="state"><?php _e('State', 'event_espresso'); ?></label>
        <input name="state" type="text" id="state" value="<?php echo $state ?>" />
    </p>
    <p>
        <label for="zip"><?php _e('Zip', 'event_espresso'); ?></label>
        <input name="zip" type="text" id="zip" value="<?php echo $zip ?>" />
    </p>
    <p><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></p>
    <p>
        <label for="card_num"><?php _e('Card Number', 'event_espresso'); ?></label>
        <input type="text" name="card_num" id="card_num" />
    </p>
    <p>
        <label for="exp_date"><?php _e('Exp. Date', 'event_espresso'); ?></label>
        <input type="text" name="exp_date" id="exp_date" />
    </p>
    <input name="amount" type="hidden" value="<?php echo number_format($event_cost, 2) ?>" />
    <input name="invoice_num" type="hidden" value="<?php echo 'au-' . event_espresso_session_id() ?>" />
    <input name="authnet_aim" type="hidden" value="true" />
    <input name="x_cust_id" type="hidden" value="<?php echo $attendee_id ?>" />

    <input name="aim_submit" type="submit" value="<?php _e('Complete Purchase', 'event_espresso'); ?>" />
</form>

<div style=" clear:both; margin-bottom:10px;"></div>
