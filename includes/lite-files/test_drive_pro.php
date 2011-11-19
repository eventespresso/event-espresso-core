<?php
if ( ! defined("EVENT_ESPRESSO_VERSION")) exit("No direct script access allowed");
function event_espresso_test_drive() {
?>

<div class="wrap">
  <div id="icon-options-event" class="icon32"></div>
  <h2>
    <?php _e("Test Drive the Full Version of Espresso", "event_espresso"); ?>
  </h2>
  <div id="poststuff" class="metabox-holder has-right-sidebar">
    <?php event_espresso_display_right_column(); ?>
    <div id="post-body">
      <div id="post-body-content">
        <div class="meta-box-sortables ui-sortable">
          <ul id="event_espresso-sortables" class="help-support">
            <li>
              <div class="metabox-holder">
                <div class="postbox">
                  <div title="Click to toggle" class="handlediv"><br />
                  </div>
                  <h3>Get $10 off when you test drive Event Espresso!</h3>
                  <div class="inside">
                    <p>If you would like to test drive Event Espresso with the <a
href="http://eventespresso.com/download/plugins-and-addons/recurring-events-manager/">Recurring Events</a> add-on and <a
href="http://eventespresso.com/download/plugins-and-addons/calendar/">calendar</a> installed, please complete the application below. If approved, you will be granted access to our test drive site where you can demo Event Espresso for yourself. You will also receive a code to get $10 off the price of the plugin. </p>
                    <p>If you have questions, please see our <a
href="http://eventespresso.com/forums/category/premium-plugin-support/pre-sales-questions/">Pre-sales Forum</a>.</p>
                    <div
class="gform_wrapper" id="gform_wrapper_14" >
                      <form
method="post" enctype="multipart/form-data"  id="gform_14" class="" action="http://eventespresso.com/test-drive-event-espresso-promo/">
                        <div
class="gform_heading">
                          <h4 class="gform_title">Application to Test Drive Event Espresso</h4>
                          <span
class="gform_description"></span></div>
                        <div
class="gform_body">
                          <ul
id="gform_fields_14" class="gform_fields top_label">
                            <li
id="field_14_1" class="gfield" >
                              <label
class="gfield_label" for="input_14_1">Name<span
class="gfield_required">*</span></label>
                              <div
class="ginput_complex ginput_container" id="input_14_1"><span
id="input_14_1_3_container" class="ginput_left">
                                <input
type="text" name="input_1.3" id="input_14_1.3" value="" tabindex="1" />
                                <label
for="input_14_1.3">First</label>
                                </span><span
id="input_14_1_6_container" class="ginput_right">
                                <input
type="text" name="input_1.6" id="input_14_1.6" value="" tabindex="2" />
                                <label
for="input_14_1.6">Last</label>
                                </span></div>
                            </li>
                            <li
id="field_14_5" class="gfield" >
                              <label
class="gfield_label" for="input_14_5">Email<span
class="gfield_required">*</span></label>
                              <div
class="ginput_container">
                                <input
name="input_5" id="input_14_5" type="text" value="" class="medium"  tabindex="3"  />
                              </div>
                              <div
class="gfield_description">Your access will be delivered to the email address you provide.</div>
                            </li>
                            <li
id="field_14_2" class="gfield" >
                              <label
class="gfield_label" for="input_14_2">Website<span
class="gfield_required">*</span></label>
                              <div
class="ginput_container">
                                <input
name="input_2" id="input_14_2" type="text" value="http://" class="medium"  tabindex="4"  />
                              </div>
                              <div
class="gfield_description">Yours or the address where you are going to install Event Espresso.</div>
                            </li>
                            <li
id="field_14_4" class="gfield" >
                              <label
class="gfield_label" for="input_14_4">How did you hear about Event Espresso?<span class="gfield_required">*</span></label>
                              <div class="ginput_container">
                                <select name="input_4" id="input_14_4"  class="medium gfield_select" tabindex="5">
                                  <option
value="Internet Search Engine" >Internet Search Engine</option>
                                  <option
value="Twitter" >Twitter</option>
                                  <option
value="Facebook" >Facebook</option>
                                  <option
value="Email" >Email</option>
                                  <option
value="Recommended by Another Person" >Recommended by Another Person</option>
                                  <option
value="Other" >Other</option>
                                </select>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div
class="gform_footer top_label">
                          <input
type="submit" id="gform_submit_button_14" class="button gform_button" value="Submit Application" tabindex="6" />
                          <input
type="hidden" class="gform_hidden" name="is_submit_14" value="1" />
                          <input
type="hidden" class="gform_hidden" name="gform_submit" value="14" />
                          <input
type="hidden" class="gform_hidden" name="gform_unique_id" value="4ea9a597c866d" />
                          <input
type="hidden" class="gform_hidden" name="state_14" value="YToyOntpOjA7czo2OiJhOjA6e30iO2k6MTtzOjMyOiI0N2ViZjVhZTE2MjFjOWM2Njg3ZWFhZjFiZWUxYzhhZSI7fQ==" />
                          <input
type="hidden" class="gform_hidden" name="gform_target_page_number_14" id="gform_target_page_number_14" value="0" />
                          <input
type="hidden" class="gform_hidden" name="gform_source_page_number_14" value="1" />
                          <input
type="hidden" name="gform_field_values" value="" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- / .meta-box-sortables --> 
      </div>
      <!-- / .post-body-content : left sidebar main content --> 
    </div>
    <!-- / .post-body --> 
    
  </div>
  <!-- / #poststuff --> 
</div>
<!-- / #wrap --> 
<script type="text/javascript" charset="utf-8">
							//<![CDATA[
							jQuery(document).ready(function() {
								postboxes.add_postbox_toggles('support');

							}); 
							//]]>
							</script>
<?php
}

