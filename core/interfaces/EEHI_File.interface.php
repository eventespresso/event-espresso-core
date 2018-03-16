<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEHI_File
 */
interface EEHI_File
{

    /**
     * ensure_file_exists_and_is_writable
     * ensures that a file exists and is writable, will attempt to create file if it does not exist
     *
     * @param string $full_file_path
     * @throws EE_Error
     * @return bool
     */
    public static function ensure_file_exists_and_is_writable($full_file_path = '');



    /**
     * ensure_folder_exists_and_is_writable
     * ensures that a folder exists and is writable, will attempt to create folder if it does not exist
     *
     * @param string $folder
     * @throws EE_Error
     * @return bool
     */
    public static function ensure_folder_exists_and_is_writable($folder = '');
}
// End of file EEHI_File.interface.php
// Location: core/interfaces/EEHI_File.interface.php