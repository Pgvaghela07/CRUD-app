const express = require('express');
const path = require("path");
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));  
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views",path.join(path.join(__dirname, "views")));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "piyush",
        content: "I'm a full stack developer"
    },
    {
        id: uuidv4(),
        username: "chaitanya",
        content: "i'm a project manager"
    },
    {
        id: uuidv4(),
        username: "anand",
        content: "i'm a full stack developer"
    }
];

app.get("/", (req, res) =>{
    res.render("index", { posts });
});
app.get("/posts/new", (req, res) =>{
    res.render("new");
});

app.post("/" , (req, res) =>{
    let { username, content } = req.body; 
    let id  = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/"); 
}); 

app.get("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((post) => id === post.id);
    res.render("showpost", { post });
});

app.patch("/posts/:id", (req, res) =>{
    let {id } = req.params;
    let post = posts.find((post) => id === post.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/");
});

app.get("/posts/:id/edit" , (req, res) =>{
    let {id } = req.params;
    let post = posts.find((post) => id === post.id);
    res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) =>{
    let {id } = req.params;
    posts = posts.filter((post) => id !== post.id);
    res.redirect("/");
});
app.listen(8080, () => {
    console.log("server start at localhost 8080");
});