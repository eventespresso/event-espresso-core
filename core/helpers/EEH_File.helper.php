<?php

/**
 *
 * Class EEH_File
 *
 * Mostly methods are wrappers for WP_Filesystem. Primarily these methods should be used
 * when you intend to WRITE to the filesystem. Many of these methods throw an EE_Error
 * when the current filesystem user doesn't have permission to read/write the given file.
 * Note: that means if FS_METHOD is defined to be ssh or ftp, and the ftp password isn't
 * entered into wp-config.php, code like `EEH_File::is_readable()` will THROW AN EXCEPTION
 * when trying ot read anything, unless the user has just entered their ftp/ssh credentials
 * into the wp filesystem credentials form. See http://ottopress.com/2011/tutorial-using-the-wp_filesystem/
 * If you want to test your usage of EEH_File and WP_Filesystem, you can use our
 * filesystem debugger plugin: https://github.com/eventespresso/filesystem-debug-helper,
 * which simulates requiring ftp or ssh to access your site (even if your site is
 * actually local and you haven't set it up for ftp or ssh access)
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Brent Christensen
 *
 *
 */
class EEH_File extends EEH_Base implements EEHI_File
{

    /**
     * @var string $_credentials_form
     */
    private static $_credentials_form;

    /**
     * @var WP_Filesystem_Base $_wp_filesystem
     */
    protected static $_wp_filesystem;


    /**
     * @param string|null $filepath the filepath we want to work in. If its in the
     *                              wp uploads directory, we'll want to just use the filesystem directly.
     *                              If not provided, we have to assume its not in the uploads directory
     * @return WP_Filesystem_Base
     */
    private static function _get_wp_filesystem($filepath = null)
    {
        if (apply_filters(
            'FHEE__EEH_File___get_wp_filesystem__allow_using_filesystem_direct',
            $filepath && EEH_File::is_in_uploads_folder($filepath),
            $filepath
        )) {
            return EEH_File::loadAlternateWpFileSystem();
        }
        return EEH_File::loadWpFileSystem();
    }


