CREATE TABLE Room
(
    RoomID         INT PRIMARY KEY AUTO_INCREMENT,
    UserID         INT  NOT NULL,
    Title          TEXT NOT NULL,
    Status         ENUM ('open', 'in progress', 'ended') DEFAULT 'open',
    RoomUrl        INT  NOT NULL,
    Password       TEXT,
    Rules          TEXT,
    DateOfExchange DATE,
    MaxAmount      INT,
    DateCreated    DATETIME                              DEFAULT NOW(),
    DateUpdated    DATETIME                              DEFAULT NOW(),
    DateDeleted    DATETIME,
    IsDeleted      TINYINT(1)                            DEFAULT 0,
    IsPrivate      TINYINT(1)                            DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES User (UserID)
);

CREATE TABLE RoomUser
(
    RoomUserID   INT PRIMARY KEY AUTO_INCREMENT,
    RoomID       INT NOT NULL,
    UserID       INT NOT NULL,
    PickedUserID INT,
    DateCreated  DATETIME DEFAULT NOW(),
    FOREIGN KEY (RoomID) REFERENCES Room (RoomID),
    FOREIGN KEY (UserID) REFERENCES User (UserID),
    FOREIGN KEY (PickedUserID) REFERENCES User (UserID)
);
