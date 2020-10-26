<?php

    session_start();

    header("Content-Type: application/json");

    //Check to make sure user is not already logged in
    if(!isset($_SESSION['user'])) {
        echo json_encode(array("nosession" => true));
        die();
    }


    $arr = array();
    $id = -1;
    $title = 'Untitled Event';
    $description = '';
    $date = '';
    $color = '';
    
    $json_str = file_get_contents('php://input');
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    if($json_obj['date'] != '') {
        $date = $json_obj['date'];
        $arr['date'] = $date;
    } else {
        $arr['date'] = false;
        echo json_encode($arr);
        die();
    }

    if($json_obj['id'] != '') {
        $id = $json_obj['id'];
        $arr['id'] = $id;
    } else {
        $arr['id'] = false;
        echo json_encode($arr);
        die();
    }

    if($json_obj['title'] != '') {
        $title = $json_obj['title'];
        $arr['title'] = $title;
    } else {
        $arr['title'] = false;
    }

    if($json_obj['description'] != '') {
        $description = $json_obj['description'];
        $arr['description'] = $description;
    } else {
        $arr['description'] = false;
    }

    if($json_obj['color'] != '') {
        $color = $json_obj['color'];
        $arr['color'] = $color;
    } else {
        $arr['color'] = false;
    }



    
    //connect to database with wustl user
    $conn = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');



    //exit if connection fails
    if ($conn->connect_error) {
        $arr['sql connection'] = false;
        echo json_encode($arr);
        die();
    }


    $query = $conn->prepare('UPDATE events SET title=(?), description=(?), date=(?), color=(?) WHERE id='.$id);
    $query->bind_param("ssss", $title, $description, $date, $color);
    if($query->execute()) {
        $arr['success'] = true;
    } else {
        $arr['success'] = false;
    }

    echo json_encode($arr);

?>