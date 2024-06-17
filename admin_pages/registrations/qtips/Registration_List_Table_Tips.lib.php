<?php

use EventEspresso\core\domain\services\registration\RegStatus;

/**
 * Registration_List_Table_Tips
 *
 * Qtip config for the event editor.
 *
 * @package         Event Espresso
 * @subpackage      /admin_pages/registrations/qtips/Registration_List_Table_Tips.lib.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_List_Table_Tips extends EE_Qtip_Config
{
    protected function _set_tips_array()
    {
        $this->_qtipsa = array(
            0 => array(
                'content_id' => 'registration-trash-lock',
                'target'     => '.ee-lock-icon',
                'content'    => $this->_registration_trash_message(),
            ),
            /** removing status strips for now because they are triggered anywhere on the row. */
            /**1 => array(
             * 'content_id' => 'registration-status-' . RegStatus::APPROVED,
             * 'target' => '.reg-status-' . RegStatus::APPROVED,
             * 'content' => $this->_registration_status_legend(RegStatus::APPROVED),
             * 'options' => array(
             * 'position' => array(
             * 'target' => 'mouse'
             * )
             * )
             * ),
             * 2 => array(
             * 'content_id' => 'registration-status-' . RegStatus::PENDING_PAYMENT,
             * 'target' => '.reg-status-' . RegStatus::PENDING_PAYMENT,
             * 'content' => $this->_registration_status_legend(RegStatus::PENDING_PAYMENT),
             * 'options' => array(
             * 'position' => array(
             * 'target' => 'mouse'
             * )
             * )
             * ),
             * 3 => array(
             * 'content_id' => 'registration-status-' . RegStatus::AWAITING_REVIEW,
             * 'target' => '.reg-status-' . RegStatus::AWAITING_REVIEW,
             * 'content' => $this->_registration_status_legend(RegStatus::AWAITING_REVIEW),
             * 'options' => array(
             * 'position' => array(
             * 'target' => 'mouse'
             * )
             * )
             * ),
             * 4 => array(
             * 'content_id' => 'registration-status-' . RegStatus::DECLINED,
             * 'target' => '.reg-status-' . RegStatus::DECLINED,
             * 'content' => $this->_registration_status_legend(RegStatus::DECLINED),
             * 'options' => array(
             * 'position' => array(
             * 'target' => 'mouse'
             * )
             * )
             * ),
             * 5 => array(
             * 'content_id' => 'registration-status-' . RegStatus::CANCELLED,
             * 'target' => '.reg-status-' . RegStatus::CANCELLED,
             * 'content' => $this->_registration_status_legend(RegStatus::CANCELLED),
             * 'options' => array(
             * 'position' => array(
             * 'target' => 'mouse'
             * )
             * )
             * )/**/
        );
    }


    private function _registration_trash_message()
    {
        return '<p>'
               . esc_html__(
                   'This lock-icon means that this registration cannot be trashed.  Registrations that belong to a transaction that has payments cannot be trashed.  If you wish to trash this registration then you must delete all payments attached to the related transaction first.',
                   'event_espresso'
               ) . '</p>';
    }


    /**
     * output the relevant ee-status-legend with the designated status highlighted.
     *
     * @param  EEM_Registration constant $status What status is set (by class)
     * @return string         The status legend with the related status highlighted
     */
    private function _registration_status_legend($status)
    {

        $status_array = array(
            'approved_status' => RegStatus::APPROVED,
            'pending_status' => RegStatus::PENDING_PAYMENT,
            'not_approved' => RegStatus::AWAITING_REVIEW,
            'declined_status' => RegStatus::DECLINED,
            'cancelled_status' => RegStatus::CANCELLED,
        );

        return EEH_Template::status_legend($status_array, $status);
    }
}
