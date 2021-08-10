<?php
/**
 * @var EE_Attendee $attendee - instance of EE_Attendee
 */
EEH_Template_Validator::verify_instanceof($attendee, '$attendee', 'EE_Attendee');
?>
    <div id="titlediv">
        <div id="titlewrap">
            <label class="hidden" id="attendee-first-name-text" for="ATT_fname">
                <?php esc_html_e('First Name:', 'event_espresso'); ?>
            </label>
            <input class='smaller-text-field'
                   id="ATT_fname"
                   name="ATT_fname"
                   placeholder="<?php esc_html_e('First Name', 'event_espresso'); ?>"
                   required
                   type="text"
                   value="<?php echo esc_attr($attendee->get('ATT_fname')); ?>"
            />
            <label class="hidden" id="attendee-first-name-text" for="ATT_lname">
                <?php esc_html_e('Last Name:', 'event_espresso'); ?>
            </label>
            <input class='smaller-text-field'
                   id="ATT_lname"
                   name="ATT_lname"
                   placeholder="<?php esc_html_e('Last Name', 'event_espresso'); ?>"
                   type="text"
                   value="<?php echo esc_attr($attendee->get('ATT_lname')); ?>"
            />
            <div style="clear:both"></div>
        </div>
    </div>
<?php
