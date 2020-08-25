<?php
session_start();
class profile_information
{
    // Properties
    public $first;
    public $last;
    public $phone;
    public $gender;
    public $birth;
    public $email;
   
}




$id = $_SESSION['userid'];
$conn = mysqli_connect('localhost','root','','projectt');
$sql = "Select * From user where id=$id";
$result = mysqli_query($conn, $sql);
$password="";
$first="";
$last="";

while($row = mysqli_fetch_array($result)):
    {
        $objphp = new  profile_information();
        $objphp->first= $row['FName'];
        $objphp->last= $row['LName'];
        $objphp->phone=$row['phone'];
        $objphp->gender=$row['gender'];
        $objphp->birth=$row['birthday'];
        $objphp->email=$row['email'];
       

    }
endwhile;

$myJSON = json_encode($objphp);

echo $myJSON;


/*

if (isset($_POST['save'])) {
$first=$_POST['Fname'];
$last=$_POST['Lname'];;
$phone=$_POST['phone'];;

$birth=$_POST['birth'];;
$email=$_POST['email'];
$sql = "UPDATE user SET FName='$first' WHERE email='$email'";
$conn->query($sql);
$sql = "UPDATE user SET LName='$last' WHERE email='$email'";
$conn->query($sql);
$sql = "UPDATE user SET phone='$phone' WHERE email='$email'";
$conn->query($sql);
$sql = "UPDATE user SET birthday='$birth' WHERE email='$email'";
$conn->query($sql);



}




 

*/


$conn -> close();


?>
