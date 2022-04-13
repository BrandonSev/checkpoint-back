const { connection } = require("../../db-connection");

class User {
  static findMany() {
    const sql = "SELECT * FROM users";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(users) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql, [users]);
  }

  static updateOneById(users, id) {
    const sql = "UPDATE users SET ? WHERE id = ?";
    return connection.promise().query(sql, [users, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM users WHERE name=?";
    return connection.promise().query(sql, [name]);
  }
}

module.exports = User;