    /**
     * @return WP_Filesystem_Base
     */
    private static function loadAlternateWpFileSystem()
    {
        if (! EEH_File::$_wp_filesystem instanceof WP_Filesystem_Base) {
            require_once(ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php');
            $method             = 'direct';
            $wp_filesystem_file =
                apply_filters(
                    'filesystem_method_file',
                    ABSPATH . 'wp-admin/includes/class-wp-filesystem-' . $method . '.php',
                    $method
                );
            // added the following validation logic
            // because we allow the filesystem filepath to be filtered,
            // and are loading whatever file the path pointed to,
            // but we were not validating things in any way :scream_emoji:
            $valid_wp_filesystem_types = [
                'direct'     => 'WP_Filesystem_Direct',
                'ftpext'     => 'WP_Filesystem_FTPext',
                'ftpsockets' => 'WP_Filesystem_ftpsockets',
                'ssh2'       => 'WP_Filesystem_SSH2',
            ];
            $valid                     = false;
            $wp_filesystem_class       = '';
            foreach ($valid_wp_filesystem_types as $method => $filesystem_class) {
                // if file path matches for one of valid types, then toggle $valid to true
                if (strpos($wp_filesystem_file, $method) > 0) {
                    $valid               = true;
                    $wp_filesystem_class = $filesystem_class;
                }
            }
            if (! $valid || ! file_exists($wp_filesystem_file)) {
                EE_Error::add_error(
                    sprintf(
                        __(
                            'The supplied WP Filesystem filepath "%1$s" is either missing or invalid.',
                            'event_espresso'
                        ),
                        $wp_filesystem_file
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            // check constants defined, just like in the wp-admin/includes/file.php WP_Filesystem()
            if (! defined('FS_CHMOD_DIR')) {
                define('FS_CHMOD_DIR', (fileperms(ABSPATH) & 0775 | 0755));
            }
            if (! defined('FS_CHMOD_FILE')) {
                define('FS_CHMOD_FILE', (fileperms(ABSPATH . 'index.php') & 0775 | 0644));
            }
            require_once($wp_filesystem_file);
            EEH_File::$_wp_filesystem = new $wp_filesystem_class([]);
        }
        return EEH_File::$_wp_filesystem;
    }


    /**
     * @return WP_Filesystem_Base
     */
    private static function loadWpFileSystem()
    {
        global $wp_filesystem;
        // no filesystem setup ???
        if (! $wp_filesystem instanceof WP_Filesystem_Base) {
            // if some eager beaver's just trying to get in there too early...
            // let them do it, because we are one of those eager beavers! :P
            /**
             * more explanations are probably merited. http://codex.wordpress.org/Filesystem_API#Initializing_WP_Filesystem_Base
             * says WP_Filesystem should be used after 'wp_loaded', but currently EE's activation process
             * is setup to mostly happen on 'init', and refactoring to have it happen on
             * 'wp_loaded' is too much work on a BETA milestone.
             * So this fix is expected to work if the WP files are owned by the server user,
             * but probably not if the user needs to enter their FTP credentials to modify files
             * and there may be troubles if the WP files are owned by a different user
             * than the server user. But both of these issues should exist in 4.4 and earlier too
             */
            if (false && ! did_action('wp_loaded')) {
                $msg =
                    __(
                        'An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.',
                        'event_espresso'
                    );
                if (WP_DEBUG) {
                    $msg .= '<br />' . __(
                        'The WP Filesystem can not be accessed until after the "wp_loaded" hook has run, so it\'s best not to attempt access until the "admin_init" hookpoint.',
                        'event_espresso'
                    );
                }
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            // should be loaded if we are past the wp_loaded hook...
            if (! function_exists('WP_Filesystem')) {
                require_once(ABSPATH . 'wp-admin/includes/file.php');
                require_once(ABSPATH . 'wp-admin/includes/template.php');
            }
            // turn on output buffering so that we can capture the credentials form
            ob_start();
            $credentials = request_filesystem_credentials(false);
            // store credentials form for the time being
            EEH_File::$_credentials_form = ob_get_clean();
            // if credentials do NOT exist
            if ($credentials === false) {
                add_action('admin_notices', ['EEH_File', 'display_request_filesystem_credentials_form'], 999);
                EE_Error::add_error(
                    __(
                        'An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            // basically check for direct or previously configured access
            if (! WP_Filesystem($credentials)
                && is_wp_error($wp_filesystem->errors)
                && $wp_filesystem->errors->get_error_code()
            ) {
                add_action('admin_notices', ['EEH_File', 'display_request_filesystem_credentials_form'], 999);
                EE_Error::add_error(
                    sprintf(
                        __('WP Filesystem Error: $1%s', 'event_espresso'),
                        $wp_filesystem->errors->get_error_message()
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        return $wp_filesystem;
    }


    /**
     * display_request_filesystem_credentials_form
     */
    public static function display_request_filesystem_credentials_form()
    {
        if (! empty(EEH_File::$_credentials_form)) {
            echo '<div class="updated espresso-notices-attention"><p>' . EEH_File::$_credentials_form . '</p></div>';
        }
    }


    /**
     *    verify_filepath_and_permissions
     *    checks that a file is readable and has sufficient file permissions set to access
     *
     * @access public
     * @param string $full_file_path - full server path to the folder or file
     * @param string $file_name      - name of file if checking a file
     * @param string $file_ext       - file extension (ie: "php") if checking a file
     * @param string $type_of_file   - general type of file (ie: "module"), this is only used to improve error messages
     * @return bool
     */
    public static function verify_filepath_and_permissions(
        $full_file_path = '',
        $file_name = '',
        $file_ext = '',
        $type_of_file = ''
    ) {
        // load WP_Filesystem and set file permissions
        $wp_filesystem  = EEH_File::_get_wp_filesystem($full_file_path);
        $full_file_path = EEH_File::standardise_directory_separators($full_file_path);
        if (! $wp_filesystem->is_readable(EEH_File::convert_local_filepath_to_remote_filepath($full_file_path))) {
            $file_name = ! empty($type_of_file) ? $file_name . ' ' . $type_of_file : $file_name;
            $file_name .= ! empty($file_ext) ? ' file' : ' folder';
            $msg       = sprintf(
                __(
                    'The requested %1$s could not be found or is not readable, possibly due to an incorrect filepath, or incorrect file permissions.%2$s',
                    'event_espresso'
                ),
                $file_name,
                '<br />'
            );
            if (EEH_File::exists($full_file_path)) {
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_file_path, $type_of_file);
            } else {
                // no file permissions means the file was not found
                $msg .= sprintf(
                    __('Please ensure the following path is correct: "%s".', 'event_espresso'),
                    $full_file_path
                );
            }
            if (defined('WP_DEBUG') && WP_DEBUG) {
                EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return false;
        }
        return true;
    }


    /**
     * _permissions_error_for_unreadable_filepath - attempts to determine why permissions are set incorrectly for a
     * file or folder
     *
     * @access private
     * @param string $full_file_path - full server path to the folder or file
     * @param string $type_of_file   - general type of file (ie: "module"), this is only used to improve error messages
     * @return string
     */
    private static function _permissions_error_for_unreadable_filepath($full_file_path = '', $type_of_file = '')
    {
        // load WP_Filesystem and set file permissions
        $wp_filesystem = EEH_File::_get_wp_filesystem($full_file_path);
        // check file permissions
        $perms = $wp_filesystem->getchmod(EEH_File::convert_local_filepath_to_remote_filepath($full_file_path));
        if ($perms) {
            // file permissions exist, but way be set incorrectly
            $type_of_file = ! empty($type_of_file) ? $type_of_file . ' ' : '';
            $type_of_file .= ! empty($type_of_file) ? 'file' : 'folder';
            return ' ' . sprintf(
                __(
                    'File permissions for the requested %1$s are currently set at "%2$s". The recommended permissions are 644 for files and 755 for folders.',
                    'event_espresso'
                ),
                $type_of_file,
                $perms
            );
        } else {
            // file exists but file permissions could not be read ?!?!
            return ' ' . sprintf(
                __(
                    'Please ensure that the server and/or PHP configuration allows the current process to access the following file: "%s".',
                    'event_espresso'
                ),
                $full_file_path
            );
        }
    }


    /**
     * ensure_folder_exists_and_is_writable
     * ensures that a folder exists and is writable, will attempt to create folder if it does not exist
     * Also ensures all the parent folders exist, and if not tries to create them.
     * Also, if this function creates the folder, adds a .htaccess file and index.html file
     *
     * @param string $folder
     * @return bool false if folder isn't writable; true if it exists and is writeable,
     */
    public static function ensure_folder_exists_and_is_writable($folder = '')
    {
        if (empty($folder)) {
            return false;
        }
        // remove ending /
        $folder        = EEH_File::standardise_directory_separators(rtrim($folder, '/\\'));
        $parent_folder = EEH_File::get_parent_folder($folder);
        // add / to folder
        $folder        = EEH_File::end_with_directory_separator($folder);
        $wp_filesystem = EEH_File::_get_wp_filesystem($folder);
        $remote_dir    = EEH_File::convert_local_filepath_to_remote_filepath($folder);
        if (! $wp_filesystem->is_dir($remote_dir)) {
            // ok so it doesn't exist. Does its parent? Can we write to it?
            if (! EEH_File::ensure_folder_exists_and_is_writable($parent_folder)) {
                return false;
            }
            if (! EEH_File::verify_is_writable($parent_folder, 'folder')) {
                return false;
            }
            if (! $wp_filesystem->mkdir(EEH_File::convert_local_filepath_to_remote_filepath($folder))) {
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    $msg = sprintf(__('"%s" could not be created.', 'event_espresso'), $folder);
                    $msg .= EEH_File::_permissions_error_for_unreadable_filepath($folder);
                    EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
                }
                return false;
            }
            EEH_File::add_index_file($folder);
        } elseif (! EEH_File::verify_is_writable($folder, 'folder')) {
            return false;
        }
        return true;
    }


    /**
     * verify_is_writable - checks if a file or folder is writable
     *
     * @param string $full_path      - full server path to file or folder
     * @param string $file_or_folder - whether checking a file or folder
     * @return bool
     */
    public static function verify_is_writable($full_path = '', $file_or_folder = 'folder')
    {
        // load WP_Filesystem and set file permissions
        $wp_filesystem = EEH_File::_get_wp_filesystem($full_path);
        $full_path     = EEH_File::standardise_directory_separators($full_path);
        $remote_path   = EEH_File::convert_local_filepath_to_remote_filepath($full_path);
        $remote_path   = rtrim($remote_path, '/\\');
        if (! $wp_filesystem->is_writable($remote_path)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg = sprintf(__('The "%1$s" %2$s is not writable.', 'event_espresso'), $full_path, $file_or_folder);
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_path);
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return false;
        }
        return true;
    }


    /**
     * ensure_file_exists_and_is_writable
     * ensures that a file exists and is writable, will attempt to create file if it does not exist.
     * Also ensures all the parent folders exist, and if not tries to create them.
     *
     * @param string $full_file_path
     * @return bool
     */
    public static function ensure_file_exists_and_is_writable($full_file_path = '')
    {
        // load WP_Filesystem and set file permissions
        $wp_filesystem  = EEH_File::_get_wp_filesystem($full_file_path);
        $full_file_path = EEH_File::standardise_directory_separators($full_file_path);
        $parent_folder  = EEH_File::get_parent_folder($full_file_path);
        if (! EEH_File::exists($full_file_path)) {
            if (! EEH_File::ensure_folder_exists_and_is_writable($parent_folder)) {
                return false;
            }
            if (! $wp_filesystem->touch(EEH_File::convert_local_filepath_to_remote_filepath($full_file_path))) {
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    $msg = sprintf(__('The "%s" file could not be created.', 'event_espresso'), $full_file_path);
                    $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_file_path);
                    EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
                }
                return false;
            }
        }
        if (! EEH_File::verify_is_writable($full_file_path, 'file')) {
            return false;
        }
        return true;
    }


    /**
     * Gets the parent folder. If provided with file, gets the folder that contains it.
     * If provided a folder, gets its parent folder.
     *
     * @param string $file_or_folder_path
     * @return string parent folder, ENDING with a directory separator
     */
    public static function get_parent_folder($file_or_folder_path)
    {
        // find the last /, ignoring a / on the very end
        // eg if given "/var/something/somewhere/", we want to get "somewhere"'s
        // parent folder, "/var/something/"
        $ds = strlen($file_or_folder_path) > 1
            ? strrpos($file_or_folder_path, '/', -2)
            : strlen($file_or_folder_path);
        return substr($file_or_folder_path, 0, $ds + 1);
    }


    /**
     * get_file_contents
     *
     * @param string $full_file_path
     * @return string
     */
    public static function get_file_contents($full_file_path = '')
    {
        $full_file_path = EEH_File::standardise_directory_separators($full_file_path);
        if (EEH_File::verify_filepath_and_permissions(
            $full_file_path,
            EEH_File::get_filename_from_filepath($full_file_path),
            EEH_File::get_file_extension($full_file_path)
        )) {
            // load WP_Filesystem and set file permissions
            $wp_filesystem = EEH_File::_get_wp_filesystem($full_file_path);
            return $wp_filesystem->get_contents(EEH_File::convert_local_filepath_to_remote_filepath($full_file_path));
        }
        return '';
    }


    /**
     * write_file
     *
     * @param string $full_file_path
     * @param string $file_contents - the content to be written to the file
     * @param string $file_type
     * @return bool
     */
    public static function write_to_file($full_file_path = '', $file_contents = '', $file_type = '')
    {
        $full_file_path = EEH_File::standardise_directory_separators($full_file_path);
        $file_type      = ! empty($file_type) ? rtrim($file_type, ' ') . ' ' : '';
        $folder         = EEH_File::remove_filename_from_filepath($full_file_path);
        if (! EEH_File::verify_is_writable($folder, 'folder')) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg =
                    sprintf(
                        __('The %1$sfile located at "%2$s" is not writable.', 'event_espresso'),
                        $file_type,
                        $full_file_path
                    );
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_file_path);
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return false;
        }
        // load WP_Filesystem and set file permissions
        $wp_filesystem = EEH_File::_get_wp_filesystem($full_file_path);
        // write the file
        if (! $wp_filesystem->put_contents(
            EEH_File::convert_local_filepath_to_remote_filepath($full_file_path),
            $file_contents
        )) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg =
                    sprintf(
                        __('The %1$sfile located at "%2$s" could not be written to.', 'event_espresso'),
                        $file_type,
                        $full_file_path
                    );
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_file_path, 'f');
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return false;
        }
        return true;
    }


    /**
     * Wrapper for WP_Filesystem_Base::delete
     *
     * @param string         $filepath
     * @param boolean        $recursive
     * @param boolean|string $type 'd' for directory, 'f' for file
     * @return boolean
     */
    public static function delete($filepath, $recursive = false, $type = false)
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem();
        return $wp_filesystem->delete($filepath, $recursive, $type);
    }


    /**
     * exists
     * checks if a file exists using the WP filesystem
     *
     * @param string $full_file_path
     * @return bool
     */
    public static function exists($full_file_path = '')
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($full_file_path);
        return $wp_filesystem->exists(EEH_File::convert_local_filepath_to_remote_filepath($full_file_path));
    }


    /**
     * is_readable
     * checks if a file is_readable using the WP filesystem
     *
     * @param string $full_file_path
     * @return bool
     */
    public static function is_readable($full_file_path = '')
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($full_file_path);
        return $wp_filesystem->is_readable(EEH_File::convert_local_filepath_to_remote_filepath($full_file_path));
    }


    /**
     * remove_filename_from_filepath
     * given a full path to a file including the filename itself, this removes  the filename and returns the path, up
     * to, but NOT including the filename OR slash
     *
     * @param string $full_file_path
     * @return string
     */
    public static function remove_filename_from_filepath($full_file_path = '')
    {
        return pathinfo($full_file_path, PATHINFO_DIRNAME);
    }


    /**
     * get_filename_from_filepath. Arguably the same as basename()
     *
     * @param string $full_file_path
     * @return string
     */
    public static function get_filename_from_filepath($full_file_path = '')
    {
        return pathinfo($full_file_path, PATHINFO_BASENAME);
    }


    /**
     * get_file_extension
     *
     * @param string $full_file_path
     * @return string
     */
    public static function get_file_extension($full_file_path = '')
    {
        return pathinfo($full_file_path, PATHINFO_EXTENSION);
    }


    /**
     * add_htaccess_deny_from_all so the web server cannot access this folder
     *
     * @param string $folder
     * @return bool
     */
    public static function add_htaccess_deny_from_all($folder = '')
    {
        $folder = EEH_File::standardise_and_end_with_directory_separator($folder);
        if (! EEH_File::exists($folder . '.htaccess')) {
            if (! EEH_File::write_to_file($folder . '.htaccess', 'deny from all', '.htaccess')) {
                return false;
            }
        }

        return true;
    }


    /**
     * Adds an index file to this folder, so folks can't list all the file's contents
     *
     * @param string $folder
     * @return boolean
     */
    public static function add_index_file($folder)
    {
        $folder = EEH_File::standardise_and_end_with_directory_separator($folder);
        if (! EEH_File::exists($folder . 'index.php')) {
            if (! EEH_File::write_to_file(
                $folder . 'index.php',
                'You are not permitted to read from this folder',
                '.php'
            )) {
                return false;
            }
        }
        return true;
    }


    /**
     * Given that the file in $file_path has the normal name, (ie, CLASSNAME.whatever.php),
     * extract that classname.
     *
     * @param string $file_path
     * @return string
     */
    public static function get_classname_from_filepath_with_standard_filename($file_path)
    {
        // extract file from path
        $filename = basename($file_path);
        // now remove the first period and everything after
        $pos_of_first_period = strpos($filename, '.');
        return substr($filename, 0, $pos_of_first_period);
    }


    /**
     * standardise_directory_separators
     *  convert all directory separators in a file path.
     *
     * @param string $file_path
     * @param bool   $rtrim will remove trailing backslash
     * @return string
     */
    public static function standardise_directory_separators($file_path, $rtrim = false)
    {
        $file_path = $rtrim ? rtrim($file_path, '/\\') : $file_path;
        return str_replace(['\\', '/'], '/', $file_path);
    }


    /**
     * end_with_directory_separator
     *  ensures that file path ends with '/'
     *
     * @param string $file_path
     * @return string
     */
    public static function end_with_directory_separator($file_path)
    {
        return rtrim($file_path, '/\\') . '/';
    }


    /**
     * shorthand for both EEH_FIle::end_with_directory_separator AND EEH_File::standardise_directory_separators
     *
     * @param $file_path
     * @return string
     */
    public static function standardise_and_end_with_directory_separator($file_path)
    {
        return self::end_with_directory_separator(self::standardise_directory_separators($file_path));
    }


    /**
     * takes the folder name (with or without trailing slash) and finds the files it in,
     * and what the class's name inside of each should be.
     *
     * @param array   $folder_paths
     * @param boolean $index_numerically if TRUE, the returned array will be indexed numerically;
     *                                   if FALSE (Default), returned array will be indexed by the filenames minus
     *                                   extensions. Set it TRUE if you know there are files in the directory with the
     *                                   same name but different extensions
     * @return array if $index_numerically == TRUE keys are numeric ,
     *                                   if $index_numerically == FALSE (Default) keys are what the class names SHOULD
     *                                   be; and values are their file paths
     */
    public static function get_contents_of_folders($folder_paths = [], $index_numerically = false)
    {
        $class_to_folder_path = [];
        foreach ($folder_paths as $folder_path) {
            $folder_path = self::standardise_and_end_with_directory_separator($folder_path);
            // load WP_Filesystem and set file permissions
            $files_in_folder = glob($folder_path . '*.php');
            $class_to_folder_path = [];
            if ($files_in_folder) {
                foreach ($files_in_folder as $file_path) {
                    // only add files, not folders
                    if (! is_dir($file_path)) {
                        if ($index_numerically) {
                            $class_to_folder_path[] = $file_path;
                        } else {
                            $classname =
                                self::get_classname_from_filepath_with_standard_filename($file_path);
                            $class_to_folder_path[ $classname ] = $file_path;
                        }
                    }
                }
            }
        }
        return $class_to_folder_path;
    }


    /**
     * Copies a file. Mostly a wrapper of WP_Filesystem::copy
     *
     * @param string  $source_file
     * @param string  $destination_file
     * @param boolean $overwrite
     * @return boolean success
     */
    public static function copy($source_file, $destination_file, $overwrite = false)
    {
        $source_file      = EEH_File::validateFileForCopyOrMove($source_file);
        $destination_file = EEH_File::validateFolderForCopyOrMove($destination_file);
        if (! $source_file || ! $destination_file) {
            return false;
        }
        // load WP_Filesystem and set file permissions
        $wp_filesystem = EEH_File::_get_wp_filesystem($destination_file);
        // write the file
        $copied = $wp_filesystem->copy(
            EEH_File::convert_local_filepath_to_remote_filepath($source_file),
            EEH_File::convert_local_filepath_to_remote_filepath($destination_file),
            $overwrite
        );
        if (! $copied) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg = sprintf(
                    __(
                        'Attempted writing to file %1$s, but could not, probably because of permissions issues',
                        'event_espresso'
                    ),
                    $source_file
                );
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($source_file, 'f');
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return false;
        }
        return true;
    }


