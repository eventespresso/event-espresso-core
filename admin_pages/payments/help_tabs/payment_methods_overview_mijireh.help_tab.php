<h3>
<?php _e('Mijireh Gateway', 'event_espresso'); ?>
</h3>
<p>
<?php printf(__('Mijireh is basically a middle-man between Event Espresso and over 90 payment gateways. Most of the configuration occurs on %sMijireh\' website%s, where you configure your Mijireh store with the %spayment gateway of your choice%s.', 'event_espresso'),'<a href="http://www.mijireh.com/">','</a>','<a href="http://www.mijireh.com/docs/payment-gateways/">','</a>'); ?>
</p>
<h3><?php _e('Mijireh Checkout Page Design', 'event_espresso'); ?></h3>
<p>
<?php _e("As you're probably aware, when users pay with Mijireh Gateway, they are taken to a secure offsite page, hosted by Mijireh. This page can easily be made to have the look-and-feel of your website through a process called 'slurping', where Mijireh 'slurps' up your website's design and uses it on their checkout page. ", 'event_espresso');?>
<?php printf(__("In order to do this, we automatically create a new WordPress page which is design to be slurped by Mijireh. You can customize the page like any other, but the page must contain Mijireh's special '{{mijireh-checkout-form}}' shortcode. Once you have finished designing the page, publish it, and %s then click the special 'slurp now' button%s. Mijireh may take several minutes to slurp the page. Once Mijireh is finished slurping, you can delete the page, or mark it as a draft. ", 'event_espresso'),'<a href="https://docs.google.com/a/eventespresso.com/file/d/0B5P8GXTvZgfMdjREYUtGM18wSms/edit?usp=drivesdk">','</a>');?>
</p>