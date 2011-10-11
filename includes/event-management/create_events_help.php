<div style="display: none;">
  <?php ########## help box ########## ?>
  <div id="event-meta-boxes" class="pop-help" >
    <div class="TB-ee-frame">
      <h2>
        <?php _e("Using the Event Meta boxes", "event_espresso"); ?>
      </h2>
      <p>
        <?php _e("Event meta boxes allow you to add extra information to your event that you can display in your templates or use in your custom pages. ", "event_espresso"); ?>
      </p>
      <p>
        <?php _e("This extra information can be displayed in your event listings or registration pages via shortcodes.", "event_espresso"); ?>
      </p>
      <p>
        <?php _e("The Shortcodes take the form of:<br /> <code>[EE_META type='event_meta' name='my_meta_key']</code>", "event_espresso") ?>
      </p>
      <p>
        <?php _e("The name parameter is the the first box labeled 'Key' and allows the shortcode to identify which meta box is to be displayed; the 'Value' is the actual content you wish to be shown.", "event_espresso") ?>
      </p>
      <p>
        <?php _e("If you are using custom templates (moved to the uploads folder) you can add the shortcode directly to the template, this would take the form of:", "event_espresso") ?>
      </p>
      <p>
        <?php _e("<code>&lt;?php echo do_shortcode('[EE_META type='event_meta' name='my_meta_key']'); ?></code>", "event_espresso") ?>
      </p>
      <p>
        <?php echo __('Further information on shortcodes is available ', 'event_espresso') . "<a href='" . admin_url('admin.php?page=support#shortcodes') . " '>" . __('on the Help &amp; Support page', 'event_espresso') . "</a>" . __(' or from the', 'event_espreso'). " <a href='http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/'>" . __('forums', 'event_espresso') . "</a>."; ?>
      </p>
    </div>
  </div>
</div>

<div style="display: none;">
  <?php ########## help box ########## ?>
  <div id="event_custom_emails" class="pop-help" >
    <div class="TB-ee-frame">
      <h2>
        <?php _e("Using Custom Emails Editor", "event_espresso"); ?>
      </h2>
      <p>
        <?php _e("This area is used to add a  customized email to your registration. You must select \"Yes\" in the \"Send custom confirmation emails for this event?\" and nothing should be selected in the \"Use a pre-existing email?\" dropdown.", "event_espresso"); ?>
      </p>
      <p>
        <?php _e("Please be aware that clicking the HTML will destroy all formatting.", "event_espresso") ?>
      </p>
    </div>
  </div>
</div>