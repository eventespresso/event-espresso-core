<?php

function event_espresso_aim_payment_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    if (isset($_POST['update_authnet_aim'])) {
        //$authnet_aim_settings = get_option('event_espresso_authnet_aim_settings');
        $authnet_aim_settings['authnet_aim_login_id'] = $_POST['authnet_aim_login_id'];
        $authnet_aim_settings['authnet_aim_transaction_key'] = $_POST['authnet_aim_transaction_key'];
        $authnet_aim_settings['image_url'] = $_POST['image_url'];
        $authnet_aim_settings['use_sandbox'] = $_POST['use_sandbox'];
        $authnet_aim_settings['surcharge'] = $_POST['surcharge'];
        $authnet_aim_settings['button_url'] = $_POST['button_url'];
        update_option('event_espresso_authnet_aim_settings', $authnet_aim_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('Authorize.net AIM settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>
    <div class="metabox-holder">
        <div class="postbox">
					<div title="Click to toggle" class="handlediv"><br /></div>
            <h3 class="hndle">
                <?php _e('Authorize.net AIM Settings', 'event_espresso'); ?>
            </h3>
							<div class="inside">
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_authnet_aim'])&&$_REQUEST['activate_authnet_aim'] == 'true') {
                    add_option("events_authnet_aim_active", 'true', '', 'yes');
                    add_option("event_espresso_authnet_aim_settings", '', '', 'yes');
                }
                if (isset($_REQUEST['reactivate_authnet_aim'])&&$_REQUEST['reactivate_authnet_aim'] == 'true') {
                    update_option('events_authnet_aim_active', 'true');
                }
                if (isset($_REQUEST['deactivate_authnet_aim'])&&$_REQUEST['deactivate_authnet_aim'] == 'true') {
                    update_option('events_authnet_aim_active', 'false');
                }
                echo '<ul>';
                switch (get_option('events_authnet_aim_active')) {
                    case 'false':
                        echo '<li>' . __('Authorize.net AIM Gateway is Installed.', 'event_espresso') . '</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_authnet_aim=true\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net AIM Gateway?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet_aim=true\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net AIM Gateway?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_authnet_aim_settings();
                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet_aim=true\';" class="yellow_alert pointer"><strong>' . __('The Authorize.net AIM gateway is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
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

//Authorize.net Settings Form
function event_espresso_display_authnet_aim_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    $authnet_aim_settings = get_option('event_espresso_authnet_aim_settings');
    $org_options = get_option('events_organization_settings');

    //Get the current button URL
    if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/aim/btn_cc_vmad.gif")) {
        $button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/aim/btn_cc_vmad.gif";
    } else {
        $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/aim/btn_cc_vmad.gif";
    }
    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="99%" border="0">
            <tr>
                <td valign="top"><ul>
                        <li style="width:50%"><p><strong style="color:#F00"><?php _e('WARNING!', 'event_espresso'); ?></strong> <?php _e('You are responsible for your own security and PCI compliance.', 'event_espresso'); ?></p></li>
                        <li>
                            <label for="authnet_aim_login_id">
                                <?php _e('Authorize.net AIM Login I.D.', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="authnet_aim_login_id" size="35" value="<?php echo $authnet_aim_settings['authnet_aim_login_id']; ?>">
                        </li>
                        <li>
                            <label for="authnet_aim_transaction_key">
    <?php _e('Authorize.net AIM Transaction Key', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="authnet_aim_transaction_key" size="35" value="<?php echo $authnet_aim_settings['authnet_aim_transaction_key']; ?>">
                        </li>
                    </ul></td>
                <td valign="top">
                    <ul>
                        <li>
                            <label for="use_sandbox">
    <?php _e('Use the test mode feature for Autorize.net AIM?', 'event_espresso'); ?>
                            </label>
                            <input name="use_sandbox" type="checkbox" value="1" <?php echo $authnet_aim_settings['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
                            <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=authnet_aim_sandbox"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
                    </ul></td>
            </tr>
        </table>
        <p>
            <input type="hidden" name="update_authnet_aim" value="update_authnet_aim">
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net AIM Settings', 'event_espresso') ?>" id="save_authnet_aim_settings" />
        </p>
    </form>

    <div id="authnet_aim_sandbox" style="display:none">
        <h2><?php _e('Authorize.net AIM Test Mode', 'event_espresso'); ?></h2>
        <p><?php _e('Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?></p><p>370000000000002 (<?php _e('American Express', 'event_espresso'); ?>)<br />6011000000000012 (<?php _e('Discover', 'event_espresso'); ?>)<br />5424000000000015 (<?php _e('Master Card', 'event_espresso'); ?>)<br />4007000000027 (<?php _e('Visa', 'event_espresso'); ?>)</p>
    </div>
    <?php
}
