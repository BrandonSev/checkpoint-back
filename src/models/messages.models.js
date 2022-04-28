const { connection } = require("../../db-connection");

class Message {
  static findMany() {
    const sql = "SELECT * FROM messages";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM messages WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findMessagesByConversationId(id) {
    const sql = "SELECT * FROM messages WHERE conversation_id=? ORDER BY created_at ASC";
    return connection.promise().query(sql, [id]);
  }

  static createOne(messages) {
    const sql = "INSERT INTO messages SET ?";
    return connection.promise().query(sql, [messages]);
  }

  static updateOneById(messages, id) {
    const sql = "UPDATE messages SET ? WHERE id = ?";
    return connection.promise().query(sql, [messages, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM messages WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Message;
