<?php

namespace EventEspresso\core\services\adapters;

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
    }


    /**
     * @param array $extra_options
     * @return PdfAdapter
     */
    public function initializeOptions(array $extra_options = []): PdfAdapter
    {
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
     * @return void
     */
    public function generate(string $content, string $filename, bool $download): void
    {
        $dompdf = new Dompdf($this->options);
        $dompdf->loadHtml($content);
        $dompdf->render();
        $dompdf->stream($filename, ['Attachment' => $download]);
    }
}
