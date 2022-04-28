/* Replace with your SQL commands */
ALTER TABLE messages DROP CONSTRAINT fk_messages_conversation_id;
DROP TABLE conversations;
DROP TABLE messages;