<?php 

$conn = mysqli_connect('localhost','root','','projectt');


if (isset($_POST['confirm_new'])&&isset($_POST['new'])&&isset($_POST['old'])){
    $email=$_POST['email'];
  
    $new= sha1($_POST['new']);
     $old=sha1($_POST['old']);
     $sql = "SELECT * from user ";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if ($row['email'] == $email) {
               if( $row['password' ]!= $old){
                   echo("Old Password is not correct ");
             
                }
                else{
                 $sql = "UPDATE user SET password='$new' WHERE email='$email'";
               echo("Your changes were successful");
             
                }
        }}
 
    }
}

    ?>