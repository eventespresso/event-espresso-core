<?php
// define versions
define('EVENT_ESPRESSO_VERSION', espresso_version());
define('EE_MIN_WP_VER_REQUIRED', '4.5');
define('EE_MIN_WP_VER_RECOMMENDED', '4.9');
define('EE_MIN_PHP_VER_RECOMMENDED', '5.6.32');
define('EE_SUPPORT_EMAIL', 'support@eventespresso.com');
// used to be DIRECTORY_SEPARATOR, but that caused issues on windows
if (! defined('DS')) {
    define('DS', '/');
}
if (! defined('PS')) {
    define('PS', PATH_SEPARATOR);
}
if (! defined('SP')) {
    define('SP', ' ');
}
if (! defined('EENL')) {
    define('EENL', "\n");
}
// define the plugin directory and URL
define('EE_PLUGIN_BASENAME', plugin_basename(EVENT_ESPRESSO_MAIN_FILE));
define('EE_PLUGIN_DIR_PATH', dirname(EVENT_ESPRESSO_MAIN_FILE) . '/');
define('EE_PLUGIN_DIR_URL', plugin_dir_url(EVENT_ESPRESSO_MAIN_FILE));
// main root folder paths
define('EE_ADMIN_PAGES', EE_PLUGIN_DIR_PATH . 'admin_pages/');
define('EE_CORE', EE_PLUGIN_DIR_PATH . 'core/');
define('EE_MODULES', EE_PLUGIN_DIR_PATH . 'modules/');
define('EE_PUBLIC', EE_PLUGIN_DIR_PATH . 'public/');
define('EE_SHORTCODES', EE_PLUGIN_DIR_PATH . 'shortcodes/');
define('EE_WIDGETS', EE_PLUGIN_DIR_PATH . 'widgets/');
define('EE_PAYMENT_METHODS', EE_PLUGIN_DIR_PATH . 'payment_methods/');
define('EE_CAFF_PATH', EE_PLUGIN_DIR_PATH . 'caffeinated/');
// core system paths
define('EE_ADMIN', EE_CORE . 'admin/');
define('EE_CPTS', EE_CORE . 'CPTs/');
define('EE_CLASSES', EE_CORE . 'db_classes/');
define('EE_INTERFACES', EE_CORE . 'interfaces/');
define('EE_BUSINESS', EE_CORE . 'business/');
define('EE_MODELS', EE_CORE . 'db_models/');
define('EE_HELPERS', EE_CORE . 'helpers/');
define('EE_LIBRARIES', EE_CORE . 'libraries/');
define('EE_TEMPLATES', EE_CORE . 'templates/');
define('EE_THIRD_PARTY', EE_CORE . 'third_party_libs/');
define('EE_GLOBAL_ASSETS', EE_TEMPLATES . 'global_assets/');
define('EE_FORM_SECTIONS', EE_LIBRARIES . 'form_sections/');
// gateways
define('EE_GATEWAYS', EE_MODULES . 'gateways/');
define('EE_GATEWAYS_URL', EE_PLUGIN_DIR_URL . 'modules/gateways/');
// asset URL paths
define('EE_TEMPLATES_URL', EE_PLUGIN_DIR_URL . 'core/templates/');
define('EE_GLOBAL_ASSETS_URL', EE_TEMPLATES_URL . 'global_assets/');
define('EE_IMAGES_URL', EE_GLOBAL_ASSETS_URL . 'images/');
define('EE_THIRD_PARTY_URL', EE_PLUGIN_DIR_URL . 'core/third_party_libs/');
define('EE_HELPERS_ASSETS', EE_PLUGIN_DIR_URL . 'core/helpers/assets/');
define('EE_LIBRARIES_URL', EE_PLUGIN_DIR_URL . 'core/libraries/');
// define upload paths
$uploads = wp_upload_dir();
// define the uploads directory and URL
define('EVENT_ESPRESSO_UPLOAD_DIR', $uploads['basedir'] . '/espresso/');
define('EVENT_ESPRESSO_UPLOAD_URL', $uploads['baseurl'] . '/espresso/');
// define the templates directory and URL
define('EVENT_ESPRESSO_TEMPLATE_DIR', $uploads['basedir'] . '/espresso/templates/');
define('EVENT_ESPRESSO_TEMPLATE_URL', $uploads['baseurl'] . '/espresso/templates/');
// define the gateway directory and URL
define('EVENT_ESPRESSO_GATEWAY_DIR', $uploads['basedir'] . '/espresso/gateways/');
define('EVENT_ESPRESSO_GATEWAY_URL', $uploads['baseurl'] . '/espresso/gateways/');
// languages folder/path
define('EE_LANGUAGES_SAFE_LOC', '../' . 'uploads/' . 'espresso/languages/');
define('EE_LANGUAGES_SAFE_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'languages/');
// check for DOMPDF fonts in uploads
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'fonts/')) {
    define('DOMPDF_FONT_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'fonts/');
}
// ajax constants
define(
    'EE_FRONT_AJAX',
    isset($_REQUEST['ee_front_ajax']) || isset($_REQUEST['data']['ee_front_ajax'])
);
define(
    'EE_ADMIN_AJAX',
    isset($_REQUEST['ee_admin_ajax']) || isset($_REQUEST['data']['ee_admin_ajax'])
);
// just a handy constant occasionally needed for finding values representing infinity in the DB
// you're better to use this than its straight value (currently -1) in case you ever
// want to change its default value! or find when -1 means infinity
define('EE_INF_IN_DB', -1);
define('EE_INF', INF > (float) PHP_INT_MAX ? INF : PHP_INT_MAX);
if (! defined('EE_DEBUG')) {
    define('EE_DEBUG', false);
}
// for older WP versions
if (! defined('MONTH_IN_SECONDS')) {
    define('MONTH_IN_SECONDS', DAY_IN_SECONDS * 30);
}
