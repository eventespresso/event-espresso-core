<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/** @type string $recaptcha_language */
/** @type string $recaptcha_publickey */
/** @type string $recaptcha_theme */
/** @type string $recaptcha_type */
?>
<div id="espresso-recaptcha-dv">
		<div class="g-recaptcha" data-sitekey="<?php echo $recaptcha_publickey; ?>" data-theme="<?php echo $recaptcha_theme; ?>" data-type="<?php echo $recaptcha_type; ?>" data-callback="espresso_recaptcha_verification"></div>
	<noscript>
	  <div style="width: 302px; height: 352px;">
		<div style="width: 302px; height: 352px; position: relative;">
		  <div style="width: 302px; height: 352px; position: absolute;">
			<iframe src="https://www.google.com/recaptcha/api/fallback?k=<?php echo $recaptcha_publickey; ?>" frameborder="0" scrolling="no" style="width: 302px; height:352px; border-style: none;">
			</iframe>
		  </div>
		  <div style="width: 250px; height: 80px; position: absolute; border-style: none; bottom: 21px; left: 25px; margin: 0; padding: 0; right: 25px;">
			<textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 80px; border: 1px solid #c1c1c1; margin: 0; padding: 0; resize: none;" title="">
			</textarea>
		  </div>
		</div>
	  </div>
	</noscript>
</div>
<?php
// End of file recaptcha.template.php
// Location: /recaptcha.template.php
