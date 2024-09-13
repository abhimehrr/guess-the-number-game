const db = require("../auth/dbConnect");
const { verifyToken } = require("../auth/token");

// Get all the top users
const getTopUsers = (req, res) => {
  const { limit } = req.body;

  const query = "SELECT * FROM users ORDER BY score DESC LIMIT ?";

  db.query(query, [parseInt(limit)], (err, results) => {
    if (err) {
      return res.status(500).json({
        msg: "Database error while fetching top users",
        error: err.sqlMessage,
      });
    }

    if (results.length < 1) {
      return res.status(404).json({
        msg: "No users found",
        users: [],
      });
    }

    return res.status(200).json({
      msg: `Top ${limit} users`,
      users: results,
    });
  });
};

// Get user details
const getUser = (req, res) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(403).json({
      msg: "Access token ie required!",
      error: true,
    });
  }

  const verification = verifyToken(token);
  if (verification?.message) {
    return res.status(401).json({
      msg: "Unauthorized access!",
      error: verification,
    });
  }

  const query = "SELECT * FROM users WHERE id=?";

  db.query(query, [verification.userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        msg: "Database error while fetching top users",
        error: err.sqlMessage,
      });
    }

    if (results.length < 1) {
      return res.status(404).json({
        msg: "No users found",
        user: {},
      });
    }

    delete results[0].password;

    return res.status(200).json({
      msg: `User details`,
      user: results[0],
    });
  });
};

// Update score
const updateScore = (req, res) => {
  var { score } = req.body;
  const { token } = req.headers;

  if (!token) {
    return res.status(403).json({
      msg: "Access token ie required!",
      error: true,
    });
  }

  if (!score || isNaN(score)) {
    return res.status(403).json({
      msg: "Score can't be null or character",
      error: true,
    });
  }

  const verification = verifyToken(token);
  if (verification?.message) {
    return res.status(401).json({
      msg: "Unauthorized access!",
      error: verification,
    });
  }

  const query = "UPDATE users SET score = ? WHERE id = ?";

  db.query(query, [parseInt(score), verification.userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        msg: "Database error while updating user score",
        error: err.sqlMessage,
      });
    }

    // If no rows are affected, the user ID may not exist
    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: "User not found",
        error: true,
      });
    }

    return res.status(200).json({
      msg: "User score updated successfully",
      error: false,
      updated: result.affectedRows,
    });
  });
};

module.exports = {
  getTopUsers,
  getUser,
  updateScore,
};
