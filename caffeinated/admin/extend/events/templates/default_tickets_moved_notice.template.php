<div class="ee-new-edtr-notice">
    <h2><?php esc_html_e('The Default Tickets Manager Has Moved', 'event_espresso'); ?></h2>
    <p>
        <?php printf(
            esc_html__(
                'The new Advanced Event Editor introduces a better way to manage your events\' default tickets...%1$sright from within the Event Editor.',
                'event_espresso'
            ),
            '<br />'
        ); ?>
    </p>
    <h5>
        <?php esc_html_e('Follow these simple steps:', 'event_espresso'); ?>
    </h5>
    <ol>
        <li>
            <p><?php esc_html_e('Click on the "Overview" tab in the menu above', 'event_espresso'); ?></p>
        </li>
        <li>
            <p>
                <?php esc_html_e(
                    'Edit an existing event or create a new event by clicking the "Add New Event" button.',
                    'event_espresso'
                ); ?>
            </p>
        </li>
        <li>
            <p>
                <?php esc_html_e(
                    'Scroll down to the bottom of the "Available Tickets" list.',
                    'event_espresso'
                ); ?>
            </p>
        </li>
        <li>
            <div>
                <p>
                    <?php esc_html_e(
                        'Click on the menu button to the right of the "Add New Ticket" button.',
                        'event_espresso'
                    ); ?>
                </p>
                <img alt='event editor tickets list menu button'
                     class='ee-new-edtr-notice__img'
                     src='<?php echo esc_url_raw(EE_IMAGES_URL . 'default-tickets-1.png'); ?>'
                />
            </div>
        </li>
        <li>
            <div>
            <p>
                <?php esc_html_e(
                    'Click on the "Default Tickets" option to open the "Default Tickets Manager".',
                    'event_espresso'
                ); ?>
            </p>
            <img alt='event editor default tickets menu option'
                 class='ee-new-edtr-notice__img'
                 src='<?php echo esc_url_raw(EE_IMAGES_URL . 'default-tickets-2.png'); ?>'
            />
            </div>
        </li>
        <li>
            <div>
            <p>
                <?php esc_html_e(
                    'Use existing tickets as templates or create new default tickets from scratch',
                    'event_espresso'
                ); ?>
            </p>
            <img alt='the default tickets editor'
                 class="ee-new-edtr-notice__img ee-new-edtr-notice__img--big"
                 src='<?php echo esc_url_raw(EE_IMAGES_URL . 'default-tickets-3.png'); ?>'
            />
            </div>
        </li>
    </ol>
</div>
