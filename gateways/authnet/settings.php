<?php

function event_espresso_authnet_payment_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    if (isset($_POST['update_authnet'])) {
        //$authnet_settings = get_option('event_espresso_authnet_settings');
        $authnet_settings['authnet_login_id'] = $_POST['authnet_login_id'];
        $authnet_settings['authnet_transaction_key'] = $_POST['authnet_transaction_key'];
        $authnet_settings['image_url'] = $_POST['image_url'];
        $authnet_settings['use_sandbox'] = $_POST['use_sandbox'];
        $authnet_settings['surcharge'] = $_POST['surcharge'];
        $authnet_settings['bypass_payment_page'] = $_POST['bypass_payment_page'];
        $authnet_settings['button_url'] = $_POST['button_url'];
        update_option('event_espresso_authnet_settings', $authnet_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('Authorize.net settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>
    <div class="metabox-holder">
        <div class="postbox">
            <h3>
                <?php _e('Authorize.net SIM Settings', 'event_espresso'); ?>
            </h3>
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_authnet'])&&$_REQUEST['activate_authnet'] == 'true') {
                    add_option("events_authnet_active", 'true', '', 'yes');
                    add_option("event_espresso_authnet_settings", '', '', 'yes');
                    //update_option( 'event_espresso_payment_gateway', 'authnet');
                }
                if (isset($_REQUEST['reactivate_authnet'])&&$_REQUEST['reactivate_authnet'] == 'true') {
                    update_option('events_authnet_active', 'true');
                    //update_option( 'event_espresso_payment_gateway', 'authnet');
                }
                if (isset($_REQUEST['deactivate_authnet'])&&$_REQUEST['deactivate_authnet'] == 'true') {
                    update_option('events_authnet_active', 'false');
                    //update_option( 'event_espresso_payment_gateway', '');
                }
                echo '<ul>';
                switch (get_option('events_authnet_active')) {
                    case 'false':
                        echo '<li>Authorize.net SIM Gateway is Installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_authnet=true\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet=true\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_authnet_settings();
                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet=true\';" class="yellow_alert pointer"><strong>' . __('The Authorize.net  SIM Gateway is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
        </div>
    </div>
    <?php
}

//Authorize.net SIM Settings Form
function event_espresso_display_authnet_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    $authnet_settings = get_option('event_espresso_authnet_settings');
    $org_options = get_option('events_organization_settings');

    //Get the current button URL
    if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif")) {
        $button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif";
    } else {
        $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/btn_cc_vmad.gif";
    }
    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="99%" border="0">
            <tr>
                <td valign="top"><ul>
                        <li>
                            <label for="authnet_login_id">
                                <?php _e('Authorize.net Login I.D.', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="authnet_login_id" size="35" value="<?php echo $authnet_settings['authnet_login_id']; ?>">
                        </li>
                        <li>
                            <label for="authnet_transaction_key">
                                <?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="authnet_transaction_key" size="35" value="<?php echo $authnet_settings['authnet_transaction_key']; ?>">
                        </li>
                        <li>
                            <label for="button_url">
    <?php _e('Button Image URL: ', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="button_url" size="35" value="<?php echo (($authnet_settings['button_url'] == '') ? $button_url : $authnet_settings['button_url'] ); ?>" />
                            <a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
                            <a class="ev_reg-fancylink" href="#button_image"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a></li>
                        <li>
                            <label for="image_url">
                            <?php _e('Image URL:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="image_url" size="35" value="<?php echo $authnet_settings['image_url']; ?>" />
                            <a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
                            <a class="ev_reg-fancylink" href="#authnet_image_url_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a><br />
    <?php _e('(used for your business/personal logo on the Authorize.net SIM payment page)', 'event_espresso'); ?>
                        </li>
                    </ul></td>
                <td valign="top"><ul>
                        <li>
    <?php _e('Relay Response URL :', 'event_espresso'); ?>
                            <br />
                            <span class="display-path" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;"><?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?></span> &nbsp;<a class="ev_reg-fancylink" href="#relay_response"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
                        <li>
                            <label for="use_sandbox">
                                <?php _e('Use the test mode feature for Autorize.net SIM?', 'event_espresso'); ?>
                            </label>
                            <input name="use_sandbox" type="checkbox" value="1" <?php echo $authnet_settings['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
                            <a class="ev_reg-fancylink" href="#authnet_sandbox"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
                        <li>
                            <label for="bypass_payment_page">
    <?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?>
                            </label>
                            <?php
                            $values = array(
                                array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
                                array('id' => 'N', 'text' => __('No', 'event_espresso')));
                            echo select_input('bypass_payment_page', $values, $authnet_settings['bypass_payment_page']);
                            ?>
                            &nbsp;<a class="ev_reg-fancylink" href="#bypass_confirmation"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
                        <li>
    <?php _e('Current Button Image:', 'event_espresso'); ?>
                            <br />
    <?php echo (($authnet_settings['button_url'] == '') ? '<img src="' . $button_url . '" />' : '<img src="' . $authnet_settings['button_url'] . '" />'); ?></li>
                    </ul></td>
            </tr>
        </table>
        <p>
            <input type="hidden" name="update_authnet" value="update_authnet">
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net SIM Settings', 'event_espresso') ?>" id="save_authnet_settings" />
        </p>
    </form>
    <div id="relay_response" style="display:none">
        <h2><?php _e('Relay Response', 'event_espresso'); ?></h2>
        <p><?php _e('This shows the specific the URL to which the gateway should return the relay response for a transaction. This the page should be set in your Authorize.net account. Login to Authorize.net, goto Account > Response/Receipt URLs > Add URL and enter the following URL.', 'event_espresso'); ?></p>
        <p><strong><?php _e('Relay Response URL:', 'event_espresso'); ?></strong> <?php echo home_url() . '/?page_id=' . $org_options['notify_url'] ?><br />
            <span style="color:red;"><?php _e('Note:', 'event_espresso'); ?></span> <?php _e('This URL can be changed in the "Organization Settings" page.', 'event_espresso'); ?></p>
        <p><?php _e('For complete information on configuring relay response, please refer to', 'event_espresso'); ?> <a href="https://account.authorize.net/help/Merchant_Interface_RoboHelp_Project.htm#Miscellaneous/Reference.htm%3E%3Epan=2"><?php _e('Reference &amp; User Guides', 'event_espresso'); ?></a>.</p>
    </div>
    <div id="authnet_image_url_info" style="display:none">
        <h2>
    <?php _e('Authorize.net SIM Image URL (logo for payment page)', 'event_espresso'); ?>
        </h2>
        <p>
    <?php _e('The URL of the image displayed as your logo in the header of the Authorize.net checkout pages.', 'event_espresso'); ?>
        </p>
    </div>
    <div id="authnet_sandbox" style="display:none">
        <h2><?php _e('Authorize.net Test Mode', 'event_espresso'); ?></h2>
        <p><?php _e('Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?></p><p>370000000000002 (<?php _e('American Express', 'event_espresso'); ?>)<br />6011000000000012 (<?php _e('Discover', 'event_espresso'); ?>)<br />5424000000000015 (<?php _e('Master Card', 'event_espresso'); ?>)<br />4007000000027 (<?php _e('Visa', 'event_espresso'); ?>)</p>
    </div>
    <?php
}