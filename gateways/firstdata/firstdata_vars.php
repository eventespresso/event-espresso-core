<?php

$firstdata_settings = get_option( 'event_espresso_firstdata_settings' );

?>
<div class="event-display-boxes">
<p class="section-title"><?php _e( 'Billing Information', 'event_espresso' ) ?></p>
<div class = "event_espresso_form_wrapper">
<form id="firstdata_payment_form" name="firstdata_payment_form" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?>">
    <p>
        <label for="first_name"><?php _e( 'First Name', 'event_espresso' ); ?></label>
        <input name="first_name" type="text" id="first_name" class="required" value="<?php echo $fname ?>" />
    </p>
    <p>
        <label for="last_name"><?php _e( 'Last Name', 'event_espresso' ); ?></label>
        <input name="last_name" type="text" id="last_name" class="required" value="<?php echo $lname ?>" />
    </p>
    <p>
        <label for="email"><?php _e( 'Email Address', 'event_espresso' ); ?></label>
        <input name="email" type="text" id="email" class="required" value="<?php echo $attendee_email ?>" />
    </p>
    <p>
        <label for="address"><?php _e( 'Address', 'event_espresso' ); ?></label>
        <input name="address" type="text" id="address" class="required" value="<?php echo $address ?>" />
    </p>
    <p>
        <label for="city"><?php _e( 'City', 'event_espresso' ); ?></label>
        <input name="city" type="text" id="city" class="required" value="<?php echo $city ?>" />
    </p>
    <p>
        <label for="state"><?php _e( 'State', 'event_espresso' ); ?></label>
        <input name="state" type="text" id="state" class="required" value="<?php echo $state ?>" />
    </p>
    <p>
        <label for="zip"><?php _e( 'Zip', 'event_espresso' ); ?></label>
        <input name="zip" type="text" id="zip" class="required" value="<?php echo $zip ?>" />
    </p>
    <p class="section-title"><?php _e( 'Credit Card Information', 'event_espresso' ); ?></p>
    <p>
        <label for="card_num"><?php _e( 'Card Card Type', 'event_espresso' ); ?></label>
        <select name ="creditcardtype" class="required">

            <?php

            foreach ( explode( ",", $firstdata_settings['firstdata_credit_cards'] ) as $k => $v )
                echo "<option value='$v'>$v</option>";
            ?>

        </select>

    </p>
    <p>
        <label for="card_num"><?php _e( 'Card Number', 'event_espresso' ); ?></label>
        <input type="text" name="card_num" class="required" id="card_num" />
    </p>


    <p>
        <label for="card_num"><?php _e( 'Expiration Month', 'event_espresso' ); ?></label>
        <select name ="expmonth" class="required">

            <?php

            for ( $i = 1; $i < 13; $i++ )
                echo "<option value='$i'>$i</option>";
            ?>

        </select>

    </p>

    <p>
        <label for=""><?php _e( 'Expiration Year', 'event_espresso' ); ?></label>
        <select name ="expyear" class="required">

            <?php

            $curr_year = date( "Y" );
            for ( $i = 0; $i < 10; $i++ ) {
                $disp_year = $curr_year + $i;
                echo "<option value='" . substr($disp_year,2,2) . "'>$disp_year</option>";
            }
            ?>

        </select>

    </p>

    <p>
        <label for="cvv"><?php _e( 'CVV Code', 'event_espresso' ); ?></label>
        <input type="text" name="cvv"  class="required" />
    </p>
    <input name="amount" type="hidden" value="<?php echo number_format( $event_cost, 2 ) ?>" />
    <input name="firstdata" type="hidden" value="1" />
    <input name="id" type="hidden" value="<?php echo $attendee_id ?>" />

    <input name="firstdata_submit" class="btn_event_form_submit ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" type="submit" value="<?php _e( 'Complete Purchase', 'event_espresso' ); ?>" />
    <span id="processing"></span>
</form><!-- / close firstdata form -->
</div>

<script type="text/javascript">

    jQuery(function(){

        jQuery('#firstdata_payment_form').validate();

        jQuery('#firstdata_payment_form').submit(function(){

            if (jQuery('#firstdata_payment_form').valid()){
                jQuery('#processing').html('<img src="' + EEGlobals.plugin_url + 'images/ajax-loader.gif">');
                //jQuery(':input[name="firstdata_submit"]').attr('disabled', 'disabled');
            }
    
        })
 



    });


</script>
</div>