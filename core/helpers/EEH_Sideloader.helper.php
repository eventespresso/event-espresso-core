<?php

/**
 * EEH_Sideloader
 *
 * This is a helper utility class that provides "sideloading" functionality.
 * Sideloading simply refers to retrieving files hosted elsewhere
 * (usually github) that are downloaded into EE.
 *
 * @package     Event Espresso
 * @subpackage  /helpers/EEH_Sideloader.helper.php
 * @author      Darren Ethier
 */
class EEH_Sideloader extends EEH_Base
{

    /**
     * @since   4.1.0
     * @var     string
     */
    private $_upload_to;

    /**
     * @since   4.10.5.p
     * @var     string
     */
    private $_download_from;

    /**
     * @since   4.1.0
     * @var     string
     */
    private $_permissions;

    /**
     * @since   4.1.0
     * @var     string
     */
    private $_new_file_name;


    /**
     * constructor allows the user to set the properties on the sideloader on construct.  However, there are also
     * setters for doing so.
     *
     * @param array $init array fo initializing the sideloader if keys match the properties.
     * @since 4.1.0
     */
    public function __construct($init = [])
    {
        $this->_init($init);
    }


    /**
     * sets the properties for class either to defaults or using incoming initialization array
     *
     * @param array $init array on init (keys match properties others ignored)
     * @return void
     * @since 4.1.0
     */
    private function _init($init)
    {
        $defaults = [
            '_upload_to'     => $this->_get_wp_uploads_dir(),
            '_download_from' => '',
            '_permissions'   => 0644,
            '_new_file_name' => 'EE_Sideloader_' . uniqid() . '.default',
        ];

        $props = array_merge($defaults, $init);

        foreach ($props as $property => $val) {
            $setter = 'set' . $property;
            if (method_exists($this, $setter)) {
                $this->$setter($val);
            } else {
                // No setter found.
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'EEH_Sideloader::%1$s not found. There is no setter for the %2$s property.',
                            'event_espresso'
                        ),
                        $setter,
                        $property
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }

        // make sure we include the required wp file for needed functions
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }


    // utilities


    /**
     * @return string
     * @since 4.1.0
     */
    private function _get_wp_uploads_dir()
    {
        $uploads = wp_upload_dir();
        return $uploads['basedir'];
    }

    // setters


    /**
     * sets the _upload_to property to the directory to upload to.
     *
     * @param $upload_to_folder
     * @return void
     * @since 4.1.0
     */
    public function set_upload_to($upload_to_folder)
    {
        $this->_upload_to = $upload_to_folder;
    }


    /**
     * sets the _download_from property to the location we should download the file from.
     *
     * @param string $download_from The full path to the file we should sideload.
     * @return void
     * @since 4.10.5.p
     */
    public function set_download_from($download_from)
    {
        $this->_download_from = $download_from;
    }


    /**
     * sets the _permissions property used on the sideloaded file.
     *
     * @param int $permissions
     * @return void
     * @since 4.1.0
     */
    public function set_permissions($permissions)
    {
        $this->_permissions = $permissions;
    }


    /**
     * sets the _new_file_name property used on the sideloaded file.
     *
     * @param string $new_file_name
     * @return void
     * @since 4.1.0
     */
    public function set_new_file_name($new_file_name)
    {
        $this->_new_file_name = $new_file_name;
    }

    // getters


    /**
     * @return string
     * @since 4.1.0
     */
    public function get_upload_to()
    {
        return $this->_upload_to;
    }


    /**
     * @return string
     * @since 4.10.5.p
     */
    public function get_download_from()
    {
        return $this->_download_from;
    }


    /**
     * @return int
     * @since 4.1.0
     */
    public function get_permissions()
    {
        return $this->_permissions;
    }


    /**
     * @return string
     * @since 4.1.0
     */
    public function get_new_file_name()
    {
        return $this->_new_file_name;
    }


    // upload methods


