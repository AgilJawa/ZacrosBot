let {y2mateA,y2mateV} = require('../plugins/y2mate.js')
cmd.on('yt',['ytmp3','ytmp4','ytdoc'],['downloader'],async(msg,{client,query,prefix,isUrl,command}) => {
if (!isUrl) return client.reply(msg,`Link Yang Anda Masukan Bukan Dari Url`)
let type = command.endsWith('3') || command.endsWith('audio') || command.endsWith('aud') ? (await y2mateA(isUrl[0]))[0] : (await y2mateV(isUrl[0]))[0]
let data = command.endsWith('3') || command.endsWith('audio') || command.endsWith('aud') ? {type:'audio',mimetype:'audio/mpeg',filename:type.output,quoted:msg} : {type:'video',mimetype:'video/mp4',filename:type.output,quoted:msg}

let thumbnail = (await client.getBuffer(type.thumb)).buffer
client.sendMessage(msg.from,thumbnail,'imageMessage',{quoted:msg,caption:functions.parseResult(type,'Youtube Download')})
client.sendMessage(msg.from,(await client.getBuffer(type.link)).buffer,data.type+'Message',{...data,contextInfo:{externalAdReply:{title:type.judul,description:`Zacros`,mediaType:"VIDEO",thumbnail,mediaUrl:isUrl[0],thumbnailUrl:type.thumb}}})
},{query: `Masukan Link Youtube`,param:functions.needed('Link Youtube/Video')})

cmd.on('play',['play','playvid','playaud','playdoc'],['downloader','search'],async(msg,{query,client,prefix}) => {
let res = await functions.ytSearch(query)
let data = res.videos[0]
let buttons = [{buttonId:`${prefix[0]}ytmp4 ${data.url}`,buttonText:{displayText:'Video'},type:1},{buttonId:`${prefix[0]}ytmp3 ${data.url}`,buttonText:{displayText:'Audio'},type:1}/*,{buttonId:`${prefix[0]}ytdoc ${data.url}`,buttonText:{displayText:'Dokumen'},type:1}*/]

let buffer_thumb = (await client.getBuffer(data.thumbnail))[0].buffer
let imageMessage = (await client.prepareMessageMedia(buffer_thumb,'imageMessage')).imageMessage
let buttonsMessage = {footerText:`\n© Zyy.`,contentText:`*Youtube Play*\n\nType : ${data.type}\nUrl : ${data.url}\nTitle : ${data.title}\nDurasi : ${data.timestamp}\nViews : ${data.views}\n\nNote :Jika Tidak Bisa Menekan Tombol, Ketik ${prefix[0]}ytmp3/4 ${data.url}`,buttons,imageMessage,headerType:"IMAGE"}

return client.sendMessageFromContent(msg.from,{buttonsMessage},{quoted:msg})
},{query:`Masukan Query Anda`,param:functions.needed('judul/title video')})
