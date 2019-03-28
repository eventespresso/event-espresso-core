<?php

use EventEspresso\core\services\request\files\FileSubmissionInterface;

/**
 * EE_File_Normalization
 * Takes the input from $_FILES and creates an FileSubmissionInterface object.
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_File_Normalization extends EE_Normalization_Strategy_Base
{

    /**
     * Keep in mind $value_to_normalize should be a FileSubmissionInterface or null, so this shouldn't really do
     * much (other than NOT convert it to a string or something).
     * @param string $value_to_normalize
     * @return FileSubmissionInterface
     */
    public function normalize($value_to_normalize)
    {
        if ($value_to_normalize instanceof FileSubmissionInterface || is_null($value_to_normalize)) {
            return $value_to_normalize;
        } else {
            throw new EE_Validation_Error(
                esc_html__('The file input has an inavlid format.', 'event_espresso')
            );
        }
    }


    /**
     * This may be called prematurely on submitted data, so we actually don't want to convert it into a string because
     * we'll lose all the FileSubmissionInterface data. So prefer to leave it alone. FileSubmissionInterface
     * can be cast to a string just fine so it's good as-is.
     *
     * @param string $normalized_value
     * @return string
     */
    public function unnormalize($normalized_value)
    {
        if ($normalized_value instanceof FileSubmissionInterface || is_null($normalized_value)) {
            // Leave it as the object, it can be treated like a string because it
            // overrides __toString()
            return $normalized_value;
        } else {
            return (string) $normalized_value;
        }
    }
}
