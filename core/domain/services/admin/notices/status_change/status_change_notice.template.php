<?php
/**
 * @var string $context
 * @var string $page_slug
 */
?>
<div class="ee-status-change-notice-wrapper <?php echo "ee-status-change-notice{$context} {$page_slug}"; ?>">

    <button type="button"
            class="ee-hide-container ee-show-link"
            href="javascript:void(0);"
            id="ee-open-notice-link"
    >
        <?php esc_html_e('Click for an Important Notice regarding Status Color Codes', 'event_espresso'); ?>
    </button>
    <div id="ee-status-change-notice" class="ee-hide-container ee-close-notice">
        <div class="ee-status-change-notice-div ee-status-outline ee-status-outline--attention">

            <button type="button"
                    class="ee-close-notice-btn"
                    href="javascript:void(0);"
                    id='ee-close-notice-link'
            ></button>
            <h3><?php esc_html_e('Important Notice Regarding Status Color Codes', 'event_espresso'); ?></h3>
            <p>
                <?php esc_html_e(
                    'In order to correct some inconsistencies in our event, datetime, and ticket status color codes, we have made the following changes:',
                    'event_espresso'
                ); ?>
            </p>
            <ul>
                <li class="ee-status-event">
                    <?php printf(
                        esc_html__(
                            'The Event, Datetime, and Ticket "Sold Out" status colors have changed from %1$sYellow%3$s to %2$sPurple%3$s',
                            'event_espresso'
                        ),
                        '<span class="yellow pill">',
                        '<span class="purple pill">',
                        '</span>'
                    ); ?>
                </li>
                <li class="ee-status-event">
                    <?php printf(
                        esc_html__(
                            'The Event and Datetime "Postponed" status colors have changed from %1$sPurple%3$s to %2$sYellow%3$s',
                            'event_espresso'
                        ),
                        '<span class="purple pill">',
                        '<span class="yellow pill">',
                        '</span>'
                    ); ?>
                </li>
                <li class="ee-status-event">
                    <?php printf(
                        esc_html__(
                            'The Event "Inactive" and Ticket "Archived" status colors have changed from %1$sPurple%3$s to %2$sCharcoal%3$s',
                            'event_espresso'
                        ),
                        '<span class="purple pill">',
                        '<span class="charcoal pill">',
                        '</span>'
                    ); ?>
                </li>
                <li class="ee-status-message">
                    <?php printf(
                        esc_html__(
                            'The Message "Queued For Resending" status color has changed from %1$sYellow%3$s to %2$sBlue%3$s',
                            'event_espresso'
                        ),
                        '<span class="yellow pill">',
                        '<span class="blue pill">',
                        '</span>'
                    ); ?>
                </li>
                <li class="ee-status-message">
                    <?php printf(
                        esc_html__(
                            'The Message "Messenger Is Executing" status color has changed from %1$sPink%3$s to %2$sGreen%3$s',
                            'event_espresso'
                        ),
                        '<span class="pink pill">',
                        '<span class="green pill">',
                        '</span>'
                    ); ?>
                </li>
                <li class="ee-status-message">
                    <?php printf(
                        esc_html__(
                            'The Message "Failed" status color has changed from %1$sRed%3$s to %2$sPink%3$s',
                            'event_espresso'
                        ),
                        '<span class="red pill">',
                        '<span class="pink pill">',
                        '</span>'
                    ); ?>
                </li>
                <li class="ee-status-message">
                    <?php printf(
                        esc_html__(
                            'The Message "Debug only" status color has changed from %1$sYellow%3$s to %2$sRed%3$s',
                            'event_espresso'
                        ),
                        '<span class="yellow pill">',
                        '<span class="red pill">',
                        '</span>'
                    ); ?>
                </li>
            </ul>
            <p>
                <?php esc_html_e(
                    'Please accept our sincere apologies for any inconvenience this might cause.',
                    'event_espresso'
                ); ?>
            </p>
            <p class="ee-dismiss-notice-pg">
                <button type="button"
                        class="ee-dismiss-notice-link"
                        href="javascript:void(0);"
                        id='ee-dismiss-notice-link'
                >
                    <span class="pill pink"><?php
                        esc_html_e('don\'t show this notice again please', 'event_espresso');
                    ?></span>
                </button>
            </p>
        </div>
    </div>
</div>
