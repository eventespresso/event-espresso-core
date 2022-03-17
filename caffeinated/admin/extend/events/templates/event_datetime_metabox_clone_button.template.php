<?php
/**
 * @var int $row
 */
?>

<a class='clone-date-time dtm-inp-btn' rel='<?php echo absint($row); ?>'
   title='<?php esc_attr_e('Clone this Event Date and Time', 'event_espresso'); ?>'
   style='position:relative; top:5px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'>
    <img alt='<?php esc_attr_e('clone', 'event_espresso'); ?>'
         height='16'
         src='<?php echo esc_url_raw(EE_IMAGES_URL . 'clone-trooper-16x16.png'); ?>'
         width='16'
    />
</a>
