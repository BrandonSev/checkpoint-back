const { connection } = require("../../db-connection");

class Conversation {
  static findMany() {
    const sql = "SELECT * FROM conversations";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM conversations WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static findConversationsByUserId(id) {
    const sql = "SELECT c.*, b.name, b.avatar FROM conversations c LEFT JOIN business b ON b.id=c.sender_id WHERE receiver_id = ? OR sender_id = ?";
    return connection.promise().query(sql, [id, id]);
  }

  static findOneByEmail(email) {
    const sql = "SELECT * FROM conversations WHERE email = ?";
    return connection.promise().query(sql, [email]);
  }

  static createOne(conversations) {
    const sql = "INSERT INTO conversations SET ?";
    return connection.promise().query(sql, [conversations]);
  }

  static updateOneById(conversations, id) {
    const sql = "UPDATE conversations SET ? WHERE id = ?";
    return connection.promise().query(sql, [conversations, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM conversations WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM conversations WHERE name=?";
    return connection.promise().query(sql, [name]);
  }
}

module.exports = Conversation;
