<div id="paypal_commerce-sandbox-panel" class="sandbox-panel">
    <h6 class="important-notice">
        <?php esc_html_e('Debug Mode is turned ON. Please use sandbox PayPal account or a test card for checkout.', 'event_espresso')
        ; ?>
    </h6>

    <p class="test-credit-cards-info-pg">
        <strong><?php esc_html_e('How to test Credit Card checkout', 'event_espresso'); ?></strong><br/>
        <span class="small-text">
            <?php printf(
                esc_html__(
                    'You will need a PayPal generated test card to checkout in sandbox mode. You can create one with the %1$sCredit Card Generator%2$s, at your PayPal developer account.',
                    'event_espresso'
                ),
                '<a href="https://developer.paypal.com/developer/creditCardGenerator" target="_blank">',
                '</a>'
            ); ?>
        </span>
    </p>
</div>
