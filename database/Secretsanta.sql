create table users (
  user_id int primary key auto_increment,
  name text,
  email text,
  username text unique,
  password text,
  `time` timestamp,
  token text
);