CREATE TABLE ResetPasswordToken
(
    ResetPasswordTokenID INT PRIMARY KEY AUTO_INCREMENT,
    UserID               INT  NOT NULL,
    Token                TEXT NOT NULL,
    DateCreated          DATETIME DEFAULT NOW(),
    DateExpires          DATETIME,
    DateUsed             DATETIME,
    FOREIGN KEY (UserID) REFERENCES User (UserID)
);