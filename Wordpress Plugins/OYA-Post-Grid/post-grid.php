<?php
/**
 * Plugin Name: Grid Display Plugin
 * Description: Display posts and 'land_tile' types in grid format.
 * Version: 2.0
 * Author: Sina Sadeghi
 */

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
            $output .= '<a href="' . get_the_permalink() . '"><div class="grid-item"><img src="' . esc_url($ajaxfile_url) . '" alt=""><div class="centered-text"><h>' . get_the_title() . '</h><p>Owner: ' . get_the_author() . '</p><p>Content: ' . (get_comments_number() + 1) . '</p></div></div></a>';

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
            $output .= '<a href="'. get_permalink() .'"><div class="grid-item">'. get_the_post_thumbnail() .'<div class="centered-text"><h>'. get_the_title() .'</h><p>Owner: ' . get_the_author() . '</p><p>Content: ' . (get_comments_number() + 1) . '</p></div></div></a>';

        }
    } else {
        $output .= 'No posts found';
    }
    
    

    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}
add_shortcode('show_posts_grid', 'show_posts_grid');

?>
