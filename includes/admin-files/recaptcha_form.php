<?php
//Displays reCAPTCHA form
?>
          <div class="metabox-holder">
			<div class="postbox">
  			<h3>
              <?php _e('reCAPTCHA Settings','event_espresso'); ?>
            </h3>
          
            <div class="padding">
              <ul>
                <li>
                  <label for="use_captcha">
                   <strong><?php _e('Use', 'event_espresso'); ?> <a href="http://recaptcha.net/||http://recaptcha.net/learnmore.html||https://admin.recaptcha.net/accounts/login/?next=/recaptcha/sites/||http://recaptcha.net/apidocs/captcha/client.html" title="reCAPTCHA Home Page||What is reCAPTCHA||reCAPTCHA Account||reCAPTCHA Client API Documentation" target="_blank"><?php _e('reCAPTCHA', 'event_espresso'); ?></a> <?php _e('to block spam registrations', 'event_espresso'); ?></strong>:
                    <a class="ev_reg-fancylink" href="#recaptcha_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>/images/question-frame.png" width="16" height="16" /></a> </label>
                  <?php
						$values=array(					
							array('id'=>'N','text'=> __('No','event_espresso')),
							array('id'=>'Y','text'=> __('Yes','event_espresso'))
						);				
							echo select_input('use_captcha', $values, isset($org_options['use_captcha']) ? $org_options['use_captcha'] : '');
					?>
                </li>
                <li>
                  <label for="recaptcha_publickey">
                    <?php _e('Public Key:','event_espresso'); ?>
                  </label>
                  <input type="text" name="recaptcha_publickey" size="45" value="<?php if(isset($org_options['recaptcha_publickey'])) echo $org_options['recaptcha_publickey'];?>" />
                </li>
                <li>
                  <label for="recaptcha_privatekey">
                    <?php _e('Private Key:','event_espresso'); ?>
                  </label>
                  <input type="text" name="recaptcha_privatekey" size="45" value="<?php if(isset($org_options['recaptcha_privatekey'])) echo $org_options['recaptcha_privatekey'];?>" />
                </li>
                <li>
                  <h4>
                    <?php _e('Look &amp; Feel Customization','event_espresso'); ?>
                  </h4>
                </li>
                <li>
                  <label for="recaptcha_width">
                    <?php _e('Width:','event_espresso'); ?>
                  </label>
                  <input name="recaptcha_width" type="text" value="<?php echo !isset($org_options['recaptcha_width']) || $org_options['recaptcha_width'] == '' ? '500': $org_options['recaptcha_width'];?>" size="5" maxlength="6" />
                </li>
                <li>
                  <label for="recaptcha_theme">
                    <?php _e('Theme:','event_espresso'); ?>
                  </label>
                  <?php
						$values=array(					
							array('id'=>'red','text'=> __('Red','event_espresso')),
							array('id'=>'white','text'=> __('White','event_espresso')),
							array('id'=>'blackglass','text'=> __('Blackglass','event_espresso')),
							array('id'=>'clean','text'=> __('Clean','event_espresso')));				
							echo select_input('recaptcha_theme', $values, isset($org_options['recaptcha_theme']) ? $org_options['recaptcha_theme'] : '');
					?>
                </li>
                <li>
                  <label for="recaptcha_language">
                    <?php _e('Language:','event_espresso'); ?>
                  </label>
                  <?php
						$values=array(					
							array('id'=>'en','text'=> __('English','event_espresso')),
							array('id'=>'es','text'=> __('Spanish','event_espresso')),
							array('id'=>'nl','text'=> __('Dutch','event_espresso')),
							array('id'=>'fr','text'=> __('French','event_espresso')),
							array('id'=>'de','text'=> __('German','event_espresso')),
							array('id'=>'pt','text'=> __('Portuguese','event_espresso')),
							array('id'=>'ru','text'=> __('Russian','event_espresso')),				
							array('id'=>'tr','text'=> __('Turkish','event_espresso'))
							);				
							echo select_input('recaptcha_language', $values, isset($org_options['recaptcha_language']) ? $org_options['recaptcha_language'] : '');
					?>
                </li>
              </ul>
              <div id="recaptcha_info" style="display:none">
               <h2><?php _e('reCAPTCHA Information', 'event_espresso'); ?></h2>
						<p><?php _e('reCAPTCHA helps prevent automated abuse of your site (such as comment spam or bogus registrations) by using a', 'event_espresso'); ?> <a href="http://recaptcha.net/captcha.html">CAPTCHA</a> <?php _e('to ensure that only humans perform certain actions.', 'event_espresso'); ?></p>
			<p><?php _e('You must sign up for a', 'event_espresso'); ?> <a href="https://admin.recaptcha.net/accounts/signup/?next=%2Frecaptcha%2Fsites%2F" target="_blank">free reCAPTCHA</a> <?php _e('account to use it with this plugin. If you already have a reCAPTCHA account enter your "Public" and "Private" keys on this page.', 'event_espresso'); ?></p>
              </div>
              
               <p>
        <input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_saetting_3" />
      </p>
            </div>
          </div>
          </div>