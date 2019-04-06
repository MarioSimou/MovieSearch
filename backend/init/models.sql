-- USERS
CREATE TABLE users(
    id serial ,
    username varchar( 255 ),
    email varchar( 255 ),
    password varchar( 100 ),
    create_date timestamp
);

ALTER TABLE users ADD CONSTRAINT users_pk PRIMARY KEY (id);
ALTER TABLE users ADD CONSTRAINT users_uniques UNIQUE (username , email , password ); 
ALTER TABLE users ALTER COLUMN username SET NOT NULL;
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users ALTER COLUMN password SET NOT NULL;
-- default value
ALTER TABLE users ALTER COLUMN create_date SET default CURRENT_TIMESTAMP;
-- INDEXES
CREATE INDEX users_email_index ON uses USING btree( email );

-- MOVIES
CREATE TABLE movies(
    id serial , 
    movie_title varchar( 250),
    data jsonb
);

ALTER TABLE movies ADD CONSTRAINT movies_pk PRIMARY KEY (id); 
ALTER TABLE movies ADD CONSTRAINT movies_uniques UNIQUE ( movie_title , data );
ALTER TABLE movies ALTER COLUMN data SET NOT NULL;
ALTER TABLE movies ALTER COLUMN movie_title SET NOT NULL;
-- unique
ALTER TABLE movies ADD CONSTRAINT movie_title_uniq UNIQUE (movie_title);
-- index
CREATE INDEX movies_data_index ON movies USING btree( data );