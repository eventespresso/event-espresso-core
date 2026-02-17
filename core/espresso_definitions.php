<?php

// define versions
define('EVENT_ESPRESSO_VERSION', espresso_version());
const EE_MIN_WP_VER_REQUIRED     = '5.9';
const EE_MIN_WP_VER_RECOMMENDED  = '6.8';
const EE_MIN_PHP_VER_RECOMMENDED = '7.4';
const EE_SUPPORT_EMAIL           = 'support@eventespresso.com';

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
define('EE_PLUGIN_DIR_PATH', plugin_dir_path(EVENT_ESPRESSO_MAIN_FILE));
define('EE_PLUGIN_DIR_URL', plugin_dir_url(EVENT_ESPRESSO_MAIN_FILE));

// main root folder paths
const EE_ADMIN_PAGES     = EE_PLUGIN_DIR_PATH . 'admin_pages/';
const EE_CORE            = EE_PLUGIN_DIR_PATH . 'core/';
const EE_MODULES         = EE_PLUGIN_DIR_PATH . 'modules/';
const EE_PUBLIC          = EE_PLUGIN_DIR_PATH . 'public/';
const EE_SHORTCODES      = EE_PLUGIN_DIR_PATH . 'shortcodes/';
const EE_WIDGETS         = EE_PLUGIN_DIR_PATH . 'widgets/';
const EE_PAYMENT_METHODS = EE_PLUGIN_DIR_PATH . 'payment_methods/';
const EE_CAFF_PATH       = EE_PLUGIN_DIR_PATH . 'caffeinated/';
// core system paths
const EE_ADMIN         = EE_CORE . 'admin/';
const EE_CPTS          = EE_CORE . 'CPTs/';
const EE_CLASSES       = EE_CORE . 'db_classes/';
const EE_INTERFACES    = EE_CORE . 'interfaces/';
const EE_BUSINESS      = EE_CORE . 'business/';
const EE_MODELS        = EE_CORE . 'db_models/';
const EE_HELPERS       = EE_CORE . 'helpers/';
const EE_LIBRARIES     = EE_CORE . 'libraries/';
const EE_TEMPLATES     = EE_CORE . 'templates/';
const EE_THIRD_PARTY   = EE_CORE . 'third_party_libs/';
const EE_GLOBAL_ASSETS = EE_TEMPLATES . 'global_assets/';
const EE_FORM_SECTIONS = EE_LIBRARIES . 'form_sections/';
// gateways
const EE_GATEWAYS     = EE_MODULES . 'gateways/';
const EE_GATEWAYS_URL = EE_PLUGIN_DIR_URL . 'modules/gateways/';
// asset URL paths
const EE_TEMPLATES_URL     = EE_PLUGIN_DIR_URL . 'core/templates/';
const EE_GLOBAL_ASSETS_URL = EE_TEMPLATES_URL . 'global_assets/';
const EE_IMAGES_URL        = EE_GLOBAL_ASSETS_URL . 'images/';
const EE_THIRD_PARTY_URL   = EE_PLUGIN_DIR_URL . 'core/third_party_libs/';
const EE_HELPERS_ASSETS    = EE_PLUGIN_DIR_URL . 'core/helpers/assets/';
const EE_LIBRARIES_URL     = EE_PLUGIN_DIR_URL . 'core/libraries/';
// define upload paths
$uploads = wp_upload_dir();
// define the uploads directory and URL
define('EVENT_ESPRESSO_UPLOAD_DIR', $uploads['basedir'] . '/espresso/');
define('EVENT_ESPRESSO_UPLOAD_URL', $uploads['baseurl'] . '/espresso/');
// define the templates directory and URL
define('EVENT_ESPRESSO_TEMPLATE_DIR', $uploads['basedir'] . '/espresso/templates/');
define('EVENT_ESPRESSO_TEMPLATE_URL', $uploads['baseurl'] . '/espresso/templates/');
// languages folder/path
const EE_LANGUAGES_SAFE_LOC = '../' . 'uploads/' . 'espresso/languages/';
const EE_LANGUAGES_SAFE_DIR = EVENT_ESPRESSO_UPLOAD_DIR . 'languages/';
// check for DOMPDF fonts in uploads
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'fonts/')) {
    define('DOMPDF_FONT_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'fonts/');
}
// just a handy constant occasionally needed for finding values representing infinity in the DB
// you're better to use this than its straight value (currently -1) in case you ever
// want to change its default value! or find when -1 means infinity
const EE_INF_IN_DB = -1;
define('EE_INF', INF > (float) PHP_INT_MAX ? INF : PHP_INT_MAX);
if (! defined('EE_DEBUG')) {
    define('EE_DEBUG', false);
}
// for older WP versions
if (! defined('MONTH_IN_SECONDS')) {
    define('MONTH_IN_SECONDS', DAY_IN_SECONDS * 30);
}
