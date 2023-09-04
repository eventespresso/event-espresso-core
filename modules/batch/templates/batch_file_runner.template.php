<?php

$job_step_response = EED_Batch::instance()->job_step_response();
$filename = $job_step_response instanceof EventEspresso\core\libraries\batch\Helpers\JobStepResponse
    ? EEH_File::get_filename_from_filepath($job_step_response->job_parameters()->extra_datum('filepath'))
    : esc_html__('Unknown', 'event_espresso');
?>

<div class='ee-batch-runner__wrapper ee-admin-container'>
    <div class='padding'>
        <h1>
            <?php printf(__('Generating file %1$s...', 'event_espresso'), $filename); ?>
        </h1>
        <div id="batch-progress" class="progress-responsive"></div>
        <br/>
        <div id='message-area' class='ee-status-outline ee-status-bg--info'>
            <?php esc_html_e(
                'The file will download automatically when done, and then you will be redirected.',
                'event_espresso'
            ); ?>
        </div>
        <div id='progress-area'></div>
    </div>
</div>
