<?php

function event_espresso_stripe_payment_settings() {
    if (isset($_POST['update_stripe'])) {


        $stripe_settings = array();
        $stripe_settings['stripe_publishable_key'] = $_POST['stripe_publishable_key'];
        $stripe_settings['stripe_secret_key'] = $_POST['stripe_secret_key'];
        $stripe_settings['stripe_currency_symbol'] = $_POST['stripe_currency_symbol'];
        //$stripe_settings['stripe_transaction_prefix'] = $_POST['stripe_transaction_prefix'];

        update_option('event_espresso_stripe_settings', $stripe_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('Stripe settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>

    <div class="metabox-holder">
        <div class="postbox">
        <div title="Click to toggle" class="handlediv"><br /></div>
            <h3 class="hndle">
             <?php _e('Stripe Settings', 'event_espresso'); ?>
            </h3>
			<div class="inside">
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_stripe']) && $_REQUEST['activate_stripe'] == 'true') {
                    add_option("events_stripe_active", 'true', '', 'yes');
                    add_option("event_espresso_stripe_settings", '', '', 'yes');
                }
                if (isset($_REQUEST['reactivate_stripe'])&&$_REQUEST['reactivate_stripe'] == 'true') {
                    update_option('events_stripe_active', 'true');
                }
                if (isset($_REQUEST['deactivate_stripe'])&&$_REQUEST['deactivate_stripe'] == 'true') {
                    update_option('events_stripe_active', 'false');
                }
                echo '<ul>';
                switch (get_option('events_stripe_active')) {
                    case 'false':
                        echo '<li>Stripe Gateway is installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_stripe=true\';" class="green_alert pointer"><strong>' . __('Activate Stripe?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_stripe=true\';" class="red_alert pointer"><strong>' . __('Deactivate Stripe?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_stripe_settings();

                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_stripe=true\';" class="yellow_alert pointer"><strong>' . __('The Stripe addon is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
						</div>
        </div>
    </div>
<?php
}

//Stripe Settings Form
function event_espresso_display_stripe_settings() {
    $stripe_settings = get_option('event_espresso_stripe_settings');

    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="99%" border="0" >
            <tr>
                <td valign="top">
                	<ul>
                        <li>
                            <label for="stripe_secret_key">
                            <?php _e('Stripe Secret Key:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="stripe_secret_key" size="35" value="<?php echo $stripe_settings['stripe_secret_key']; ?>"> <?php echo apply_filters('filter_hook_espresso_help', 'stripe_secret_key') ?>
                        </li>
                        <li>
                            <label for="stripe_publishable_key">
    						<?php _e('Stripe Publishable Key:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="stripe_publishable_key" size="35" value="<?php echo $stripe_settings['stripe_publishable_key']; ?>"> <?php echo apply_filters('filter_hook_espresso_help', 'stripe_publishable_key') ?>
                        </li>
                        <li>
                            <label for="stripe_currency_symbol">
    						<?php _e('Stripe Currency Symbol (usd):', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="stripe_currency_symbol" size="35" value="<?php echo $stripe_settings['stripe_currency_symbol']; ?>"> <?php echo apply_filters('filter_hook_espresso_help', 'stripe_currency_symbol') ?>
                        </li>
                        <?php /* Commenting this out, as this is not required or even used, really
                        <li>
                            <label for="stripe_transaction_prefix">
    						<?php _e('Stripe Transaction Prefix (Terminal):', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="stripe_transaction_prefix" size="35" value="<?php echo $stripe_settings['stripe_transaction_prefix']; ?>">
                        </li>
                        */ ?>
                    </ul>
				</td>
            </tr>
        </table>
        <p>
            <input type="hidden" name="update_stripe" value="update_stripe">
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Stripe Settings', 'event_espresso') ?>" id="save_stripe_settings" />
        </p>
    </form>
    <div id="stripe_currency_symbol" style="display:none">
        <h2>
            <?php _e('Stripe Currency Symbol', 'event_espresso'); ?>
        </h2>
        <p>
            <?php _e('Stripe uses 3-character ISO-4217 codes for specifying currencies in fields and variables.  If you are taking purchases in US Dollars, enter <code>usd</code> here.  Stripe currently only takes payment in USD, but can accept payments from any currency which will be converted to USD at checkout.', 'event_espresso'); ?>
        </p>
    </div>
    <div id="stripe_secret_key" style="display:none">
        <h2>
            <?php _e('Stripe Secret Key', 'event_espresso'); ?>
        </h2>
        <p>
            <?php _e('Enter your <a href="https://manage.stripe.com/#account/apikeys" target="_blank">Secret Key</a> here.  If you are testing the Stripe gateway, use your Test Secret Key, otherwise use your Live Secret Key.', 'event_espresso'); ?>
        </p>
        <p>
            <?php _e('<a href="https://stripe.com/docs/api#authentication" target="_blank">Learn more about API authentication.</a>', 'event_espresso'); ?>
        </p>
    </div>
    <div id="stripe_publishable_key" style="display:none">
        <h2>
            <?php _e('Stripe Publishable Key', 'event_espresso'); ?>
        </h2>
        <p>
            <?php _e('Enter your <a href="https://manage.stripe.com/#account/apikeys" target="_blank">Publishable Key</a> here.  If you are testing the Stripe gateway, use your Test Publishable Key, otherwise use your Live Publishable Key.', 'event_espresso'); ?>
        </p>
        <p>
            <?php _e('<a href="https://stripe.com/docs/api#authentication" target="_blank">Learn more about API authentication.</a>', 'event_espresso'); ?>
        </p>
    </div>
    <?php
}