<?php

    ini_set("session.cookie_httponly", 1);

    session_start();
    session_name('logged in');

    header("Content-Type: application/json");

    //Check to make sure user is not already logged in
    if(!isset($_SESSION['user'])) {
        echo json_encode(array("nosession" => true));
        die();
    }

    $previous_ua = @$_SESSION['useragent'];
    $current_ua = $_SERVER['HTTP_USER_AGENT'];

    if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
	    die("Session hijack detected");
    }else{
	$_SESSION['useragent'] = $current_ua;
}


    $arr = array();

    //connect to database with wustl user
    $conn = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');



    //exit if connection fails
    if ($conn->connect_error) {
        $arr['sql connection'] = false;
        echo json_encode($arr);
        die();
    }

    $query = $conn->prepare('SELECT * FROM events WHERE userId="'.$_SESSION['userid'].'"');

    $query->execute();
    $result = $query->get_result();
    while($row = $result->fetch_assoc()) {
        array_push($arr, $row);
    }

    $query = $conn->prepare('SELECT * FROM events WHERE shareId=(?)');
    $query->bind_param("i", $_SESSION['userid']);
    $query->execute();
    $result = $query->get_result();
    while($row = $result->fetch_assoc()) {
        array_push($arr, $row);
    }

    echo json_encode($arr);

?>