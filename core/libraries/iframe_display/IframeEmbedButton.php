<?php
namespace EventEspresso\core\libraries\iframe_display;

defined( 'ABSPATH' ) || exit;



/**
 * Class IframeEmbedButton
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class IframeEmbedButton {


    /**
     * Adds an iframe embed code button to the Event editor.
     *
     * @param string $route_name the named module route that generates the iframe
     * @param string $title
     * @param string $slug
     */
    public static function addEventEditorIframeEmbedButtonFilter($route_name, $title = '', $slug = '')
    {
        // add button for iframe code to event editor.
        add_filter(
            'get_sample_permalink_html',
            function ($permalink_string, $id, $new_title = '', $new_slug = '') use ($route_name, $title, $slug) {
                return IframeEmbedButton::eventEditorIframeEmbedButton(
                    $permalink_string,
                    $id,
                    $title,
                    $slug,
                    $route_name
                );
            },
            10,
            2
        );
        add_action(
            'admin_enqueue_scripts',
            array('\EventEspresso\core\libraries\iframe_display\IframeEmbedButton', 'embedButtonAssets'),
            10
        );
    }



    /**
     * iframe embed code button to the Event editor.
     *
     * @param string $permalink_string
     * @param int    $id
     * @param string $new_title
     * @param string $new_slug
     * @param string $route_name the named module route that generates the iframe
     * @return string
     */
    public static function eventEditorIframeEmbedButton(
        $permalink_string,
        $id,
        $new_title = '',
        $new_slug = '',
        $route_name = ''
    ) {
        //make sure this is ONLY when editing and the event id has been set.
        if ( ! empty($id)) {
            $post = get_post($id);
            //if NOT event then let's get out.
            if ($post->post_type !== 'espresso_events') {
                return $permalink_string;
            }
            $permalink_string .= IframeEmbedButton::embedButtonHtml(
                $new_title,
                $route_name,
                array($new_slug => $id),
                'button-small'
            );
        }
        return $permalink_string;
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
				echo IframeEmbedButton::embedButtonHtml( $iframe_name, $route_name );
			},
			10
		);
	}



	/**
	 * Adds an iframe embed code button via a WP apply_filters() as determined by the first parameter
	 *
	 * @param string $iframe_name
	 * @param string $route_name the named module route that generates the iframe
	 * @param string $filter     name of the WP apply_filters() to hook into
	 * @param bool   $append     if true, will add iframe embed button to end of content,
	 *                           else if false, will add to the beginning of the content
	 */
	public static function addFilterIframeEmbedButton( $iframe_name, $route_name, $filter, $append = true ) {
		// add button for iframe code to event editor.
		add_action(
			$filter,
			function ( $filterable_content ) use ( $iframe_name, $route_name, $append ) {
				$embedButtonHtml = IframeEmbedButton::embedButtonHtml( $iframe_name, $route_name );
				if ( is_array( $filterable_content ) ) {
					$filterable_content = $append
						? array_push( $filterable_content, $embedButtonHtml )
						: array_unshift( $filterable_content, $embedButtonHtml );
				} else {
					$filterable_content = $append
						? $filterable_content . $embedButtonHtml
						: $embedButtonHtml . $filterable_content;
				}
				return $filterable_content;
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
        $query_args = array($route_name => 'iframe') + $query_args;
        $query_args = (array) apply_filters(
            'FHEE__EventEspresso_core_libraries_iframe_display_IframeEmbedButton__embedButtonHtml__query_args',
            $query_args
        );
		// add this route to our localized vars
		$iframe_module_routes = isset( \EE_Registry::$i18n_js_strings['iframe_module_routes'] )
			? \EE_Registry::$i18n_js_strings['iframe_module_routes']
			: array();
		$iframe_module_routes[ $route_name ] = $route_name;
		\EE_Registry::$i18n_js_strings['iframe_module_routes'] = $iframe_module_routes;
		$iframe_embed_html = \EEH_HTML::link(
			'#',
			sprintf( esc_html__( 'Embed %1$s', 'event_espresso' ), $iframe_name ),
			sprintf(
                esc_html__(
					'click here to generate code for embedding %1$s iframe into another site.',
					'event_espresso'
				),
                \EEH_Inflector::add_indefinite_article($iframe_name)
			),
			"$route_name-iframe-embed-trigger-js",
			'iframe-embed-trigger-js button ' . $button_class,
			'',
			' data-iframe_embed_button="#' . $route_name . '-iframe-js" tabindex="-1"'
		);
		$iframe_embed_html .= \EEH_HTML::div( '', "$route_name-iframe-js", 'iframe-embed-wrapper-js', 'display:none;' );
		$iframe_embed_html .= esc_html(
			\EEH_HTML::div(
				'<iframe src="' . add_query_arg( $query_args, site_url() ) . '" width="100%" height="100%"></iframe>',
				'',
				'',
				'width:100%; height: 500px;'
			)
		);
		$iframe_embed_html .= \EEH_HTML::divx();
        return $iframe_embed_html;
	}



	/**
	 * enqueue iframe button js
	 */
	public static function embedButtonAssets() {
        if (\EE_Registry::instance()->REQ->get('page') === 'espresso_events') {
            \EE_Registry::$i18n_js_strings['iframe_embed_close_msg'] = esc_html__(
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



}
// End of file IframeEmbedButton.php
// Location: EventEspresso\core\libraries\iframe_display/IframeEmbedButton.php