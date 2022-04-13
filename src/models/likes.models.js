const { connection } = require("../../db-connection");

class Like {
  static findMany() {
    const sql = "SELECT * FROM `like`";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM `like` WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(like) {
    const sql = "INSERT INTO `like` SET ?";
    return connection.promise().query(sql, [like]);
  }

  static updateOneById(like, id) {
    const sql = "UPDATE `like` SET ? WHERE id = ?";
    return connection.promise().query(sql, [like, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM `like` WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM `like` WHERE name=?";
    return connection.promise().query(sql, [name]);
  }
}

module.exports = Like;
