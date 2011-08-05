<?php

function event_espresso_check_payment_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    if (isset($_POST['update_check_payment_settings'])) {
		$allowable_tags = '<br /><br><a>';
        //$check_payment_settings_settings = get_option('event_espresso_check_payment_settings_settings');
        $check_payment_settings['check_title'] = strip_tags($_POST['check_title'],$allowable_tags);
        $check_payment_settings['check_instructions'] = strip_tags($_POST['check_instructions'],$allowable_tags);
        $check_payment_settings['payable_to'] = strip_tags($_POST['payable_to'],$allowable_tags);
        $check_payment_settings['payment_address'] = strip_tags($_POST['payment_address'],$allowable_tags);
        update_option('event_espresso_check_payment_settings', $check_payment_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('Check/Money Order Payment settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>
    <div class="metabox-holder">
        <div class="postbox">
            <h3>
                <?php _e('Check/Money Order Payment Settings', 'event_espresso'); ?>
            </h3>
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_check_payment']) && $_REQUEST['activate_check_payment'] == 'true') {
                    add_option("events_check_payment_active", 'true', '', 'yes');
                    add_option("event_espresso_check_payment_settings", '', '', 'yes');
                    //update_option( 'event_espresso_payment_gateway', 'check_payment');
                }
                if (isset($_REQUEST['reactivate_check_payment']) && $_REQUEST['reactivate_check_payment'] == 'true') {
                    update_option('events_check_payment_active', 'true');
                    //update_option( 'event_espresso_payment_gateway', 'check_payment');
                }
                if (isset($_REQUEST['deactivate_check_payment']) && $_REQUEST['deactivate_check_payment'] == 'true') {
                    update_option('events_check_payment_active', 'false');
                    //update_option( 'event_espresso_payment_gateway', '');
                }
                echo '<ul>';
                switch (get_option('events_check_payment_active')) {
                    case 'false':
                        echo '<li>Check/Money Order Payments is installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_check_payment=true\';" class="green_alert pointer"><strong>' . __('Activate Check/Money Order Payments?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_check_payment=true\';" class="red_alert pointer"><strong>' . __('Deactivate Check/Money Order Payments?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_check_payment_settings();
                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_check_payment=true\';" class="yellow_alert pointer"><strong>' . __('The Check/Money Order Payments is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
        </div>
    </div>
    <?php } ?>
<?php

//Check/Money Order Payments Settings Form
function event_espresso_display_check_payment_settings() {
    global $espresso_premium;
    if ($espresso_premium != true)
        return;
    global $org_options;

    $check_payment_settings = get_option('event_espresso_check_payment_settings');
    ?>

    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="90%" border="0">
            <tr>
                <td valign="top"><ul><li><label for="check_title"><?php _e('Title:', 'event_espresso'); ?></label><br />
                            <input type="text" name="check_title" size="30" value="<?php echo $check_payment_settings['check_title'] == '' ? __('Check/Money Order Payments', 'event_espresso') : stripslashes_deep($check_payment_settings['check_title']); ?>" />
                        </li>
                        <li><label for="check_instructions"><?php _e('Payment Instructions:', 'event_espresso'); ?></label><br />
                            <textarea name="check_instructions" cols="30" rows="5"><?php echo trim($check_payment_settings['check_instructions']) == '' ? __('Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.', 'event_espresso') : stripslashes_deep($check_payment_settings['check_instructions']); ?></textarea>
                        </li></ul></td>
                <td valign="top"><ul><li><label for="payable_to"><?php _e('Payable To:', 'event_espresso'); ?></label><br />
                            <input type="text" name="payable_to" size="30" value="<?php echo trim($check_payment_settings['payable_to']) == '' ? $org_options['organization'] : stripslashes_deep($check_payment_settings['payable_to']); ?>" />
                        </li>
                        <li><label for="payment_address"><?php _e('Address to Send Payment:', 'event_espresso'); ?></label><br />
                            <textarea name="payment_address" cols="30" rows="5"><?php
                                if (trim($check_payment_settings['payment_address']) == '') {
									echo $org_options['organization_street1']!=''?$org_options['organization_street1'].'<br />':'';
									echo $org_options['organization_street2']!=''?$org_options['organization_street2'].'<br />':'';
									echo $org_options['organization_city']!=''?$org_options['organization_city']:'';
									echo ($org_options['organization_city']!='' && $org_options['organization_state']!='')?', ':'<br />';
									echo $org_options['organization_state']!=''?$org_options['organization_state'].'<br />':'';
									echo $org_options['organization_country']!=''?getCountryName($org_options['organization_country']).'<br />':'';
									echo $org_options['organization_zip']!=''?$org_options['organization_zip']:'';
                                } else {
                                    echo $check_payment_settings['payment_address'];
                                }
                                ?></textarea>
                        </li></ul></td>
            </tr>
        </table>
        <input type="hidden" name="update_check_payment_settings" value="update_check_payment_settings">
        <p><input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Check/Money Order Payment Settings', 'event_espresso') ?>" id="save_check_payment_settings" />
        </p>
    </form>
    <?php
}