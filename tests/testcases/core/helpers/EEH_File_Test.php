<?php
if (!defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 *
 * EEH_File_Test
 *
 * @package            Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 * Based off wp core's tests/phpunit/tests/filesystem/base.php
 *
 *
 */
class EEH_File_Test extends EE_UnitTestCase
{
    function setUp()
    {
        parent::setUp();
        add_filter('filesystem_method_file', array($this, 'filter_abstraction_file'));
        add_filter('filesystem_method', array($this, 'filter_fs_method'));
        add_filter('FHEE__EEH_File___get_wp_filesystem__allow_using_filesystem_direct', '__return_false');
        WP_Filesystem();
        global $wp_filesystem;
        $wp_filesystem->init('/');
    }

    function tearDown()
    {
        // restore to using the normal WP filesystem
        unset($GLOBALS['wp_filesystem']);
        remove_filter('filesystem_method_file', array($this, 'filter_abstraction_file'));
        remove_filter('filesystem_method', array($this, 'filter_fs_method'));

        parent::tearDown();
    }

    function filter_fs_method($method)
    {
        return 'MockEEFS';
    }

    function filter_abstraction_file($file)
    {
        return EE_TESTS_DIR . '/includes/mock-ee-fs.php';
    }

    /**
     * Just makes sure we're really using the mock filesystem, not the real fileysstem
     * @global type $wp_filesystem
     */
    function test_is_MockFS_sane()
    {
        global $wp_filesystem;
        $this->assertTrue(is_a($wp_filesystem, 'WP_Filesystem_MockEEFS'));

        $wp_filesystem->init('/');

        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->is_dir('/test/'));
        $wp_filesystem->mkdir('/test');
        $this->assertTrue($wp_filesystem->exists('/test'));
        $this->assertTrue($wp_filesystem->is_dir('/test/'));
        $this->assertFalse($wp_filesystem->is_file('/test'));
    }


    /**
     *
     * @global type $wp_filesystem
     */
    public function test_verify_filepath_and_permissions()
    {
        global $wp_filesystem;

        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->is_dir('/test/'));
        $wp_filesystem->mkdir('/test', '755');
        $this->assertTrue($wp_filesystem->is_dir('/test/'));
        $this->assertTrue(EEH_File::verify_filepath_and_permissions('/test/'));
        $wp_filesystem->chmod('/test/', '000');
        try {
            EEH_File::verify_filepath_and_permissions('/test/');
            $this->fail(sprintf(__('An exception SHOULD have been thrown but wasn\'t', 'event_espresso')));
        } catch (EE_Error $e) {
            $this->assertTrue(TRUE);
        }


    }

    /**
     *
     * @global type $wp_filesystem
     */
    public function test_ensure_folder_exists_and_is_writable__and__is_writable()
    {
        global $wp_filesystem;
        $folder_path = '/test/';
        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->is_dir($folder_path));
        $this->assertTrue(EEH_File::ensure_folder_exists_and_is_writable($folder_path));
        $this->assertTrue(EEH_File::verify_is_writable($folder_path));
        $wp_filesystem->chmod($folder_path, '000');
        try {
            $this->assertFalse(EEH_File::ensure_folder_exists_and_is_writable($folder_path));
            $this->fail(sprintf(__('An exception SHOULD have been thrown but wasn\'t', 'event_espresso')));
        } catch (EE_Error $e) {
            $this->assertTrue(TRUE);
        }
        try {
            $this->assertFalse(EEH_File::verify_is_writable($folder_path));
            $this->fail(sprintf(__('An exception SHOULD have been thrown but wasn\'t', 'event_espresso')));
        } catch (EE_Error $e) {
            $this->assertTrue(TRUE);
        }

    }

    /**
     * @group 9059
     * @global type $wp_filesystem
     */
    function test_ensure_folder_exists_and_is_writable__recursive_folders()
    {
        global $wp_filesystem;
        $folder_path = '/test/new/thing';
        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->is_dir($folder_path));
        $this->assertTrue(EEH_File::ensure_folder_exists_and_is_writable($folder_path));
        $folders_in_new_folder = $wp_filesystem->dirlist('/test/new/');
        $this->assertTrue(isset($folders_in_new_folder['thing']));
        $folders_in_new_folder = $wp_filesystem->dirlist('/test/new');
        $this->assertTrue(isset($folders_in_new_folder['thing']));
    }

    /**
     * @group 9059
     * @global type $wp_filesystem
     */
    function test_ensure_file_exists_and_is_writable__recursive_folders()
    {
        global $wp_filesystem;
        $folder_path = '/test/new/thing.txt';
        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->is_dir($folder_path));
        $this->assertTrue(EEH_File::ensure_file_exists_and_is_writable($folder_path));
        $folders_in_new_folder = $wp_filesystem->dirlist('/test/new/');
        $this->assertTrue(isset($folders_in_new_folder['thing.txt']));
        $folders_in_new_folder = $wp_filesystem->dirlist('/test/new');
        $this->assertTrue(isset($folders_in_new_folder['thing.txt']));
    }

    /**
     *
     * @global type $wp_filesystem
     */
    public function test_ensure_file_exists_and_is_writable()
    {
        global $wp_filesystem;
        $file_path = '/test.txt';
        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->exists($file_path));
        $this->assertTrue(EEH_File::ensure_file_exists_and_is_writable($file_path));
        $this->assertTrue(EEH_File::verify_is_writable($file_path));
        $wp_filesystem->chmod($file_path, '000');
        try {
            $this->assertFalse(EEH_File::ensure_file_exists_and_is_writable($file_path));
            $this->fail(sprintf(__('An exception SHOULD have been thrown but wasn\'t', 'event_espresso')));
        } catch (EE_Error $e) {
            $this->assertTrue(TRUE);
        }
        try {
            $this->assertFalse(EEH_File::verify_is_writable($file_path));
            $this->fail(sprintf(__('An exception SHOULD have been thrown but wasn\'t', 'event_espresso')));
        } catch (EE_Error $e) {
            $this->assertTrue(TRUE);
        }

    }

    /**
     *
     * @global type $wp_filesystem
     */
    public function test_get_file_contents()
    {
        global $wp_filesystem;
        $file_path = '/test.txt';
        $content = '<html><body>hello</body></html>';
        // Test creation/exists checks
        $this->assertFalse($wp_filesystem->exists($file_path));
        $wp_filesystem->put_contents($file_path, $content);
        $this->assertTrue($wp_filesystem->exists($file_path));
        $this->assertEquals($content, EEH_File::get_file_contents($file_path));
    }

    /**
     *
     * @global type $wp_filesystem
     */
    public function test_write_to_file()
    {
        global $wp_filesystem;
        $wp_filesystem->chmod('/', '755');
        $file_path = '/test.txt';
        $content1 = '<html><body>hello</body></html>';
        $content2 = '<xml><monkeys><monkey/></monkeys></xml>';
        $this->assertFalse($wp_filesystem->exists($file_path));
        $wp_filesystem->put_contents($file_path, $content1, '644');
        $this->assertTrue($wp_filesystem->exists($file_path));
        $this->assertEquals($content1, EEH_File::get_file_contents($file_path));
        //now add to it
        EEH_File::write_to_file($file_path, $content2);
        $this->assertEquals($content2, EEH_File::get_file_contents($file_path));
    }

    public function test_remove_filename_form_filepath()
    {
        $file_path = '/var/whatever/thing.txt';
        $this->assertEquals('/var/whatever', EEH_File::remove_filename_from_filepath($file_path));
    }

    public function test_get_filename_from_filepath()
    {
        $file_path = '/var/whatever/thing.txt';
        $this->assertEquals('thing.txt', EEH_File::get_filename_from_filepath($file_path));
    }

    public function test_get_file_extension()
    {
        $file_path = '/var/whatever/thing.txt';
        $this->assertEquals('txt', EEH_File::get_file_extension($file_path));
    }

    public function test_get_classname_from_filepath_with_standard_filename()
    {
        $file_path = '/we/fds/vdw/ew/EE_Thingy.junk.php';
        $this->assertEquals('EE_Thingy', EEH_File::get_classname_from_filepath_with_standard_filename($file_path));
    }

    public function test_standardise_diirectory_seperators_and_end_with_directory_separator()
    {
        $file_path = '/well\\this/isnt\\very/consistent';
        $this->assertEquals('/well/this/isnt/very/consistent/', EEH_File::standardise_and_end_with_directory_separator($file_path));
    }

    /**
     * @group 9059
     */
    public function test_is_in_uploads_folder__barely()
    {
        $uploads = wp_upload_dir();
        $this->assertTrue(EEH_File::is_in_uploads_folder($uploads['basedir']));
    }

    /**
     * @group 9059
     */
    public function test_is_in_uploads_folder__subfolder()
    {
        $this->assertTrue(EEH_File::is_in_uploads_folder(EVENT_ESPRESSO_UPLOAD_DIR . 'mazurky'));
    }

    /**
     * @group 9059
     */
    public function test_is_in_uploads_folder__elsewhere()
    {
        $this->assertFalse(EEH_File::is_in_uploads_folder('/var/somewhere/else/entirely'));
    }

    /**
     * @group 9059
     */
    public function test_is_in_uploads_folder__elsewhere_but_tricky()
    {
        $this->assertFalse(EEH_File::is_in_uploads_folder('/not/uploads/dir/' . EVENT_ESPRESSO_UPLOAD_DIR));
    }

    /**
     * @group 9059
     */
    public function test_get_parent_folder__file()
    {
        $this->assertEquals(
            '/var/something/',
            EEH_File::get_parent_folder('/var/something/thingy.txt'));
    }

    /**
     * @group 9059
     */
    public function test_get_parent_folder__file_with_one_character()
    {
        $this->assertEquals(
            '/var/something/',
            EEH_File::get_parent_folder('/var/something/a'));
    }

    /**
     * @group 9059
     */
    public function test_get_parent_folder__folder()
    {
        $this->assertEquals(
            '/var/something/',
            EEH_File::get_parent_folder('/var/something/somewhere/'));
    }


}

// End of file EEH_File_Test.php