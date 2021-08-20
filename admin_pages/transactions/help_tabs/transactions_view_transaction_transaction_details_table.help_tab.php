<p>
    <strong><?php esc_html_e('Transaction Items', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'This area of the table shows information about any events that were included in this transactions.',
        'event_espresso'
    ); ?>
</p>
<ul>
    <li>
        <strong><?php esc_html_e('Line Item ID', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the session ID for this transaction.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Event Name', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the name (title) of the event.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Event Date', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the date and time that the event begins.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Ticket Option', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('This is the name of the ticket that was selected.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Price', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the price for each ticket.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('QTY', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the quantity of tickets for this event.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Line Total', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Shows the total based on the quantity of tickets multiplied by the price of each ticket.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Taxes', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Shows any taxes that have been applied. May be listed as a sales tax or a federal tax.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Transaction Total', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('The total after any discounts and surcharges have been applied.', 'event_espresso'); ?>
    </li>
</ul>
<p>
    <strong><?php esc_html_e('Transaction Session Details', 'event_espresso'); ?></strong>
</p>
<ul>
    <li>
        <strong><?php esc_html_e('Registration Session', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the registration session. This is an internally used value.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Transaction placed from IP', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows the the IP address that was used for a registration.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Registrant User Agent', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Shows information about the registrant\'s computer and web browser.', 'event_espresso'); ?>
    </li>
</ul>