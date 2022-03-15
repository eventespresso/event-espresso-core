<?php
/**
 * Config file used for the local development environment.
 *
 * phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited
 */

define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wordpress' );
define( 'DB_PASSWORD', 'password' );
define( 'DB_HOST', 'mysql' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

define( 'ABSPATH', __DIR__ . '/' );

require_once ABSPATH . 'wp-settings.php';