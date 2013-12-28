<p><?php _e('Price Types are a way of categorizing a price and indicating how that price gets applied to a running total when a transaction occurs.', 'event_espresso'); ?></p>
<p><?php _e('You are able to define your own Price Types that you can choose from when defining your default prices.  However, every Price Type is actually a derivative of 4 base types that cannot be changed:', 'event_espresso'); ?>
</p>
<h3><?php _e('1. Base Price', 'event_espresso'); ?></h3>
<p><?php _e('Every event ticket must have one (and only one) base price. This price is the top level price in all calculations and every other price type is a <em>modifier</em> for this base price.  Note, you cannot create new price types as derivatives of this base, nor can you delete the default price based on the price type for this base.  However, you are able to change what the value of this base price is, the name, and description.', 'event_espresso'); ?></p>

<h3><?php _e('2. Discount', 'event_espresso'); ?></h3>
<p><?php _e('The discount base type is a kind of Price Type that modifies the base price by subtracting a value or percentage (depending on how you setup the price type for this base).  For example, A "Percent Discount" Price Type, and "Dollar Discount" are both derivatives of the "discount" base, but the "Percent Discount" price type has been set to give percentage discounts, whereas the "Dollar Discount" has been set to give dollar discounts.', 'event_espresso'); ?></p>

<h3><?php _e('3. Surcharge', 'event_espresso'); ?></h3>
<p><?php _e('Price Types based on the "surcharge" base type function similarily to "discounts" excep that instead of modifying by subtracting a value, they add to the running total', 'event_espresso'); ?></p>

<h3><?php _e('4. Taxes', 'event_espresso'); ?></h3>
<p><?php _e('Taxes are a special price type in although you can view the value of a tax <em>price</em> on a single ticket in the event editor, taxes are only applied to the cart total after all other modifiers have been added/subtracted from the base price.', 'event_espresso'); ?></p>