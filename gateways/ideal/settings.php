<?php

function event_espresso_ideal_payment_settings() {
    if (isset($_POST['update_ideal'])) {
        //$ideal_settings = get_option('event_espresso_paypal_settings');
        $ideal_settings['ideal_mollie_partner_id'] = $_POST['ideal_mollie_partner_id'];
        $ideal_settings['ideal_mollie_use_sandbox'] = $_POST['ideal_mollie_use_sandbox'];

        update_option('event_espresso_ideal_mollie_settings', $ideal_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('First Data settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>

    <div class="metabox-holder">
        <div class="postbox">

            <h3>
    <?php _e('iDEAL (Mollie) Settings', 'event_espresso'); ?>
            </h3>
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_ideal'])&&$_REQUEST['activate_ideal'] == 'true') {
                    add_option("events_ideal_active", 'true', '', 'yes');
                    add_option("event_espresso_ideal_settings", '', '', 'yes');
                    //update_option( 'event_espresso_payment_gateway', 'paypal');
                }
                if (isset($_REQUEST['reactivate_ideal'])&&$_REQUEST['reactivate_ideal'] == 'true') {
                    update_option('events_ideal_active', 'true');
                    //update_option( 'event_espresso_payment_gateway', 'paypal');
                }
                if (isset($_REQUEST['deactivate_ideal'])&&$_REQUEST['deactivate_ideal'] == 'true') {
                    update_option('events_ideal_active', 'false');
                    //update_option( 'event_espresso_payment_gateway', '');
                }
                echo '<ul>';
                switch (get_option('events_ideal_active')) {
                    case 'false':
                        echo '<li>iDEAL (Mollie) is installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_ideal=true\';" class="green_alert pointer"><strong>' . __('Activate iDEAL (Mollie)?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_ideal=true\';" class="red_alert pointer"><strong>' . __('Deactivate iDEAL (Mollie)?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_ideal_settings();

                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_ideal=true\';" class="yellow_alert pointer"><strong>' . __('The iDEAL (Mollie) support is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
        </div>
    </div>
    <?php } ?>
<?php

//PayPal Settings Form
function event_espresso_display_ideal_settings() {
    $ideal_settings = get_option('event_espresso_ideal_mollie_settings');
    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="99%" border="0" cellspacing="5" cellpadding="5">
            <tr>
                <td valign="top"><ul>
                        <li>
                            <label>
                                <?php _e('iDEAL (Mollie) partner id', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="ideal_mollie_partner_id" size="35" value="<?php echo $ideal_settings['ideal_mollie_partner_id']; ?>">
                            <br />
                        </li>
                        <li>
                            <label for="ideal_mollie_use_sandbox">
                                <?php _e('Use Mollie in test mode', 'event_espresso'); ?>?
                            </label>
                            <input name="ideal_mollie_use_sandbox" type="checkbox" value="1" <?php echo $ideal_settings['ideal_mollie_use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
                            <br />
                            <?php _e('(Make sure you enable test mode in your Mollie account).', 'event_espresso'); ?>
                        </li>

                    </ul></td>
            </tr>
        </table>
        <p>
            <input type="hidden" name="update_ideal" value="update_ideal">
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Settings', 'event_espresso') ?>" id="save_ideal_settings" />
        </p>
    </form>

    <?php
}
