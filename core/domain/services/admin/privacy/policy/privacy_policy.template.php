<?php
/**
 * @var $active_onsite_payment_methods  array
 * @var $active_offsite_payment_methods array
 * @var $session_lifespan               string
 */
?>
<h2><?php esc_html_e('Event Registration Data', 'event_espresso'); ?></h2>
<p><?php
    esc_html_e(
        'We collect information about you during event registration. This information may include but is not limited to:',
        'event_espresso'
    ); ?></p>
<ul>
    <li><?php esc_html_e('Your names', 'event_espresso'); ?></li>
    <li><?php esc_html_e('Billing address', 'event_espresso'); ?></li>
    <li><?php esc_html_e('Mailing address', 'event_espresso'); ?></li>
    <li><?php esc_html_e('Email address', 'event_espresso'); ?></li>
    <li><?php esc_html_e('Phone number', 'event_espresso'); ?></li>
    <li><?php esc_html_e('Location and traffic data (including partial IP address and browser type)', 'event_espresso'); ?></li>
    <li><?php
        esc_html_e(
            'Any other details that might be requested from you for the purpose of processing your registration or ticket purchase',
            'event_espresso'
        ); ?></li>
</ul>

<p><?php esc_html_e('Handling this data also allows us to:', 'event_espresso'); ?></p>
<ul>
    <li><?php esc_html_e('Send you important account/purchase/service information.', 'event_espresso'); ?></li>
    <li><?php esc_html_e('Respond to your queries, refund requests, or complaints.', 'event_espresso'); ?></li>
    <li><?php
        esc_html_e(
            'Process payments and prevent fraudulent transactions. We do this on the basis of our legitimate business interests.',
            'event_espresso'
        ); ?></li>
    <li><?php
        esc_html_e(
            'Set up and administer your account, provide technical and customer support, and to verify your identity.',
            'event_espresso'
        ); ?></li>
</ul>

<?php if (! empty($active_onsite_payment_methods) || ! empty($active_offsite_payment_methods)) { ?>
    <h2><?php esc_html_e('Billing Information', 'event_espresso'); ?> </h2>
    <?php
// if onsite or offsite payment methods are active
    if (! empty($active_onsite_payment_methods)) { ?>
        <p><?php
            esc_html_e(
                'In order to process payments, we collect billing information on-site. Sensitive billing information is not stored on our server, but may be handled while in-transit to the payment processing server.',
                'event_espresso'
            ); ?></p>
        <p><?php
            printf(
                esc_html_x(
                    'Please see the privacy policy of %1$s.',
                    'Please see the privacy policy of PayPal Pro',
                    'event_espresso'
                ),
                implode(
                    ', ',
                    array_merge(
                        $active_onsite_payment_methods,
                        $active_offsite_payment_methods
                    )
                )
            ); ?></p>
        <p><?php
            esc_html_e(
                'Masked billing information may be stored on our servers (eg only the last 4 digits of credit card numbers are stored: **** **** **** 1234).',
                'event_espresso'
            ); ?></p>
    <?php } // IF OFFSITE PAYMENT METHOD ACTIVE
    elseif (! empty($active_offsite_payment_methods)) { ?>
        <p><?php
            printf(
                esc_html_x(
                    'Billing information is sent directly to the payment processor, and is not handled by our servers. Please see the privacy policy of %1$s.',
                    'Billing information is sent directly to the payment processor, and is not handled by our servers. Please see the privacy policy of PayPal Pro.',
                    'event_espresso'
                ),
                implode(', ', $active_offsite_payment_methods)
            ); ?></p>
    <?php } ?>
    <h2><?php esc_html_e('Payment Logging', 'event_espresso'); ?></h2>
    <p><?php
        esc_html_e(
            'Site administrators may keep a log of communications with the payment processors in order to verify payments are being processed correctly. These logs are automatically deleted after a week.',
            'event_espresso'
        ); ?></p>
<?php } ?>

<h2><?php esc_html_e('Event Registration Cookies', 'event_espresso'); ?></h2>
<p><?php
    printf(
        esc_html_x(
            'When you begin registering for an event and select a ticket quantity, a cookie will be used to track your registration. This cookie lasts %1$s.',
            'When you begin registering for an event and select a ticket quantity, a cookie will be used to track your registration. This cookie lasts 2 hours.',
            'event_espresso'
        ),
        $session_lifespan
    ); ?></p>

<h2><?php esc_html_e('Email History Data', 'event_espresso'); ?></h2>
<p><?php
    esc_html_e(
        'We keep a record of the emails sent to you. This is to ensure communication is successfully sent and its information is accurate.',
        'event_espresso'
    ); ?></p>

<h2><?php esc_html_e('Event Check-In Record', 'event_espresso'); ?></h2>
<p><?php
    esc_html_e(
        'When you attend an event, an event manager may record the time you check in or out of the event.',
        'event_espresso'
    ); ?></p>

<h2><?php esc_html_e('Event Registration Data Retention', 'event_espresso'); ?></h2>
<p><?php
    esc_html_e(
        'Personal data is stored at least until the date of the event, and may be kept indefinitely in case of future registrations.',
        'event_espresso'
    ); ?></p>

<h2><?php esc_html_e('Event Registration Data Erasure and Export', 'event_espresso'); ?></h2>
<p><?php
    esc_html_e(
        'You have the right to request your personal data be sent to you electronically, and the right to request your registration data be erased after the event. To do so, please contact the event manager or site administrator.',
        'event_espresso'
    ); ?></p>
