<?php

    session_start();

    header("Content-Type: application/json");
    $arr = array();


    if(isset($_SESSION['user'])) {
        $arr['session'] = $_SESSION['user'];
    } else {
        $arr['session'] = false;
    }

    echo json_encode($arr);
?>