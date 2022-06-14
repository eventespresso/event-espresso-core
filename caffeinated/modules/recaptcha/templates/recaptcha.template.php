<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/** @type string $recaptcha_language */
/** @type string $recaptcha_publickey */
/** @type string $recaptcha_theme */
/** @type string $recaptcha_type */
?>
    <div id="espresso-recaptcha-dv">
        <div class="g-recaptcha" data-sitekey="<?php echo esc_attr($recaptcha_publickey); ?>"
             data-theme="<?php echo esc_attr($recaptcha_theme); ?>" data-type="<?php echo esc_attr($recaptcha_type); ?>"
             data-callback="espresso_recaptcha_verification"></div>
        <noscript>
            <div style="position: relative;">
                <div style="position: absolute;">
                    <iframe
                        src="https://www.google.com/recaptcha/api/fallback?k=<?php echo esc_attr($recaptcha_publickey); ?>"
                        style="border-style: none;">
                    </iframe>
                </div>
            </div>
        </noscript>
    </div>
<?php
// End of file recaptcha.template.php
// Location: /recaptcha.template.php
