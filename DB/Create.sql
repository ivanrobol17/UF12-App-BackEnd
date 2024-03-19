DROP DATABASE IF EXISTS AFP2024_Rocchio;
CREATE DATABASE AFP2024_Rocchio;
USE AFP2024_Rocchio;
DROP TABLE IF EXISTS Paziente;
CREATE TABLE Paziente(
    Id integer auto_increment primary key not null,
    CodicePaziente varchar(4) not null,
    Nome varchar(20) not null,
    Cognome varchar(20) not null, 
    DataNascita date not null,
    Medico varchar(50) not null,
    CodiceColore varchar(10),
    Stato int(2),
    Arrivo varchar(20)
);
DESC Paziente;
select * from Paziente
