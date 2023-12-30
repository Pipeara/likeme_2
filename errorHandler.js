import express from "express";
import cors from "cors";
import { handleErrors } from './errorHandler';
import { getPosts, addPost, deletePost, addLike } from './consulta';

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
    const errorResponse = handleErrors(error.code); // Asumiendo que el código de error se encuentra en error.code
    res.status(errorResponse.status).json(errorResponse);
  }
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;

  // Validación: Comprobar que los campos no estén vacíos
  if (!titulo || !img || !descripcion) {
    const errorResponse = handleErrors("400");
    return res.status(errorResponse.status).json(errorResponse);
  }

  try {
    const newPost = await addPost(titulo, img, descripcion);
    res.json(newPost);
  } catch (error) {
    const errorResponse = handleErrors(error.code); // Asumiendo que el código de error se encuentra en error.code
    res.status(errorResponse.status).json(errorResponse);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePost(id);
    res.json(result);
  } catch (error) {
    const errorResponse = handleErrors(error.code); // Asumiendo que el código de error se encuentra en error.code
    res.status(errorResponse.status).json(errorResponse);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await addLike(id);
    res.json(result);
  } catch (error) {
    const errorResponse = handleErrors(error.code); // Asumiendo que el código de error se encuentra en error.code
    res.status(errorResponse.status).json(errorResponse);
  }
});

// Manejar rutas no válidas (404)
app.use((req, res) => {
  const errorResponse = handleErrors("404");
  res.status(errorResponse.status).json(errorResponse);
});
