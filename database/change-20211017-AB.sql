CREATE TABLE Role
(
    RoleID INT PRIMARY KEY AUTO_INCREMENT,
    Name   TEXT
);

INSERT INTO Role(Name)
VALUES ('Admin'),
       ('User');

CREATE TABLE User
(
    UserID      INT PRIMARY KEY AUTO_INCREMENT,
    Username    VARCHAR(20) UNIQUE,
    Name        TEXT,
    Password    TEXT,
    Email       VARCHAR(50) UNIQUE,
    RoleID      INT,
    DateCreated DATETIME   DEFAULT NOW(),
    DateUpdated DATETIME   DEFAULT NOW(),
    DateDeleted DATETIME,
    IsDeleted   TINYINT(1) DEFAULT 0,
    FOREIGN KEY (RoleID) REFERENCES Role (RoleID)
);

CREATE TABLE UserToken
(
    UserTokenID    INT PRIMARY KEY AUTO_INCREMENT,
    UserID         INT,
    Token          TEXT,
    DateCreated    DATETIME DEFAULT NOW(),
    DateExpiration DATETIME,
    DateDeleted    DATETIME,
    FOREIGN KEY (UserID) REFERENCES User (UserID)
);