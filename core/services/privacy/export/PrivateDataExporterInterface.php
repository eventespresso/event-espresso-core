<?php

namespace EventEspresso\core\services\privacy\policy;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class PrivateDataExporterInterface
 * Interfacing for classes that add data to the private data export (see https://core.trac.wordpress.org/ticket/43546).
 * PrivateDataExporterManager takes care of registering these classes as exporters, and WordPress will call them when
 * a request to export data is invoked.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
interface PrivateDataExporterInterface
{
    /**
     * Returns data for export.
     * @param string $email_address,
     * @param int $page starts at 1, not 0
     * @return array {
     * @type array      $data        {
     * @type array {
     * @type string     $group_id    (not translated, same for all exports)
     * @type string     $group_label (translated string)
     * @type string|int $item_id
     * @type array      $data        {
     * @type array {
     * @type string     $name what's shown in the left-column of the export row
     * @type string     $value what's showin the right-column of the export row
     * }
     * }
     * }
     * }
     * }
     */
    public function export($email_address, $page =1);


}
// End of file PrivateDataExporterInterface.php
// Location: EventEspresso\core\domain\services\admin/PrivateDataExporterInterface.php