    /**
     * Downloads the file using the WordPress HTTP API.
     *
     * @return bool
     * @since 4.1.0
     */
    public function sideload()
    {
        try {
            // setup temp dir
            $temp_file = wp_tempnam($this->_download_from);

            if (! $temp_file) {
                throw new RuntimeException(
                    esc_html__(
                        'Something went wrong with the upload.  Unable to create a tmp file for the uploaded file on the server',
                        'event_espresso'
                    )
                );
            }

            do_action('AHEE__EEH_Sideloader__sideload__before', $this, $temp_file);

            $wp_remote_args = apply_filters(
                'FHEE__EEH_Sideloader__sideload__wp_remote_args',
                ['timeout' => 500, 'stream' => true, 'filename' => $temp_file],
                $this,
                $temp_file
            );

            $response = wp_safe_remote_get($this->_download_from, $wp_remote_args);

            if ($this->isResponseError($response) || $this->isDownloadError($response) ) {
                EEH_File::delete($temp_file);
                return false;
            }

            // possible md5 check
            $content_md5 = wp_remote_retrieve_header($response, 'content-md5');
            if ($content_md5) {
                $md5_check = verify_file_md5($temp_file, $content_md5);
                if ($this->isResponseError($md5_check)) {
                    EEH_File::delete($temp_file);
                    return false;
                }
            }

            // now we have the file, let's get it in the right directory with the right name.
            $path  = apply_filters(
                'FHEE__EEH_Sideloader__sideload__new_path',
                $this->_upload_to . $this->_new_file_name,
                $this
            );
            if (! EEH_File::move($temp_file, $path, true)) {
                return false;
            }

            // set permissions
            $permissions = apply_filters(
                'FHEE__EEH_Sideloader__sideload__permissions_applied',
                $this->_permissions,
                $this
            );
            EEH_File::chmod($path, $permissions);

            // that's it.  let's allow for actions after file uploaded.
            do_action('AHEE__EE_Sideloader__sideload_after', $this, $path);
            return true;
        } catch(Exception $exception) {
            EE_Error::add_error($exception->getMessage(), __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
    }


    /**
     * returns TRUE if there IS an error, FALSE if there is NO ERROR
     *
     * @param array|WP_Error $response
     * @return bool
     * @throws RuntimeException
     */
    private function isResponseError($response)
    {
        if (! is_wp_error($response)) {
            return false;
        }
        if (defined('WP_DEBUG') && WP_DEBUG) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'The following error occurred while attempting to download the file from "%1$s":',
                        'event_espresso'
                    ),
                    $this->_download_from,
                    $response->get_error_message()
                )
            );
        }
        return true;
    }


    /**
     * returns TRUE if there IS an error, FALSE if there is NO ERROR
     *
     * @param array  $response
     * @return bool
     * @throws RuntimeException
     */
    private function isDownloadError(array $response)
    {
        $response_code = wp_remote_retrieve_response_code($response);
        if ($response_code === 200) {
            return false;
        }
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $msg = $response_code === 404
                ? esc_html__(
                    'Attempted to download a file from "%1$s" but encountered a "404 File Not Found" error.',
                    'event_espresso'
                )
                : esc_html__(
                    'Unable to download the file. Either the path given is incorrect, or something else happened. Here is the path given: %s',
                    'event_espresso'
                );
            throw new RuntimeException(sprintf($msg, $this->_download_from));
        }
        return true;
    }

    // deprecated

    /**
     * sets the _upload_from property to the location we should download the file from.
     *
     * @param string $upload_from The full path to the file we should sideload.
     * @return void
     * @deprecated since version 4.10.5.p
     */
    public function set_upload_from($upload_from)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            __(
                'EEH_Sideloader::set_upload_from was renamed to EEH_Sideloader::set_download_from',
                'event_espresso'
            ),
            '4.10.5.p'
        );
        $this->set_download_from($upload_from);
    }


    /**
     * @return string
     * @since      4.1.0
     * @deprecated since version 4.10.5.p
     */
    public function get_upload_from()
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            __(
                'EEH_Sideloader::get_upload_from was renamed to EEH_Sideloader::get_download_from',
                'event_espresso'
            ),
            '4.10.5.p'
        );
        return $this->_download_from;
    }
} //end EEH_Sideloader class
