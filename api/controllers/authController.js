const db = require("../auth/dbConnect");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')

const { signToken } = require("../auth/token");

// Register
const register = (req, res) => {
  const { name, email, password } = req.body;

  const q = "select * from users where email=?";
  db.query(q, [email], (e, r) => {
    if (e) {
      return res.status(500).json({
        msg: "Database error while checking user existence",
        error: e.sqlMessage,
      });
    }

    // If user already exists
    if (r.length > 0) {
      return res.status(200).json({
        error: true,
        msg: "User already exists",
      });
    }

    // If user does not exist, create a new user
    const insertUserQuery = `
    INSERT INTO users (id, name, email, password) 
    VALUES (?, ?, ?, ?)
`;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = crypto.randomUUID();

    db.query(
      insertUserQuery,
      [userId, name, email, hashedPassword],
      (insertErr, insertResult) => {
        if (insertErr) {
          return res.status(500).json({
            msg: "Database error while creating new user",
            error: insertErr.sqlMessage,
          });
        }

        return res.status(201).json({
          msg: "User registered successfully",
          error: false,
          userId,
        });
      }
    );
  });
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      msg: "Please enter credentials",
      error: true,
    });
  }

  // Check if user exists by mobile number
  const checkUserQuery = "SELECT * FROM users WHERE email=?";

  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        msg: "Database error during login",
        error: err.sqlMessage,
      });
    }
    // If user does not exist
    if (results.length < 1) {
      return res.status(404).json({
        msg: "User not found!",
        login: false,
      });
    }
    // If password check fails
    const passwordCheck = bcrypt.compareSync(password, results[0].password);

    if (!passwordCheck) {
      return res.status(401).json({
        msg: "Invalid credentials",
        login: false,
      });
    }

    return res.status(200).json({
      msg: "Login successfull",
      token: signToken({ userId: results[0].id }),
      login: true,
    });
  });
};

module.exports = {
  register,
  login,
};
