const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

//Index Route

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

// New chat Route

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create New Chat

app.post("/user", (req, res) => {
    let { to, msg, from } = req.body;
    let newChat = new Chat({
        to: to,
        msg: msg,
        from: from,
        created_at: new Date()
    });

    newChat
        .save()
        .then(() => {
            console.log("new user added");
        })
        .catch((err) => {
            console.log(err);
        });

    res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//Update Chat
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg, created_at: new Date() }, { runValidators: true, new: true });
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("this is home page");
});

app.listen("8080", () => {
    console.log("app is listening");
});