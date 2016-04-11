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
	protected $title;

	/*
	* HTML for the content being displayed
	* @var string $content
	*/
	protected $content;

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
	 * @param array $vars
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
*@return string
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
			function ( $permalink_string, $id ) use ( $route_name ) {
				//make sure this is ONLY when editing and the event id has been set.
				if ( ! empty( $id ) ) {
					$post = get_post( $id );
					//if NOT event then let's get out.
					if ( $post->post_type !== 'espresso_events' ) {
						return $permalink_string;
					}
					$permalink_string .= Iframe::embedButtonHtml( $route_name, array( 'event' => $id ) );
				}
				return $permalink_string;
			},
			10, 2
		);
		add_action(
			'admin_enqueue_scripts',
			array( '\EventEspresso\core\libraries\iframe_display\Iframe', 'EventEditorEmbedButtonAssets' ),
			10
		);
	}



	/**
	 * Adds an iframe embed code button via a WP do_action() as determined by the first parameter
	 *
	 * @param string $route_name the named module route that generates the iframe
	 * @param string $action name of the WP do_action() to hook into
	 */
	public static function addActionIframeEmbedButton( $route_name, $action ) {
		// add button for iframe code to event editor.
		add_action(
			$action,
			function () use ( $route_name ) {
				echo Iframe::embedButtonHtml( $route_name );
			},
			10
		);
	}



	/**
	 * iframe_embed_html
	 *
	 * @param string $route_name the named module route that generates the iframe
	 * @param array  $query_args
	 * @return string
	 */
	public static function embedButtonHtml( $route_name, $query_args = array() ) {
		$iframe_route_url = add_query_arg(
			array_merge( array( $route_name => 'iframe' ), $query_args ),
			site_url()
		);
		// add this route to our localized vars
		$iframe_module_routes = isset( \EE_Registry::$i18n_js_strings['iframe_module_routes'] )
			? \EE_Registry::$i18n_js_strings['iframe_module_routes']
			: array();
		$iframe_module_routes[ $route_name ] = $route_name;
		\EE_Registry::$i18n_js_strings['iframe_module_routes'] = $iframe_module_routes;
		$iframe_embed_html = \EEH_HTML::link(
			'#',
			__( 'Embed', 'event_espresso' ),
			__(
				'click here to generate code for embedding an iframe for this event into another site.',
				'event_espresso'
			),
			"$route_name-iframe-embed-trigger-js",
			'iframe-embed-trigger-js button button-small',
			'',
			' data-iframe_embed_button="#' . $route_name . '-iframe-js" tabindex="-1"'
		);
		$iframe_embed_html .= \EEH_HTML::div( '', "$route_name-iframe-js", 'iframe-embed-wrapper-js', 'display:none;' );
		$iframe_embed_html .= \EEH_HTML::div(
			'<iframe src="' . $iframe_route_url . '" width="100%" height="100%"></iframe>',
			'', '', 'width:100%; height: 500px;'
		);
		$iframe_embed_html .= \EEH_HTML::divx();
		return $iframe_embed_html;
	}



	/**
	 * iframe button js on admin event editor page
	 */
	public static function EventEditorEmbedButtonAssets() {
		if (
			\EE_Registry::instance()->REQ->get( 'page' ) === 'espresso_events'
		    && \EE_Registry::instance()->REQ->get( 'action' ) === 'edit'
		) {
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