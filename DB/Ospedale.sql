DROP DATABASE IF EXISTS Ospedale;
CREATE DATABASE Ospedale;

USE Ospedale;

DROP TABLE IF EXISTS Persone;
CREATE TABLE Persone(
	CF char(16) not null primary key,
    Nome varchar(50) not null, 
    Cognome varchar(50) not null,
    DataNascita date not null,
    LuogoNascita varchar(50) not null,
    NumTel varchar(10),
    Citta varchar(50),
    Via varchar(50),
    NumCivico varchar(50),
    CAP char(5)
);

DROP TABLE IF EXISTS Medici;
CREATE TABLE Medici(
	Id int not null auto_increment Primary key,
    CF char(16) not null
);

DROP TABLE IF EXISTS Stati;
CREATE TABLE Stati(
	Id int not null Primary key,
    Nome text not null
);

DROP TABLE IF EXISTS Note;
CREATE TABLE Note(
	Id int not null auto_increment Primary key,
    Nota text not null,
    Data datetime not null,
    IdPs int not null
);

DROP TABLE IF EXISTS ProntoSoccorso;
CREATE TABLE ProntoSoccorso(
	Id int not null auto_increment Primary key,
	CF char(16) not null,
    DataIngresso Date not null,
	IdMedico int not null,
	IdStato int not null,
    CodiceColore varchar(10) not null,
    Arrivo varchar(20) not null
);

ALTER TABLE Medici  
	ADD CONSTRAINT FKPersoneMedici FOREIGN KEY (CF) REFERENCES Persone(CF);
ALTER TABLE Note 
	ADD CONSTRAINT FKProntoSoccorsoNote FOREIGN KEY (IdPs) REFERENCES ProntoSoccorso(Id);
ALTER TABLE ProntoSoccorso 
	ADD CONSTRAINT FKPersoneProntoSoccorso FOREIGN KEY (CF) REFERENCES Persone(CF),
	ADD CONSTRAINT FKMediciProntoSoccorso FOREIGN KEY (IdMedico) REFERENCES Medici(Id),
	ADD CONSTRAINT FKStatoProntoSoccorso FOREIGN KEY (IdStato) REFERENCES Stati(Id);
