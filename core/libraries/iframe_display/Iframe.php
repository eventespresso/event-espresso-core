<?php
namespace EventEspresso\core\libraries\iframe_display;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Iframe
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9
 */
class Iframe {

	/*
	* HTML for notices and ajax gif
	* @var string $title
	*/
	protected $title = '';

	/*
	* HTML for the content being displayed
	* @var string $content
	*/
	protected $content = '';

	/*
	* whether or not to call wp_head() and wp_footer()
	* @var boolean $enqueue_wp_assets
	*/
	protected $enqueue_wp_assets = false;

	/*
	* an array of CSS URLs
	* @var array $css
	*/
	protected $css = array();

	/*
	* an array of JS URLs to be set in the HTML header.
	* @var array $header_js
	*/
	protected $header_js = array();

	/*
	* an array of JS URLs to be displayed before the HTML </body> tag
	* @var array $footer_js
	*/
	protected $footer_js = array();

	/*
	* an array of JSON vars to be set in the HTML header.
	* @var array $localized_vars
	*/
	protected $localized_vars = array();



	/**
	 * Iframe constructor
	 *
	 * @param string $title
	 * @param string $content
	 * @throws \EE_Error
	 */
	public function __construct( $title, $content ) {
		global $wp_version;
		if ( ! defined( 'EE_IFRAME_DIR_URL' ) ) {
			define( 'EE_IFRAME_DIR_URL', plugin_dir_url( __FILE__ ) );
		}
		$this->setContent( $content );
		$this->setTitle( $title );
		$this->addStylesheets(
			apply_filters(
				'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__construct__default_css',
				array(
					'dashicons'        => includes_url( 'css/dashicons.min.css?ver=' . $wp_version ),
					'espresso_default' => EE_GLOBAL_ASSETS_URL
					                      . 'css/espresso_default.css?ver='
					                      . EVENT_ESPRESSO_VERSION
				)
			)
		);
		$this->addScripts(
			apply_filters(
				'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__construct__default_js',
				array(
					'jquery'        => includes_url( 'js/jquery/jquery.js?ver=' . $wp_version ),
					'espresso_core' => EE_GLOBAL_ASSETS_URL
					                   . 'scripts/espresso_core.js?ver='
					                   . EVENT_ESPRESSO_VERSION,
				)
			)
		);
	}



	/**
	 * @param string $title
	 * @throws \EE_Error
	 */
	public function setTitle( $title ) {
		if ( empty( $title ) ) {
			throw new \EE_Error(
				__( 'You must provide a page title in order to create an iframe.', 'event_espresso' )
			);
		}
		$this->title = $title;
	}



	/**
	 * @param string $content
	 * @throws \EE_Error
	 */
	public function setContent( $content ) {
		if ( empty( $content ) ) {
			throw new \EE_Error(
				__( 'You must provide content in order to create an iframe.', 'event_espresso' )
			);
		}
		$this->content = $content;
	}



	/**
	 * @param boolean $enqueue_wp_assets
	 */
	public function setEnqueueWpAssets( $enqueue_wp_assets ) {
		$this->enqueue_wp_assets = filter_var( $enqueue_wp_assets, FILTER_VALIDATE_BOOLEAN );
	}



	/**
	 * @param array $stylesheets
	 * @throws \EE_Error
	 */
	public function addStylesheets( array $stylesheets ) {
		if ( empty( $stylesheets ) ) {
			throw new \EE_Error(
				__( 'A non-empty array of URLs, is required to add a CSS stylesheet to an iframe.', 'event_espresso' )
			);
		}
		foreach ( $stylesheets as $handle => $stylesheet ) {
			$this->css[ $handle ] = $stylesheet;
		}
	}



	/**
	 * @param array $scripts
	 * @param bool $add_to_header
	 * @throws \EE_Error
	 */
	public function addScripts( array $scripts, $add_to_header = false ) {
		if ( empty( $scripts ) ) {
			throw new \EE_Error(
				__( 'A non-empty array of URLs, is required to add Javascript to an iframe.', 'event_espresso' )
			);
		}
		foreach ( $scripts as $handle => $script ) {
			if ( $add_to_header ) {
				$this->header_js[ $handle ] = $script;
			} else {
				$this->footer_js[ $handle ] = $script;
			}
		}
	}



