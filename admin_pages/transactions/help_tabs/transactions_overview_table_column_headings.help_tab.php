<p>
    <strong><?php esc_html_e('Transactions Table Column Headings', 'event_espresso'); ?></strong>
</p>
<ul>
    <li>
        <p><strong><?php esc_html_e('ID', 'event_espresso'); ?></strong>
            <br />
            <?php esc_html_e(
                'This is the transaction ID is that is used throughout the payment process.',
                'event_espresso'
            ); ?>
        </p>
    </li>
    <li><strong><?php esc_html_e('Transaction Date', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'This is the date that the transaction occurred on. Clicking the date will take you to another page where you can view the transaction details.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Status', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The status helps you understand if the transaction was successful or not. Below are available statuses for transactions.',
            'event_espresso'
        ); ?>
        <ul>
            <li style="list-style-type: none;">
                <strong><?php esc_html_e('Overpaid', 'event_espresso'); ?></strong>
                <br />
                <?php esc_html_e('A payment was made for more than the transaction total.', 'event_espresso'); ?>
            </li>
            <li style="list-style-type: none;">
                <strong><?php esc_html_e('Complete', 'event_espresso'); ?></strong>
                <br />
                <?php esc_html_e('The payment was successful.', 'event_espresso'); ?>
            </li>
            <li style="list-style-type: none;">
                <strong><?php esc_html_e('Incomplete', 'event_espresso'); ?></strong>
                <br />
                <?php esc_html_e(
                    'The payment has not yet been completed. This is the status for online payments that have yet to be processed.',
                    'event_espresso'
                ); ?>
            </li>
            <li style="list-style-type: none;">
                <strong><?php esc_html_e('Failed', 'event_espresso'); ?></strong>
                <br />
                <?php esc_html_e('The payment did not process correctly.', 'event_espresso'); ?>
            </li>
        </ul>
    </li>
    <li>
        <strong><?php esc_html_e('Total', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'This is the total amount for that transaction. It will include the total of every ticket purchased even if from separate events.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Paid', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'This shows much has been paid. If this column matches the amount in the total column, then the transaction has been paid in full.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Primary Registrant', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The name of the primary registrant. Clicking the name will take you to the registration details page.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Email Address', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'This is the email address for the primary registrant. Clicking the email address will open your default email client.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Event', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The name of the events are shown here. Clicking the name will take you the edit event page.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Actions', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'There are several actions that can be done by clicking the icons. These are explained below.',
            'event_espresso'
        ); ?>
        <ul>
            <li style="list-style-type: none;">
                <strong>
                    <?php printf(
                        esc_html__('View Transaction Details %1$S', 'event_espresso'),
                        '<span class="dashicons dashicons-cart"></span>'
                    ); ?>
                </strong>
                <br />
                <?php esc_html_e(
                    'Takes you to the individual transaction page. Clicking the date also takes you to the individual transaction page.',
                    'event_espresso'
                ); ?>
            </li>
            <li style="list-style-type: none;">
                <strong>
                    <?php printf(
                        esc_html__('View Invoice for Transaction %1$S', 'event_espresso'),
                        '<span class="dashicons dashicons-media-spreadsheet"></span>'
                    ); ?>
                </strong>
                <br />
                <?php esc_html_e('Takes you to the invoice for the transaction.', 'event_espresso'); ?>
            </li>
            <li style="list-style-type: none;">
                <strong>
                    <?php printf(
                        esc_html__('View Receipt for Transaction %1$s', 'event_espresso'),
                        '<span class="dashicons dashicons-media-default"></span>'
                    ); ?>
                </strong>
                <br />
                <?php esc_html_e('Takes you to the receipt for the transaction.', 'event_espresso'); ?>
            </li>
            <li style="list-style-type: none;">
                <strong>
                    <?php printf(
                        esc_html__('View Registration Details %1$S', 'event_espresso'),
                        '<span class="dashicons dashicons-clipboard"></span>'
                    ); ?>
                </strong>
                <br />
                <?php printf(
                    esc_html__(
                        'Clicking this icon will take you to the registration page for this transaction. You can also get there via the %sRegistrations page%s.',
                        'event_espresso'
                    ),
                    '<a href="admin.php?page=espresso_registrations">',
                    '</a>'
                ); ?>
            </li>
            <li style="list-style-type: none;">
                <strong>
                    <?php esc_html_e(
                        'Send Payment Reminder <span class="dashicons dashicons-email-alt"></span>',
                        'event_espresso'
                    ); ?>
                </strong>
                <br />
                <?php printf(
                    esc_html__(
                        'Emails the primary registrant the Payment Reminder message. This is set up in the %sMessages page%s.',
                        'event_espresso'
                    ),
                    '<a href="admin.php?page=espresso_messages">',
                    '</a>'
                ); ?>
            </li>
        </ul>
    </li>
</ul>
