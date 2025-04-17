const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "rahul",
        to: "rajanya",
        msg: "hi, how are you",
        created_at: new Date()
    },
    {
        from: "shivam",
        to: "gopi",
        msg: "are you coming to college, today",
        created_at: new Date()
    },
    {
        from: "ishita",
        to: "arka",
        msg: "lets, catch up today",
        created_at: new Date()
    },
    {
        from: "anirban",
        to: "saikat",
        msg: "we will attend the meeting in evening",
        created_at: new Date()
    },
    {
        from: "mousumi",
        to: "anisha",
        msg: "how is your preparation going on?",
        created_at: new Date()
    },
    {
        from: "abrar",
        to: "sandip",
        msg: "our exam is starting from tomorrow",
        created_at: new Date()
    },
];

Chat.insertMany(allChats);