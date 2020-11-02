<?php

    session_start();

    header("Content-Type: application/json");

    //Check to make sure user is not already logged in
    if(!isset($_SESSION['user'])) {
        echo json_encode(array("nosession" => true));
        die();
    }


    $arr = array();

    $json_str = file_get_contents('php://input');
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    $id = $json_obj['id'];

    
    //connect to database with wustl user
    $conn = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');



    //exit if connection fails
    if ($conn->connect_error) {
        $arr['sql connection'] = false;
        echo json_encode($arr);
        die();
    }


    $query = $conn->prepare('DELETE FROM events WHERE id=(?)');
    $query->bind_param("i", $id);
    if($query->execute()) {
        $arr['success'] = true;
    } else {
        $arr['success'] = false;
    }

    echo json_encode($arr);

?>