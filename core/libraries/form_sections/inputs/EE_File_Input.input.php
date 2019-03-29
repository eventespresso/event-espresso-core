<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\files\FileSubmissionInterface;

/**
 * EE_File_Input
 *
 * For uploading a file
 * Note: if you will be using this in a form, make sure it uses `enctype="multipart/form-data"`.
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * This input has a default validation strategy of plaintext (which can be removed after construction)
 */
class EE_File_Input extends EE_Form_Input_Base
{
    /**
     * @var array
     */
    protected $allowed_file_extensions;

    /**
     * @var array
     */
    protected $allowed_mime_types;

    /**
     * @param array $options
     * @throws InvalidArgumentException
     */
    public function __construct($options = array())
    {
        if (isset($options['allowed_file_extensions'])) {
            $this->allowed_file_extensions = (array) $options['allowed_file_extensions'];
        } else {
            $this->allowed_file_extensions = ['csv'];
        }
        if (isset($options['allowed_mime_types'])) {
            $this->allowed_mime_types = (array) $options['allowed_file_extensions'];
        } else {
            $this->allowed_mime_types = ['text/csv'];
        }

        $this->_set_display_strategy(new EE_File_Input_Display_Strategy());
        $this->_set_normalization_strategy(new EE_File_Normalization());
        $this->add_validation_strategy(
            new EE_Text_Validation_Strategy(
                sprintf(
                    // translators: %1$s is a list of allowed file extensions.
                    esc_html__('Please provide a file of the requested filetype: %1$s', 'event_espresso'),
                    implode(', ', $this->allowed_file_extensions)
                ),
                '~.*\.(' . implode('|', $this->allowed_file_extensions) . ')$~'
            )
        );
        parent::__construct($options);

//        It would be great to add this HTML attribute, but jQuery validate chokes on it.
        $this->set_other_html_attributes(
            $this->other_html_attributes()
            . ' extension="'
            . implode(
                ',',
                array_map(
                    function ($file_extension) {
                        return  $file_extension;
                    },
                    $this->allowed_file_extensions
                )
            )
            . '"'
        );
    }

    /**
     * $_FILES has a really weird structure. So we let `FilesDataHandler` take care of finding the file info for
     * this input.
     * @since $VID:$
     * @param array $req_data
     * @return FileSubmissionInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function find_form_data_for_this_section($req_data)
    {
        // ignore $req_data. Files are in the files data handler.
        $fileDataHandler = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\request\files\FilesDataHandler'
        );
        return $fileDataHandler->getFileObject($this->html_name());
    }

    /**
     * Don't transform the file submission object into a string, thanks.
     *
     * @param string $value
     * @return null|string
     */
    protected function _sanitize($value)
    {
        return $value;
    }
}
