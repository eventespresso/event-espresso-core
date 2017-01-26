var EETxnCharts = {
    maybeFormatData : function(data) {
        if ( eei18n.currency_format.formatterObject ) {

            var formatter = new google.visualization.NumberFormat(
                eei18n.currency_format.formatterObject
            );

            formatter.format( data, 1 );
        }
    },

    getData : function( optionsObject ) {
        if (
            typeof optionsObject.revenue === 'undefined'
        ) {
            return {}
        }
        return google.visualization.arrayToDataTable( optionsObject.revenue );
    },

    getView : function( data ) {
        var view = new google.visualization.DataView( data );
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            }
        ]);
        return view;
    },

    getOptions : function( optionsObject ) {
        if (
            typeof optionsObject.title === 'undefined'
        ) {
            return {}
        }
        return {
            title: optionsObject.title + ' (' + optionsObject.subtitle.toLowerCase() + ')',
            legend: { position: 'none' },
            chart: {
                title: optionsObject.title,
                subtitle: optionsObject.subtitle,
            }
        }
    },


    getChart : function( optionsObject ) {
        return new google.visualization.ColumnChart( document.getElementById( optionsObject.id ) );
    },

    doChart : function( optionsObject ) {
        if (
            typeof optionsObject === 'undefined'
            || typeof optionsObject.id === 'undefined'
            || optionsObject.noResults
        ) {
            document.getElementById(optionsObject.id).innerHTML = optionsObject.noTxnMsg;
            return false;
        }
        return true;
    },


    drawChart : function( optionsObject ) {
        if ( ! this.doChart( optionsObject ) ) {
            return;
        }
        var data = this.getData( optionsObject );
        var chart = this.getChart( optionsObject );
        this.maybeFormatData( data );
        var options = this.getOptions( optionsObject );
        var view = this.getView( data );
        chart.draw( view, options );
    },


    txnPerDayReport : function() {
        if ( typeof txnRevPerDay !== 'undefined' ) {
            this.drawChart(txnRevPerDay);
        }
    },


    txnPerEventReport : function() {
        if ( typeof txnRevPerEvent !== 'undefined' ) {
            this.drawChart(txnRevPerEvent);
        }
    },

    drawVisualization : function() {
        EETxnCharts.txnPerEventReport();
        EETxnCharts.txnPerDayReport();
    }
};

// transaction admin reports.
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(EETxnCharts.drawVisualization);