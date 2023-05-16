<?php
/**
 * template args in use
 * @var integer $dtt_row
 * @var string  $event_datetimes_name
 * @var string  $edit_dtt_expanded
 * @var integer $DTT_ID
 * @var string  $DTT_name
 * @var string  $DTT_EVT_start
 * @var string  $DTT_EVT_end
 * @var integer $DTT_reg_limit
 * @var integer $DTT_order
 * @var integer $dtt_sold
 * @var string  $trash_icon
 * @var string  $show_trash
 * @var string  $reg_list_url
 * @var string  $dtt_reserved
 * @var boolean $can_clone
 * @var boolean $can_trash
 */
?>
<tr valign="top" id="event-datetime-<?php echo esc_attr($dtt_row); ?>"
    class="datetime-edit event-datetime-row edit-dtt-row ee-dtt-sortable">
    <td class="event-datetime-column date-name-column">
        <input type="hidden" name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_ID]"
               id="event-datetime-DTT_ID-<?php echo esc_attr($dtt_row); ?>" class="event-datetime-DTT_ID"
               value="<?php echo absint($DTT_ID); ?>">
        <input type="hidden" name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_order]"
               id="event-datetime-DTT_order-<?php echo esc_attr($dtt_row); ?>" class="event-datetime-DTT_order"
               value="<?php echo esc_attr($DTT_order); ?>">
        <input type="text" name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_name]"
               id="event-datetime-DTT_name-<?php echo esc_attr($dtt_row); ?>" class="ee-large-text-inp event-datetime-DTT_name"
               value="<?php echo esc_attr($DTT_name); ?>" placeholder="<?php esc_html_e('Add Title (optional)', 'event_espresso'); ?>">
    </td>
    <td class="event-datetime-column date-column">
        <input type="text" name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_EVT_start]"
               id="event-datetime-DTT_EVT_start-<?php echo esc_attr($dtt_row); ?>"
               class="ee-text-inp event-datetime-DTT_EVT_start ee-datepicker"
               data-datetime-row="<?php echo esc_attr($dtt_row); ?>" data-context="start-dtt"
               data-date-field-context="#event-datetime-<?php echo esc_attr($dtt_row); ?>"
               data-related-field=".event-datetime-DTT_EVT_end" data-next-field=".event-datetime-DTT_EVT_end"
               value="<?php echo esc_attr($DTT_EVT_start); ?>">
    </td>
    <td class="event-datetime-column date-column">
        <input type="text" name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_EVT_end]"
               id="event-datetime-DTT_EVT_end-<?php echo esc_attr($dtt_row); ?>"
               class="ee-text-inp event-datetime-DTT_EVT_end ee-datepicker" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
               data-context="end-dtt" data-date-field-context="#event-datetime-<?php echo esc_attr($dtt_row); ?>"
               data-related-field=".event-datetime-DTT_EVT_start" data-next-field=".event-datetime-DTT_reg_limit"
               value="<?php echo esc_attr($DTT_EVT_end); ?>">
    </td>
    <td class="event-datetime-column small-txt-column">
        <input type="text" name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_reg_limit]"
               id="event-datetime-DTT_reg_limit-<?php echo esc_attr($dtt_row); ?>"
               class="ee-small-text-inp event-datetime-DTT_reg_limit ee-numeric" value="<?php echo esc_attr($DTT_reg_limit); ?>">
    </td>
    <td>
        <span data-context="datetime" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
              class="datetime-tickets-sold ee-numeric"><?php echo esc_html($dtt_sold); ?></span>
    </td>
    <?php if (apply_filters('FHEE__event_tickets_metabox__dtt_reserved', true)) : ?>
        <td>
            <span class="datetime-tickets-reserved ee-numeric"><?php echo esc_html($dtt_reserved); ?></span>
        </td>
    <?php endif; ?>

    <td>
        <div class="ee-editing-container <?php echo esc_attr($edit_dtt_expanded); ?>">
            <button data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                    data-context="datetime"
                    aria-label="<?php esc_attr_e('edit datetime details', 'event_espresso'); ?>"
                    class="button button--icon-only button--tiny ticket-icon ee-aria-tooltip dashicons dashicons-admin-generic
                    clickable"
            ></button>
        </div>
        <?php if ($can_clone) : ?>
        <button data-context="datetime"
                data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                aria-label="<?php esc_attr_e('duplicate datetime', 'event_espresso'); ?>"
                class="button button--icon-only button--tiny clone-entity ee-aria-tooltip dashicons dashicons-admin-page clickable"
        ></button>
        <?php endif; ?>
        <?php if ($can_trash) : ?>
        <button data-context="datetime"
                data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                aria-label="<?php esc_attr_e('trash datetime', 'event_espresso'); ?>"
                class="button button--icon-only button--tiny ee-aria-tooltip <?php echo esc_attr($trash_icon); ?>"
                style="<?php echo esc_attr($show_trash); ?>"
        ></button>
        <?php endif; ?>
        <?php if ($reg_list_url !== '') : ?>
            <a href="<?php echo esc_url_raw($reg_list_url); ?>"
               aria-label="<?php esc_attr_e('View registrations for this datetime.', 'event_espresso'); ?>"
               class="button button--icon-only button--tiny ee-aria-tooltip reg-list-link clickable"
               style="text-decoration: none;">
                <span data-context="datetime" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                      class="dashicons dashicons-groups clickable"></span>
            </a>
        <?php endif; ?>
        <span aria-label="<?php esc_html_e('Click and drag-n-drop to reorder datetimes.', 'event_espresso') ?>"
              class="button button--icon-only button--tiny ee-aria-tooltip dashicons dashicons-move
              sortable-drag-handle"
        ></span>
    </td>
</tr>

