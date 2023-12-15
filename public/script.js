$(document).ready(function() {
    const $currencySelect = $('#currency-select');
    const $exchangeRateDisplay = $('#exchange-rate-display');
    const $spinner = $('.spinner');

    function showSpinner(show) {
        if (show) $spinner.show();
        else $spinner.hide();
    }

    $.get('/api/currencies', function(currencies) {
        $currencySelect.append(currencies.map(currency => $('<option>', {
            value: currency,
            text: currency
        })));
    });

$currencySelect.on('change', function() {
    const selectedCurrency = $(this).val();
    $exchangeRateDisplay.empty();
    showSpinner(true);

    $.get(`/api/rates/${selectedCurrency}`, function(data) {
        showSpinner(false);

        const chartData = {
            labels: Object.keys(data), // Currency codes
            values: Object.values(data) // Corresponding rates
        };

        $.each(data, function(currency, rate) {
            const tooltip = $('<span>').addClass('tooltip').text('Info');
            $exchangeRateDisplay.append(
                $('<div>').addClass('grid-item').html(`<strong>${currency}:</strong> ${rate}`)
                          .append(tooltip)
            );
        });

        initChart(chartData); // Call initChart with properly formatted data
    }).fail(function() {
        showSpinner(false);
        $exchangeRateDisplay.html('<p>Error loading data</p>');
    });
});


        const $chartContainer = $('#exchangeRateChart');

    function initChart(data) {
        const chart = new Chart($chartContainer, {
            type: 'line',
            data: {
                labels: data.labels, // Array of labels e.g., ['Jan', 'Feb', 'Mar']
                datasets: [{
                    label: 'Exchange Rate',
                    data: data.values, // Array of data points e.g., [10, 20, 30]
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const $historicalDataChartCanvas = $('#historicalDataChart');

    // Function to initialize the historical chart
    function initHistoricalChart(historicalData) {
        const ctx = $historicalDataChartCanvas.get(0).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: historicalData.dates, // Array of dates
                datasets: [{
                    label: 'Historical Rates',
                    data: historicalData.rates, // Array of historical rates
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

// Function to fetch and update the historical chart

// Function to update the historical chart
function updateHistoricalChart(currency, date) {
    $.get(`/api/historical/${currency}/${date}`, function(historicalData) {
        // Assuming historicalData contains 'rates', which is an object of currency rates
        const rates = historicalData.rates;
        const labels = Object.keys(rates);
        const data = Object.values(rates);

        initHistoricalChart({ labels: labels, data: data });
    }).fail(function(error) {
        console.error('Error fetching historical data:', error);
    });
}

$('#historicalDate').on('change', function() {
    const selectedDate = new Date($(this).val());
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // Pad month with leading zero
    const day = ('0' + selectedDate.getDate()).slice(-2); // Pad day with leading zero
    const selectedCurrency = $currencySelect.val();

    updateHistoricalChart(selectedCurrency, `${year}-${month}-${day}`);
});




});
