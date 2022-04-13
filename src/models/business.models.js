const { connection } = require("../../db-connection");

class Business {
  static findMany() {
    const sql = "SELECT * FROM business";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM business WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(business) {
    const sql = "INSERT INTO business SET ?";
    return connection.promise().query(sql, [business]);
  }

  static updateOneById(business, id) {
    const sql = "UPDATE business SET ? WHERE id = ?";
    return connection.promise().query(sql, [business, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM business WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM business WHERE name=?";
    return connection.promise().query(sql, [name]);
  }
}

module.exports = Business;
