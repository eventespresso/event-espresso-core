<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package            Event Espresso
 * @ author             Event Espresso
 * @ copyright      (c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license            https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                   http://www.eventespresso.com
 *
 *
 * ------------------------------------------------------------------------
 *
 * class EE_DMS_4_6_0_invoice_settings
 *
 * @package         Event Espresso
 * @subpackage      /core/data_migration_scripts/4_3_0_stages/
 * @author              Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_DMS_4_6_0_invoice_settings extends EE_Data_Migration_Script_Stage
{
    /**
     * Just initializes the status of the migration
     */
    public function __construct()
    {
        $this->_pretty_name = esc_html__('Update Invoice Settings', 'event_espresso');
        parent::__construct();
    }



    /**
     * _count_records_to_migrate
     * Counts the records to migrate; the public version may cache it
     *
     * @access protected
     * @return int
     */
    protected function _count_records_to_migrate()
    {
        return 1;
    }



    /**
     *    _migration_step
     *
     * @access protected
     * @param int $num_items
     * @throws EE_Error
     * @return int number of items ACTUALLY migrated
     * @throws InvalidDataTypeException
     */
    protected function _migration_step($num_items = 1)
    {

        $templates_relative_path = 'modules/gateways/Invoice/lib/templates/';
        $overridden_invoice_body = EEH_Template::locate_template($templates_relative_path . 'invoice_body.template.php', null, false, false, true);
        $overridden_receipt_body = EEH_Template::locate_template($templates_relative_path . 'receipt_body.template.php', null, false, false, true);
        if ($overridden_invoice_body || $overridden_receipt_body) {
            new PersistentAdminNotice(
                'invoice_overriding_templates',
                esc_html__(
                    'Note: in this version of Event Espresso, PDF and HTML Invoices and Receipts are now Messages and can be changed just like any other messages; however we noticed you had previously overridden the old default Invoice/Receipt templates. Because of this, your old Invoice/Receipt templates will continue to be used INSTEAD of the new Invoice/Receipt message equivalents (but this will be removed in an upcoming version). We recommend deleting your old Invoice/Receipt templates and using the new messages system. Then modify the new Invoice and Receipt messages\'s content in Messages -> Invoice and Messages -> Receipt.',
                    'event_espresso'
                ),
                true
            );
        }

        // regardless of whether it worked or not, we ought to continue the migration
        $this->set_completed();
        return 1;
    }
}
