
const inputPrefix = "guest@kfyrx ~ % "
let input = ""

const consoleOutput = document.getElementById("console-output");
const consoleInput = document.getElementById("console-input");

const blacklist = [
    "nano",
    "emacs",
    "pico",
    "sed",
    "vi",
    "vim",
    "logout",
    "passwd",
    "rlogin",
    "ssh",
    "slogin",
    "yppasswd",
    "mail",
    "mesg",
    "pine",
    "talk",
    "write",
    "as",
    "awk",
    "bc",
    "cc",
    "csh",
    "dbx",
    "f77",
    "gdb",
    "gprof",
    "kill",
    "ld",
    "lex",
    "lint",
    "make",
    "maple",
    "math",
    "nice",
    "nohup",
    "pc",
    "perl",
    "prof",
    "python",
    "sh",
    "yacc",
    "xcalc",
    "apropos",
    "find",
    "info",
    "man",
    "whatis",
    "whereis",
    "cd",
    "chmod",
    "chown",
    "chgrp",
    "cmp",
    "comm",
    "cp",
    "crypt",
    "diff",
    "file",
    "grep",
    "gzip",
    "ln",
    "lsof",
    "mkdir",
    "mv",
    "pwd",
    "quota",
    "rm",
    "rmdir",
    "stat",
    "sync",
    "sort",
    "tar",
    "tee",
    "tr",
    "umask",
    "uncompress",
    "uniq",
    "wc",
    "cat",
    "fold",
    "head",
    "lpq",
    "lpr",
    "lprm",
    "more",
    "less",
    "page",
    "pr",
    "tail",
    "zcat",
    "xv",
    "gv",
    "xpdf",
    "ftp",
    "rsync",
    "scp",
    "alias",
    "chquota",
    "chsh",
    "pbm",
    "popd",
    "pushd",
    "script",
    "setenv",
    "stty",
    "netstat",
    "rsh",
    "ssh",
    "bg",
    "fg",
    "jobs",
    "^y",
    "^z",
    "df",
    "du",
    "env",
    "finger",
    "history",
    "last",
    "lpq",
    "manpath",
    "printenv",
    "ps",
    "pwd",
    "set",
    "spend",
    "stty",
    "top",
    "w",
    "whois",
    "xfig",
    "xv",
    "xvscan",
    "xpaint",
    "kpaint",
    "mplayer",
    "realplay",
    "timidity",
    "xmms",
    "abiword",
    "addbib",
    "col",
    "diction",
    "diffmk",
    "dvips",
    "explain",
    "grap",
    "hyphen",
    "ispell",
    "latex",
    "pdfelatex",
    "latex2html",
    "lookbib",
    "macref",
    "ndx",
    "neqn",
    "nroff",
    "pic",
    "psdit",
    "ptx",
    "refer",
    "roffbib",
    "sortbib",
    "spell",
    "ispell",
    "style",
    "tbl",
    "tex",
    "tpic",
    "wget",
    "grabmode",
    "import",
    "xdpyinfo",
    "xkill",
    "xlock",
    "xterm",
    "xwininfo",
    "html2ps",
    "latex2html",
    "lynx",
    "netscape",
    "sitecopy",
    "weblint",
    "time",
    "zsh",
    "bash"
];

let inputAllowed = true;
let blink = true;

let blinkTimer;

function startSession() {
    let lastDate = Cookies.get("lastLogin");
    let date = lastDate != undefined ? new Date(lastDate) : new Date();

    let options = { weekday: 'short', month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false};
    
    let dateString = date.toLocaleString("en-US", options).replace(' at', '').replace(',','');

    consoleOutput.innerHTML = "Last login: " + dateString + " on ttys003<br><br>Restricted session.<br><br>Enter \"help\" for more information.";
}

startSession();
Cookies.set("lastLogin", new Date());

function blinkInput() {
    blink = !blink;

    updateInput();

    blinkTimer = setTimeout(blinkInput, 1000);
}

blinkInput();

function updateInput() {
    consoleInput.innerHTML = inputPrefix + input + (blink ? "█" : "⠀");
}

document.body.addEventListener('keypress', function (event) {
    if (event.key.length == 1) {
        input = input + event.key;
    } else {
        switch (event.code) {
            case "Space":
                input = input + " ";
                break;
            case "Backspace":
                input = input.slice(0, -1);
                break;
            case "Enter":
                parseCommand();
                input = "";
            default:
                break;
        }
    }

    blink = true;
    updateInput();

    clearTimeout(blinkTimer);
    blinkTimer = setTimeout(blinkInput, 1000);
});

function parseCommand() {
    let content = consoleOutput.innerHTML;

    let preparedInput = input.toLowerCase().trimStart().split(/(?<=^\S+)\s/)[0];

    let output = "";

    let shouldClear = false;

    if (blacklist.includes(preparedInput)) {
        output = "ksh: permission denied: " + preparedInput;
    } else {
        let date = new Date();
        let options = { weekday: 'short', month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false};
        let uptimeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
        let whoOptions = { month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", hour12: false };
        let lastDate = new Date(Cookies.get("lastLogin"));

        switch (preparedInput) {
            case "ls":
                break;
            case "help":
                output = "Restricted shell. Please contact your system administrator for more information.";
                break;
            case "date":
                output = date.toLocaleString("en-US", options).replace(" at", "");
                break;
            case "timeleft":
                output = time();
                break;
            case "clear":
                shouldClear = true;
                break;
            case "whoami":
                output = "guest";
                break;
            case "uptime":
                output = new Date().toLocaleTimeString("en-US", uptimeOptions) + "  up 42 days, 13:37, 2 users, load averages: 1.64 1.81 1.82";
                break;
            case "who":
                output = "coffeebean    console    Apr 18 20:08<br>";
                output = output + "guest         ttys003    " + lastDate.toLocaleString("en-US", whoOptions).replace(' at', '');
                break;
            case "exit":
                window.location.href = "../../";
                break;
            default:
                output = "ksh: command not found: " + preparedInput;
        }
    }

    if (content) {
        if (output) {
            output = "<br>" + output;
        }
        content = content + "<br>" + inputPrefix + input;
    } else {
        if (output) {
            output = "<br>" + output;
        }
        content = inputPrefix + input;
    }

    if (shouldClear) {
        content = "";
        output = "";
    }

    consoleOutput.innerHTML = content + output;
}

function time() {
    let now = new Date();

    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

    let delta = Math.round((tomorrow - now) / 1000);

    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    let seconds = delta % 60;

    let hoursString = hours < 9 ? "0" + hours : "" + hours;
    let minutesString = minutes < 9 ? "0" + minutes : "" + minutes;
    let secondsString = seconds < 9 ? "0" + seconds : "" + seconds;
    
    return hoursString + ":" + minutesString + ":" + secondsString;
}
