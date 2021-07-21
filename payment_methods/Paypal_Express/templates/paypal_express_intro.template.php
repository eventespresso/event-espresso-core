<?php

printf(
    esc_html__(
        'PayPal Express (Express Checkout) is an off-site payment method for accepting payments via PayPal and is available to event organizers in many countries. A PayPal premier or business account is needed to accept payments. Need a PayPal account? Call 1-855-456-1338 or %1$sclick here to sign up for a merchant account%2$s.',
        'event_espresso'
    ),
    '<a href="https://eventespresso.com/go/paypalexpress/" target="_blank">',
    '</a>'
);
