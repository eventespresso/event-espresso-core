<div id="ppexpress-sandbox-panel" class="sandbox-panel">

    <h4 class="important-notice">
        <?php esc_html_e(
            'Debug Mode is turned ON. You will be redirected to the PayPal Sandbox environment. Please use your Sandbox PayPal account for the checkout.',
            'event_espresso'
        ); ?></h4>

    <h4><?php esc_html_e('How do I test specific error codes?', 'event_espresso'); ?></h4>
    <p>
        <?php esc_html_e(
            'To trigger an error condition on an amount-related field, 
			specify a error code value as a number with two digits to the right of the decimal point. 
			For example, specify a value of 107.55 to trigger the 10755 error.',
            'event_espresso'
        ); ?>
    </p>
    <p>
        <?php printf(
            esc_html__('More details can be found here: %1$s Testing Error Conditions %2$s.', 'event_espresso'),
            '<a href="https://developer.paypal.com/docs/classic/lifecycle/sb_error-conditions">',
            '</a>'
        ); ?>
    </p>

</div>