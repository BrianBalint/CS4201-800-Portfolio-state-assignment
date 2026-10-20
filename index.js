const express = require("express");
const app = express();

// Serve files from the public folder
app.use(express.static("public"));

// Parse JSON request bodies so req.body is filled on POST /notes
app.use(express.json());

const projects = [
  { id: 1, title: "Personal Portfolio Website", category: "HTML and CSS",
    description: "A hand written portfolio page with an about section, a projects section, and a contact form. The styling lives in one external stylesheet so the markup only describes structure." },
  { id: 2, title: "Responsive Portfolio Gallery", category: "Responsive Design",
    description: "A three column gallery built with CSS grid that collapses to a single column under 700 pixels. Each card pairs an image with a short note on why that file format fit the picture." },
  { id: 3, title: "JavaScript DOM Lab", category: "JavaScript",
    description: "A practice page where a button click rewrites the heading, the paragraph, and a result line. The script sits in an external file so the change survives a page refresh." }
];

// Temporary server side state. This lives in memory only, so it is
// cleared whenever the server process restarts.
let notes = [];

app.get("/projects", function (req, res) {
  res.json(projects);
});

app.get("/projects/:id", function (req, res) {
  const id = Number(req.params.id);
  const match = projects.find(function (project) {
    return project.id === id;
  });

  if (!match) {
    res.status(404).json({ message: "Project not found" });
    return;
  }

  res.json(match);
});

app.get("/notes", function (req, res) {
  res.json(notes);
});

app.post("/notes", function (req, res) {
  const text = String(req.body.text || "").trim();

  if (text === "") {
    return res.status(400).json({ message: "Note cannot be empty" });
  }

  if (text.length > 200) {
    return res.status(400).json({
      message: "Note must be 200 characters or fewer"
    });
  }

  notes.push({ id: Date.now(), text: text });
  res.status(201).json({ message: "Note saved" });
});

app.listen(3010, function () {
  console.log("Server running");
});
