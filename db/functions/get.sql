DROP FUNCTION get(id INTEGER, username TEXT, password TEXT);

CREATE FUNCTION get(p_id INTEGER, p_username TEXT, p_password TEXT) RETURNS TEXT as 'SELECT message
                FROM messages WHERE id = p_id AND username = p_username AND password = p_password;' language 'sql';