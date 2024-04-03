# Get tutti i pazienti non dimessi

SELECT ps.Id as idPaziente, p.nome as nomePaziente, p.cognome as cognomePaziente, ps.CodiceColore as CodiceColore, s.Nome as Stato, m.id as IdMedico, pm.Cognome as Medico 
FROM ProntoSoccorso ps JOIN Persone p on ps.CF=p.CF JOIN Stati s on ps.IdStato=s.Id JOIN Medici m on ps.IdMedico=m.Id join Persone pm on m.CF=pm.CF
WHERE ps.IdStato!=3 
ORDER BY CASE CodiceColore WHEN 'Rosso' THEN 1 WHEN 'Arancio' THEN 2 WHEN 'Blu' THEN 3 WHEN 'Verde' THEN 4 ELSE 5 END;

# Get pazienti per medico

SELECT ps.Id as idPaziente, p.nome as nomePaziente, p.cognome as cognomePaziente, ps.CodiceColore as CodiceColore, s.Nome as Stato
FROM ProntoSoccorso ps JOIN Persone p on ps.CF=p.CF JOIN Stati s on ps.IdStato=s.Id
WHERE ps.IdMedico=1
ORDER BY CASE CodiceColore WHEN 'Rosso' THEN 1 WHEN 'Arancio' THEN 2 WHEN 'Blu' THEN 3 WHEN 'Verde' THEN 4 ELSE 5 END;

# Contatori pazienti

SELECT 
    COALESCE(Cura.CodiceColore, Attesa.CodiceColore) as CodiceColore, 
    Cura.numCura, 
    Attesa.numAttesa
FROM 
    (SELECT CodiceColore, COUNT(*) as numCura
    FROM ProntoSoccorso 
    WHERE IdStato != 3 AND IdStato != 1 
    GROUP BY CodiceColore) as Cura
LEFT JOIN 
    (SELECT CodiceColore, COUNT(*) as numAttesa
    FROM ProntoSoccorso 
    WHERE IdStato != 3 AND IdStato = 1 
    GROUP BY CodiceColore) as Attesa
ON Cura.CodiceColore = Attesa.CodiceColore

UNION

SELECT 
    COALESCE(Cura.CodiceColore, Attesa.CodiceColore) as CodiceColore, 
    Cura.numCura, 
    Attesa.numAttesa
FROM 
    (SELECT CodiceColore, COUNT(*) as numCura
    FROM ProntoSoccorso 
    WHERE IdStato != 3 AND IdStato != 1 
    GROUP BY CodiceColore) as Cura
RIGHT JOIN 
    (SELECT CodiceColore, COUNT(*) as numAttesa
    FROM ProntoSoccorso 
    WHERE IdStato != 3 AND IdStato = 1 
    GROUP BY CodiceColore) as Attesa
ON Cura.CodiceColore = Attesa.CodiceColore
ORDER BY CASE CodiceColore WHEN 'Rosso' THEN 1 WHEN 'Arancio' THEN 2 WHEN 'Blu' THEN 3 WHEN 'Verde' THEN 4 ELSE 5 END;

# Get dettagli paziente
SELECT ps.Id as idPaziente, ps.CF as CodiceFiscale, p.nome as nomePaziente, p.cognome as cognomePaziente, p.DataNascita, p.LuogoNascita, p.NumTel, p.Citta, p.Via, p.NumCivico, p.CAP, ps.DataIngresso as DataIngresso, ps.Arrivo as ModalitaArrivo, ps.CodiceColore as CodiceColore, s.Nome as Stato, m.id as IdMedico, pm.Cognome as Medico 
FROM ProntoSoccorso ps JOIN Persone p on ps.CF=p.CF JOIN Stati s on ps.IdStato=s.Id JOIN Medici m on ps.IdMedico=m.Id join Persone pm on m.CF=pm.CF
WHERE ps.Id=1;

# Get note paziente
SELECT Id as IdNota, Nota as Testo, Data, IdPs As idPaziente
FROM Note
WHERE IdPs=1;