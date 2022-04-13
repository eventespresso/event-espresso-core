<?php
/**
 * @var string template args in use
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
 * @var string  $clone_icon
 * @var string  $trash_icon
 * @var string  $show_trash
 * @var string  $reg_list_url
 * @var string  $dtt_reserved
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
            <span data-datetime-row="<?php echo esc_attr($dtt_row); ?>" data-context="datetime"
                  class="ticket-icon dashicons dashicons-admin-generic clickable"></span>
        </div>
        <span data-context="datetime" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
              class="<?php echo esc_attr($clone_icon); ?> clickable"></span>
        <span data-context="datetime" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
              class="<?php echo esc_attr($trash_icon); ?> clickable"<?php echo $show_trash; ?>></span>
        <?php if ($reg_list_url !== '') : ?>
            <a href="<?php echo esc_url_raw($reg_list_url); ?>"
               title="<?php esc_attr_e('View registrations for this datetime.', 'event_espresso'); ?>"
               style="text-decoration: none;">
                <span data-context="datetime" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                      class="dashicons dashicons-groups clickable"></span>
            </a>
        <?php endif; ?>
        <span class="dashicons dashicons-image-flip-vertical sortable-drag-handle"></span>
    </td>
</tr>

