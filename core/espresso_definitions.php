<?php
// define versions
define('EVENT_ESPRESSO_VERSION', espresso_version());
define('EE_MIN_WP_VER_REQUIRED', '4.1');
define('EE_MIN_WP_VER_RECOMMENDED', '4.4.2');
define('EE_MIN_PHP_VER_RECOMMENDED', '5.4.44');
// define the plugin directory and URL
define('EE_PLUGIN_BASENAME', plugin_basename(EVENT_ESPRESSO_MAIN_FILE));
define('EE_PLUGIN_DIR_PATH', plugin_dir_path(EVENT_ESPRESSO_MAIN_FILE));
define('EE_PLUGIN_DIR_URL', plugin_dir_url(EVENT_ESPRESSO_MAIN_FILE));
define('EE_SUPPORT_EMAIL', 'support@eventespresso.com');
//used to be DIRECTORY_SEPARATOR, but that caused issues on windows
if ( ! defined('DS')) {
    define('DS', '/');
}
if ( ! defined('PS')) {
    define('PS', PATH_SEPARATOR);
}
if ( ! defined('SP')) {
    define('SP', ' ');
}
if ( ! defined('EENL')) {
    define('EENL', "\n");
}
// main root folder paths
define('EE_ADMIN_PAGES', EE_PLUGIN_DIR_PATH . 'admin_pages' . DS);
define('EE_CORE', EE_PLUGIN_DIR_PATH . 'core' . DS);
define('EE_MODULES', EE_PLUGIN_DIR_PATH . 'modules' . DS);
define('EE_PUBLIC', EE_PLUGIN_DIR_PATH . 'public' . DS);
define('EE_SHORTCODES', EE_PLUGIN_DIR_PATH . 'shortcodes' . DS);
define('EE_WIDGETS', EE_PLUGIN_DIR_PATH . 'widgets' . DS);
define('EE_PAYMENT_METHODS', EE_PLUGIN_DIR_PATH . 'payment_methods' . DS);
define('EE_CAFF_PATH', EE_PLUGIN_DIR_PATH . 'caffeinated' . DS);
// core system paths
define('EE_ADMIN', EE_CORE . 'admin' . DS);
define('EE_CPTS', EE_CORE . 'CPTs' . DS);
define('EE_CLASSES', EE_CORE . 'db_classes' . DS);
define('EE_INTERFACES', EE_CORE . 'interfaces' . DS);
define('EE_BUSINESS', EE_CORE . 'business' . DS);
define('EE_MODELS', EE_CORE . 'db_models' . DS);
define('EE_HELPERS', EE_CORE . 'helpers' . DS);
define('EE_LIBRARIES', EE_CORE . 'libraries' . DS);
define('EE_TEMPLATES', EE_CORE . 'templates' . DS);
define('EE_THIRD_PARTY', EE_CORE . 'third_party_libs' . DS);
define('EE_GLOBAL_ASSETS', EE_TEMPLATES . 'global_assets' . DS);
define('EE_FORM_SECTIONS', EE_LIBRARIES . 'form_sections' . DS);
// gateways
define('EE_GATEWAYS', EE_MODULES . 'gateways' . DS);
define('EE_GATEWAYS_URL', EE_PLUGIN_DIR_URL . 'modules' . DS . 'gateways' . DS);
// asset URL paths
define('EE_TEMPLATES_URL', EE_PLUGIN_DIR_URL . 'core' . DS . 'templates' . DS);
define('EE_GLOBAL_ASSETS_URL', EE_TEMPLATES_URL . 'global_assets' . DS);
define('EE_IMAGES_URL', EE_GLOBAL_ASSETS_URL . 'images' . DS);
define('EE_THIRD_PARTY_URL', EE_PLUGIN_DIR_URL . 'core' . DS . 'third_party_libs' . DS);
define('EE_HELPERS_ASSETS', EE_PLUGIN_DIR_URL . 'core/helpers/assets/');
define('EE_LIBRARIES_URL', EE_PLUGIN_DIR_URL . 'core/libraries/');
// define upload paths
$uploads = wp_upload_dir();
// define the uploads directory and URL
define('EVENT_ESPRESSO_UPLOAD_DIR', $uploads['basedir'] . DS . 'espresso' . DS);
define('EVENT_ESPRESSO_UPLOAD_URL', $uploads['baseurl'] . DS . 'espresso' . DS);
// define the templates directory and URL
define('EVENT_ESPRESSO_TEMPLATE_DIR', $uploads['basedir'] . DS . 'espresso' . DS . 'templates' . DS);
define('EVENT_ESPRESSO_TEMPLATE_URL', $uploads['baseurl'] . DS . 'espresso' . DS . 'templates' . DS);
// define the gateway directory and URL
define('EVENT_ESPRESSO_GATEWAY_DIR', $uploads['basedir'] . DS . 'espresso' . DS . 'gateways' . DS);
define('EVENT_ESPRESSO_GATEWAY_URL', $uploads['baseurl'] . DS . 'espresso' . DS . 'gateways' . DS);
// languages folder/path
define('EE_LANGUAGES_SAFE_LOC', '..' . DS . 'uploads' . DS . 'espresso' . DS . 'languages' . DS);
define('EE_LANGUAGES_SAFE_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'languages' . DS);
//check for dompdf fonts in uploads
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'fonts' . DS)) {
    define('DOMPDF_FONT_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'fonts' . DS);
}
//ajax constants
define(
    'EE_FRONT_AJAX',
    isset($_REQUEST['ee_front_ajax']) || isset($_REQUEST['data']['ee_front_ajax']) ? true : false
);
define(
    'EE_ADMIN_AJAX',
    isset($_REQUEST['ee_admin_ajax']) || isset($_REQUEST['data']['ee_admin_ajax']) ? true : false
);
//just a handy constant occasionally needed for finding values representing infinity in the DB
//you're better to use this than its straight value (currently -1) in case you ever
//want to change its default value! or find when -1 means infinity
define('EE_INF_IN_DB', -1);
define('EE_INF', INF > (float)PHP_INT_MAX ? INF : PHP_INT_MAX);
define('EE_DEBUG', false);
// for older WP versions
if ( ! defined('MONTH_IN_SECONDS')) {
    define('MONTH_IN_SECONDS', DAY_IN_SECONDS * 30);
}

// End of file espresso_definitions.php
// Location: ${NAMESPACE}/espresso_definitions.php