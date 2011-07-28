<?php

function event_espresso_bank_payment_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    if (isset($_POST['update_bank_deposit_settings'])) {
        //$bank_deposit_settings_settings = get_option('event_espresso_bank_deposit_settings_settings');
        $bank_deposit_settings['account_name'] = $_POST['account_name'];
        $bank_deposit_settings['bank_title'] = $_POST['bank_title'];
        $bank_deposit_settings['bank_instructions'] = $_POST['bank_instructions'];
        $bank_deposit_settings['bank_name'] = $_POST['bank_name'];
        $bank_deposit_settings['bank_account'] = $_POST['bank_account'];
        $bank_deposit_settings['bank_address'] = $_POST['bank_address'];
        update_option('event_espresso_bank_deposit_settings', $bank_deposit_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('Electronic Funds Transfer settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>

    <div class="metabox-holder">
        <div class="postbox">
            <h3>
                <?php _e('Electronic Funds Transfer Settings', 'event_espresso'); ?>
            </h3>
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_bank_payment'])&&$_REQUEST['activate_bank_payment'] == 'true') {
                    add_option("events_bank_payment_active", 'true', '', 'yes');
                    add_option("event_espresso_bank_deposit_settings", '', '', 'yes');
                    //update_option( 'event_espresso_payment_gateway', 'bank_payment');
                }
                if (isset($_REQUEST['reactivate_bank_payment'])&&$_REQUEST['reactivate_bank_payment'] == 'true') {
                    update_option('events_bank_payment_active', 'true');
                    //update_option( 'event_espresso_payment_gateway', 'bank_payment');
                }
                if (isset($_REQUEST['deactivate_bank_payment'])&&$_REQUEST['deactivate_bank_payment'] == 'true') {
                    update_option('events_bank_payment_active', 'false');
                    //update_option( 'event_espresso_payment_gateway', '');
                }
                echo '<ul>';
                switch (get_option('events_bank_payment_active')) {
                    case 'false':
                        echo '<li>Electronic Funds Transfers is installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_bank_payment=true\';" class="green_alert pointer"><strong>' . __('Activate Electronic Funds Transfers?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_bank_payment=true\';" class="red_alert pointer"><strong>' . __('Deactivate Electronic Funds Transfers?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_bank_deposit_settings();
                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_bank_payment=true\';" class="yellow_alert pointer"><strong>' . __('The Electronic Funds Transfers is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
        </div>
    </div>
    <?php } ?>
<?php

//Electronic Funds Transfers Settings Form
function event_espresso_display_bank_deposit_settings() {
    global $org_options;
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    $bank_deposit_settings = get_option('event_espresso_bank_deposit_settings');
    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="90%" border="0">
            <tr>
                <td valign="top"><ul>
                        <li>
                            <label for="bank_title">
    <?php _e('Title:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="bank_title" size="30" value="<?php echo $bank_deposit_settings['bank_title'] == '' ? __('Electronic Funds Transfers', 'event_espresso') : $bank_deposit_settings['bank_title']; ?>" />
                        </li>
                        <li>
                            <label for="bank_instructions">
    <?php _e('Payment Instructions:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <textarea name="bank_instructions" cols="30" rows="5"><?php echo trim($bank_deposit_settings['bank_instructions']) == '' ? __('Please initiate an electronic payment using the bank information below. Payment must be received within 48 hours of event date.', 'event_espresso') : $bank_deposit_settings['bank_instructions']; ?></textarea>
                        </li>
                    </ul></td>
                <td valign="top"><ul>
                        <li>
                            <label for="account_name">
    <?php _e('Name on Account:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="account_name" size="30" value="<?php echo trim($bank_deposit_settings['account_name']) ?>" />
                        </li>
                        <li>
                            <label for="bank_account">
    <?php _e('Bank Account#:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="bank_account" size="30" value="<?php echo trim($bank_deposit_settings['bank_account']) ?>" />
                        </li>
                        <li>
                            <label for="bank_name">
    <?php _e('Bank Name:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="bank_name" size="30" value="<?php echo trim($bank_deposit_settings['bank_name']) ?>" />
                        </li>
                        <li>
                            <label for="bank_address">
    <?php _e('Bank Address:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <textarea name="bank_address" cols="30" rows="5"><?php echo $bank_deposit_settings['bank_address']; ?></textarea>
                        </li>
                    </ul></td>
            </tr>
        </table>
        <input type="hidden" name="update_bank_deposit_settings" value="update_bank_deposit_settings">
        <p>
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Electronic Funds Transfer Settings', 'event_espresso') ?>" id="save_bank_deposit_settings" />
        </p>
    </form>
    <?php
}
