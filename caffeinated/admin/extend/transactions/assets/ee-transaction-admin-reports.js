// transaction admin reports.
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    txnPerEventReport();
    txnPerDayReport();
}



function txnPerEventReport() {
    if ( txnRevPerEvent.noResults ) {
        document.getElementById(txnRevPerEvent.id).innerHTML = txnRevPerEvent.noRegsMsg;
    } else {
        var data = google.visualization.arrayToDataTable( txnRevPerEvent.revenue );
        var options = {
            legend: { position: 'none' },
            vAxis: {
                format: eei18n.currency_format ? eei18n.currency_format : 'decimal'
            },
            chart: {
                title: txnRevPerEvent.title,
                subtitle: txnRevPerEvent.subtitle
            }
        };
        var chart = new google.charts.Bar( document.getElementById( txnRevPerEvent.id ) );
        chart.draw( data, google.charts.Bar.convertOptions( options ) );/**/
    }
}

function txnPerDayReport() {
    if ( txnRevPerDay.noResults ) {
        document.getElementById(txnRevPerDay.id).innerHTML = txnRevPerDay.noRegsMsg;
    } else {
        var data = google.visualization.arrayToDataTable( txnRevPerDay.revenue );
        var options = {
            legend: { position: 'none' },
            vAxis: {
                format: eei18n.currency_format ? eei18n.currency_format : 'decimal'
            },
            chart: {
                title: txnRevPerDay.title,
                subtitle: txnRevPerDay.subtitle
            },
        }
        var chart = new google.charts.Bar( document.getElementById( txnRevPerDay.id ) );
        chart.draw( data, google.charts.Bar.convertOptions( options ) );
    }
}