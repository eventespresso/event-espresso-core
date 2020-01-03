<h2><?php esc_html_e('Please Confirm You Want to Permanently Delete the Following Data', 'event_espresso'); ?></h2>
A bunch of events
<form action="<?php echo $form_url;?>" method="POST">
    <input type="hidden" value="<?php echo esc_attr($deletion_job_code);?>" name="deletion_job_code">
    <input type="submit" value="<?php echo esc_attr(esc_html__('Confirm', 'event_espresso')); ?>">
</form>