	/**
	 * @param array  $vars
	 * @param string $var_name
	 * @throws \EE_Error
	 */
	public function addLocalizedVars( array $vars, $var_name = 'eei18n' ) {
		if ( empty( $vars ) ) {
			throw new \EE_Error(
				__( 'A non-empty array of vars, is required to add localized Javascript vars to an iframe.', 'event_espresso' )
			);
		}
		foreach ( $vars as $handle => $var ) {
			if ( $var_name === 'eei18n' ) {
				\EE_Registry::$i18n_js_strings[ $handle ] = $var;
			} else {
				if ( ! isset( $this->localized_vars[ $var_name ] ) ) {
					$this->localized_vars[ $var_name ] = array();
				}
				$this->localized_vars[ $var_name ][ $handle ] = $var;
			}
		}
	}



	/**
	 * @return void
	 */
	public function display() {
		echo $this->getTemplate();
		exit;
	}



	/**
	 * @return string
	 */
	public function getTemplate() {
		return \EEH_Template::display_template(
			__DIR__ . '\iframe_wrapper.template.php',
			array(
				'title'     => apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__title',
					$this->title
				),
				'content'   => apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__content',
					$this->content
				),
				'enqueue_wp_assets'   => apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__enqueue_wp_assets',
					$this->enqueue_wp_assets
				),
				'css'       => (array) apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__css_urls',
					$this->css
				),
				'header_js' => (array) apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__header_js_urls',
					$this->header_js
				),
				'footer_js' => (array) apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__footer_js_urls',
					$this->footer_js
				),
				'eei18n'    => apply_filters(
					'FHEE__\EventEspresso\core\libraries\iframe_display\Iframe__getTemplate__eei18n_js_strings',
					\EE_Registry::localize_i18n_js_strings() . $this->localizeJsonVars()
				),
				'notices'   => \EEH_Template::display_template(
					EE_TEMPLATES . 'espresso-ajax-notices.template.php',
					array(),
					true
				),
			),
			true
		);
	}



	/**
	 * localizeJsonVars
	 *
	 * @return string
	 */
	public function localizeJsonVars() {
		$JSON = '';
		$localized_vars = (array) $this->localized_vars;
		foreach ( $localized_vars as $var_name => $vars ) {
			foreach ( $vars as $key => $value ) {
				if ( is_scalar( $value ) ) {
					$localized_vars[ $key ] = html_entity_decode( (string) $value, ENT_QUOTES, 'UTF-8' );
				}
			}
			$JSON .= "/* <![CDATA[ */ var $var_name = " . wp_json_encode( $localized_vars ) . '; /* ]]> */';
		}
		return $JSON;
	}



	/**
	 * Adds an iframe embed code button to the Event editor.
	 *
	 * @param string $route_name the named module route that generates the iframe
	 */
	public static function addEventEditorIframeEmbedButton( $route_name ) {
		// add button for iframe code to event editor.
		add_filter(
			'get_sample_permalink_html',
			array('\EventEspresso\core\libraries\iframe_display\Iframe', 'eventListIframeEmbedButton'),
			10, 2
		);
		add_action(
			'admin_enqueue_scripts',
			array( '\EventEspresso\core\libraries\iframe_display\Iframe', 'EventsAdminEmbedButtonAssets' ),
			10
		);
	}



    /**
     * iframe embed code button to the Event editor.
     *
     * @param string $permalink_string
     * @param int    $id
     * @param string $route_name the named module route that generates the iframe
     * @return string
     */
	public static function eventListIframeEmbedButton($permalink_string, $id, $route_name) {
        //make sure this is ONLY when editing and the event id has been set.
        if ( ! empty($id)) {
            $post = get_post($id);
            //if NOT event then let's get out.
            if ($post->post_type !== 'espresso_events') {
                return $permalink_string;
            }
            $permalink_string .= Iframe::embedButtonHtml(
                'Event',
                $route_name,
                array('event' => $id),
                'button-small'
            );
        }
        return $permalink_string;
	}


	/**
	 * Adds an iframe embed code button to the Event editor.
	 *
	 * @param string $route_name the named module route that generates the iframe
	 */
	public static function addEventListIframeEmbedButton( $route_name ) {
		// add button for iframe code to event editor.
		add_action(
			'AHEE__admin_list_wrapper_template__after_list_table',
			function ( $page_slug ) use ( $route_name ) {
				//make sure this is ONLY when editing and the event id has been set.
				if ( $page_slug === 'espresso_events' ) {
					echo \EEH_HTML::h3( __( 'iFrame Embed Code', 'event_espresso' ) );
					echo \EEH_HTML::p( __( 'Click the following buttons to generate iframe HTML that will allow you to embed your event content within the content of other websites.', 'event_espresso' ) );
					echo Iframe::embedButtonHtml(
						'Events List',
						$route_name
					);
				}
			},
			10, 1
		);
		add_action(
			'admin_enqueue_scripts',
			array( '\EventEspresso\core\libraries\iframe_display\Iframe', 'EventsAdminEmbedButtonAssets' ),
			10
		);
	}



	/**
	 * Adds an iframe embed code button via a WP do_action() as determined by the first parameter
	 *
	 * @param string $iframe_name
	 * @param string $route_name the named module route that generates the iframe
	 * @param string $action     name of the WP do_action() to hook into
	 */
	public static function addActionIframeEmbedButton( $iframe_name, $route_name, $action ) {
		// add button for iframe code to event editor.
		add_action(
			$action,
			function () use ( $iframe_name, $route_name ) {
				echo Iframe::embedButtonHtml( $iframe_name, $route_name );
			},
			10
		);
	}



	/**
	 * iframe_embed_html
	 *
	 * @param string $iframe_name
	 * @param string $route_name the named module route that generates the iframe
	 * @param array  $query_args
	 * @param string $button_class
	 * @return string
	 */
	public static function embedButtonHtml( $iframe_name, $route_name, $query_args = array(), $button_class = '' ) {
		$query_args = ! empty( $query_args ) ? $query_args : array( $route_name => 'iframe' );
		// add this route to our localized vars
		$iframe_module_routes = isset( \EE_Registry::$i18n_js_strings['iframe_module_routes'] )
			? \EE_Registry::$i18n_js_strings['iframe_module_routes']
			: array();
		$iframe_module_routes[ $route_name ] = $route_name;
		\EE_Registry::$i18n_js_strings['iframe_module_routes'] = $iframe_module_routes;
		$iframe_embed_html = \EEH_HTML::link(
			'#',
			sprintf(__( 'Embed %1$s', 'event_espresso' ), $iframe_name ),
			sprintf(
				__(
					'click here to generate code for embedding an %1$s iframe into another site.',
					'event_espresso'
				),
				$iframe_name
			),
			"$route_name-iframe-embed-trigger-js",
			'iframe-embed-trigger-js button ' . $button_class,
			'',
			' data-iframe_embed_button="#' . $route_name . '-iframe-js" tabindex="-1"'
		);
		$iframe_embed_html .= \EEH_HTML::div( '', "$route_name-iframe-js", 'iframe-embed-wrapper-js', 'display:none;' );
		$iframe_embed_html .= \EEH_HTML::div(
			'<iframe src="' . add_query_arg( $query_args, site_url() ) . '" width="100%" height="100%"></iframe>',
			'', '', 'width:100%; height: 500px;'
		);
		$iframe_embed_html .= \EEH_HTML::divx();
		return $iframe_embed_html;
	}



	/**
	 * iframe button js on admin events list or event editor page
	 */
	public static function EventsAdminEmbedButtonAssets() {
		if ( \EE_Registry::instance()->REQ->get( 'page' ) === 'espresso_events' ) {
			Iframe::embedButtonAssets();
			\EE_Registry::$i18n_js_strings['iframe_embed_title'] = __(
				'copy and paste the following into any other site\'s content to display this event:',
				'event_espresso'
			);
		}
	}



	/**
	 * enqueue iframe button js
	 */
	public static function embedButtonAssets() {
		\EE_Registry::$i18n_js_strings['iframe_embed_close_msg'] = __(
			'click anywhere outside of this window to close it.',
			'event_espresso'
		);
		wp_register_script(
			'iframe_embed_button',
			plugin_dir_url( __FILE__ ) . 'iframe-embed-button.js',
			array( 'ee-dialog' ),
			EVENT_ESPRESSO_VERSION,
			true
		);
		wp_enqueue_script( 'iframe_embed_button' );
	}



}
// End of file Iframe.php
// Location: /Iframe.php