<?php

/**
 * EEH_Sideloader
 *
 * This is a helper utility class that provides sideloading functionality.
 * Sideloading simply refers to retrieving files hosted elsewhere
 * (usually GitHub) that are downloaded into EE.
 *
 * @package     Event Espresso
 * @subpackage  /helpers/EEH_Sideloader.helper.php
 * @author      Darren Ethier
 */
class EEH_Sideloader extends EEH_Base
{

    /**
     * @since   4.10.5.p
     * @var     string
     */
    private string $download_url = '';

    /**
     * @since   4.1.0
     * @var     string
     */
    private string $upload_path = '';

    /**
     * @since   4.1.0
     * @var     int
     */
    private int $permissions = 0644;

    /**
     * @since   4.1.0
     * @var     string
     */
    private string $new_file_name = '';


    /**
     * constructor allows the user to set the properties on the side loader on construction.
     * However, there are also setters for doing so.
     *
     * @param array $props array fo initializing the side loader if keys match the properties.
     * @since 4.1.0
     */
    public function __construct(array $props = [])
    {
        // make sure we include the required wp file for necessary functions
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        if (! empty($props)) {
            $this->initialize($props);
        }
    }


    /**
     * sets the properties for class either to defaults or using incoming initialization array
     *
     * @param array $props values passed to setters
     * @return void
     * @since 4.1.0
     */
    public function initialize(array $props)
    {
        $props = $this->convertOldProps($props);
        // set defaults
        $props += [
            'download_url'  => '',
            'upload_path'   => EVENT_ESPRESSO_UPLOAD_DIR,
            'new_file_name' => 'EE_Sideloader_' . uniqid() . '.default',
            'permissions'   => 0644,
        ];

        $this->setUploadPath($props['upload_path']);
        $this->setDownloadUrl($props['download_url']);
        $this->setPermissions($props['permissions']);
        $this->setNewFileName($props['new_file_name']);
    }


    private function convertOldProps(array $props): array
    {
        // keys are old property names, values are new property names
        $prop_mapping = [
            '_upload_to'     => 'upload_path',
            '_download_from' => 'download_url',
            '_permissions'   => 'permissions',
            '_new_file_name' => 'new_file_name',
        ];
        foreach ($prop_mapping as $old_key => $new_key) {
            if (isset($props[ $old_key ])) {
                $props[ $new_key ] = $props[ $old_key ];
                unset($props[ $old_key ]);
            }
        }
        return $props;
    }


    // utilities


    /**
     * @return string
     * @since 4.1.0
     * @depecated 5.0.42
     */
    private function getWpUploadsDir(): string
    {
        $uploads = wp_upload_dir();
        return $uploads['basedir'];
    }

    // setters


    /**
     * sets the _upload_to property to the directory to upload to.
     *
     * @param string $upload_folder
     * @return void
     * @since 4.1.0
     */
    public function setUploadPath(string $upload_folder): void
    {
        $this->upload_path = trailingslashit($upload_folder);
    }


    /**
     * sets the download_url property to the location we should download the file from.
     *
     * @param string $download_url The full path to the file we should side-load.
     * @return void
     * @since 4.10.5.p
     */
    public function setDownloadUrl(string $download_url): void
    {
        $this->download_url = $download_url;
    }


    /**
     * sets the _permissions property used on the side-loaded file.
     *
     * @param int|string $permissions
     * @return void
     * @since 4.1.0
     */
    public function setPermissions($permissions = 0644): void
    {
        $this->permissions = intval($permissions, 8);
    }


    /**
     * sets the _new_file_name property used on the side-loaded file.
     *
     * @param string $new_file_name
     * @return void
     * @since 4.1.0
     */
    public function setNewFileName(string $new_file_name): void
    {
        $this->new_file_name = $new_file_name;
    }

    // getters


    /**
     * @return string
     * @since 4.1.0
     */
    public function uploadPath(): string
    {
        return $this->upload_path;
    }


    /**
     * @return string
     * @since 4.10.5.p
     */
    public function downloadUrl(): string
    {
        return $this->download_url;
    }


