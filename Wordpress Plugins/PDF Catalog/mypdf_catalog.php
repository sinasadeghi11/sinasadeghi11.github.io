<?php
/*
Plugin Name: My PDF Catalog by Sina
Description: Displays a list of PDF files with title, thumbnail, and download/read buttons
Version: 1.3
Author: Sina Sadeghi
*/

function mypdf_catalog_styles() {
    wp_enqueue_style( 'mypdf_catalog_styles', plugin_dir_url( __FILE__ ) . 'my-pdf-catalog-styles.css' );
}

add_action( 'wp_enqueue_scripts', 'mypdf_catalog_styles' );


function mypdf_catalog_shortcode() {
    $output = '';
    $attachments = get_posts( array(
        'post_type' => 'attachment',
        'post_mime_type' => 'application/pdf',
        'numberposts' => -1
    ) );

    if ( $attachments ) {
        $output .= '<ul class="pdf-list">';

        foreach ( $attachments as $attachment ) {
            $pdf_title = ucwords( str_replace( '_', ' ', basename( $attachment->post_title, '.pdf' ) ) );
            $pdf_url = wp_get_attachment_url( $attachment->ID );
            $pdf_thumbnail = wp_get_attachment_image_src( $attachment->ID, 'thumbnail' )[0];
            $output .= '<li>';
            $output .= '<h3>' . $pdf_title . '</h3>';
            $output .= '<button><a href="' . $pdf_url . '" class="pdf-download" download>Descargar</a></button>';
            $output .= '<button><a href="' . $pdf_url . '" class="pdf-read" target="_blank">Leer</a></button>';
            $output .= '<img src="' . $pdf_thumbnail . '" alt="' . $pdf_title . '">';
            


            $output .= '</li>';
        }

        $output .= '</ul>';
    }

    return $output;
}

add_shortcode( 'mypdf_catalog', 'mypdf_catalog_shortcode' );
