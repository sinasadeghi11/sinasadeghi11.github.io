<?php
/**
 * Plugin Name: Published Pages
 * Plugin URI: https://example.com/
 * Description: Displays a list of all published pages.
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://example.com/
 * License: GPL2
 */

function list_published_pages() {
    $args = array(
      'post_type' => 'page',
      'post_status' => 'publish',
      'posts_per_page' => -1
    );
  
    $pages = get_posts($args);
  
    echo '<ul>';
  
    foreach ($pages as $page) {
      // Get PageSpeed score for this page
      $score = get_page_speed_score($page);
  
      // Output page title and PageSpeed score
      echo '<li><a href="' . get_permalink($page->ID) . '">' . $page->post_title . '</a> (PageSpeed score: ' . $score . ')</li>';
    }
  
    echo '</ul>';
  }
  

function get_page_speed_score($page) {
    // Google PageSpeed Insights API endpoint
    $api_url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  
    // API key (optional)
    $api_key = 'your_api_key_here';
  
    // Set API request parameters
    $params = array(
      'url' => get_permalink($page->ID),
      'strategy' => 'mobile',
      'key' => $api_key
    );
  
    // Build API request URL
    $request_url = $api_url . '?' . http_build_query($params);
  
    // Make API request
    $response = file_get_contents($request_url);
  
    // Parse JSON response
    $data = json_decode($response, true);
  
    // Return PageSpeed score
    return $data['lighthouseResult']['categories']['performance']['score'] * 100;
  }
  

function my_plugin_menu() {
  add_menu_page(
    'Published Pages', // page title
    'Published Pages', // menu title
    'manage_options', // capability
    'my-plugin', // menu slug
    'list_published_pages' // callback function
  );
}

add_action('admin_menu', 'my_plugin_menu');


echo '<h1>Page Speed Test</h1>';
list_published_pages();