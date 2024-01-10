import cron from "node-cron"
import axios from "axios";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';



function appendToDisk(data) {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);
    const fileName = 'logfile.txt';
    const filePath = path.join(__dirname, fileName);
  
    const dataString = JSON.stringify(data) + '\n';

  
    fs.appendFile(filePath, dataString, (err) => {
        if (err) {
        console.error(`Error appending to file: ${err.message}`);
        }
    });
}




let config={
    data:{
        "to" : "",
        "priority": "high",
        "mutable_content": true,
        "notification": {
            "badge": 42,
            "title": "Huston! The eagle has landed!",
            "body": "hello"
        },
        "data" : {
            "content": {
                "id": 1,
                "badge": 1,
                "channelKey": "exam",
                "displayOnForeground": true,
                "notificationLayout": "BigPicture",
                "largeIcon": "https://br.web.img3.acsta.net/pictures/19/06/18/17/09/0834720.jpg",
                "bigPicture":"https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w",
                "showWhen": true,
                "autoDismissible": true,
                "wakeUpScreen":true,
    
                "payload": {
                    "secret": "Awesome Notifications Rocks!"
                }
            },
            "actionButtons": [
                {
                    "key": "REDIRECT",
                    "label": "Redirect",
                    "autoDismissible": true
                },
                {
                    "key": "DISMISS",
                    "label": "Dismiss",
                    "actionType": "DismissAction",
                    "autoDismissible": true
                }
            ]
            
            
        }
    },
    headers:{
        "Authorization":"key=AAAA5W5J99I:APA91bHe0ueUqOLPF48BMghg6H85StrhktOm1kj_lpAmhUp41ULe_MA2XdI-TBc_CaFbCWxUJnpCVcrIvEwa3ttHeUWCYP-POx8V9J_uZR3YCxZcgq_ib7DHbKDJxbJaf8IvWQ7O1JHe"
    }
}

const sendNotifications=async (deviceId)=>{
    config.data["to"]=deviceId;
    try{
        await axios.post("https://fcm.googleapis.com/fcm/send",config.data,{headers:config.headers})
    }catch(e){
        appendToDisk({
            Time:new Date(Date.now()),
            message:e.message,
            data:config.data
        })
    }
}



cron.schedule('*/5 * * * * *', () => {
    sendNotifications("cgLjHgqQRKSVUnODvWVFG9:APA91bEJwpxyD50XA04Qh-RQBNwAr7V1jqjXxgZb3rhbz6OZoTNx4tHIdmwiIDtgR8UFL8Tt3w9nV08OTafmcLJ2T9ObATyWaQgRdat37TmYkaRyCZAVEI1jOQtvtQAB4HTtghoxh2Vq");
})

