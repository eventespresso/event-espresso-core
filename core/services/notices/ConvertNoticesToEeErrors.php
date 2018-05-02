<?php

namespace EventEspresso\core\services\notices;

use EE_Error;

/**
 * Class ConvertNoticesToEeErrors
 * Converts notifications in a NoticesContainer into EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class ConvertNoticesToEeErrors extends NoticeConverter
{

    /**
     * Converts Notice objects into EE_Error notifications
     *
     * @param NoticesContainerInterface $notices
     * @throws EE_Error
     */
    public function process(NoticesContainerInterface $notices)
    {
        $this->setNotices($notices);
        $notices = $this->getNotices();
        if ($notices->hasAttention()) {
            foreach ($notices->getAttention() as $notice) {
                EE_Error::add_attention(
                    $notice->message(),
                    $notice->file(),
                    $notice->func(),
                    $notice->line()
                );
            }
        }
        if ($notices->hasError()) {
            $error_string = esc_html__('The following errors occurred:', 'event_espresso');
            foreach ($notices->getError() as $notice) {
                if ($this->getThrowExceptions()) {
                    $error_string .= '<br />' . $notice->message();
                } else {
                    EE_Error::add_error(
                        $notice->message(),
                        $notice->file(),
                        $notice->func(),
                        $notice->line()
                    );
                }
            }
            if ($this->getThrowExceptions()) {
                throw new EE_Error($error_string);
            }
        }
        if ($notices->hasSuccess()) {
            foreach ($notices->getSuccess() as $notice) {
                EE_Error::add_success(
                    $notice->message(),
                    $notice->file(),
                    $notice->func(),
                    $notice->line()
                );
            }
        }
        $this->clearNotices();
    }
}
