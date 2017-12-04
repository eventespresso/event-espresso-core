<?php
namespace EventEspresso\core\services\notices;

/**
 * ConvertNoticesToJson
 * This notice converter converts notices to a json string.  The format is:
 *
 * {
 *      "error" : "Concatenated string of legacy error messages separated by <br /> This is a legacy format."
 *      "notices" : {
 *          "success" : [
 *              {
 *                  "type" : "success",
 *                  "identifier" : "identifier",
 *                  "message"  : "This entire object is the value of $notice->toArray()",
 *                  "route_match_config_identifier" : "string",
 *                  "capability" : "capability_string",
 *                  "context" : "context_string"
 *                  "dismissed" : false #bool
 *                  "file" : "file string",
 *                  "func" : "function name",
 *                  "line" : "line string for where the notice was triggered (manually set)"
 *              }
 *              {
 *                  ...
 *                  //each notice is its own object
 *              }
 *          ],
 *          "error" : [
 *              ...
                //same structure as success
 *          ],
 *          ...
 *          //same structure for the rest of the types
 *      }
 * }
 *
 * So any code receiving the json (typically js) can access the notices via:
 *
 * this.response.notices //all notices
 *
 * this.response.notices.error //all error notices
 *
 * this.response.notices.success[0].message //get the message string from the first success notice.
 *
 *
 *
 * @package EventEspresso\core\services\notices
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class ConvertNoticesToJson extends NoticeConverter
{

    /**
     * This processes incoming notices and returns them as an array formatted for a json response.
     * This does not echo or exit.  This only prepared unProcessed notices.  So any notices that have already been
     * processed on the request do not returned.
     *
     * @param array $notices
     * @param bool  $throw_exceptions (ignored for json conversion)
     * @return string
     */
    public function process(array $notices = array(), $throw_exceptions = false)
    {
        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $notices = empty($notices) ? $this->getNotices() : $notices;
        //for back compat, all notices will be assigned to the old concatentated 'errors' keyed index and we'll
        //only grab errors
        $json['errors'] = $this->transformNoticesForLegacyJson($notices);
        //now let's set notices to the new json format
        $json['notices'] = array();
        foreach ($notices as $notice) {
            if (! $notice instanceof NoticeInterface
                || ! $this->useNotice($notice)
            ) {
                continue;
            }
            $json['notices'][$notice->type()][] = $notice->toArray();
            $notice->setProcessed();
        }
        return wp_json_encode($json);
    }


    /**
     * Transforms error notices into the legacy format returned on json requests.
     * @param array $notices
     * @return string
     */
    private function transformNoticesForLegacyJson(array $notices)
    {
        $errors = array();
        foreach ($notices as $notice) {
            if (! $notice instanceof NoticeInterface
                || ! $this->useNotice($notice)
                || ! $notice->type() !== Notice::ERROR
            ) {
                continue;
            }
            $errors[] = $notice->message();
        }
        return implode('<br />', $errors);
    }


    /**
     * Return whether the notice can be used or not.
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
