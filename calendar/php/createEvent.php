<?php

    session_start();

    header("Content-Type: application/json");

    //Check to make sure user is not already logged in
    if(!isset($_SESSION['user'])) {
        echo json_encode(array("nosession" => true));
        die();
    }

        //connect to database with wustl user
        $conn = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');



        //exit if connection fails
        if ($conn->connect_error) {
            $arr['sql connection'] = false;
            echo json_encode($arr);
            die();
        }

    $arr = array();

    echo json_encode(array("success" => true));

?>