    /**
     * @return int
     * @since 4.1.0
     */
    public function permissions(): int
    {
        return $this->permissions;
    }


    /**
     * @return string
     * @since 4.1.0
     */
    public function newFileName(): string
    {
        return $this->new_file_name;
    }


    // upload methods


    /**
     * Downloads the file using the WordPress HTTP API.
     *
     * @return bool
     * @since 4.1.0
     */
    public function sideload(): bool
    {
        try {
            // setup temp dir
            $temp_file = wp_tempnam($this->download_url);

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

            $response = wp_safe_remote_get($this->download_url, $wp_remote_args);

            if ($this->isResponseError($response) || $this->isDownloadError($response)) {
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
            $path = apply_filters(
                'FHEE__EEH_Sideloader__sideload__new_path',
                $this->upload_path . $this->new_file_name,
                $this
            );
            if (! EEH_File::move($temp_file, $path, true)) {
                return false;
            }

            // set permissions
            $permissions = apply_filters(
                'FHEE__EEH_Sideloader__sideload__permissions_applied',
                $this->permissions,
                $this
            );
            $permissions = intval($permissions, 8);
            // verify permissions are an integer but don't actually modify the value
            if (! absint($permissions)) {
                EE_Error::add_error(
                    esc_html__('Supplied permissions are invalid', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
            EEH_File::chmod($path, $permissions);

            // that's it.  let's allow for actions after file uploaded.
            do_action('AHEE__EE_Sideloader__sideload_after', $this, $path);
            return true;
        } catch (Exception $exception) {
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
    private function isResponseError($response): bool
    {
        if (! is_wp_error($response)) {
            return false;
        }
        if (defined('WP_DEBUG') && WP_DEBUG) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The following error occurred while attempting to download the file from "%1$s":',
                        'event_espresso'
                    ),
                    $this->download_url,
                    $response->get_error_message()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return true;
    }


    /**
     * returns TRUE if there IS an error, FALSE if there is NO ERROR
     *
     * @param array $response
     * @return bool
     * @throws RuntimeException
     */
    private function isDownloadError(array $response): bool
    {
        $response_code = wp_remote_retrieve_response_code($response);
        if ($response_code === 200) {
            return false;
        }
        if (defined('WP_DEBUG') && WP_DEBUG && ! defined('EE_TESTS_DIR')) {
            if ($response_code === 404) {
                EE_Error::add_attention(
                    sprintf(
                        esc_html__(
                            'Attempted to download a file from "%1$s" but encountered a "404 File Not Found" error.',
                            'event_espresso'
                        ),
                        $this->download_url
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            } else {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'Unable to download the file. Either the path given is incorrect, or something else happened. Here is the path given: %s',
                            'event_espresso'
                        ),
                        $this->download_url
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        return true;
    }


    /**
     * @depecated 5.0.42
     * @return string
     */
    public function get_download_from(): string
    {
        return $this->downloadUrl();
    }


    /**
     *
     * @param string $download_url The full path to the file we should side-load.
     * @return void
     * @depecated 5.0.42
     */
    public function set_download_from(string $download_url): void
    {
        $this->setDownloadUrl($download_url);
    }


    /**
     * @return string
     * @depecated 5.0.42
     */
    public function get_upload_to(): string
    {
        return $this->uploadPath();
    }


    /**
     * @param string $upload_folder
     * @return void
     * @depecated 5.0.42
     */
    public function set_upload_to(string $upload_folder): void
    {
        $this->setUploadPath($upload_folder);
    }


    /**
     * @return int
     * @depecated 5.0.42
     */
    public function get_permissions(): int
    {
        return $this->permissions();
    }


    /**
     * @param int|string $permissions
     * @return void
     * @depecated 5.0.42
     */
    public function set_permissions($permissions): void
    {
        $this->setPermissions($permissions);
    }


    /**
     * @return string
     * @depecated 5.0.42
     */
    public function get_new_file_name(): string
    {
        return $this->newFileName();
    }


    /**
     * @param string $new_file_name
     * @return void
     * @depecated 5.0.42
     */
    public function set_new_file_name(string $new_file_name): void
    {
        $this->setNewFileName($new_file_name);
    }
}
