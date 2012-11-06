var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "group5honeycomb@gmail.com",
        pass: "SPSU2012"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "HoneComb Admin ? <group5honeycomb@gmail.com>", // sender address
    to: "amclaugh@spsu.edu", // list of receivers
    subject: "Authorization ?", // Subject line
    text: "You just signed up for the HoneyComb. If this was you, please click this link here: ?", // plaintext body
    html: "<b>HoneyComb ?</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});