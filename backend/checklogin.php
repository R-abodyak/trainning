<?php
session_start();
$email='';
$password='';

$conn = new mysqli('localhost', "root", '', 'projectt');

if (mysqli_connect_errno()) {
    echo("could not connect with data base");
    exit;
}
if (isset($_POST['email']) and isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $result = mysqli_query($conn, "SELECT * from user");
    $flag = 1;
    for ($i = 0; $i < $result->num_rows; $i++)
    { $row = $result->fetch_object();
        if ($row->email == $email) {
            if ($row->password == sha1($password)) {
               //go to profile
                $flag=0;
                $id = $row->Id;
                $_SESSION['userid'] = $id;

              //  header('location: /frontend/profile.html');
            }
        }
    }}
echo($flag);
?>

