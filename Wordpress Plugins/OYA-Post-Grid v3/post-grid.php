<?php
/**
 * Plugin Name: Grid Display Plugin
 * Description: Display posts and 'land_tile' types in grid format.
 * Version: 4.0
 * Author: Sina Sadeghi
 */

function show_all_grid() {
    // Query both 'land_tile' and 'post' post types
    $args = array(
        'post_type' => array('land_tile', 'post'),
        'posts_per_page' => -1,
        'orderby' => 'modified',
        'order' => 'DESC'
    );

    $query = new WP_Query($args);

    // Add a search bar and filter buttons
    $output = '
    <div id="filter-search-bar">
        <input type="text" id="searchInput" placeholder="Search...">
    </div>
    <div class="filter-button-container">
        <button class="filter-button active" data-filter="all">All</button>
        <button class="filter-button" data-filter="land_tile">Parcels</button>
        <button class="filter-button" data-filter="post">Posts</button>
    </div>
    
    <div class="grid" id="myGrid">';

    // Loop through posts
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            // Add a data attribute for filtering
            $output .= '<div class="grid-item" data-type="'. get_post_type() .'">';
            $output .= '<a href="'. get_permalink() .'">'. get_the_post_thumbnail();
            $output .= '<div class="centered-text"><h>'. get_the_title() .'</h><p>Owner: ' . get_the_author() . '</p><p>Content: ' . (get_comments_number() + 1) . '</p></div></a></div>';
        }
    } else {
        $output .= 'No items found';
    }

    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}
add_shortcode('show_all_grid', 'show_all_grid');

function enqueue_post_grid_script() {
    wp_enqueue_script( 
        'post-grid', 
        plugin_dir_url(__FILE__) . 'post-grid.js', 
        array('jquery'), 
        '1.0.0', 
        true 
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_post_grid_script' );


function update_post_modified_on_comment($comment_id, $comment_object) {
    $post_id = $comment_object->comment_post_ID;

    if( null !== get_post($post_id) ) {
        $post = get_post($post_id);
        $current_time = current_time('mysql');
        wp_update_post(
            array (
                'ID'            => $post_id, 
                'post_modified' => $current_time, 
                'post_modified_gmt' => get_gmt_from_date( $current_time )
            )
        );
    }
}
add_action('wp_insert_comment', 'update_post_modified_on_comment', 99, 2);

