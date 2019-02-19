<?php

/**
 * EE_File_Input
 *
 * For uploading a file
 * Note: if you will be using this in a form, make sure it uses `enctype="multipart/form-data"`, and that the request
 * data is `array_merge($_REQUEST, $_FILES)`.
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
     * @var
     */
    protected $allowed_mime_types;

    /**
     * @param array $options
     * @throws InvalidArgumentException
     */
    public function __construct($options = array())
    {
        if (isset($options['allowed_file_extensions'])) {
            if (!is_array($options['allowed_file_extensions'])) {
                throw new InvalidArgumentException(esc_html__('A valid allowed_file_extensions array was not provided to EE_File_Input', 'event_espresso'));
            }
            $this->allowed_file_extensions = $options['allowed_file_extensions'];
        } else {
            $this->allowed_file_extensions = ['csv'];
        }
        if (isset($options['allowed_mime_types'])) {
            if (!is_array($options['allowed_mime_types'])) {
                throw new InvalidArgumentException(esc_html__('A valid allowed_mime_types array was not provided to EE_File_Input', 'event_espresso'));
            }
            $this->allowed_mime_types = $options['allowed_file_extensions'];
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
//                array_merge(
//                    array_map(
//                        function ($mime_type) {
//                            if(strpos($mime_type, '/') === false) {
//                                return $mime_type . '/*';
//                            } else {
//                                return $mime_type;
//                            }
//
//                        },
//                        $this->allowed_mime_types
//                    )
                    array_map(
                        function ($file_extension) {
                            return  $file_extension;
                        },
                        $this->allowed_file_extensions
                    )
//                )
            )
            . '"'
        );
    }

    /**
     * Takes into account that $_FILES does a weird thing when you have hierarchical form names (eg `<input type="file"
     * name="my[hierarchical][form]">`): it leaves the top-level form part alone, but replaces the SECOND part with
     * "name", "size", "temp_file", etc. So that file's data is located at "my[name][hierarchical][form]",
     * "my[size][hierarchical][form]", "my[temp_name][hierarchical][form]", etc. It's really weird.
     * @since $VID:$
     * @param array $req_data
     * @return array|mixed|NULL
     * @throws EE_Error
     */
    public function find_form_data_for_this_section($req_data)
    {
        $name_parts = $this->getInputNameParts();
        // now get the value for the input
        $value = $this->findFileData($name_parts, $req_data);

        if (empty($value)) {
            $value = $this->findFileData($name_parts, $_FILES);
        }
        if (empty($value)) {
            array_shift($name_parts);
            // check if this thing's name is at the TOP level of the request data
            $value = $this->findFileData($name_parts, $req_data);
        }
        return $value;
    }

    /**
     * Look for the file's data in this request data.
     * @since $VID:$
     * @param $name_parts
     * @param $req_data
     * @return array
     */
    protected function findFileData($name_parts, $req_data)
    {
        $file_parts = [
            'name',
            'error',
            'size',
            'tmp_name',
            'type'
        ];
        $file_data = [];
        foreach($file_parts as $file_part){
            $datum = $this->findRequestForSectionUsingNameParts($this->getFileDataNameParts($name_parts, $file_part),$req_data);
            if(!empty($datum)) {
                $file_data[$file_part] = $datum;
            }
        }
        return $file_data;
    }

    /**
     * Finds the file name parts for the desired file data.
     * @since $VID:$
     * @param $original_name_parts
     * @param $file_data_sought
     * @return array
     */
    protected function getFileDataNameParts($original_name_parts, $file_data_sought){
        return
            array_merge(
                [
                    $original_name_parts[0],
                    $file_data_sought
                ],
            array_slice($original_name_parts, 1)
        );
    }
}
