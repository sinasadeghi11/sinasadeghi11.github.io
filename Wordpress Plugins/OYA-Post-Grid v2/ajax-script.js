jQuery(document).ready(function($) {
    // Fetch and display all posts when the page loads
    $.ajax({
        url: my_ajax_object.ajax_url,
        method: 'POST',
        data: {
            action: 'my_search',
            search: '' // Empty search term will fetch all posts
        },
        success: function(result) {
            $('#result').html(result);
        }
    });

    // Update the results live as the user types in the search bar
    $('#search').on('keyup', function() {
        var search = $(this).val();
        $.ajax({
            url: my_ajax_object.ajax_url,
            method: 'POST',
            data: {
                action: 'my_search',
                search: search
            },
            success: function(result) {
                $('#result').html(result);
            }
        });
    });

    // Prevent form submission
    $('#live_search').on('submit', function(e) {
        e.preventDefault();
    });
});
