<h3><?php _e('Price Types Table Column Headings', 'event_espresso'); ?></h3>
<p>
<ul>
<li>
<?php _e('<strong>Base Price</strong>', 'event_espresso'); ?><br />
<?php _e('Every event ticket must have a single base price. This price is the top level price in all calculations and all other price types act as modifier for this base price. Note, you cannot create new price types as extensions of this base, nor can you delete the default price based on the price type for this base. However, you are able to change the value of this base price, the name, and the description.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Discount</strong>', 'event_espresso'); ?><br />
<?php _e('The discount base type is a kind of Price Type that modifies the base price by subtracting a value or percentage (depends on price type options). For example, a "Percent Discount" price type and "Dollar Discount" are both extensions of the "discount" base type. The "Percent Discount" price type has been set to give percentage discounts, whereas the "Dollar Discount" has been set to give dollar discounts.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Surcharge</strong>', 'event_espresso'); ?><br />
<?php _e('Price Types based on the "surcharge" base type add to the running total.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Tax</strong>', 'event_espresso'); ?><br />
<?php _e('Taxes are a special price type. While you can view the value of a tax price on a single ticket in the event editor, taxes are only applied to the cart total after all other modifiers have been added or subtracted from the base price.', 'event_espresso'); ?>
</li>
</ul>
</p>