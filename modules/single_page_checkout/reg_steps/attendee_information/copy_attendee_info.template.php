<?php
/**
 * @var string[] $spco_copy_attendee_chk
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="spco-copy-attendee-dv" class="hide-if-no-js">
    <p class="spco-copy-all-attendee-pg">
        <label class="ee-checkbox-label-before ee-checkbox-label-wide">
            <?php esc_html_e(
                'Use Attendee #1\'s information for ALL attendees',
                'event_espresso'
            ); ?>
            <input class='spco-copy-all-attendee-chk ee-do-not-validate'
                   id="spco-copy-all-attendee-chk"
                   type="checkbox"
                   value="copy-all"
            >
        </label>
    </p>

    <p class="spco-copy-attendee-pg">
        <?php echo apply_filters(
            'FHEE__registration_page_attendee_information__copy_attendee_pg',
            sprintf(
                esc_html__(
                    'This option allows you to use the above information for all additional attendee question fields. %sPlease note:%s some events may have additional questions that you may still be required to answer in order to complete your registration.',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            )
        ); ?></p>

    <a class='display-the-hidden smaller-text float-right'
       id="display-more-attendee-copy-options"
       rel="more-attendee-copy-options"
    ><span class="dashicons dashicons-arrow-right"></span>
        <?php esc_html_e('advanced copy options', 'event_espresso'); ?>
    </a>
    <a class='hide-the-displayed smaller-text float-right'
       id="hide-more-attendee-copy-options"
       rel="more-attendee-copy-options"
       style="display: none;"
    >
        <span class="dashicons dashicons-arrow-down"></span>
        <?php esc_html_e('basic copy options', 'event_espresso'); ?>
    </a>

    <div id="more-attendee-copy-options-dv" class="" style="display: none;">
        <p class="spco-copy-attendee-pg">
            <?php esc_html_e(
                'Only copy the above information to the following selected additional attendees.',
                'event_espresso'
            ); ?>
        </p>

        <?php
        foreach ($spco_copy_attendee_chk as $spco_copy_chk) {
            echo wp_kses($spco_copy_chk, AllowedTags::getWithFormTags());
        } ?>

    </div>
    <div class="clear-float"></div>
</div>

