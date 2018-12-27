# Building an EE4 Addon that uses Angular.js and the EE4 REST API

The EE4 REST API (in EE4 core since version 4.8.29) can be used to fetch nearly any data you want from EE4 ([and if it can't get some data for you, please let us know](http://eventespresso.com/developers/event-espresso-4-rest-api-survey/)), so an application that uses that data does not need to be a EE4 Addon, or even a Wordpress plugin for that matter, and it certainly doesn't need to use Angular.js. This is just a tutorial about how to give an example of a real application that combines these technologies in a fairly straightforward way (it was inspired by [this article by wptheming](http://wptheming.com/2015/03/angular-json-api-example/).)

## What this sample addon does:

* registers itself as a proper EE4 Addon (this is useful because it simplifies further integration with Event Espresso 4)
* registers a shortcode
* that shortcode enqueues angular.js and executes javascript to fetch a list of events and display it

> tl;dr; if you'd like to just see this addon in action, check it out from the [public github repo here](https://github.com/eventespresso/eea-rest-api-client). You'll probably want to [read up about angular.js](https://docs.angularjs.org/tutorial/step_00) and the [EE4 REST API](../C--REST-API).

## Getting Started

First you'll want to make sure you have the Event Espresso 4 Core version 4.8.29 or higher, and Wordpress 4.4 or higher.

First off, you can either start your addon from scratch, or start with the EE4 skeleton addon contained in event-espresso-core/tests/mocks/addons/eea-new-addon, and then use the renamer.php file in
 [the renamer repository]()https://github.com/eventespresso/eea-renamer) to rename it to whatever you're wanting (it does an intelligent search-and-replace). [Click here for more information on using the skeleton addon](../D--Addon-API/registering-addons.md). To follow along with this tutorial, use the renamer.php file to search for the default string ("New_Addon") and replace it with "Rest_Api_Client". There's a LOT of things in there you might want eventually, but for the purpose of this tutorial you can remove:

* EEW_Rest_Api_Client.widget.php
* EED_Rest_Api_Client.module.php
* EE_New_Addon_Config.php
* admin folder and all its contents
* core folder and all its contents
* all the associated references to those files and folders in EE_Rest_Api_Client.class.php

## Register the Addon

Either way, you'll want a main file for registering your plugin, and setting up for registering the addon when EE Core is ready, like this:

```php
<?php
/*
 Plugin Name: Event Espresso - Rest Api Client (EE4.6.25)
 Plugin URI: http://www.eventespresso.com
 Description: The Event Espresso Rest Api Client adds a shortcode that uses the EE4 JSON REST API. Compatible with Event Espresso 4.6.25 or higher. Just add the shortcode [REST_API_CLIENT] and it will list events using angular.js
 Version: 1.0.0.dev.000
 */
define( 'EE_REST_API_CLIENT_VERSION', '1.0.0.dev.000' );
define( 'EE_REST_API_CLIENT_PLUGIN_FILE', __FILE__ );
function load_espresso_rest_api_client() {
if ( class_exists( 'EE_Addon' )) {
 // rest_api_client version
 require_once ( plugin_dir_path( __FILE__ ) . 'EE_Rest_Api_Client.class.php' );
 EE_Rest_Api_Client::register_addon();
}
}
add_action( 'AHEE__EE_System__load_espresso_addons', 'load_espresso_rest_api_client' );

// End of file espresso_rest_api_client.php
// Location: wp-content/plugins/eea-rest-api-client/espresso_rest_api_client.php
```

## Register as an EE4 Addon

And we should also have an `EE_Rest_Api_Client.class.php` file which actually registers the addon and its shortcode:

```php
<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/**
 * ------------------------------------------------------------------------
 *
 * Class  EE_Rest_Api_Client
 *
 * @package			Event Espresso
 * @subpackage		eea-rest-api-client
 * @author			    Brent Christensen
 * 
 *
 * ------------------------------------------------------------------------
 */
// define the plugin directory path and URL
define( 'EE_REST_API_CLIENT_BASENAME', plugin_basename( EE_REST_API_CLIENT_PLUGIN_FILE ));
define( 'EE_REST_API_CLIENT_PATH', plugin_dir_path( __FILE__ ));
define( 'EE_REST_API_CLIENT_URL', plugin_dir_url( __FILE__ ));
define( 'EE_REST_API_CLIENT_ADMIN', EE_REST_API_CLIENT_PATH . 'admin' . DS . 'rest_api_client' . DS );
Class  EE_Rest_Api_Client extends EE_Addon {

	/**
	 * class constructor
	 */
	public function __construct() {
	}

	public static function register_addon() {
		// register addon via Plugin API
		EE_Register_Addon::register(
			'Rest_Api_Client',
			array(
				'version' 					=> EE_REST_API_CLIENT_VERSION,
				'min_core_version' => '4.6.26.dev.000',
				'main_file_path' 				=> EE_REST_API_CLIENT_PLUGIN_FILE,
				'autoloader_paths' => array(
					'EE_Rest_Api_Client' 						=> EE_REST_API_CLIENT_PATH . 'EE_Rest_Api_Client.class.php',
				),
				'shortcode_paths' 	=> array( EE_REST_API_CLIENT_PATH . 'EES_Rest_Api_Client.shortcode.php' ),
				// if plugin update engine is being used for auto-updates. not needed if PUE is not being used.
				'pue_options'			=> array(
					'pue_plugin_slug' => 'eea-rest-api-client',
					'plugin_basename' => EE_REST_API_CLIENT_BASENAME,
					'checkPeriod' => '24',
					'use_wp_update' => FALSE,
					)
			)
		);
	}
}
// End of file EE_Rest_Api_Client.class.php
// Location: wp-content/plugins/eea-rest-api-client/EE_Rest_Api_Client.class.php
```

## Register a Shortcode

This mostly just informs EE core about our shortcode. Here's the shortcode's code `EES_Rest_Api_Client.shortcode.php`:

```php
<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/*
 * ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	EE4
 *
 * ------------------------------------------------------------------------
 *
 * EES_Rest_Api_Client
 *
 * @package			Event Espresso
 * @subpackage		eea-rest-api-client
 * @author 				Brent Christensen
 * 
 *
 * ------------------------------------------------------------------------
 */
class EES_Rest_Api_Client  extends EES_Shortcode {



	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param 	 WP $WP
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		wp_enqueue_script( 'ae-angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js', array( ), '', true );
		// Load custom app script
		wp_enqueue_script( 'espresso_rest_api_client', EE_REST_API_CLIENT_URL . 'scripts/espresso_rest_api_client.js', array( 'jquery' ), EE_REST_API_CLIENT_VERSION, TRUE );
		// Variables for app script
		wp_localize_script( 'espresso_rest_api_client', 'espresso_rest_api_client_data',
			array(
				'api_endpoint' => get_bloginfo( 'wpurl' ) . '/wp-json/',
			)
		);
	}



	/**
	 *    process_shortcode
	 *
	 *    [ESPRESSO_REST_API_CLIENT]
	 *
	 * @access 	public
	 * @param 	array $attributes
	 * @return 	void
	 */
	public function process_shortcode( $attributes = array() ) {
		// make sure $attributes is an array
		$attributes = array_merge(
			// defaults
			array(),
			(array)$attributes
		);
		return EEH_Template::locate_template( EE_REST_API_CLIENT_PATH . '/templates/shortcode_body.template.php', array(), true, true);
	}


}
// End of file EES_Rest_Api_Client.shortcode.php
// Location: /wp-content/plugins/eea-rest-api-client/EES_Rest_Api_Client.shortcode.php
```

When this shortcode is ran, it mostly just enqueues our custom javascript and the angular.js javascript, calls wp_localize_script to setup some variables for use in the javascript, and echo out some special HTML that will be used by the angular.js code.

## Javascript for Fetching Events and Rendering

Here is the HTML we echo out, from `shortcode_body.template.php`:

```html
<div ng-app="myapp">
	Events retrieved via Angular.js: (May take a second to load)
	<div ng-controller="mycontroller">
		<article ng-repeat="event in events">
			<h3>Event Name: {{ event.EVT_name }}</h3>
			<p>Description: {{ event.EVT_desc }}</p>
			<h4>Datetimes:</h4>
			<ul>
				<li ng-repeat="datetime in event.datetimes">
					<b>{{ datetime.DTT_EVT_start }}</b>
				</li>
			</ul>
		</article>
	</div>
</div>
```

This is HTML that is special marked-up so angular.js will use to echo each event's name, description, and all their associated datetimes' start times.

Here is the javascript file, `espresso_rest_api_client.js` (if you're unfamiliar with angular.js, you may want to get familiar with it by [reading their documentation](https://docs.angularjs.org/tutorial/step_00)) which will fetches data from the API, and uses the above HTML template to render them onto the page:

```javascript
var myapp = angular.module( 'myapp', [] );

// Set the configuration
myapp.run( ['$rootScope', function($rootScope) {

	// Variables defined by wp_localize_script
	$rootScope.api = espresso_rest_api_client_data.api_endpoint + 'ee/v4.8.29/events';

}]);

// Add a controller
myapp.controller( 'mycontroller', ['$scope', '$http', function( $scope, $http ) {

	// Load posts from the WordPress API
	$http({
		method: 'GET',
		url: $scope.api,
		params: {
			'limit' : 5,
			'include' : 'Datetime.*'
		}
	}).
	success( function( data, status, headers, config ) {
		console.log( $scope.api );
		console.log( data );
		$scope.events = data;
	}).
	error(function(data, status, headers, config) {
		alert( 'an error occurred; do you have the WP JSON API v1.2 installed? And the EE4 JSON API v2 installed?');
	});

}]);
```

Once the page is loaded, this javascript queries the EE4 REST API for 5 events and includes their related datetimes using the `$http` function, and if successful, puts the json data returned into `$scope.events`, which angular.js uses, along with the HTML from the template file, to magically show all the events and their related datetimes.

## Using the Shortcode

We are done coding. Now just create a page or post and use the shortcode `[REST_API_CLIENT]` on it to see the fruit of your labours. 

## Conclusion

Obviously this is a very simple EE4 Addon using the EE4 REST API and angular.js. You may want to find out more about these two complimentary technologies to learn how to make increasingly useful and intricate apps.
