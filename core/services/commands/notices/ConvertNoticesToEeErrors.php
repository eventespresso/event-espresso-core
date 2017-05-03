<?php

namespace EventEspresso\core\services\commands\notices;

use EE_Error;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ConvertNoticesToEeErrors
 * Converts notifications in a CommandHandlerNotices into EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ConvertNoticesToEeErrors extends ConvertNotices
{



    /**
     * Converts CommandHandlerNotice objects into EE_Error notifications
     *
     * @throws EE_Error
     */
    public function process()
    {
        // \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        if ($this->getNotices()->hasAttention()) {
            foreach ($this->getNotices()->getAttention() as $notice) {
                // \EEH_Debug_Tools::printr($notice->message(), $notice->type(), __FILE__, __LINE__);
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
                // \EEH_Debug_Tools::printr($notice->message(), $notice->type(), __FILE__, __LINE__);
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
                // \EEH_Debug_Tools::printr($notice->message(), $notice->type(), __FILE__, __LINE__);
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
