<?php

namespace EventEspresso\core\services\request\files;

use finfo;

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

    public function __construct($name, $tmp_file, $size, $error_code = null)
    {
        $this->name = basename($name);
        $this->tmp_file = $tmp_file;
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
        if (!$this->getTmpFile()) {
            return '';
        }
        return pathinfo($this->getTmpFile(), PATHINFO_EXTENSION);
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
        return $this->getTmpFile();
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
