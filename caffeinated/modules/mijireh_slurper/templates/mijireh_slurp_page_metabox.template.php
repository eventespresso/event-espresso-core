   <div id='mijireh_notice' class='mijireh-info alert-message info' data-alert='alert'>
      <div class='mijireh-logo'><img src='<?php echo $mijireh_image_url;?>' alt='<?php printf( esc_attr__( '%s Checkout Logo', 'event_espresso' ), 'Mijereh' ); ?>'></div>
      <div class='mijireh-blurb'>
		  <h2><?php _e("Slurp Into Mijireh", 'event_espresso');?></h2>
		  <p><?php printf(__("Design the page how you want, and be sure to include the special text {{mj-checkout-form}} to indicate where to place Mijireh's Checkout Form. You may want to read %s Mijireh's instructions on slurping%s.", 'event_espresso'),"<a href='http://www.mijireh.com/docs/what-is-page-slurp/'>","</a>");?>

        <p class='aligncenter'><a href='<?php echo $slurp_action_link?>' id='page_slurp' class='button-primary'>Slurp This Page!</a></p>
        <p class="aligncenter"><a class="nobold" href="https://secure.mijireh.com/checkout/<?php echo $access_key?>" id="view_slurp" target="_new">Preview Checkout Page</a></p>
      </div>
     </div>
