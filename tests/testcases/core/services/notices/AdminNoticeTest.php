<?php

use EventEspresso\core\services\notices\Notice;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class AdminNoticeTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\notices
 * @author  Brent Christensen
 * @since   $VID:$
 * @group   Notices
 */
class AdminNoticeTest extends EE_UnitTestCase
{

    /**
     * @param        $type
     * @param string $notice
     * @param bool   $dismissible
     * @return Notice
     */
    private function createNotice($type, $notice = 'message', $dismissible = true)
    {
        $error_details = $this->extraErrorDetails();
        return new Notice(
            $type,
            $notice,
            $dismissible,
            $error_details->file,
            $error_details->func,
            $error_details->line
        );
    }


    public function noticeDetails()
    {
        return array(
            (object)array(
                'type'        => Notice::ERROR,
                'class'       => 'error',
                'message'     => 'this is an error message',
                'dismissible' => false,
            ),
            (object)array(
                'type'        => Notice::ERROR,
                'class'       => 'error',
                'message'     => 'this is a dismissible error message',
                'dismissible' => true,
            ),
            (object)array(
                'type'        => Notice::SUCCESS,
                'class'       => 'success',
                'message'     => 'this is a success message',
                'dismissible' => false,
            ),
            (object)array(
                'type'        => Notice::SUCCESS,
                'class'       => 'success',
                'message'     => 'this is a dismissible success message',
                'dismissible' => true,
            ),
            (object)array(
                'type'        => Notice::ATTENTION,
                'class'       => 'warning',
                'message'     => 'this is an attention message',
                'dismissible' => false,
            ),
            (object)array(
                'type'        => Notice::ATTENTION,
                'class'       => 'warning',
                'message'     => 'this is a dismissible attention message',
                'dismissible' => true,
            ),
            (object)array(
                'type'        => Notice::INFORMATION,
                'class'       => 'info',
                'message'     => 'this is an information message',
                'dismissible' => false,
            ),
            (object)array(
                'type'        => Notice::INFORMATION,
                'class'       => 'info',
                'message'     => 'this is a dismissible information message',
                'dismissible' => true,
            ),
        );
    }


    public function extraErrorDetails()
    {
        return (object)array(
            'file' => 'path/to/file.php',
            'func' => 'function',
            'line' => 123,
        );
    }


    public function testGetNotice()
    {
        $all_notice_details = $this->noticeDetails();
        foreach ($all_notice_details as $notice_details) {
            $admin_notice = new \EventEspresso\core\services\notices\AdminNotice(
                $this->createNotice(
                    $notice_details->type,
                    $notice_details->message,
                    $notice_details->dismissible
                )
            );
            $this->assertEquals(
                $this->noticeHtml(
                    $notice_details->type,
                    $notice_details->message,
                    $notice_details->dismissible,
                    $notice_details->class
                ),
                $admin_notice->getNotice()
            );
        }
    }


    private function noticeHtml($type, $message, $dismissible, $class)
    {
        $notice = '<div class="notice notice-';
        $notice .= $class;
        $notice .= $dismissible ? ' is-dismissible' : '';
        $notice .= ' event-espresso-admin-notice"><p>';
        $notice .= $message;
        if ($type === Notice::ERROR) {
            $notice .= '<br/><span class="tiny-text">file - function - 123</span>';
        }
        $notice .= '</p>';
        $notice .= '</div>';
        return $notice;
    }


}
// Location: tests/testcases/core/services/notices/AdminNoticeTest.php
