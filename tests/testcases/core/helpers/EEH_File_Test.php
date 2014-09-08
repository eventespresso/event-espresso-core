<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEH_File_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * Based off wp core's tests/phpunit/tests/filesystem/base.php
 * @group ignore
 *
 */
class EEH_File_Test extends EE_UnitTestCase {
	function setUp() {
		parent::setUp();
		add_filter( 'filesystem_method_file', array( $this, 'filter_abstraction_file' ) );
		add_filter( 'filesystem_method', array( $this, 'filter_fs_method' ) );
		WP_Filesystem();
		global $wp_filesystem;
		$wp_filesystem->init('/');
	}

	function tearDown() {
		global $wp_filesystem;
		remove_filter( 'filesystem_method_file', array( $this, 'filter_abstraction_file' ) );
		remove_filter( 'filesystem_method', array( $this, 'filter_fs_method' ) );
		unset( $wp_filesystem );

		parent::tearDown();
	}

	function filter_fs_method( $method ) {
		return 'MockFS';
	}
	function filter_abstraction_file( $file ) {
		return WP_TESTS_DIR . '/includes/mock-fs.php';
	}

	/**
	 * Just makes sure we're really using the mock filesystem, not the real fileysstem
	 * @global type $wp_filesystem
	 */
	function test_is_MockFS_sane() {
		global $wp_filesystem;
		$this->assertTrue( is_a( $wp_filesystem, 'WP_Filesystem_MockFS' ) );

		$wp_filesystem->init('/');

		// Test creation/exists checks
		$this->assertFalse( $wp_filesystem->is_dir( '/test/' ) );
		$wp_filesystem->mkdir( '/test' );
		$this->assertTrue( $wp_filesystem->exists( '/test' ) );
		$this->assertTrue( $wp_filesystem->is_dir( '/test/' ) );
		$this->assertFalse( $wp_filesystem->is_file( '/test' ) );
	}


	public function test_verify_filepath_and_permissions(){
		global $wp_filesystem;

		// Test creation/exists checks
		$this->assertFalse( $wp_filesystem->is_dir( '/test/' ) );
		$wp_filesystem->mkdir( '/test', '755' );
		$this->assertTrue( $wp_filesystem->is_dir( '/test/' ) );
		$this->assertTrue( EEH_File::verify_filepath_and_permissions( '/test/' ) );
		$wp_filesystem->chmod( '/test/', '000' );
		$this->assertFalse( EEH_File::verify_filepath_and_permissions( '/test/' ) );


	}

	public function test_ensure_folder_exists_and_is_writable__and__is_writable(){
		global $wp_filesystem;
		$folder_path = '/test/';
		// Test creation/exists checks
		$this->assertFalse( $wp_filesystem->is_dir( $folder_path ) );
		$this->assertTrue( EEH_File::ensure_folder_exists_and_is_writable( $folder_path ) );
		$this->assertTrue( EEH_File::verify_is_writable(  $folder_path ) );
		$wp_filesystem->chmod( $folder_path, '000' );
		$this->assertFalse( EEH_File::ensure_folder_exists_and_is_writable( $folder_path ) );
		$this->assertFalse( EEH_File::verify_is_writable(  $folder_path ) );

	}

	public function test_ensure_file_exists_and_is_writable(){
		global $wp_filesystem;
		$file_path = '/test.txt';
		// Test creation/exists checks
		$this->assertFalse( $wp_filesystem->exists( $file_path ) );
		$this->assertTrue( EEH_File::ensure_file_exists_and_is_writable( $file_path ) );
		$this->assertTrue( EEH_File::verify_is_writable(  $file_path ) );
		$wp_filesystem->chmod( $file_path, '000' );
		$this->assertFalse( EEH_File::ensure_file_exists_and_is_writable( $file_path ) );
		$this->assertFalse( EEH_File::verify_is_writable(  $file_path ) );
	}

	public function test_get_file_contents(){
		global $wp_filesystem;
		$file_path = '/test.txt';
		$content = '<html><body>hello</body></html>';
		// Test creation/exists checks
		$this->assertFalse( $wp_filesystem->exists( $file_path ) );
		$wp_filesystem->put_contents( $file_path, $content );
		$this->assertTrue( $wp_filesystem->exists( $file_path ) );
		$this->assertEquals( $content, EEH_File::get_file_contents( $file_path ) );
	}

	public function test_write_to_file(){
		global $wp_filesystem;
		$file_path = '/test.txt';
		$content1 = '<html><body>hello</body></html>';
		$content2 = '<xml><monkeys><monkey/></monkeys></xml>';
		$this->assertFalse( $wp_filesystem->exists( $file_path ) );
		$wp_filesystem->put_contents( $file_path, $content1 );
		$this->assertTrue( $wp_filesystem->exists( $file_path ) );
		$this->assertEquals( $content1, EEH_File::get_file_contents( $file_path ) );
		//now add to it
		EEH_File::write_to_file( $file_path, $content2 );
		$this->assertEquals( $content2, EEH_File::get_file_contents( $file_path ) );
	}

	public function test_remove_filename_form_filepath(){
		$file_path = '/var/whatever/thing.txt';
		$this->assertEquals( '/var/whatever', EEH_File::remove_filename_from_filepath( $file_path ) );
	}

	public function test_get_filename_from_filepath(){
		$file_path = '/var/whatever/thing.txt';
		$this->assertEquals( 'thing.txt', EEH_File::get_filename_from_filepath( $file_path ) );
	}

	public function test_get_file_extension(){
		$file_path = '/var/whatever/thing.txt';
		$this->assertEquals( 'txt', EEH_File::get_file_extension( $file_path ) );
	}

	public function test_get_classname_from_filepath_with_standard_filename(){
		$file_path = '/we/fds/vdw/ew/EE_Thingy.junk.php';
		$this->assertEquals( 'EE_Thingy', EEH_File::get_classname_from_filepath_with_standard_filename($file_path) );
	}
	public function test_standardise_diirectory_seperators_and_end_with_directory_separator(){
		$file_path = '/well\\this/isnt\\very/consistent';
		$this->assertEquals( '/well/this/isnt/very/consistent/', EEH_File::standardise_and_end_with_directory_separator($file_path));
	}
	public function test_get_contents_of_folders(){
		global $wp_filesystem;
		$wp_filesystem->mkdir('/test/');
		$wp_filesystem->touch('/test/EE_Thingy.um.php');
		$wp_filesystem->touch('/test/EEX_YEP.fe.ss');
		$wp_filesystem->mkdir('/test/other/');
		$classname_to_filepath_map = EEH_File::get_contents_of_folders( array( '/test/' ) );
		$this->assertEquals(
				array(
					'EE_Thingy' => '/test/EE_Thingy.um.php',
					'EEX_YEP' => '/test/EEX_YEP.fe.ss' ),
				$classname_to_filepath_map );
	}





}

// End of file EEH_File_Test.php