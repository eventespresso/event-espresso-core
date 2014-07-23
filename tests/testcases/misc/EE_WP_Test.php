<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_WP_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_WP_Test extends EE_UnitTestCase{

	function setUp(){
		//DONT call parent
	}
	function tearDown(){
		//DONT call parent
	}
	function test_transaction(){
		global $show_queries;
		$show_queries = TRUE;
		update_option('thingy','foobar');
		$foobar = get_option('thingy');
		$this->assertEquals('foobar',$foobar);

		global $wpdb;
		$wpdb->query( 'SET autocommit = 0;' );
		$wpdb->query( 'START TRANSACTION;' );
		$this->assertEquals('foobar',$foobar);

		update_option('thingy','baz');
		$foobar = get_option('thingy');
		$this->assertEquals('baz',$foobar);

		$wpdb->query('ROLLBACK;');
		global $wp_object_cache;
		$wp_object_cache->group_ops = array();
		$wp_object_cache->stats = array();
		$wp_object_cache->memcache_debug = array();
		$wp_object_cache->cache = array();
		if ( method_exists( $wp_object_cache, '__remoteset' ) ) {
			$wp_object_cache->__remoteset();
		}
		wp_cache_flush();
		wp_cache_add_global_groups( array( 'users', 'userlogins', 'usermeta', 'user_meta', 'site-transient', 'site-options', 'site-lookup', 'blog-lookup', 'blog-details', 'rss', 'global-posts', 'blog-id-cache' ) );
		wp_cache_add_non_persistent_groups( array( 'comment', 'counts', 'plugins' ) );

		$foobar = get_option('thingy');
		$this->assertNotEquals('baz',$foobar);
		$this->assertEquals('foobar',$foobar);
	}

//	function test_transaction2(){
//		$original_attendee = $this->new_model_obj_with_dependencies('Attendee');
//		$original_attendee->save();
//		$this->assertEquals( $original_attendee->fname(), $this->get_attendee_name_in_db($original_attendee->ID()));
//
//		$original_attendee->set('ATT_fname','mongo');
//		$original_attendee->save();
//		$this->assertEquals( 'mongo', $this->get_attendee_name_in_db($original_attendee->ID()));
//
//		global $wpdb;
//		$wpdb->query( 'SET autocommit = 0;' );
//		$wpdb->query( 'START TRANSACTION;' );
//		$this->assertEquals( $original_attendee->fname(), $this->get_attendee_name_in_db($original_attendee->ID()));
//
//		$original_attendee->set('ATT_fname','chango');
//		$original_attendee->save();
//		$this->assertEquals( 'chango', $this->get_attendee_name_in_db($original_attendee->ID()));
//
//		$wpdb->query('ROLLBACK;');
//		global $wp_object_cache;
//		$wp_object_cache->group_ops = array();
//		$wp_object_cache->stats = array();
//		$wp_object_cache->memcache_debug = array();
//		$wp_object_cache->cache = array();
//		if ( method_exists( $wp_object_cache, '__remoteset' ) ) {
//			$wp_object_cache->__remoteset();
//		}
//		wp_cache_flush();
//		wp_cache_add_global_groups( array( 'users', 'userlogins', 'usermeta', 'user_meta', 'site-transient', 'site-options', 'site-lookup', 'blog-lookup', 'blog-details', 'rss', 'global-posts', 'blog-id-cache' ) );
//		wp_cache_add_non_persistent_groups( array( 'comment', 'counts', 'plugins' ) );
//
//		$this->assertEquals( 'mongo', $this->get_attendee_name_in_db($original_attendee->ID()));
//	}
//
//	function test_transaction3(){
//		$this->update_option('thingy','foobar');
//		$foobar = $this->get_option('thingy');
//		$this->assertEquals('foobar',$foobar);
//
//		global $wpdb;
//		$wpdb->query( 'SET autocommit = 0;' );
//		$wpdb->query( 'START TRANSACTION;' );
//		$this->assertEquals('foobar',$foobar);
//
//		$this->update_option('thingy','baz');
//
//		$wpdb->query('ROLLBACK;');
//
//		$foobar = $this->get_option('thingy');
//		$this->assertNotEquals('baz',$foobar);
//		$this->assertEquals('foobar',$foobar);
//	}
	private function update_option( $option_name, $option_value ){
		global $wpdb;
		return $wpdb->update( $wpdb->options, array( 'option_value' => maybe_serialize($option_value) ), array( 'option_name' => $option_name ) );
	}

	private function get_option($option_name){
		global $wpdb;
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1", $option_name ) );
		if($row){
			return $row->option_value;
		}else{
			return FALSE;
		}
	}



	private function get_attendee_name_in_db($att_id){
		global $wpdb;
		return $wpdb->get_var("SELECT ATT_fname FROM {$wpdb->prefix}esp_attendee_meta where ATT_ID = $att_id");
	}
}

// End of file EE_WP_Test.php