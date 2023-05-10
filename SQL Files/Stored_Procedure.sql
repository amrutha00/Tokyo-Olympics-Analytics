DELIMITER //

CREATE PROCEDURE Discipline_Top3(adv INT, noc VARCHAR(50), view VARCHAR(50))
BEGIN

  -- Declare variables
  DECLARE Sport VARCHAR(50);
  DECLARE Dis VARCHAR(50);
  DECLARE one VARCHAR(50);
  DECLARE two VARCHAR(50);
  DECLARE three VARCHAR(50);
  DECLARE exit_loop BOOLEAN DEFAULT FALSE; -- Declare exit_loop variable

  DECLARE discur CURSOR FOR (
    SELECT Discipline
    FROM Top3
    GROUP BY Discipline
  );
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE; -- Update handler to use exit_loop variable
  IF adv = 1 THEN
    IF view = "SUMMARY" THEN
	  SELECT Discipline, SUM(Count) AS TotalCount
		FROM (SELECT Discipline, COUNT(Gold) as Count FROM Top3 WHERE Gold = noc GROUP BY Discipline 
		UNION
		SELECT Discipline, COUNT(Silver) as Count FROM Top3 WHERE Silver = noc GROUP BY Discipline 
		UNION
		SELECT Discipline, COUNT(Bronze) as Count FROM Top3 WHERE Bronze = noc GROUP BY Discipline) AS TopSports
		GROUP BY Discipline
		ORDER BY TotalCount DESC
		LIMIT 3;
  ELSE
	  SELECT Discipline, 
       SUM(Gold) AS GoldCount, 
       SUM(Silver) AS SilverCount, 
       SUM(Bronze) AS BronzeCount, 
       SUM(Gold + Silver + Bronze) AS TotalCount
		FROM (
			SELECT Discipline, 
				   COUNT(Gold) AS Gold, 
				   0 AS Silver, 
				   0 AS Bronze
			FROM Top3 
			WHERE Gold = noc
			GROUP BY Discipline 
			UNION
			SELECT Discipline, 
				   0 AS Gold, 
				   COUNT(Silver) AS Silver, 
				   0 AS Bronze
			FROM Top3 
			WHERE Silver = noc
			GROUP BY Discipline 
			UNION
			SELECT Discipline, 
				   0 AS Gold, 
				   0 AS Silver, 
				   COUNT(Bronze) AS Bronze
			FROM Top3 
			WHERE Bronze = noc
			GROUP BY Discipline
		) AS TopSports
		GROUP BY Discipline
		ORDER BY TotalCount DESC
		LIMIT 3;
   END IF;
   
ELSE
  
  DROP VIEW IF exists Discipline_Country;
  CREATE VIEW Discipline_Country AS 
	SELECT Discipline, Gold AS country, 'GOLD' AS medal 
	FROM Top3 
	WHERE Discipline IN (SELECT Discipline FROM Top3) 
	UNION ALL 
	SELECT Discipline, Silver AS country, 'SILVER' AS medal 
	FROM Top3 
	WHERE Discipline IN (SELECT Discipline FROM Top3) 
	UNION ALL 
	SELECT Discipline, Bronze AS country, 'BRONZE' AS medal 
	FROM Top3 
	WHERE Discipline IN (SELECT Discipline FROM Top3)
	ORDER BY Discipline;
    
  DROP TABLE IF EXISTS `Top3_Countries`;
  CREATE TABLE `Top3_Countries` (
    Discipline VARCHAR(50),
    Country VARCHAR(50),
    Medal_Count INT,
    Gold INT, 
    Silver INT, 
    Bronze INT
  );
  BEGIN
  OPEN discur;
  read_loop: LOOP 
    FETCH discur INTO Sport;
    IF exit_loop THEN
      LEAVE read_loop;
    END IF;
	
    INSERT INTO Top3_Countries (Discipline, Country, Medal_Count, Gold, Silver, Bronze)
    SELECT Sport as Discipline, country, COUNT(country) as count,
       SUM(CASE WHEN medal = 'GOLD' THEN 1 ELSE 0 END) AS gold,
       SUM(CASE WHEN medal = 'SILVER' THEN 1 ELSE 0 END) AS silver,
       SUM(CASE WHEN medal = 'BRONZE' THEN 1 ELSE 0 END) AS bronze
	FROM Discipline_Country
	WHERE Discipline = Sport
	GROUP BY country
	ORDER BY count DESC, gold DESC, silver DESC, bronze DESC
	LIMIT 3;
  END LOOP read_loop;
  CLOSE discur;
  DROP VIEW IF EXISTS Discipline_Country;
  SELECT * FROM Top3_Countries;
  END;
END IF;
END //

DELIMITER ;
