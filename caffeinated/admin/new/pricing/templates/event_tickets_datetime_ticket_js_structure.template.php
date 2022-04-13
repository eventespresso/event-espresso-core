<?php

/**
 * template args in use
 *
 * @var string $default_datetime_edit_row
 * @var string $default_ticket_row
 * @var string $default_price_row
 * @var string $default_price_rows
 * @var string $default_base_price_amount
 * @var string $default_base_price_name
 * @var string $default_base_price_description
 * @var string $default_price_modifier_selector_row
 * @var string $default_available_tickets_for_datetime
 * @var string $existing_available_datetime_tickets_list
 * @var string $existing_available_ticket_datetimes_list
 * @var string $new_available_datetime_ticket_list_item
 * @var string $new_available_ticket_datetime_list_item
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<!-- edit datetime base form -->
<table id="edit-datetime-form-holder" class="hidden">
    <tbody>
    <?php echo wp_kses($default_datetime_edit_row, AllowedTags::getWithFormTags()); ?>
    </tbody>
</table>


<!-- retrieved by js to set a new ticket row -->
<table id="ticket-row-form-holder" class="hidden">
    <tbody>
    <?php echo wp_kses($default_ticket_row, AllowedTags::getWithFormTags()); ?>
    </tbody>
</table>


<div id="default-base-price-info" class="hidden">
    <span id="default-base-price-amount"><?php echo wp_kses($default_base_price_amount, AllowedTags::getWithFormTags()); ?></span>
    <span id="default-base-price-name"><?php echo wp_kses($default_base_price_name, AllowedTags::getWithFormTags()); ?></span>
    <span id="default-base-price-description"><?php echo wp_kses($default_base_price_description, AllowedTags::getWithFormTags()); ?></span>
</div>


<!-- this is retrieved by our js to set a new price row. Note this will also contain any default prices setup by event manager -->
<table id="ticket-edit-row-initial-price-row" class="hidden">
    <tbody>
    <?php echo wp_kses($default_price_row, AllowedTags::getWithFormTags()); ?>
    </tbody>
</table>

<!-- this is retrieved by our js when a brand new ticket is created (not from short-ticket context).  It contains all the default prices available. -->
<table id="ticket-edit-row-default-price-rows" class="hidden">
    <tbody>
    <?php echo wp_kses($default_price_rows, AllowedTags::getWithFormTags()); ?>
    </tbody>
</table>


<!-- This is the selector and it ONLY lists price-modifiers (i.e. PBT_ID = 2 || 3).  It is used for new price rows added for EXISTING tickets (not new tickets) -->
<div id="ticket-edit-row-price-modifier-selector" class="hidden">
    <?php echo wp_kses($default_price_modifier_selector_row, AllowedTags::getWithFormTags()); ?>
</div>

<!-- available tickets for datetime html -->
<table id="edit-datetime-available-tickets-holder" class="hidden">
    <tbody>
    <?php echo wp_kses($default_available_tickets_for_datetime, AllowedTags::getWithFormTags()); ?>
    </tbody>
</table>


<!-- this will always have existing tickets listed here.  When we create a new ticket they get added to this container so that if a new datetime is created it just pulls from here. -->
<ul id="dtt-existing-available-ticket-list-items-holder" class="hidden datetime-tickets-list">
    <li class="hidden"></li>
    <?php echo wp_kses($existing_available_datetime_tickets_list, AllowedTags::getWithFormTags()); ?>
</ul>


<!-- same as above except for dtts -->
<ul id="dtt-existing-available-datetime-list-items-holder" class="hidden datetime-tickets-list">
    <li class="hidden"></li>
    <?php echo wp_kses($existing_available_ticket_datetimes_list, AllowedTags::getWithFormTags()); ?>
</ul>

<!-- single list item for a new available ticket created from a datetime -->
<ul id="dtt-new-available-ticket-list-items-holder" class="hidden">
    <?php echo wp_kses($new_available_datetime_ticket_list_item, AllowedTags::getWithFormTags()); ?>
</ul>


<!-- single list item for a new available datetime to add to our available ticket rows -->
<ul id="dtt-new-available-datetime-list-items-holder" class="hidden">
    <?php echo wp_kses($new_available_ticket_datetime_list_item, AllowedTags::getWithFormTags()); ?>
</ul>
