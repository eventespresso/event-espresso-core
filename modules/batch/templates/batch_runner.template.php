<?php
/** @var string $user_message */
?>

<div class="ee-batch-runner__wrapper ee-admin-container">
    <div class="padding">
        <h1><?php esc_html_e('Running Batch Job...', 'event_espresso');?></h1>
        <div class="progress-bar-wrapper">
            <div id='batch-progress' class='progress-responsive'></div>
            <label><?php esc_html_e('progress', 'event_espresso'); ?></label>
        </div>
        <div id='progress-area' class='progress-area'></div>
    </div>
</div>
