<?php

    ini_set("session.cookie_httponly", 1);

    session_start();
    session_name('logged in');

    header("Content-Type: application/json");
    $arr = array();


    if(isset($_SESSION['user'])) {
        $arr['session'] = $_SESSION['user'];
    } else {
        $arr['session'] = false;
    }

    echo json_encode($arr);
?>