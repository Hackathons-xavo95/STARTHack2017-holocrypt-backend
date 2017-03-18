DROP FUNCTION post(
  id INTEGER, username TEXT, password TEXT, message TEXT
);

CREATE OR REPLACE FUNCTION post(
  p_id INTEGER, p_username TEXT, p_password TEXT, p_message TEXT
)
RETURNS INTEGER
AS $$
DECLARE

BEGIN

  IF exists(SELECT 1
            FROM messages
            WHERE id = p_id) THEN
    UPDATE messages SET username = p_username, password = p_password, message = p_message WHERE id = p_id;
  ELSE
    INSERT INTO messages (id, username, password, message) VALUES (p_id, p_username, p_password, p_message);
  END IF;

  RETURN 1;

END;
$$ LANGUAGE plpgsql;