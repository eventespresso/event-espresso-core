<?php

/**
 * @var EE_Venue[] $venues
 * @var int        $evt_venue_id
 * @var string     $venue_selector
 * @var string     $new_venue_link
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<table class="ee-admin-two-column-layout form-table">
    <tr>
        <th>
            <label>
                <?php esc_html_e('Select Venue', 'event_espresso'); ?>
            </label>
        </th>
        <td class="use-ven-manager">
            <div class="select-venue-div">
                <?php echo wp_kses($venue_selector, AllowedTags::getWithFormTags());?>
                <?php echo wp_kses($new_venue_link, AllowedTags::getWithFormTags());?>
            </div>
            <?php
            foreach ($venues as $venue) :
                if (! $venue instanceof EE_Venue) {
                    continue;
                }
                $selected     = $evt_venue_id === $venue->ID() ? 'ee-venue-selected' : 'ee-venue-not-selected';
                $edit_url     = EE_Admin_Page::add_query_args_and_nonce(
                    ['action' => 'edit', 'post' => $venue->ID()],
                    EE_VENUES_ADMIN_URL
                );
                $state_name   = is_object($venue->state_obj()) ? $venue->state_obj()->name() : null;
                $country_name = is_object($venue->country_obj()) ? $venue->country_obj()->name() : null;
                ?>
                <div class='eebox <?php echo sanitize_html_class($selected); ?>' id="eebox_<?php echo absint($venue->ID()); ?>">
                    <p class='address-view'>
                        <span><?php esc_html_e('Address:', 'event_espresso'); ?>&nbsp;</span>
                        <?php echo esc_html($venue->address()); ?>
                        <?php echo wp_kses(
                            $venue->address2() ? '<br />' . $venue->address2() : '',
                            AllowedTags::getAllowedTags()
                        ); ?>
                        <br />
                        <span><?php esc_html_e('City:', 'event_espresso'); ?>&nbsp;</span>
                        <?php echo esc_html($venue->city()); ?>
                        <br />
                        <span><?php esc_html_e('State:', 'event_espresso'); ?>&nbsp;</span>
                        <?php echo esc_html($state_name); ?>
                        <br />
                        <span><?php esc_html_e('Country:', 'event_espresso'); ?>&nbsp;</span>
                        <?php echo esc_html($country_name); ?>
                        <br />
                        <span><?php esc_html_e('Venue ID:', 'event_espresso'); ?>&nbsp;</span>
                        <?php echo esc_html($venue->ID()); ?>
                        <br />
                    </p>
                    <a href="<?php echo esc_url_raw($edit_url); ?>" target="_blank">
                        <?php esc_html_e('Edit this Venue', 'event_espresso'); ?>
                    </a>
                </div>
            <?php endforeach; ?>
        </td>
    </tr>
</table>