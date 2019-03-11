<?php

namespace EventEspresso\core\services\request\files;

use finfo;
use InvalidArgumentException;

/**
 * Class FileSubmission
 *
 * All the info about a file from $_FILES (except we determine mimetype ourselves, because what's in $_FILES isn't
 * reliable), but put together onto one object with a few helpers.
 * FilesDataHandler takes care of creating these from $_FILES.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class FileSubmission implements FileSubmissionInterface
{
    /**
     * @var string original name on the client machine
     */
    protected $name;

    /**
     * @var string mime type
     */
    protected $type;

    /**
     * @var string file extension
     */
    protected $extension;

    /**
     * @var int in bytes
     */
    protected $size;

    /**
     * @var string local filepath to the temporary file
     */
    protected $tmp_file;

    /**
     * @var int one of UPLOAD_ERR_OK, UPLOAD_ERR_NO_FILE, UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE or other values
     * although those aren't expected.
     */
    protected $error_code;

    /**
     * FileSubmission constructor.
     * @param $name
     * @param $tmp_file
     * @param $size
     * @param null $error_code
     * @throws InvalidArgumentException
     */
    public function __construct($name, $tmp_file, $size, $error_code = null)
    {
        $this->name = basename($name);
        $scheme = parse_url($tmp_file, PHP_URL_SCHEME);
        if (in_array($scheme, ['http', 'https'])) {
            // Wait a minute- just local filepaths please, no URL schemes allowed!
            throw new InvalidArgumentException(
                sprintf(
                    // @codingStandardsIgnoreStart
                    esc_html__('The scheme ("%1$s") on the temporary file ("%2$s") indicates is located elsewhere, that’s not ok!', 'event_espresso'),
                    // @codingStandardsIgnoreEnd
                    $scheme,
                    $tmp_file
                )
            );
        }
        $this->tmp_file = (string) $tmp_file;
        $this->size = (int) $size;
        $this->error_code = (int) $error_code;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Gets the file's mime type
     * @return string
     */
    public function getType()
    {
        if (!$this->type) {
            $this->type = $this->determineType();
        }
        return $this->type;
    }

    /**
     * @since $VID:$
     * @return string
     */
    protected function determineType()
    {
        if (!$this->getTmpFile()) {
            return '';
        }
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        return $finfo->file($this->getTmpFile());
    }

    /**
     * Gets the file's extension.
     * @since $VID:$
     * @return string
     */
    public function getExtension()
    {
        if (!$this->extension) {
            $this->extension = $this->determineExtension();
        }
        return $this->extension;
    }

    /**
     * Determine's the file's extension given the temporary file.
     * @since $VID:$
     * @return string
     */
    protected function determineExtension()
    {
        $position_of_period = strrpos($this->getName(), '.');
        if($position_of_period === false){
            return '';
        }
        return mb_substr(
            $this->getName(),
            $position_of_period + 1
        );
    }

    /**
     * Gets the size of the file
     * @return int
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Gets the path to the temporary file which was uploaded.
     * @return string
     */
    public function getTmpFile()
    {
        return $this->tmp_file;
    }

    /**
     * @since $VID:$
     * @return string
     */
    public function __toString()
    {
        return $this->getName();
    }

    /**
     * Gets the error code PHP reported for the file upload.
     * @return string
     */
    public function getErrorCode()
    {
        return $this->error_code;
    }
}
// End of file FileSubmission.php
// Location: EventEspresso\core\services\request\files/FileSubmission.php
