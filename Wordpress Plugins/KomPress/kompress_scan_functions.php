<?php
function scan_upload_dir() {
    $upload_dir = wp_upload_dir();
    $dir_path = $upload_dir['basedir'];
    $dir_url = $upload_dir['baseurl'];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir_path));
    $files = array();
    foreach ($iterator as $fileinfo) {
        if ($fileinfo->isFile() && in_array(strtolower($fileinfo->getExtension()), array('jpg', 'jpeg', 'png'))) {
            $file_path = $fileinfo->getPathname();
            $webp_path = str_replace($dir_path, $dir_path . '_webp', $file_path);
            $webp_url = str_replace($dir_path, $dir_url . '_webp', $file_path);
            $file_size = filesize($file_path);
            $webp_size = file_exists($webp_path) ? filesize($webp_path) : 0;
            $files[] = array(
                'name' => basename($file_path),
                'path' => $file_path,
                'url' => str_replace($dir_path, $dir_url, $file_path),
                'size' => $file_size,
                'webp_size' => $webp_size,
                'webp_url' => str_replace($dir_path, $dir_url, $webp_path)
            );
        }
    }
    return $files;
}
?>
