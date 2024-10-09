<?php

namespace EventEspresso\core\services\locators;

use EEH_File;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use FilesystemIterator;
use GlobIterator;

/**
 * Class FileLocator
 * Finds filepaths from folder paths
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class FileLocator extends Locator
{
    /**
     * @var string $file_mask
     */
    protected $file_mask = '*.php';

    /**
     * @var array $filepaths
     */
    protected $filepaths = [];


    /**
     * @param string|null $file_mask
     * @throws InvalidDataTypeException
     */
    public function setFileMask(?string $file_mask)
    {
        if (! is_string($file_mask)) {
            throw new InvalidDataTypeException('$file_mask', $file_mask, 'string');
        }
        $this->file_mask = $file_mask;
    }


    /**
     * @return array
     */
    public function getFilePaths(): array
    {
        return $this->filepaths;
    }


    /**
     * @return int
     */
    public function count(): int
    {
        return count($this->filepaths);
    }


    /**
     * given a path to a valid directory, or an array of valid paths,
     * will find all files that match the provided mask
     *
     * @param array|string $directory_paths
     * @return array
     * @throws InvalidDataTypeException
     */
    public function locate($directory_paths): array
    {
        if (! (is_string($directory_paths) || is_array($directory_paths))) {
            throw new InvalidDataTypeException('$directory_paths', $directory_paths, 'string or array');
        }
        foreach ((array) $directory_paths as $directory_path) {
            foreach ($this->findFilesByPath($directory_path) as $key => $file) {
                $this->filepaths[ $key ] = EEH_File::standardise_directory_separators($file);
            }
        }
        return $this->filepaths;
    }


    /**
     * given a path to a valid directory, will find all files that match the provided mask
     *
     * @param string $directory_path
     * @return FilesystemIterator
     */
    protected function findFilesByPath(string $directory_path = '')
    {
        $iterator = new GlobIterator(
            EEH_File::end_with_directory_separator($directory_path) . $this->file_mask
        );
        foreach ($this->flags as $flag) {
            $iterator->setFlags($flag);
        }
        return $iterator;
    }
}
