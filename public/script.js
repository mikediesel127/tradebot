$(document).ready(function() {
    function fetchData() {
        const selectedSource = $('#dataSource').val();
        $.get('/forex', { source: selectedSource }, function(data) {
            $('#data-display').html(formatForexData(data));
        }).fail(function() {
            $('#data-display').html('Failed to fetch data');
        });
    }

    function formatForexData(data) {
        if (!data || typeof data !== 'object') {
            return 'No valid data available';
        }
        // Formatting logic
        return htmlContent;
    }

    $('#dataSource').change(fetchData);
    fetchData(); // Initial fetch

    function formatForexData(data) {
        if (!data) {
            return 'No data available';
        }

        let htmlContent = '<div class="forex-data">';
        htmlContent += `<div><strong>From:</strong> ${data.fromCurrency}</div>`;
        htmlContent += `<div><strong>To:</strong> ${data.toCurrency}</div>`;
        htmlContent += `<div><strong>Exchange Rate:</strong> ${data.exchangeRate}</div>`;
        htmlContent += `<div><strong>Last Refreshed:</strong> ${data.timestamp}</div>`;
        if (data.bidPrice) {
            htmlContent += `<div><strong>Bid Price:</strong> ${data.bidPrice}</div>`;
        }
        if (data.askPrice) {
            htmlContent += `<div><strong>Ask Price:</strong> ${data.askPrice}</div>`;
        }
        htmlContent += '</div>';
        return htmlContent;
    }

    $('#dataSource').change(fetchData);
    fetchData(); // Initial fetch

    

    // Dark Mode Toggle
    $('#mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        if ($('body').hasClass('dark-mode')) {
            $('body').attr('data-theme', 'dark');
        } else {
            $('body').attr('data-theme', 'light');
        }
    });


    $('#search-input').on('keyup', function () {
        const query = $(this).val();
console.log('keyup');
        // Make an AJAX request to fetch Forex data based on the search query
        $.get(`/forex/search?q=${query}`, function (data) {
            // Update the UI with the search results
            $('#forex-data').html(data);
        });
    });

// Handle suggestion click
$('.suggestions').on('click', '.suggestion', function() {
    const selectedCurrency = $(this).text();
    $('#currency-search').val(selectedCurrency);
    $('.suggestions').empty();
    // Fetch and display data for the selected currency
    // Implement this part in your script.js
});



});