    /**
     * Reports whether or not the filepath is in the EE uploads folder or not
     *
     * @param string $filepath
     * @return boolean
     */
    public static function is_in_uploads_folder($filepath)
    {
        $uploads = wp_upload_dir();
        return strpos($filepath, $uploads['basedir']) === 0;
    }


    /**
     * Given a "local" filepath (what you probably thought was the only filepath),
     * converts it into a "remote" filepath (the filepath the currently-in-use
     * $wp_filesystem needs to use access the folder or file).
     * See http://wordpress.stackexchange.com/questions/124900/using-wp-filesystem-in-plugins
     *
     * @param string $local_filepath the filepath to the folder/file locally
     * @return string the remote filepath (eg the filepath the filesystem method, eg
     *                               ftp or ssh, will use to access the folder
     */
    public static function convert_local_filepath_to_remote_filepath($local_filepath)
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($local_filepath);
        return str_replace(WP_CONTENT_DIR . '/', $wp_filesystem->wp_content_dir(), $local_filepath);
    }


    /**
     * wrapper for WP_Filesystem::chmod()
     *
     * @param string    $file      Path to the file.
     * @param int|false $mode      Optional. The permissions as octal number, usually 0644 for files,
     *                             0755 for directories. Default false.
     * @param bool      $recursive Optional. If set to true, changes file permissions recursively.
     *                             Default false.
     * @return bool True on success, false on failure.
     */
    public static function chmod($file, $mode = false, $recursive = false)
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($file);
        return $wp_filesystem->chmod($file, $mode, $recursive);
    }


    /**
     * wrapper for WP_Filesystem::getchmod()
     *
     * @param string $file Path to the file.
     * @return string Mode of the file (the last 3 digits).
     */
    public static function permissions($file)
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($file);
        return $wp_filesystem->getchmod($file);
    }


    /**
     * wrapper for WP_Filesystem::owner()
     *
     * @param string $file Path to the file.
     * @return string|false Username of the owner on success, false on failure.
     */
    public static function owner($file)
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($file);
        return $wp_filesystem->owner($file);
    }


    /**
     * wrapper for WP_Filesystem::group()
     *
     * @param string $file Path to the file.
     * @return string|false The group on success, false on failure.
     */
    public static function group($file)
    {
        $wp_filesystem = EEH_File::_get_wp_filesystem($file);
        return $wp_filesystem->group($file);
    }


    /**
     * wrapper for WP_Filesystem::move()
     *
     * @param string $source      Path to the source file.
     * @param string $destination Path to the destination file.
     * @param bool   $overwrite   Optional. Whether to overwrite the destination file if it exists.
     *                            Default false.
     * @return bool True on success, false on failure.
     */
    public static function move($source, $destination, $overwrite = false)
    {
        // throw new RuntimeException("source: {$source} && destination: {$destination}");
        $source      = EEH_File::validateFileForCopyOrMove($source);
        $destination = EEH_File::validateFolderForCopyOrMove($destination);
        if (! $source || ! $destination) {
            return false;
        }
        $wp_filesystem = EEH_File::_get_wp_filesystem($source);
        if ($wp_filesystem->move($source, $destination, $overwrite)) {
            return true;
        }
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $file        = EEH_File::convert_local_filepath_to_remote_filepath($source);
            $owner       = EEH_File::owner($file);
            $group       = EEH_File::group($file);
            $permissions = EEH_File::permissions($file);
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'Unable to move the file "%1$s" to new location (possible permissions errors). The existing "owner:group permissions" for the file are: "%2$s"',
                        'event_espresso'
                    ),
                    $destination,
                    "{$owner}:{$group} $permissions"
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return false;
    }


    /**
     * @param string $source_file
     * @return string
     */
    private static function validateFileForCopyOrMove($source_file)
    {
        $full_source_path = EEH_File::standardise_directory_separators($source_file);
        if (! EEH_File::exists($full_source_path)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg =
                    sprintf(
                        __('The file located at "%2$s" is not readable or doesn\'t exist.', 'event_espresso'),
                        '',
                        $full_source_path
                    );
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_source_path);
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return '';
        }
        return $full_source_path;
    }


    /**
     * @param string $destination_file
     * @return string
     */
    private static function validateFolderForCopyOrMove($destination_file)
    {
        $full_dest_path = EEH_File::standardise_directory_separators($destination_file);
        $folder         = EEH_File::remove_filename_from_filepath($full_dest_path);
        EEH_File::ensure_folder_exists_and_is_writable($folder);
        if (! EEH_File::verify_is_writable($folder, 'folder')) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg = sprintf(
                    __('The file located at "%2$s" is not writable.', 'event_espresso'),
                    '',
                    $full_dest_path
                );
                $msg .= EEH_File::_permissions_error_for_unreadable_filepath($full_dest_path);
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            return '';
        }
        return $full_dest_path;
    }
}
