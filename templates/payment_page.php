<div id="espresso_confirmation_display">	
    <?php
    //Confirmation Page Template
    if ($event_cost == '0.00') {
        unset($_SESSION['espresso_session_id']);
        ?>
        <h3><?php echo $fname ?>,</h3>

        <p><?php _e('Thank you! Your registration is confirmed for', 'event_espresso'); ?> <strong><?php echo stripslashes_deep($event_name) ?></strong></p>

        <p><strong><?php _e('Your Registration ID:', 'event_espresso'); ?> </strong><?php echo $registration_id ?></p>

        <p><?php _e('A confirmation email has been sent with additional details of your registration.', 'event_espresso'); ?></p>
    <?php
} else {
    ?>
        <h3><?php echo $fname ?>,</h3>
        <h3><?php _e('Your registration is not complete until payment is received.', 'event_espresso'); ?></h3>

        <p><strong class="event_espresso_name">
    <?php _e('Amount due: ', 'event_espresso'); ?>
            </strong> <span class="event_espresso_value"><?php echo isset($org_options['currency_symbol'])?$org_options['currency_symbol']:''; ?><?php echo $event_cost; ?></span></p>
        <p><strong><?php _e('Your Registration ID:', 'event_espresso'); ?> </strong><?php echo $registration_id ?></p>
        <p><?php echo $org_options['email_before_payment'] == 'Y' ? __('A confirmation email has been sent with additional details of your registration.', 'event_espresso') : ''; ?></p>

        <h2><?php _e('Please choose a payment option:', 'event_espresso'); ?></h2>

    <?php
}
?>
</div>