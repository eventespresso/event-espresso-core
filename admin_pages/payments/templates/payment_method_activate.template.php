<?php
/**
 * @var $payment_method EE_Payment_Method
 * @var $activate_url   string url to activate this payment method
 */
?>
<div class="padding">
    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label><?php esc_html_e('Click to Activate', 'event_espresso'); ?></label>
                </th>
                <td>
                    <a class='espresso-button-green button-primary'
                       href="<?php echo esc_url_raw($activate_url) ?>"
                       id="activate_<?php echo esc_attr($payment_method->slug()) ?>"
                    >
                        <?php printf(
                            esc_html__("Activate %s Payment Method?", "event_espresso"),
                            $payment_method->admin_name()
                        ); ?>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
