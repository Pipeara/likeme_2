const { Pool } = require("pg");

const pool = new Pool({
  user: "felipearacena",
  host: "localhost",
  database: "likeme",
  password: "",
  port: 5432,
  allowExitOnIdle: true,
});

const getPosts = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id");
    return result.rows;
  } catch (error) {
    console.log("Error de servidor");
    throw new Error("Error de servidor");
  }
};

const addPost = async (titulo, img, descripcion) => {
  try {
    const likes = 0;
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING id",
      [titulo, img, descripcion, likes]
    );
    const object = {
      id: result.rows[0].id,
      titulo,
      img,
      descripcion,
      likes,
    };
    return object;
  } catch (error) {
    console.log("Error de servidor");
    throw new Error("Error de servidor");
  }
};

const deletePost = async (id) => {
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      console.log("No se encontró el post");
      throw new Error("No se encontró el post");
    } else {
      console.log("Post eliminado correctamente");
      return { message: "Post eliminado correctamente" };
    }
  } catch (error) {
    console.log("Error de servidor");
    throw new Error("Error de servidor");
  }
};

const addLike = async (id) => {
  try {
    const result = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      console.log("No se encontró el post");
      throw new Error("No se encontró el post");
    } else {
      console.log("Like añadido");
      return { message: "Like añadido correctamente" };
    }
  } catch (error) {
    console.log("Error de servidor");
    throw new Error("Error de servidor");
  }
};

module.exports = { getPosts, addPost, deletePost, addLike };
