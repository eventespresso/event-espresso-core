<?php

namespace EventEspresso\core\services\notices;

use EE_Error;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ConvertNoticesToEeErrors
 * Converts notifications in a NoticesContainer into EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ConvertNoticesToEeErrors extends NoticeConverter
{

    /**
     * Converts Notice objects into EE_Error notifications
     *
     * @throws EE_Error
     */
    public function process()
    {
        if ($this->getNotices()->hasAttention()) {
            foreach ($this->getNotices()->getAttention() as $notice) {
                EE_Error::add_attention(
                    $notice->message(),
                    $notice->file(),
                    $notice->func(),
                    $notice->line()
                );
            }
        }
        if ($this->getNotices()->hasError()) {
            $error_string = esc_html__('The following errors occurred:', 'event_espresso');
            foreach ($this->getNotices()->getError() as $notice) {
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
        if ($this->getNotices()->hasSuccess()) {
            foreach ($this->getNotices()->getSuccess() as $notice) {
                EE_Error::add_success(
                    $notice->message(),
                    $notice->file(),
                    $notice->func(),
                    $notice->line()
                );
            }
        }
    }


}
