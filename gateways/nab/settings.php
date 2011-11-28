<?php
function event_espresso_nab_settings() {
    if (isset($_POST['update_nab'])) {
        $nab_settings['nab_merchant_id'] 		= $_POST['nab_merchant_id'];
        $nab_settings['nab_merchant_password'] 	= $_POST['nab_merchant_password'];
        $nab_settings['nab_use_sandbox'] 		= isset($_POST['nab_use_sandbox'])?1:0;
        update_option('event_espresso_nab_settings', $nab_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('NAB Transact Direct Post settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>

    <div class="metabox-holder">
        <div class="postbox">

            <h3>
                <?php _e('NAB Transact Direct Post Settings', 'event_espresso'); ?>
            </h3>
            <div class="padding">
                <?php
                if (!empty($_REQUEST['activate_nab'])) {
                    add_option("events_nab_active", 'true', '', 'yes');
                    add_option("event_espresso_nab_settings", '', '', 'yes');
                }
                if (!empty($_REQUEST['reactivate_nab'])) {
                    update_option('events_nab_active', 'true');
                }
                if (!empty($_REQUEST['deactivate_nab'])) {
                    update_option('events_nab_active', 'false');
                }
                echo '<ul>';
                switch (get_option('events_nab_active')) {
                    case 'false':
                        echo '<li>nab PRO is installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_nab=true\';" class="green_alert pointer"><strong>' . __('Activate NAB Transact Direct Post?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_nab=true\';" class="red_alert pointer"><strong>' . __('Deactivate NAB Transact Direct Post?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_nab_settings();
                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_nab=true\';" class="yellow_alert pointer"><strong>' . __('The NAB Transact Direct Post support is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
        </div>
    </div>
<?php

}

//nab Settings Form
function event_espresso_display_nab_settings() {
    $nab_settings = get_option('event_espresso_nab_settings');
    if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/nab/btn_stdCheckout2.gif")) {
        $button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/nab/btn_stdCheckout2.gif";
    } else {
        $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/nab/btn_stdCheckout2.gif";
    }
    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="99%" border="0" cellspacing="5" cellpadding="5">
            <tr>
                <td valign="top"><ul>
                        <li>
                            <label for="nab_id">
                                <?php _e('NAB Merchant ID', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="nab_merchant_id" size="35" value="<?php echo $nab_settings['nab_merchant_id']; ?>">
                            <br />
                        </li>
                        <li>
                            <label for="nab_id">
                                <?php _e('NAB Merchant Password', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="password" name="nab_merchant_password" size="35" value="<?php echo $nab_settings['nab_merchant_password']; ?>">
                            <br />
                        </li>
                        <li>
                            <label for="nab_use_sandbox">
                                <?php _e('Use NAB Transact Direct Post in test mode', 'event_espresso'); ?>?
                            </label>
                            <input name="nab_use_sandbox" type="checkbox" value="Test Reference" <?php echo $nab_settings['nab_use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
                            <br />
                            <?php _e('(Make sure you enter the test credentials above.)', 'event_espresso'); ?>
                        </li>

                    </ul></td>
            </tr>
        </table>
        <p>
            <input type="hidden" name="update_nab" value="update_nab">
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update NAB Settings', 'event_espresso') ?>" id="save_nab_settings" />
        </p>
    </form>
    <?php
}