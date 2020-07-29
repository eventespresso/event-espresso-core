<?php
/** @var string $context */
?>

<script type="text/javascript">
    function openStatusNotice() {
        let link = document.getElementById( 'ee-open-notice-link' );
        link.classList.remove( 'ee-show-link' );
        let statusNotice = document.getElementById( 'ee-status-change-notice' );
        statusNotice.classList.add( 'ee-open-notice' );
    }

    function closeStatusNotice() {
        let link = document.getElementById( 'ee-open-notice-link' );
        link.classList.add( 'ee-show-link' );
        let statusNotice = document.getElementById( 'ee-status-change-notice' );
        statusNotice.classList.remove( 'ee-open-notice' );
    }
</script>

<style type="text/css">

    .ee-status-change-notice-wrapper {
        clear: both;
        font-size: .8rem;
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
        max-height: 17rem !important;
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
        background: #fcb93c;
        color: #403a3a;
    }

    .ee-status-change-notice-div span.pill.purple {
        background: #8a549a;
    }

    .ee-status-change-notice-div span.pill.charcoal {
        background: #403a3a;
    }
</style>

<div class="ee-status-change-notice-wrapper <?php echo "ee-status-change-notice{$context}"; ?>">

    <a href="javascript:void();" onclick="openStatusNotice();" id="ee-open-notice-link" class="ee-hide-container
        ee-show-link">
        Click for an Important Notice regarding Status Color Codes
    </a>
    <div id="ee-status-change-notice" class="ee-hide-container ee-close-notice">
        <div class="ee-status-change-notice-div">

            <a href="javascript:void();" onclick="closeStatusNotice();" class="ee-close-notice-btn"></a>
            <h3>Important Notice Regarding Status Color Codes</h3>
            <p>In order to correct some inconsistencies in our event, datetime, and ticket status color codes, we have
                made the following changes:</p>
            <ul>
                <li>
                    The Event, Datetime, and Ticket "Sold Out" status colors have changed from
                    <span class="yellow pill">Yellow</span> to <span class="purple pill">Purple</span>
                </li>
                <li>
                    The Event and Datetime "Postponed" status colors have changed from
                    <span class="purple pill">Purple</span> to <span class="yellow pill">Yellow</span>
                </li>
                <li>
                    The Event "Inactive" and Ticket "Archived" status colors have changed from
                    <span class="purple pill">Purple</span> to <span class="charcoal pill">Charcoal</span>
                </li>
            </ul>
            <p>Please accept our sincere apologies for any inconvenience this might cause.</p>
        </div>
    </div>
</div>
