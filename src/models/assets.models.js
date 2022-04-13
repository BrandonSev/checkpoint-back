const { connection } = require("../../db-connection");

class Asset {
  static findMany() {
    const sql = "SELECT * FROM assets";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM assets WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(assets) {
    const sql = "INSERT INTO assets SET ?";
    return connection.promise().query(sql, [assets]);
  }

  static updateOneById(assets, id) {
    const sql = "UPDATE assets SET ? WHERE id = ?";
    return connection.promise().query(sql, [assets, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM assets WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM assets WHERE name=?";
    return connection.promise().query(sql, [name]);
  }
}

module.exports = Asset;
