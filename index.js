const express = require("express");
const cors = require("cors");
const { getPosts, addPost, deletePost, addLike } = require("./consulta");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => console.log(`SERVIDOR ENCENDIDO EN PUERTO ${PORT}`));

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error de servidor" });
  }
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;

  // Validación: Comprobar que los campos no estén vacíos
  if (!titulo || !img || !descripcion) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const newPost = await addPost(titulo, img, descripcion);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error de servidor" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePost(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "No se encontró el post" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await addLike(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "No se encontró el post" });
  }
});

// Manejar rutas no válidas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

