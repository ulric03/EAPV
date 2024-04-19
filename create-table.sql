CREATE TABLE Clients (
    ID INT IDENTITY PRIMARY KEY,
    [Name] VARCHAR(255) NOT NULL,
    DateBirth DATE,
    SaleValue DECIMAL(10, 2),
    CPF VARCHAR(11) UNIQUE
);