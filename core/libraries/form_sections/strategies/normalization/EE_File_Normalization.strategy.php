<?php

use EventEspresso\core\entities\forms\UploadedFile;

/**
 * EE_File_Normalization
 * Takes the input from $_FILES and creates an UploadedFile object.
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_File_Normalization extends EE_Normalization_Strategy_Base
{

    /**
     * Convert the $_FILES inputted data into a well-defined object.
     * @param string $value_to_normalize
     * @return UploadedFile
     */
    public function normalize($value_to_normalize)
    {
        if (is_array($value_to_normalize)) {
            return new UploadedFile($value_to_normalize);
        } elseif( $value_to_normalize instanceof UploadedFile){
            return $value_to_normalize;
        } else {
            throw new EE_Validation_Error(
                esc_html__('The file input has an inavlid format.', 'event_espresso')
            );
        }
    }


    /**
     * Convert the object back into a string of the filename.
     *
     * @param string $normalized_value
     * @return string
     */
    public function unnormalize($normalized_value)
    {
        if ($normalized_value instanceof UploadedFile) {
            // Leave it as the object, it can be treated like a string because it
            // overrides __toString()
            return $normalized_value;
        } elseif (is_array($normalized_value)) {
            return new UploadedFile($normalized_value);
        } else {
            return (string) $normalized_value;
        }
    }
}