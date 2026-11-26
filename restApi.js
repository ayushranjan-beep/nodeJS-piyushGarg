const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Built-in Middleware: Parses URL-encoded form data into req.body
app.use(express.urlencoded({ extended: false }));


// SSR
app.get("/users", (req, res) => {
    const html = `<ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    return res.send(html);
});

// CSR

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_description) {
        return res.status(400).json({ msg: "All fields are required..." });

        // Types we can send JSON, html, download, redirect. json, xml 
        // // req.set content, header...
    }

    users.push({ id: users.length + 1, ...body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        return res.status(201).json({ status: "success", id: users.length });
    });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));







