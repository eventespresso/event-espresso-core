<?php

namespace EventEspresso\core\services\adapters;

use Dompdf\Autoloader;
use Dompdf\Dompdf;
use Dompdf\Options;

/**
 * Class PdfAdapter
 *
 * @package EventEspresso\core\services\adapters
 */
class PdfAdapter
{
    /**
     * @var Options|null
     */
    private $options;


    /**
     * PdfAdapter constructor.
     */
    public function __construct()
    {
        // only load dompdf if nobody else has yet...
        if (! class_exists('Dompdf\Autoloader') and is_readable(EE_THIRD_PARTY . 'dompdf/src/Autoloader.php')) {
            require_once(EE_THIRD_PARTY . 'dompdf/src/Autoloader.php');
            Autoloader::register();
        }
    }


    /**
     * @param array $extra_options
     * @return PdfAdapter
     */
    public function initializeOptions(array $extra_options = []): PdfAdapter
    {
        if (! class_exists('Dompdf\Options')) {
            return $this;
        }
        $this->options = new Options();
        $this->options->set('isRemoteEnabled', true);
        $this->options->set('isJavascriptEnabled', false);
        if (defined('DOMPDF_FONT_DIR')) {
            $this->options->setFontDir(DOMPDF_FONT_DIR);
            $this->options->setFontCache(DOMPDF_FONT_DIR);
        }
        // Allow changing the paper size.
        if (defined('DOMPDF_DEFAULT_PAPER_SIZE')) {
            $this->options->set('defaultPaperSize', DOMPDF_DEFAULT_PAPER_SIZE);
        }
        // now apply user provided options
        foreach ($extra_options as $key => $value) {
            $this->options->set($key, $value);
        }
        return $this;
    }


    /**
     * @param string $content
     * @param string $filename
     * @param bool $download
     * @return bool
     */
    public function generate(string $content, string $filename, bool $download): bool
    {
        if ($this->options instanceof Options && ! empty($content)) {
            $dompdf = new Dompdf($this->options);
            $dompdf->loadHtml($content);
            $dompdf->render();
            $dompdf->stream($filename, ['Attachment' => $download]);
            return true;
        }
        return false;
    }
}
