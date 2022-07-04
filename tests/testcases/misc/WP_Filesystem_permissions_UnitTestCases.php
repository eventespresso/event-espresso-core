<?php



/**
 * permissions
 *
 * @package                             Event Espresso
 * @subpackage
 * @author                              Mike Nelson
 * @group                               filesystem
 */
class WP_Filesystem_permissions_UnitTestCases extends WP_UnitTestCase
{

    function set_up()
    {
        add_filter('filesystem_method_file', array($this, 'filter_abstraction_file'));
        add_filter('filesystem_method', array($this, 'filter_fs_method'));
        WP_Filesystem();
    }



    function tear_down()
    {
        global $wp_filesystem;
        remove_filter('filesystem_method_file', array($this, 'filter_abstraction_file'));
        remove_filter('filesystem_method', array($this, 'filter_fs_method'));
        unset($wp_filesystem);
        parent::tear_down();
    }



    function filter_fs_method($method)
    {
        return 'MockEEFS';
    }



    function filter_abstraction_file($file)
    {
        return dirname(dirname(dirname(__FILE__))) . '/includes/mock-ee-fs.php';
    }



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
        //$this->assertFalse( true );
    }



    function test_mkdir()
    {
        global $wp_filesystem;
        $wp_filesystem->init('/');
        $folder_path = '/test/';
        $wp_filesystem->mkdir($folder_path);
        $this->assertTrue($wp_filesystem->exists($folder_path));
        $this->assertEquals(WP_Filesystem_MockFS_default_perms, $wp_filesystem->getchmod($folder_path));
        $this->assertEquals(WP_Filesystem_MockFS_default_owner, $wp_filesystem->owner($folder_path));
        $this->assertEquals(WP_Filesystem_MockFS_default_group, $wp_filesystem->group($folder_path));
    }



    function test_chmod()
    {
        global $wp_filesystem;
        $wp_filesystem->init('/');
        $folder_path = '/test/';
        $wp_filesystem->mkdir($folder_path);
        $this->assertEquals(WP_Filesystem_MockFS_default_perms, $wp_filesystem->getchmod($folder_path));
        $wp_filesystem->chmod($folder_path, 664);
        $this->assertEquals(664, $wp_filesystem->getchmod($folder_path));
    }



    function test_chown()
    {
        global $wp_filesystem;
        $wp_filesystem->init('/');
        $folder_path = '/test/';
        $wp_filesystem->mkdir($folder_path);
        $this->assertEquals(WP_Filesystem_MockFS_default_owner, $wp_filesystem->owner($folder_path));
        $wp_filesystem->chown($folder_path, 'stranger');
        $this->assertEquals('stranger', $wp_filesystem->owner($folder_path));
    }



    function test_chgroup()
    {
        global $wp_filesystem;
        $wp_filesystem->init('/');
        $folder_path = '/test/';
        $wp_filesystem->mkdir($folder_path);
        $this->assertEquals(WP_Filesystem_MockFS_default_group, $wp_filesystem->group($folder_path));
        $success = $wp_filesystem->chgrp($folder_path, 'globe-trotters');
        $this->assertEquals('globe-trotters', $wp_filesystem->group($folder_path));
    }



    function test_is_readable()
    {
        global $wp_filesystem;
        $wp_filesystem->init('/');
        $folder_path = '/test/';
        $wp_filesystem->mkdir($folder_path);
        $this->assertEquals(WP_Filesystem_MockFS_default_perms, $wp_filesystem->getchmod($folder_path));
        $this->assertTrue($wp_filesystem->is_readable($folder_path));
        //switch to another user, although they should be able to read it too
        $other_user_same_group = $wp_filesystem->add_system_user('other_user_same_group', WP_Filesystem_MockFS_default_group);
        $other_user_other_group = $wp_filesystem->add_system_user('other_user_other_group', 'other_group');
        $wp_filesystem->change_current_system_user($other_user_other_group->username);
        $this->assertTrue($wp_filesystem->is_readable($folder_path));
        $wp_filesystem->change_current_system_user(WP_Filesystem_MockFS_default_owner);
        //change the permissions soo only someone in the same group can read
        $wp_filesystem->chmod($folder_path, '770');
        $this->assertEquals('770', $wp_filesystem->getchmod($folder_path));
        $this->assertTrue($wp_filesystem->is_readable($folder_path));
        //and now check the user in the same group can still read...
        $wp_filesystem->change_current_system_user($other_user_same_group->username);
        $this->assertTrue($wp_filesystem->is_readable($folder_path));
        //..bu tthe user in a differeng group can't
        $wp_filesystem->change_current_system_user($other_user_other_group->username);
        $this->assertFalse($wp_filesystem->is_readable($folder_path));
    }



    function test_is_writable()
    {
        global $wp_filesystem;
        $wp_filesystem->init('/');
        $folder_path = '/test/';
        $wp_filesystem->mkdir($folder_path);
        $this->assertEquals(WP_Filesystem_MockFS_default_perms, $wp_filesystem->getchmod($folder_path));
        $this->assertTrue($wp_filesystem->is_writable($folder_path));
        //switch to another user, although they should be able to write it too
        $other_user_same_group = $wp_filesystem->add_system_user('other_user_same_group', WP_Filesystem_MockFS_default_group);
        $other_user_other_group = $wp_filesystem->add_system_user('other_user_other_group', 'other_group');
        $wp_filesystem->change_current_system_user($other_user_other_group->username);
        $this->assertTrue($wp_filesystem->is_writable($folder_path));
        $wp_filesystem->change_current_system_user(WP_Filesystem_MockFS_default_owner);
        //change the permissions soo only someone in the same group can read
        $wp_filesystem->chmod($folder_path, '770');
        $this->assertEquals('770', $wp_filesystem->getchmod($folder_path));
        $this->assertTrue($wp_filesystem->is_writable($folder_path));
        //and now check the user in the same group can still write...
        $wp_filesystem->change_current_system_user($other_user_same_group->username);
        $this->assertTrue($wp_filesystem->is_writable($folder_path));
        //..bu tthe user in a differeng group can't
        $wp_filesystem->change_current_system_user($other_user_other_group->username);
        $this->assertFalse($wp_filesystem->is_writable($folder_path));
    }

}


