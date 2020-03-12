<?php

/**
 * EEH_Sideloader
 *
 * This is a helper utility class that provides "sideloading" functionality.  Sideloading simply refers to retrieving files hosted elsehwere (usually github) that are downloaded into EE.
 *
 * @package     Event Espresso
 * @subpackage  /helpers/EEH_Sideloader.helper.php
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEH_Sideloader extends EEH_Base
{

    /**
     * @since   4.1.0
     * @var     string
     * @access  private
     */
    private $_upload_to;

    /**
     * @since   4.1.0
     * @var     string
     * @access  private
     * @deprecated since version $VID:$
     */
    private $_upload_from;

    /**
     * @since   $VID:$
     * @var     string
     * @access  private
     */
    private $_download_from;

    /**
     * @since   4.1.0
     * @var     string
     * @access  private
     */
    private $_permissions;

    /**
     * @since   4.1.0
     * @var     string
     * @access  private
     */
    private $_new_file_name;


    /**
     * constructor allows the user to set the properties on the sideloader on construct.  However, there are also setters for doing so.
     *
     * @since 4.1.0
     * @access public
     * @param array $init array fo initializing the sideloader if keys match the properties.
     */
    public function __construct($init = array())
    {
        $this->_init($init);
    }


    /**
     * sets the properties for class either to defaults or using incoming initialization array
     *
     * @since 4.1.0
     * @access private
     * @param  array  $init array on init (keys match properties others ignored)
     * @return void
     */
    private function _init($init)
    {
        $defaults = array(
            '_upload_to' => $this->_get_wp_uploads_dir(),
            '_download_from' => '',
            '_permissions' => 0644,
            '_new_file_name' => 'EE_Sideloader_' . uniqid() . '.default'
            );

        $props = array_merge($defaults, $init);

        foreach ($props as $key => $val) {
            if (EEH_Class_Tools::has_property($this, $key)) {
                $setter = 'set' . $key;
                $this->$setter($val);
            }
        }

        // make sure we include the required wp file for needed functions
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }


    // utilities


    /**
     * @since 4.1.0
     * @access private
     * @return void
     */
    private function _get_wp_uploads_dir()
    {
    }

    // setters


    /**
     * sets the _upload_to property to the directory to upload to.
     *
     * @since 4.1.0
     * @param $upload_to_folder
     * @return void
     */
    public function set_upload_to($upload_to_folder)
    {
        $this->_upload_to = $upload_to_folder;
    }


    /**
     * sets the _download_from property to the location we should download the file from.
     *
     * @since $VID:$
     * @param string $download_from The full path to the file we should sideload.
     * @return void
     */
    public function set_download_from($download_from)
    {
        $this->_download_from = $download_from;
    }


    /**
     * sets the _permissions property used on the sideloaded file.
     *
     * @since 4.1.0
     * @param int $permissions
     * @return void
     */
    public function set_permissions($permissions)
    {
        $this->_permissions = $permissions;
    }


    /**
     * sets the _new_file_name property used on the sideloaded file.
     *
     * @since 4.1.0
     * @param string $new_file_name
     * @return void
     */
    public function set_new_file_name($new_file_name)
    {
        $this->_new_file_name = $new_file_name;
    }

    // getters


    /**
     * @since 4.1.0
     * @return string
     */
    public function get_upload_to()
    {
        return $this->_upload_to;
    }


    /**
     * @since $VID:$
     * @return string
     */
    public function get_download_from()
    {
        return $this->_download_from;
    }


    /**
     * @since 4.1.0
     * @return int
     */
    public function get_permissions()
    {
        return $this->_permissions;
    }


    /**
     * @since 4.1.0
     * @return string
     */
    public function get_new_file_name()
    {
        return $this->_new_file_name;
    }


    // upload methods


    /**
     * Downloads the file using the WordPress HTTP API.
     *
     * @since 4.1.0
     * @return bool
     */
    public function sideload()
    {
        // setup temp dir
        $temp_file = wp_tempnam($this->_download_from);

        if (!$temp_file) {
            EE_Error::add_error(
                esc_html__('Something went wrong with the upload.  Unable to create a tmp file for the uploaded file on the server', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }

        do_action('AHEE__EEH_Sideloader__sideload__before', $this, $temp_file);

        $wp_remote_args = apply_filters('FHEE__EEH_Sideloader__sideload__wp_remote_args', array( 'timeout' => 500, 'stream' => true, 'filename' => $temp_file ), $this, $temp_file);

        $response = wp_safe_remote_get($this->_download_from, $wp_remote_args);

        if (is_wp_error($response) || 200 != wp_remote_retrieve_response_code($response)) {
            unlink($temp_file);
            if (defined('WP_DEBUG') && WP_DEBUG) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__('Unable to upload the file. Either the path given to upload from is incorrect, or something else happened. Here is the path given: %s', 'event_espresso'),
                        $this->_download_from
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            return false;
        }

        // possible md5 check
        $content_md5 = wp_remote_retrieve_header($response, 'content-md5');
        if ($content_md5) {
            $md5_check = verify_file_md5($temp_file, $content_md5);
            if (is_wp_error($md5_check)) {
                unlink($temp_file);
                EE_Error::add_error(
                    $md5_check->get_error_message(),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
        }

        $file = $temp_file;

        // now we have the file, let's get it in the right directory with the right name.
        $path = apply_filters('FHEE__EEH_Sideloader__sideload__new_path', $this->_upload_to . $this->_new_file_name, $this);

        // move file in
        if (false === @ rename($file, $path)) {
            unlink($temp_file);
            EE_Error::add_error(
                sprintf(
                    esc_html__('Unable to move the file to new location (possible permissions errors). This is the path the class attempted to move the file to: %s', 'event_espresso'),
                    $path
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }

        // set permissions
        $permissions = apply_filters('FHEE__EEH_Sideloader__sideload__permissions_applied', $this->_permissions, $this);
        chmod($path, $permissions);

        // that's it.  let's allow for actions after file uploaded.
        do_action('AHEE__EE_Sideloader__sideload_after', $this, $path);

        // unlink tempfile
        @unlink($temp_file);
        return true;
    }

    // deprecated

    /**
     * sets the _upload_from property to the location we should download the file from.
     *
     * @param string $upload_from The full path to the file we should sideload.
     * @return void
     * @deprecated since version $VID:$
     */
    public function set_upload_from($upload_from)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            __(
                'EEH_Sideloader::set_upload_from was renamed to EEH_Sideloader::set_download_from',
                'event_espresso'
            ),
            '$VID:$'
        );
        $this->set_download_from($upload_from);
    }


    /**
     * @since 4.1.0
     * @return string
     * @deprecated since version $VID:$
     */
    public function get_upload_from()
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            __(
                'EEH_Sideloader::get_upload_from was renamed to EEH_Sideloader::get_download_from',
                'event_espresso'
            ),
            '$VID:$'
        );
        return $this->_download_from;
    }
} //end EEH_Sideloader class
