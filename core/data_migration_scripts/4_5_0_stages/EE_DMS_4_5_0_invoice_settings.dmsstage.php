<?php use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * class EE_DMS_4_5_0_invoice_settings
 * The purpose of this DMS is to migrate the 4.4-style invoice settings
 * to their 4.5-style equivalent, both of which are stored on the gateway config object
 *
 * @package         Event Espresso
 * @subpackage      /core/data_migration_scripts/4_3_0_stages/
 * @author              Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_DMS_4_5_0_invoice_settings extends EE_Data_Migration_Script_Stage
{

    /**
     * Just initializes the status of the migration
     */
    public function __construct()
    {
        $this->_pretty_name = __('Update Invoice Gateway Settings', 'event_espresso');
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
        // if this isn't set then something is really wrong
        if (! EE_Config::instance()->gateway instanceof EE_Gateway_Config) {
            throw new EE_Error(__('It appears the Event Espresso Core Configuration is not setup correctly.', 'event_espresso'));
        }
        $invoice_settings = isset(EE_Config::instance()->gateway->payment_settings['Invoice']) ? EE_Config::instance()->gateway->payment_settings['Invoice'] : null;
        if (! $invoice_settings) {
            $this->add_error(__('Could not migrate EE4.4 invoice settings to EE4.5 because they didnt exist', 'event_espresso'));
        } else {
            $invoice_settings['template_payment_instructions'] = $invoice_settings['pdf_instructions'];
            $invoice_settings['template_invoice_payee_name'] = $invoice_settings['payable_to'];
            $invoice_settings['template_invoice_address'] = $invoice_settings['payment_address'];
            $invoice_settings['template_invoice_email'] = '';
            $invoice_settings['template_invoice_tax_number'] = '';
            unset($invoice_settings['pdf_instructions']);
            unset($invoice_settings['payable_to']);
            unset($invoice_settings['payment_address']);
            EE_Config::instance()->gateway->payment_settings['Invoice'] = $invoice_settings;
            EE_Config::instance()->update_espresso_config(false, false);

            // @todo: check 'invoice_css' too because we can't easily affect that so we might need to set a persistent notice
            // (why is it tough to change? because we want to update the receipt and invoice message template, but
            // message templates are only initialized AFTER migrations and those two are new in 4.5. So if we wanted to
            // update them from a DMS, we'd need to have the DMS create the message templates which is quite a lot of code;
            // also we don't want to build a dependency on the messages code because it is likely to change soon
            if (! in_array($invoice_settings['invoice_css'], array( '', 'simple.css' ))) {
                new PersistentAdminNotice(
                    'invoice_css_not_updated',
                    sprintf(
                        esc_html__(
                            'You had previously set your Invoice Payment Method\'s stylesheet to be %1$s, but that setting has moved. PDF and HTML Invoices and Receipts are now Messages, which means you can easily modify them from your Wordpress Dashboard instead of using filters or uploading template files. Please visit Messages -> Receipt and Messages -> Invoice to change their stylesheets.',
                            'event_espresso'
                        ),
                        $invoice_settings['invoice_css']
                    )
                );
            }
            $templates_relative_path = 'modules/gateways/Invoice/lib/templates/';
            $overridden_invoice_body = EEH_Template::locate_template($templates_relative_path . 'invoice_body.template.php', null, false, false, true);
            $overridden_receipt_body= EEH_Template::locate_template($templates_relative_path . 'receipt_body.template.php', null, false, false, true);
            if ($overridden_invoice_body || $overridden_receipt_body) {
                new PersistentAdminNotice(
                    'invoice_overriding_templates',
                    esc_html__(
                        'Note: in this version of Event Espresso, PDF and HTML Invoices and Receipts are now Messages and can be changed just like any other messages; however we noticed you had previously overridden the old default Invoice/Receipt templates. Because of this, your old Invoice/Receipt templates will continue to be used INSTEAD of the new Invoice/Receipt message equivalents. We recommend deleting your old Invoice/Receipt templates and modifying the new Invoice and Receipt messages\'s content in Messages -> Invoice and Messages -> Receipt.',
                        'event_espresso'
                    ),
                    true
                );
            }
        }
        // regardless of whether it worked or not, we ought to continue the migration
        $this->set_completed();
        return 1;
    }
}
