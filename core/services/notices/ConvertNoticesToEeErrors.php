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
 * @since         4.9.53.rc
 */
class ConvertNoticesToEeErrors extends NoticeConverter
{

    /**
     * Converts Notice objects into EE_Error notifications
     * This converter only allows notices to be processed once in a request.  So any notices that have already been
     * processed won't be processed.
     *
     * @param array $notices
     * @param bool  $throw_exceptions
     * @throws EE_Error
     */
    public function process(array $notices = array(), $throw_exceptions = false)
    {
        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $notices = empty($notices) ? $this->getNotices() : $notices;
        $error_string = '';
        foreach ($notices as $notice) {
            if (! $notice instanceof NoticeInterface
                || ! $this->useNotice($notice)
            ) {
                continue;
            }
            switch ($notice->type()) {
                case Notice::SUCCESS:
                    EE_Error::add_success(
                        $notice->message(),
                        $notice->file(),
                        $notice->func(),
                        $notice->line()
                    );
                    break;
                case Notice::ATTENTION:
                    EE_Error::add_attention(
                        $notice->message(),
                        $notice->file(),
                        $notice->func(),
                        $notice->line()
                    );
                    break;
                case Notice::ERROR:
                    if ($throw_exceptions) {
                        $error_string .= '<br />' . $notice->message();
                    } else {
                        EE_Error::add_error(
                            $notice->message(),
                            $notice->file(),
                            $notice->func(),
                            $notice->line()
                        );
                    }
                    break;
                default:
                    //no matches so let's just continue the loop (2 because we want to continue the foreach loop)
                    continue 2;
                    break;
            }
            $notice->setProcessed();
        }
        if ($throw_exceptions && ! empty($error_string)) {
            throw new EE_Error(esc_html__('The following errors occurred:', 'event_espresso') . $error_string);
        }
    }


    /**
     * @param NoticeInterface $notice
     * @return bool
     */
    public function useNotice(NoticeInterface $notice)
    {
        return $this->canUseByCapability($notice)
               && ! $notice->isDismissed()
               && ! $notice->isProcessed();
    }
}
