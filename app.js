// firebase info
const firebaseConfig = {
    apiKey: "AIzaSyC04jRed-fylSuo6kfm3DU40fw8qYuw1FU",
    authDomain: "supernachoninja.firebaseapp.com",
    databaseURL: "https://supernachoninja.firebaseio.com",
    projectId: "supernachoninja",
    storageBucket: "supernachoninja.appspot.com",
    messagingSenderId: "3050108225",
    appId: "1:3050108225:web:0356566449ac56821a9dc0"
};
// this is required - throws console errors if not in place 
firebase.initializeApp(firebaseConfig);
// this is not the actual data - pointer to data location
let db = firebase.database();

// *************************************************** //

$(document).ready(function () {

    // grabs data - listens for changes to data
    db.ref("chat/").on("child_added", function (snapshot) {
        let dataOutput = "<div class='return'>" +
            "<p class='name'>" + snapshot.child("name").val() + "</p>" +
            "<p class='message'>" + snapshot.child("message").val() + "</p>" +
            "</div>";
        $(".chat-output").html($(".chat-output").html() + dataOutput);
    });

    let username = "";
    // click to get username
    $(".username-button").on("click", function (event) {
        if ($(".username-input").val().trim() === "") {
            $(".name-enter-prompt").text("Please enter a valid username");
        } else {
            username = $(".username-input").val().trim();
            $(".screen").toggleClass("hide unhide");
            $(".greeting").html("<h3>Greetings " + username + "!</h3>");
        }
    });
    // click to send a chat
    $(".enter-chat-button").on("click", function (event) {
        if ($(".chat-input").val().trim() === "") {
            $(".enter-chat-button").text("error");
            setTimeout(function () {
                $(".enter-chat-button").text("Submit");
            }, 400);
        } else {
            let chatOut = $(".chat-input").val().trim();
            // sent chat to db
            db.ref("chat/" + Date.now()).set({
                name: username,
                message: chatOut
            });
            $(".chat-input").val("");
        }
    });
});