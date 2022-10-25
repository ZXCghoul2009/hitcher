CREATE TABLE nUser (
                       id BIGSERIAL,
                       name VARCHAR(30),
                       surname VARCHAR(40),
                       email VARCHAR(70),
                       phoneNumber VARCHAR(70),
                       sex VARCHAR,
                       dateOfBirth DATE,
                       password VARCHAR(255),
                       numberTrips INTEGER,
                       registrationDate DATE,
                       about VARCHAR(600)
);


ALTER TABLE nUser ADD CONSTRAINT nUser_pkey PRIMARY KEY (id);

CREATE TABLE car (
                     id BIGSERIAL,
                     carBrand VARCHAR(60),
                     color VARCHAR(30),
                     carNumbers VARCHAR(20),
                     numberOfSeats INTEGER,
                     user_id INTEGER
);


ALTER TABLE car ADD CONSTRAINT car_pkey PRIMARY KEY (id);

CREATE TABLE trip (
                      id BIGSERIAL,
                      numberOfSeats INTEGER,
                      departurePlace VARCHAR(50),
                      arrivalPlace VARCHAR(50),
                      day DATE,
                      time TIME,
                      price INTEGER,
                      description VARCHAR(400),
                      user_id INTEGER
);


ALTER TABLE trip ADD CONSTRAINT trip_pkey PRIMARY KEY (id);

CREATE TABLE recall (
                        id BIGSERIAL,
                        stars INTEGER,
                        comment VARCHAR(600),
                        user_id INTEGER
);


ALTER TABLE recall ADD CONSTRAINT recall_pkey PRIMARY KEY (id);

CREATE TABLE passport (
                          id BIGSERIAL,
                          passportNumber VARCHAR(10),
                          identificationNumber VARCHAR(15),
                          name VARCHAR(60),
                          surname VARCHAR(120),
                          dateOfIssue DATE,
                          user_id INTEGER
);


ALTER TABLE passport ADD CONSTRAINT passport_pkey PRIMARY KEY (id);

CREATE TABLE photo (
                       id BIGSERIAL,
                       path VARCHAR(200),
                       user_id INTEGER
);


ALTER TABLE photo ADD CONSTRAINT photo_pkey PRIMARY KEY (id);

CREATE TABLE verificationToken (
                                   id BIGSERIAL,
                                   expiryDate TIMESTAMP,
                                   token VARCHAR(255),
                                   user_id INTEGER
);


ALTER TABLE verificationToken ADD CONSTRAINT verificationToken_pkey PRIMARY KEY (id);

CREATE TABLE refreshToken (
                              id BIGSERIAL,
                              expiryDate TIMESTAMP,
                              token VARCHAR(255),
                              user_id INTEGER
);


ALTER TABLE refreshToken ADD CONSTRAINT refreshToken_pkey PRIMARY KEY (id);

ALTER TABLE car ADD CONSTRAINT car_id_fkey FOREIGN KEY (id) REFERENCES nUser(id);
ALTER TABLE trip ADD CONSTRAINT trip_user_id_fkey FOREIGN KEY (user_id) REFERENCES nUser(id);
ALTER TABLE recall ADD CONSTRAINT recall_user_id_fkey FOREIGN KEY (user_id) REFERENCES nUser(id);
ALTER TABLE passport ADD CONSTRAINT passport_user_id_fkey FOREIGN KEY (user_id) REFERENCES nUser(id);
ALTER TABLE photo ADD CONSTRAINT photo_user_id_fkey FOREIGN KEY (user_id) REFERENCES nUser(id);
ALTER TABLE verificationToken ADD CONSTRAINT verificationToken_user_id_fkey FOREIGN KEY (user_id) REFERENCES nUser(id);
ALTER TABLE refreshToken ADD CONSTRAINT refreshToken_user_id_fkey FOREIGN KEY (user_id) REFERENCES nUser(id);