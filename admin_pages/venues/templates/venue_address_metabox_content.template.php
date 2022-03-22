<?php
/**
 * @var EE_Venue   $_venue
 * @var string     $countries_dropdown
 * @var string     $states_dropdown
 * @var string[][] $template_args
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

do_action('AHEE__venue_address_metabox_content__before', $template_args);
?>
    <p>
        <label for="phys-addr">
            <?php esc_html_e('Address:', 'event_espresso'); ?>
        </label><br />
        <input class="all-options"
               id="phys-addr"
               type="text"
               value="<?php echo esc_html($_venue->get_pretty('VNU_address')); ?>"
               name="vnu_address"
        />
    </p>
    <p>
        <label for="phys-addr-2">
            <?php esc_html_e('Address 2:', 'event_espresso'); ?>
        </label><br />
        <input class="all-options"
               id="phys-addr-2"
               type="text"
               value="<?php echo esc_html($_venue->get_pretty('VNU_address2')); ?>"
               name="vnu_address2"
        />
    </p>
    <p>
        <label for="phys-city">
            <?php esc_html_e('City:', 'event_espresso'); ?>
        </label><br />
        <input class="all-options"
               id="phys-city"
               type="text"
               value="<?php echo esc_html($_venue->get_pretty('VNU_city')); ?>"
               name="vnu_city"
        />
    </p>
    <p>
        <?php echo wp_kses($states_dropdown, AllowedTags::getWithFormTags()); ?>
    </p>
    <p>
        <label for="zip-postal">
            <?php esc_html_e('Zip/Postal Code:', 'event_espresso'); ?>
        </label><br />
        <input class="all-options"
               id="zip-postal"
               type="text"
               value="<?php echo esc_html($_venue->get_pretty('VNU_zip')); ?>"
               name="vnu_zip"
        />
    </p>
    <p>
        <?php echo wp_kses($countries_dropdown, AllowedTags::getWithFormTags()); ?>
    </p>
<?php
do_action('AHEE__venue_address_metabox_content__after', $template_args);
