<?php
    // Import PHPMailer classes into the global namespace
    // These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    // Load Composer's autoloader
    require '../vendor/autoload.php';

    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);

    // set timezone
    date_default_timezone_set('Europe/Paris');


    /*
********************************************************************************************
CONFIGURATION
********************************************************************************************
*/


    // Messages de confirmation du mail
    $message_envoye = "Votre message nous est bien parvenu !";
    $message_non_envoye = "L'envoi du mail a échoué, veuillez réessayer SVP.";

    // Messages d'erreur du formulaire
    $message_formulaire_invalide = "Vérifiez que tous les champs soient bien remplis et que l'email soit sans erreur.";

    /*
********************************************************************************************
FIN DE LA CONFIGURATION
********************************************************************************************
*/

    /*
     * cette fonction sert à nettoyer et enregistrer un texte
     */


    function Rec($text)
    {
        $text = htmlspecialchars(trim($text), ENT_QUOTES);
        if (1 === get_magic_quotes_gpc()) {
            $text = stripslashes($text);
        }

        $text = nl2br($text);
        return $text;
    };

    /*
     * Cette fonction sert à vérifier la syntaxe d'un email
     */

    function IsEmail($email)
    {
        $value = preg_match('/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:
        (?:(?:[01]?\d1,2|2[0−4]\d|25[0−5])\.)3(?:[01]?\d1,2|2[0−4]\d|25[0−5])

        ))$/', $email);
        return (($value === 0) || ($value === false)) ? false : true;
    };


    // formulaire envoyé, on récupère tous les champs.
    $date = "Date:" . date(" D, d M Y H:s:i, P") . "\n";

    $nom = (isset($_POST['nom'])) ? Rec($_POST['nom']) : '';
    $email = (isset($_POST['email'])) ? Rec($_POST['email']) : '';
    $subject = "Nouveau message : vincentvdt.fr"; 
    /* (isset($_POST['subject'])) ? Rec($_POST['subject']) : ''; */
    $message = (isset($_POST['message'])) ? Rec($_POST['message']) : '';
    $company = (isset($_POST['societe'])) ? Rec($_POST['societe']) : '';

    // On va vérifier les variables et l'email ...
    $email = (IsEmail($email)) ? $email : ''; // soit l'email est vide si erroné, soit il vaut l'email entré

    // Remplacement de certains caractères spéciaux
    $message = str_replace("&#039;", "'", $message);
    $message = str_replace("&#8217;", "'", $message);
    $message = str_replace("&quot;", '"', $message);
    $message = str_replace('<br>', '', $message);
    $message = str_replace('<br />', '', $message);
    $message = str_replace("&lt;", "<", $message);
    $message = str_replace("&gt;", ">", $message);
    $message = str_replace("&amp;", "&", $message);
    $message = '
            <html>
                <head>
                    <title> ' . $subject . '</title>
                    <style type="text./css">
        
                    table {
                        border-width:1px; 
                        border-style:solid; 
                        border-color:black;
                        
                        }
                    td { 
                        border-width:1px;
                        border-style:solid; 
                        border-color:red;
                        padding:5px;
                        }
        
                    h1 {
                        font-size : 1.3em;
                        text-align : center;    
                    }  
                    </style>
                </head>

                <body>
                    <h1>Message envoyé depuis la formulaire de contact de :  vincentvdt.fr</h1>
                    <table>
                        <tr>
                            <td>Date: </td>
                            <td> ' . $date . '</td>
                        </tr>
                        <tr>
                            <td>Nom: </td>
                            <td> ' . $nom . '</td>
                        </tr>
                        <tr>
                            <td>Soci&eacutet&eacute: </td>
                            <td> ' . $company . '</td>
                        </tr>
                        <tr>
                            <td>E-mail: </td>
                            <td> ' . $email . '</td>
                        </tr>
                        <tr>
                            <td>Sujet: </td>
                            <td> ' . $subject . '</td>
                        </tr>
                        <tr>
                            <td>Message: </td>
                            <td> ' . $message . '</td>
                        </tr>
                        
                    </table>
                </body>
            </html>';
    if (($nom != '') && ($email != '') && ($subject != '') && ($message != '')) {
        //Server settings
        $mail->SMTPDebug = 0;                                       // Enable verbose debug output
        $mail->isSMTP();                                            // Set mailer to use SMTP
        $mail->Host       = '{SMTP Server}';  // Specify main and backup SMTP servers
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = '{username}}';                     // SMTP username
        $mail->Password   = '{password}';                               // SMTP password
        $mail->SMTPSecure = 'ssl';       // Enable TLS encryption, `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $mail->Port       = 465;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('ne-pas-repondre@vincentvdt.fr', 'Administrateur Vincentvdt.fr');
        //$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
        $mail->addAddress('{mail}');               // Name is optional
        $mail->addReplyTo($email, $nom);
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');

        // Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;
        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        // Envoi
        if ($mail->send()) { 
            echo $message_envoye;
        } else {
            echo $message_non_envoye;
        };
    } else {
        // une des 3 variables (ou plus) est vide ...
        echo $message_formulaire_invalide;
    };
?>