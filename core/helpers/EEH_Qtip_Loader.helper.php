<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }
/**
 * EEH_Qtip_Loader
 *
 * This is a helper utility class that provides a PHP api for setting up qtip js library programmatically.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EEH_Qtip_Loader.helper.php
 * @author		Darren Ethier
 */
class EEH_Qtip_Loader extends EEH_Base {

	/**
	 * EEH_Qtip_Loader Object
	 * @var EEH_Qtip_Loader
	 * @access private
	 */
	private static $_instance = NULL;

	/**
	 * array of qtip config objects
	 * @var EE_Qtip_Config[]
	 */
	private $_qtips = array();



	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EEH_Qtip_Loader instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EEH_Qtip_Loader )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 *private constructor to prevent direct creation
	 * @Constructor
	 * @access private
	 * @return \EEH_Qtip_Loader
	 */
	private function __construct() {
		//let's just make sure this is instantiated in the right place.
		if ( did_action( 'wp_print_styles' ) || did_action( 'admin_head' )) {
			EE_Error::doing_it_wrong( 'EEH_Qtip_Loader', __('This helper must be instantiated before or within a callback for the WordPress wp_enqueue_scripts hook action hook.', 'event_espresso' ), '4.1' );
		}
	}


	/**
	 * Call this from wp_enqueue_scripts or admin_enqueue_scripts to setup and enqueue the qtip library
	 *
	 * @access public
	 * @return void
	 */
	public function register_and_enqueue() {
		$qtips_js = !defined('SCRIPT_DEBUG') ? EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.min.js' : EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.js';
		$qtip_images_loaded = EE_THIRD_PARTY_URL . 'qtip/imagesloaded.pkg.min.js';
		$qtip_map = EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.min.map';
		$qtipcss = !defined('SCRIPT_DEBUG') ? EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.min.css' : EE_THIRD_PARTY_URL . 'qtip/jquery.qtip.css';

		wp_register_script('qtip-map', $qtip_map, array(), '3', TRUE );
		wp_register_script('qtip-images-loaded', $qtip_images_loaded, array(), '2.2.0', TRUE );
		wp_register_script('qtip', $qtips_js, array('jquery'), '2.2.0', TRUE );
		wp_register_script('ee-qtip-helper', EE_HELPERS_ASSETS . 'ee-qtip-helper.js', array('qtip', 'jquery-cookie'), EVENT_ESPRESSO_VERSION, TRUE );

		wp_register_style('qtip-css', $qtipcss, array(), '2.2' );

		//k now let's see if there are any registered qtips.  If there are, then we need to setup the localized script for ee-qtip-helper.js (and enqueue ee-qtip-helper.js of course!)
		if ( !empty( $this->_qtips ) ) {
			wp_enqueue_script('ee-qtip-helper');
			wp_enqueue_style('qtip-css');
			$qtips = array();
			foreach ( $this->_qtips as $qtip ) {
				$qts = $qtip->get_tips();
				foreach ( $qts as $qt ) {
					if ( ! $qt instanceof EE_Qtip )
						continue;
					$qtips[] = array(
						'content_id' => $qt->content_id,
						'options' => $qt->options,
						'target' => $qt->target,
						);
				}
			}
			if ( !empty($qtips) )
				wp_localize_script('ee-qtip-helper', 'EE_QTIP_HELPER', array( 'qtips' => $qtips ) );

		} else {
			//qtips has been requested without any registration (so assuming its just directly used in the admin).
			wp_enqueue_script('qtip');
			wp_enqueue_style('qtip-css');
		}
	}



	/**
	 * This simply registers the given qtip config and:
	 * - adds it to the $_qtips property array.
	 * - sets up the content containers for all qtips in the config,
	 * - registers and enqueues the qtip scripts and styles.
	 *
	 * @access public
	 * @param  array  $paths      Array of paths to check for the EE_Qtip class. If present we check these path(s) first.  If not present (empty array), then it's assumed it's either in core/libraries/qtips OR the file is already loaded.
	 * @param  string|array $configname name of the Qtip class (full class name is expected and will be used for looking for file, Qtip config classes must extend EE_Qtip_Config) [if this is an array, then we loop through the array to instantiate and setup the qtips]
	 * @return void
	 */
	public function register( $configname, $paths = array() ) {

		//let's just make sure this is instantiated in the right place.
		if ( did_action('wp_enqueue_scripts') || did_action('admin_enqueue_scripts') ) {
			EE_Error::doing_it_wrong( 'EEH_Qtip_Loader->register()', __('EE_Qtip_Config objects must be registered before wp_enqueue_scripts is called.', 'event_espresso' ), '4.1' );
		}

		$configname = (array) $configname; //typecast to array
		foreach ( $configname as $config ) {
			$this->_register( $config, $paths );
		}

		//hook into appropriate footer
		$footer_action = is_admin() ? 'admin_footer' : 'wp_footer';
		add_action($footer_action, array($this, 'setup_qtip'), 10 );

		//make sure we "turn on" qtip js.
		add_filter('FHEE_load_qtip', '__return_true' );
	}



	/**
	 * private utility for registering and setting up qtip config objects
	 *
	 * @access private
	 * @param  string $config the short name of the class (will be used to generate the expected classname)
	 * @param  array  $paths  array of paths to check (or if empty we check core/libraries/qtips or assume its loaded)
	 * @throws EE_Error
	 * @return void
	 */
	private function _register( $config, $paths ) {
		//before doing anything we have to make sure that EE_Qtip_Config parent is required.
		EE_Registry::instance()->load_lib( 'Qtip_Config', array(), TRUE );

		if ( !empty( $paths ) ) {
			$paths = (array) $paths;
			foreach ( $paths as $path ) {
				$path = $path . $config . '.lib.php';
				if ( !is_readable($path ) ) {
					continue;
				} else {
					require_once $path;
				}
			}
		}

		//does class exist at this point?  If it does then let's instantiate.  If it doesn't then let's continue with other paths.
		if ( !class_exists($config) ) {
			$path = EE_LIBRARIES . 'qtips/' . $config . '.lib.php';
			if ( !is_readable($path ) ) {
				throw new EE_Error( sprintf( __('Unable to load the Qtip Config registered for this page (%s) because none of the file paths attempted are readable.  Please check the spelling of the paths you\'ve used in the registration', 'event_espresso'), $config ) );
			} else {
				require_once $path;
			}
		}

		//now we attempt a class_exists one more time.
		if ( !class_exists( $config ) )
			throw new EE_Error( sprintf( __('The Qtip_Config class being registered (%s) does not exist, please check the spelling.', 'event_espresso'), $config ) );

		//made it HERE?  FINALLY, let's get things setup.
		$a = new ReflectionClass($config);
		$qtip = $a->newInstance();

		//verify that $qtip is a valid object
		if ( ! $qtip instanceof EE_Qtip_Config )
			throw new EE_Error( sprintf( esc_html__( 'The class given for the Qtip loader (%1$s) is not a child of the %2$sEE_Qtip_Config%3$s class. Please make sure you are extending EE_Qtip_Config.', 'event_espresso'), $config, '<strong>', '</strong>' ) );

		$this->_qtips[] = $a->newInstance();

	}



	/**
	 * This takes care of generating the qtip content containers.
	 * Output gets put in the appropriate page footer (depending on context (either admin_footer or wp_footer) )
	 *
	 * @access public
	 * @return void
	 */
	public function setup_qtip() {
		if ( empty( $this->_qtips ) )
			return; //no qtips!

		$content = array();

		foreach ( $this->_qtips as $qtip ) {
			$content[] = $this->_generate_content_container($qtip);
		}

		echo implode('<br />', $content);
	}


	/**
	 * Generates a content container from a given EE_Qtip_Config object.
	 *
	 * @param  EE_Qtip_Config $qtip
	 * @return string  (html content container for qtip);
	 */
	private function _generate_content_container($qtip) {
		$qts = $qtip->get_tips();
		$content = array();
		foreach ( $qts as $qt ) {
			if ( ! $qt instanceof EE_Qtip )
				continue;
			$content[] = '<div class="ee-qtip-helper-content hidden" id="' . $qt->content_id . '">' . $qt->content . '</div>';
		}

		return implode('<br />', $content);
	}


} //end EEH_Qtip_Loader class