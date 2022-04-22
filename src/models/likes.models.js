const { connection } = require("../../db-connection");

class Like {
  static findMany() {
    const sql = "SELECT * FROM `like`";
    return connection.promise().query(sql);
  }

  static findAllByBusinessId(id) {
    const sql = "SELECT l.*, u.firstname, u.email, u.lastname FROM `like` l INNER JOIN users u ON u.id=l.users_id WHERE business_id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM `like` WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(like) {
    const sql = "INSERT INTO `like` SET ?";
    return connection.promise().query(sql, [like]);
  }

  static findAllByUserId(id) {
    const sql =
      "SELECT l.*, b.name as business_name, b.email as business_email from `like` l INNER JOIN business b ON b.id=l.business_id WHERE users_id=?";
    return connection.promise().query(sql, [id]);
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
