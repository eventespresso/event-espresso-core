// txn admin revenue per day report
jQuery(document).ready(function($) {

		if ( txnRevPerDay.revenue.length <= 0 ) {
			$('#'+txnRevPerDay.id).html(txnRevPerDay.noTxnMsg);
		} else {
			if ( EE_ACCOUNTING_CFG ) {
				$.jqplot.sprintf.thousandsSeparator = EE_ACCOUNTING_CFG.currency.thousand;
				$.jqplot.sprintf.decimalMark = EE_ACCOUNTING_CFG.currency.decimal;
			}

			$.jqplot( txnRevPerDay.id, [txnRevPerDay.revenue], {
				title: txnRevPerDay.title,
				animate: !$.jqplot.use_excanvas,
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					pointLabels: { show: true, location: 'n' },
					rendererOptions: {
						varyBarColor: true,
						barWidth: txnRevPerDay.width
					}
				},
				axes: {
					xaxis: {
						renderer: $.jqplot.DateAxisRenderer,
						tickRenderer: $.jqplot.CanvasAxisTickRenderer,
						min: txnRevPerDay.xmin,
						max: txnRevPerDay.xmax,
							pad: 0,
						numberTicks: txnRevPerDay.span,
						syncTicks: true,
							tickOptions: {
							formatString: "%a %b %e %y",
							angle: -45
						}
					},
					yaxis: {
						min: 0,
						tickOptions: {
							formatString: eei18n.currency_format ? eei18n.currency_format : "$%'.2f"
						}
					}
				},
				highlighter: { show: false }
			});
		}
		
	});