<?php
/**
 * Plugin Name: Grid Display Plugin
 * Description: Land Tiles: [show_parcel_grid] | All Posts: [show_posts_grid]
 * Version: 3.0
 * Author: Sina Sadeghi
 */

// Enqueue the AJAX script.
function add_my_ajax_scripts() {
    // Enqueue the JavaScript file.
    wp_enqueue_script( 'ajax-script', plugins_url( '/ajax-script.js', __FILE__ ), array('jquery') );
    // Localize the script to pass data to it.
    wp_localize_script( 'ajax-script', 'my_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
}
add_action( 'wp_enqueue_scripts', 'add_my_ajax_scripts' );


function show_parcel_grid() {
    $args = array(
        'post_type' => 'land_tile',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'DESC'
    );

    $query = new WP_Query($args);

    $output = '<div class="grid">';

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $ajaxfile_url = get_post_meta(get_the_ID(), 'ajaxfile', true); // Fetch the custom field value
            $output .= '<a href="' . get_the_permalink() . '"><div class="grid-item"><img src="' . esc_url($ajaxfile_url) . '" alt=""><p>' . get_the_title() . '</p></div></a>';
        }
    } else {
        $output .= 'No parcels found';
    }

    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}
add_shortcode('show_parcel_grid', 'show_parcel_grid');

function show_posts_grid() {
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'DESC'
    );

    $query = new WP_Query($args);

    $output = '<div class="grid">';

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $output .= '<a href="'. get_permalink() .'"><div class="grid-item">'. get_the_post_thumbnail() .'<p>'. get_the_title() .'</p></div></a>';
        }
    } else {
        $output .= 'No posts found';
    }

    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}
add_shortcode('show_posts_grid', 'show_posts_grid');

// Handle the AJAX request.
function my_ajax_search() {
    // Sanitize the search term to prevent SQL injection attacks.
    $search = sanitize_text_field( $_POST['search'] );

    // Set up the query parameters.
    $args = array(
        'post_type' => array('land_tile', 'post'),
        'posts_per_page' => -1,
        's' => $search,
        'orderby' => 'title',
        'order' => 'DESC'
    );

    // Run the query.
    $query = new WP_Query($args);

    // Start the output string.
    $output = '<div class="grid">';

    // Loop through the posts and add them to the output string.
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $output .= '<a href="'. get_permalink() .'"><div class="grid-item">'. get_the_post_thumbnail() .'<p>'. get_the_title() .'</p></div></a>';
        }
    } else {
        $output .= 'No posts found';
    }

    $output .= '</div>';

    // Echo the output string.
    echo $output;

    // Die to end the AJAX request.
    die();
}
// Add the AJAX actions.
add_action( 'wp_ajax_my_search', 'my_ajax_search' );
add_action( 'wp_ajax_nopriv_my_search', 'my_ajax_search' );

// Display the search form.
function show_search_form() {
    $form = '<form id="live_search">
        <input type="text" name="s" id="search" />
        
    </form>
    <div id="result"></div>';

    return $form;
}
add_shortcode('show_search_form', 'show_search_form');
?>