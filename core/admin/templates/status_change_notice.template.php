<?php
/**
 * @var string $context
 * @var string $page_slug
 */

$page_slug          = ! empty($page_slug) ? "{$page_slug}-page" : '';
$unknown_error_msg  = __(
    'Oops... an unknown error has occurred on the server and this notice could not be dismissed.',
    'event_espresso'
);
$failed_request_msg = __('Request failed. The server returned status code: ', 'event_espresso');
?>

<script type="text/javascript">
    function openStatusNotice() {
        let link = document.getElementById('ee-open-notice-link');
        link.classList.remove('ee-show-link');
        let statusNotice = document.getElementById('ee-status-change-notice');
        statusNotice.classList.add('ee-open-notice');
    }

    function closeStatusNotice() {
        let link = document.getElementById('ee-open-notice-link');
        link.classList.add('ee-show-link');
        let statusNotice = document.getElementById('ee-status-change-notice');
        statusNotice.classList.remove('ee-open-notice');
    }

    function removeStatusNotice() {
        let link = document.getElementById('ee-open-notice-link');
        link.style.display = 'none';
        closeStatusNotice();
    }

    function dismissStatusNotice() {
        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: "espresso_hide_status_change_notice",
                ee_admin_ajax: 1
            },
            dataType: "json",
            success: function (response) {
                if (typeof response.success !== 'undefined' && response.success) {
                    removeStatusNotice();
                } else {
                    if (typeof response.errors !== 'undefined' && response.errors !== '') {
                        console.error(response.errors);
                    } else {
                        console.error("<?php echo $unknown_error_msg; ?>");
                    }
                }
            },
            error: function (xhr) {
                console.error("<?php echo $failed_request_msg; ?>" + xhr.status + " " + xhr.statusText);
            }
        });
    }
</script>

<style type="text/css">

    .ee-status-change-notice-wrapper {
        clear: both;
        font-size: .8rem;
        padding-bottom: .75rem;
    }

    .ee-status-change-notice__admin-legend {
        margin: 1rem 0 0;
    }

    .ee-status-change-notice__event-editor {
        margin: 0 0 -2rem;
        padding: 2rem 0 1rem;
    }

    #ee-open-notice-link {
        box-shadow: none !important;
        color: #e34052;
        display: block;
        font-weight: 700;
        margin: .5rem 0;
        outline: none !important;
        text-decoration: none;
    }

    .ee-close-notice-btn {
        height: 18px;
        opacity: 0.4;
        position: absolute;
        right: 15px;
        top: 16px;
        transition: all 0.15s;
        width: 18px;
    }

    .ee-close-notice-btn:hover {
        opacity: .8;
    }

    .ee-close-notice-btn:after,
    .ee-close-notice-btn:before {
        background-color: #182e46;
        content: ' ';
        height: 18px;
        position: absolute;
        right: 7px;
        width: 4px;
    }

    .ee-close-notice-btn:after {
        transform: rotate(-45deg);
    }

    .ee-close-notice-btn:before {
        transform: rotate(45deg);
    }

    .ee-hide-container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
    }

    .ee-open-notice {
        max-height: 24rem !important;
    }

    .ee-show-link {
        max-height: 1.5rem !important;
    }

    .ee-status-change-notice-div {
        margin: 0 .25rem 1rem;
        padding: 1rem 2rem;
        position: relative;
        transition: max-height 0.4s ease;
    }

    .ee-status-change-notice__admin-legend .ee-status-change-notice-div {
        background: #ffffff;
    }

    .ee-status-change-notice__event-editor .ee-status-change-notice-div {
        background: #f1f1f1;
    }

    .espresso_events-page .ee-status-message,
    .espresso_messages-page .ee-status-event {
        display: none;
    }

    .ee-status-change-notice-div h3 {
        color: #e34052;
        font-weight: 700;
        margin: .5rem 0 1rem;
    }

    .ee-status-change-notice-div p {
        font-size: .9rem;
        margin: .5em 0;
    }

    .ee-status-change-notice-div ul {
        line-height: 2.25rem;
        list-style: inside;
    }

    .ee-status-change-notice-div span.pill {
        border-radius: 3px;
        color: white;
        font-size: .75rem;
        font-weight: 600;
        padding: .2rem .6rem;
    }

    .ee-status-change-notice-div span.pill.yellow {
        background: #fad800;
        color: #403a3a;
    }

    .ee-status-change-notice-div span.pill.purple {
        background: #8a549a;
    }

    .ee-status-change-notice-div span.pill.charcoal {
        background: #403a3a;
    }

    .ee-status-change-notice-div span.pill.blue {
        background: #297abc;
    }

    .ee-status-change-notice-div span.pill.pink {
        background: #e65983;
    }

    .ee-status-change-notice-div span.pill.green {
        background: #91ab30;
    }

    .ee-status-change-notice-div span.pill.red {
        background: #fc1922;
    }

    .ee-dismiss-notice-pg {
        text-align: right;
    }

    .ee-dismiss-notice-pg a {
        text-decoration: none;
    }

    .ee-status-change-notice-div .ee-dismiss-notice-pg a .pill {
        background: unset;
        border: 1px #e65983 solid;
        color: #e65983;
        transition: all 0.15s;
    }

    .ee-status-change-notice-div .ee-dismiss-notice-pg a .pill:hover {
        background: #e65983;
        color: #fff;
    }
</style>

<div class="ee-status-change-notice-wrapper <?php echo "ee-status-change-notice{$context} {$page_slug}"; ?>">

    <a href="javascript:void(0);" onclick="openStatusNotice();" id="ee-open-notice-link" class="ee-hide-container
        ee-show-link">
        <?php esc_html_e('Click for an Important Notice regarding Status Color Codes', 'event_espresso'); ?>
    </a>
    <div id="ee-status-change-notice" class="ee-hide-container ee-close-notice">
        <div class="ee-status-change-notice-div">

            <a href="javascript:void(0);" onclick="closeStatusNotice();" class="ee-close-notice-btn"></a>
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
                <a href="javascript:void(0);" onclick="dismissStatusNotice();" class="ee-dismiss-notice-link">
                    <span class="pill pink"><?php
                        esc_html_e('don\'t show this notice again please', 'event_espresso');
                    ?></span>
                </a>
            </p>
        </div>
    </div>
</div>
