<?php

function event_espresso_paypal_pro_payment_settings() {
    if (isset($_POST['update_paypal_pro'])) {
        //$paypal_pro_settings = get_option('event_espresso_paypal_settings');
        $paypal_pro_settings['paypal_pro_email'] = $_POST['paypal_pro_email'];
        $paypal_pro_settings['paypal_api_username'] = $_POST['paypal_api_username'];
        $paypal_pro_settings['paypal_api_password'] = $_POST['paypal_api_password'];
        $paypal_pro_settings['currency_format'] = $_POST['currency_format'];
        $paypal_pro_settings['paypal_api_signature'] = $_POST['paypal_api_signature'];
        $paypal_pro_settings['paypal_api_credit_cards'] = implode(",", empty($_POST['paypal_api_credit_cards']) ? array() : $_POST['paypal_api_credit_cards']);
        $paypal_pro_settings['paypal_pro_use_sandbox'] = empty($_POST['paypal_pro_use_sandbox']) ? '' : $_POST['paypal_pro_use_sandbox'];


        update_option('event_espresso_paypal_pro_settings', $paypal_pro_settings);
        echo '<div id="message" class="updated fade"><p><strong>' . __('PayPal Pro settings saved.', 'event_espresso') . '</strong></p></div>';
    }
    ?>

    <div class="metabox-holder">
        <div class="postbox">
        <div title="Click to toggle" class="handlediv"><br /></div>
            <h3 class="hndle">
                <?php _e('PayPal Pro Settings', 'event_espresso'); ?>
            </h3>
							<div class="inside">
            <div class="padding">
                <?php
                if (isset($_REQUEST['activate_paypal_pro']) && $_REQUEST['activate_paypal_pro'] == 'true') {
                    add_option("events_paypal_pro_active", 'true', '', 'yes');
                    add_option("event_espresso_paypal_pro_settings", '', '', 'yes');
                    //update_option( 'event_espresso_payment_gateway', 'paypal');
                }
                if (isset($_REQUEST['reactivate_paypal_pro']) && $_REQUEST['reactivate_paypal_pro'] == 'true') {
                    update_option('events_paypal_pro_active', 'true');
                    //update_option( 'event_espresso_payment_gateway', 'paypal');
                }
                if (isset($_REQUEST['deactivate_paypal_pro']) && $_REQUEST['deactivate_paypal_pro'] == 'true') {
                    update_option('events_paypal_pro_active', 'false');
                    //update_option( 'event_espresso_payment_gateway', '');
                }
                echo '<ul>';
                switch (get_option('events_paypal_pro_active')) {
                    case 'false':
                        echo '<li>PayPal PRO is installed.</li>';
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_paypal_pro=true\';" class="green_alert pointer"><strong>' . __('Activate PayPal PRO?', 'event_espresso') . '</strong></li>';
                        break;
                    case 'true':
                        echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_paypal_pro=true\';" class="red_alert pointer"><strong>' . __('Deactivate PayPal PRO?', 'event_espresso') . '</strong></li>';
                        event_espresso_display_paypal_pro_settings();

                        break;
                    default:
                        echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_paypal_pro=true\';" class="yellow_alert pointer"><strong>' . __('The PayPal PRO support is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
                        break;
                }
                echo '</ul>';
                ?>
            </div>
						</div>
        </div>
    </div>
<?php } ?>
<?php

//PayPal Settings Form
function event_espresso_display_paypal_pro_settings() {
    $paypal_pro_settings = get_option('event_espresso_paypal_pro_settings');
    if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/btn_stdCheckout2.gif")) {
        $button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/btn_stdCheckout2.gif";
    } else {
        $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/btn_stdCheckout2.gif";
    }
    ?>
    <form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <table width="99%" border="0" cellspacing="5" cellpadding="5">
            <tr>
                <td valign="top"><ul>
                        <li>
                            <label for="paypal_id">
                                <?php _e('Paypal PRO email', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="paypal_pro_email" size="35" value="<?php echo empty($paypal_pro_settings['paypal_pro_email']) ? '' : $paypal_pro_settings['paypal_pro_email']; ?>">
                            <br />
                        </li>
                        <li>
                            <label for="paypal_id">
                                <?php _e('Paypal API username', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="paypal_api_username" size="35" value="<?php echo empty($paypal_pro_settings['paypal_api_username']) ? '' : $paypal_pro_settings['paypal_api_username']; ?>">
                            <br />
                        </li>
                        <li>
                            <label for="paypal_id">
                                <?php _e('Paypal API password', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="paypal_api_password" size="35" value="<?php echo empty($paypal_pro_settings['paypal_api_password']) ? '' : $paypal_pro_settings['paypal_api_password']; ?>">
                            <br />

                        </li>
                        <li>
                            <label for="paypal_id">
                                <?php _e('Paypal API signature', 'event_espresso'); ?>
                            </label>
                            <br />
                            <input type="text" name="paypal_api_signature" size="35" value="<?php echo empty($paypal_pro_settings['paypal_api_signature']) ? '' : $paypal_pro_settings['paypal_api_signature']; ?>">
                            <br />

                        </li>
                        <li>
                            <label for="currency_format">
                                <?php _e('Select the currency for your country:', 'event_espresso'); ?>
                            </label>
                            <br />
                            <select name="currency_format">
                                <option value="<?php echo empty($paypal_pro_settings['currency_format']) ? 'USD' : $paypal_pro_settings['currency_format']; ?>"><?php echo $paypal_pro_settings['currency_format']; ?></option>
                                <option value="USD">
                                    <?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
                                </option>
                                <option value="AUD">
                                    <?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
                                </option>
                                <option value="GBP">
                                    <?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
                                </option>
                                <option value="CAD">
                                    <?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
                                </option>
                                <option value="CZK">
                                    <?php _e('Czech Koruna', 'event_espresso'); ?>
                                </option>
                                <option value="DKK">
                                    <?php _e('Danish Krone', 'event_espresso'); ?>
                                </option>
                                <option value="EUR">
                                    <?php _e('Euros (&#8364;)', 'event_espresso'); ?>
                                </option>
                                <option value="CHF">
                                    <?php _e('Swiss Franc', 'event_espresso'); ?>
                                </option>
                                <option value="HKD">
                                    <?php _e('Hong Kong Dollar ($)', 'event_espresso'); ?>
                                </option>
                                <option value="HUF">
                                    <?php _e('Hungarian Forint', 'event_espresso'); ?>
                                </option>
                                <option value="ILS">
                                    <?php _e('Israeli Shekel', 'event_espresso'); ?>
                                </option>
                                <option value="JPY">
                                    <?php _e('Yen (&yen;)', 'event_espresso'); ?>
                                </option>
                                <option value="MXN">
                                    <?php _e('Mexican Peso', 'event_espresso'); ?>
                                </option>
                                <option value="NZD">
                                    <?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
                                </option>
                                <option value="NOK">
                                    <?php _e('Norwegian Krone', 'event_espresso'); ?>
                                </option>
                                <option value="PLN">
                                    <?php _e('Polish Zloty', 'event_espresso'); ?>
                                </option>
                                <option value="SGD">
                                    <?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
                                </option>
                                <option value="SEK">
                                    <?php _e('Swedish Krona', 'event_espresso'); ?>
                                </option>
                                <option value="BRL">
                                    <?php _e('Brazilian Real (only for Brazilian users)', 'event_espresso'); ?>
                                </option>
                                <option value="MYR">
                                    <?php _e('Malaysian Ringgits (only for Malaysian users)', 'event_espresso'); ?>
                                </option>
                                <option value="PHP">
                                    <?php _e('Philippine Pesos', 'event_espresso'); ?>
                                </option>
                                <option value="TWD">
                                    <?php _e('Taiwan New Dollars', 'event_espresso'); ?>
                                </option>
                                <option value="THB">
                                    <?php _e('Thai Baht', 'event_espresso'); ?>
                                </option>
                            </select>
                            <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=currency_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
                        <li>
                            <label>
                                <?php _e('Accepted Credit Cards', 'event_espresso'); ?>
                            </label>
                            <br />
                            <?php
                            $checked = 'checked="checked"';
                            $paypal_api_credit_cards = explode(",", empty($paypal_pro_settings['paypal_api_credit_cards']) ? '' : $paypal_pro_settings['paypal_api_credit_cards']);
                            ?>
                            <input type="checkbox" name="paypal_api_credit_cards[]" size="35" value="Visa" <?php echo in_array("Visa", $paypal_api_credit_cards) ? $checked : ''; ?> /> Visa
                            <input type="checkbox" name="paypal_api_credit_cards[]" size="35" value="MasterCard" <?php echo in_array("MasterCard", $paypal_api_credit_cards) ? $checked : ''; ?> /> Master Card
                            <input type="checkbox" name="paypal_api_credit_cards[]" size="35" value="Amex" <?php echo in_array("Amex", $paypal_api_credit_cards) ? $checked : ''; ?> /> Amex
                            <input type="checkbox" name="paypal_api_credit_cards[]" size="35" value="Discover" <?php echo in_array("Discover", $paypal_api_credit_cards) ? $checked : ''; ?> /> Discover

                            <br />

                        </li>
                        <li>
                            <label for="paypal_pro_use_sandbox">
                                <?php _e('Use PayPal PRO in Sandbox mode', 'event_espresso'); ?>?
                            </label>
                            <input name="paypal_pro_use_sandbox" type="checkbox" value="1" <?php echo $paypal_pro_settings['paypal_pro_use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
                            <br />
                            <?php _e('(Make sure you enter the sandbox credentials above.)', 'event_espresso'); ?>
                        </li>

                    </ul></td>
            </tr>
        </table>
        <p>
            <input type="hidden" name="update_paypal_pro" value="update_paypal_pro">
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update PayPal PRO Settings', 'event_espresso') ?>" id="save_paypal_settings" />
        </p>
    </form>
    <div id="sandbox_info" style="display:none">
        <h2><?php _e('PayPal Sandbox', 'event_espresso'); ?></h2>
        <p><?php _e('In addition to using the PayPal Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all PayPal variables.', 'event_espresso'); ?></p>
        <hr />
        <p><?php _e('The PayPal Sandbox is a testing environment that is a duplicate of the live PayPal site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live PayPal environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?></p>
    </div>
    <div id="image_url_info" style="display:none">
        <h2>
            <?php _e('PayPal Image URL (logo for payment page)', 'event_espresso'); ?>
        </h2>
        <p>
            <?php _e('The URL of the 150x50-pixel image displayed as your logo in the upper left corner of the PayPal checkout pages.', 'event_espresso'); ?>
        </p>
        <p>
            <?php _e('Default - Your business name, if you have a Business account, or your email address, if you have Premier or Personal account.', 'event_espresso'); ?>
        </p>
    </div>
    <div id="currency_info" style="display:none">
        <h2><?php _e('PayPal Currency', 'event_espresso'); ?></h2>
        <p><?php _e('PayPal uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that PayPal (currently) supports.', 'event_espresso'); ?> </p>
    </div>
    <div id="surcharge" style="display:none">
        <h2><?php _e('Payment Surcharge', 'event_espresso'); ?></h2>
        <p><?php _e('Please enter a decimal number indicating a percent surcharge. For example, if you enter 3.00, 3% will be added to the final price of the event during the checkout. If the event price is initially $100, the price with the surcharge will be $103.<br /> This surcharge will apply to all new events.  However, you will have the ability to change this value during the event creation.', 'event_espresso'); ?></p></div>
    <div id="no_shipping" style="display:none">
        <h2><?php _e('Shipping Address', 'event_espresso'); ?></h2>
        <p><?php _e('By default, PayPal will display shipping address information on the PayPal payment screen. If you plan on shipping items to a registrant (shirts, invoices, etc) then use this option. Otherwise it should not be used, as it will require a shipping address when someone registers for an event.', 'event_espresso'); ?></p>
    </div>
    <?php
}
