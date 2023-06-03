$(document).ready(function(){
    let inputCount = 0;

    if (Cookies.get("consent") == "true") {
        $("#disclaimer-container").css("display", "none");
        $("#secret-container").css("display", "block");

        if (Cookies.get("meow-code") == "true") {
            document.title = "CFY BN>> AUTHORIZED FOR OTP";
            $("#secret-code").html("AUTHORIZED FOR OTP:<br><br>KEY: 7UV 9EB 3WA<br>MSG: 9(0@7?DWV");

            let cryptpad = window.frames["cryptpad"];
            cryptpad.focus();
            cryptpad.print();
        } else {
            document.title = "CFY BN>> 3 4 ⅔ 1";
        }
    } else {
        $("#disclaimer-container").fadeIn(1500);
    }

    const time = () => {
        let now = new Date();

        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

        let delta = Math.round((tomorrow - now) / 1000);

        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        let seconds = delta % 60;

        $("#secret-title").html("TIME LEFT UNTIL USER TERMINATION: " + (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

        $("#secret-title").css("color", seconds % 2 == 0 ? "red" : "white");

        setTimeout(time, 1000);
    }
      
    time();

    $("#disclaimer-button").click(function() {
	    Cookies.set("consent", "true", { expires: 1 });

        $("#disclaimer-container").css("animation", "turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1)");
        $("#disclaimer-container").css("animation-fill-mode", "forwards");

		setTimeout(function() {
            $("#disclaimer-container").css("display", "none");
            $("#secret-container").fadeIn(1500);
            document.title = "CFY BN>> 3 4 ⅔ 1";
        }, 1500);
    });

    let allowedInput = true;

    $(document).keydown(function(event) {
        if (Cookies.get("meow-code") != "true") {
            if (event.repeat != undefined) {
                allowedInput = !event.repeat;
            }
            if (!allowedInput) return;
            allowedInput = false;

            $("#secret-code").css("color", "red");

            if (event.key == "m" && inputCount == 0) {
                inputCount = 1;
                return;
            }
            
            if (event.key == "e" && inputCount == 1) {
                inputCount = 2;
                return;
            }

            if (event.key == "o" && inputCount == 2) {
                inputCount = 3;
                return;
            }
            
            if (event.key == "w" && inputCount == 3) {
                inputCount = 0;

                Cookies.set("meow-code", "true", { expires: 1 });

                document.title = "CFY BN>> AUTHORIZED FOR OTP";
                $("#secret-code").html("AUTHORIZED FOR OTP:<br><br>KEY: 7UV 9EB 3WA<br>MSG: 9(0@7?DWV");

                let cryptpad = window.frames["cryptpad"];
                cryptpad.focus();
                cryptpad.print();

                return;
            }
            
            inputCount = 0;
        }
    });

    $(document).keyup(function(event) {
        if (Cookies.get("meow-code") != "true") { 
            $("#secret-code").css("color", "white"); 
            allowedInput = true;
        }
    });

    $(document).focus(function(event) { 
        if (Cookies.get("meow-code") != "true") { 
            $("#secret-code").css("color", "white"); 
            allowedInput = true;
        }
    });

    $(document).blur(function(event) { 
        if (Cookies.get("meow-code") != "true") { 
            $("#secret-code").css("color", "white"); 
            allowedInput = true;
        }
    });
});
