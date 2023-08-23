CREATE MIGRATION m1mrxn4yioaz22tcbnqktzgjz5nw6rwuogcnb3vbka6yywcd6zm67q
    ONTO initial
{
  CREATE TYPE default::Application {
      CREATE REQUIRED PROPERTY client_id: std::str;
      CREATE REQUIRED PROPERTY client_secret: std::str;
      CREATE REQUIRED PROPERTY host: std::str;
  };
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY access_token: std::str;
      CREATE REQUIRED PROPERTY host: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
};
