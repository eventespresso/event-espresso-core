<?php

namespace EventEspresso\core\services\notices;

use DomainException;

/**
 * Class ConvertNoticesToAdminNotices
 * Converts notifications in a NoticesContainer into AdminNotice notifications
 *
 * @package EventEspresso\core\services\notices
 * @author  Brent Christensen
 */
class ConvertNoticesToAdminNotices extends NoticeConverter
{

    /**
     * Converts Notice objects into AdminNotice notifications
     *
     * @param NoticesContainerInterface $notices
     * @throws DomainException
     */
    public function process(NoticesContainerInterface $notices)
    {
        if ($notices->hasAttention()) {
            foreach ($notices->getAttention() as $notice) {
                new AdminNotice($notice);
            }
        }
        if ($notices->hasError()) {
            $error_string = esc_html__('The following errors occurred:', 'event_espresso');
            foreach ($notices->getError() as $notice) {
                if ($this->getThrowExceptions()) {
                    $error_string .= '<br />' . $notice->message();
                } else {
                    new AdminNotice($notice);
                }
            }
            if ($this->getThrowExceptions()) {
                throw new DomainException($error_string);
            }
        }
        if ($notices->hasSuccess()) {
            foreach ($notices->getSuccess() as $notice) {
                new AdminNotice($notice);
            }
        }
        if ($notices->hasInformation()) {
            foreach ($notices->getInformation() as $notice) {
                new AdminNotice($notice);
            }
        }
        $this->clearNotices();
    }
}
