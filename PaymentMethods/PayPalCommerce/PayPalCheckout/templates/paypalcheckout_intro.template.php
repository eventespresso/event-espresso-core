<?php

printf(
    esc_html__(
        'PayPal Checkout (through PayPal Commerce) is a flexible onsite payment method for accepting payments via PayPal and is available to event organizers in %1$smany countries%2$s. A PayPal business account is needed to accept payments. If you don\'t have an account, you\'ll have a chance to create one while setting up this payment method (logging in with PayPal).',
        'event_espresso'
    ),
    '<a href="https://www.paypal.com/us/webapps/mpp/country-worldwide" target="_blank">',
    '</a>'
);
