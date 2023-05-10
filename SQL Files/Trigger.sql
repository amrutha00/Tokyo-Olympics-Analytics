DELIMITER //
DROP TRIGGER IF EXISTS update_medals;
CREATE TRIGGER update_medals
AFTER UPDATE ON Top3
FOR EACH ROW
BEGIN
	DECLARE t_rank INT;
    DECLARE old_noc VARCHAR(50);
    DECLARE new_noc VARCHAR(50);
    DECLARE total_val INT;
    DECLARE old_val INT;
    DECLARE val_equal INT;
    DECLARE old_val_equal INT;
    DECLARE t_silver INT;
    DECLARE t_bronze INT;
    DECLARE t_gold INT;
   

   
	# Decrement Silver and total for OLD.SILVER and set the total_rank
    #1. Determine the old.silver noc
    #2. Find out it's decremented value
    #3. Check if it matches any total value in the table
    IF NEW.Silver <> OLD.Silver THEN
		SET old_noc = OLD.SILVER;
        
        SET old_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',old_noc,'%'));
        SET old_val_equal = (SELECT COUNT(*) from trail_Medals where Total = old_val);
		SET total_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',old_noc,'%')) - 1;
		SET val_equal = (SELECT COUNT(*) from trail_Medals where Total = total_val);
	    SET t_silver = (SELECT SILVER from trail_Medals where BINARY NOC  LIKE CONCAT('%',old_noc,'%'));
        
        IF old_val_equal >1 and val_equal > 0 THEN 
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val) - 1;
			UPDATE trail_Medals
			SET Silver = t_silver - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE NOC LIKE CONCAT('%',old_noc,'%');
			
			UPDATE trail_Medals
			SET  Total_Rank = t_rank 
			WHERE Total IN (SELECT total FROM Medals WHERE total = total_val);
            
		ELSEIF old_val_equal <= 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = old_val);
			UPDATE trail_Medals
			SET Silver = t_silver - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
			
			UPDATE trail_Medals
			SET  Total_Rank = t_rank - 1
			WHERE Total IN (SELECT total FROM Medals WHERE total = total_val);
            
		ELSEIF old_val_equal > 1 and val_equal = 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total < (old_val - 1) order by Total_Rank ASC LIMIT 1)-1;
			UPDATE trail_Medals
			SET Silver = t_silver - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
            
		ELSE
			
            UPDATE trail_Medals
			SET Silver = t_silver - 1, Total =  total_val
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
		END IF;
        
    
		
		SET new_noc = NEW.SILVER;
		SET old_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')); #20
        SET old_val_equal = (SELECT COUNT(*) from trail_Medals where Total = old_val); #1
		SET total_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')) + 1; #21
		SET val_equal = (SELECT COUNT(*) from trail_Medals where Total = total_val); #1
         SET t_silver = (SELECT SILVER from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')) + 1; #4
         
		IF old_val_equal > 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val);
			UPDATE trail_Medals
			SET Silver = t_silver, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
            
          
            UPDATE trail_Medals
			SET  Total_Rank = t_rank + 2
			WHERE Total IN (Select total from Medals where total = old_val);
            
            
            
		ELSEIF old_val_equal <= 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val);
			UPDATE trail_Medals
			SET Silver = t_silver, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
            
		ELSEIF old_val_equal > 1 and val_equal = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = " in else if";
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = old_val);
			UPDATE trail_Medals
			SET Silver = t_silver , Total =  total_val
			WHERE NOC LIKE CONCAT('%',new_noc,'%');
            
            UPDATE trail_Medals
			SET  Total_Rank = t_rank + 1
			WHERE Total IN (SELECT total FROM Medals WHERE total = old_val);
			
            
		ELSE
           #SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "In else";
			UPDATE trail_Medals
			SET Silver = t_silver , Total =  total_val
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
		END IF;
        
	 ELSEIF NEW.Bronze <> OLD.Bronze THEN
		SET old_noc = OLD.Bronze;
      
        SET old_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',old_noc,'%'));
      
        SET old_val_equal = (SELECT COUNT(*) from trail_Medals where Total = old_val);
       
		SET total_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',old_noc,'%')) - 1;
        
		SET val_equal = (SELECT COUNT(*) from trail_Medals where Total = total_val);
	    SET t_bronze = (SELECT Bronze from trail_Medals where BINARY NOC  LIKE CONCAT('%',old_noc,'%'));
		
        IF old_val_equal >1 and val_equal > 0 THEN 
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val) - 1;
			UPDATE trail_Medals
			SET Bronze = t_bronze - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE NOC LIKE CONCAT('%',old_noc,'%');
			
			UPDATE trail_Medals
			SET  Total_Rank = t_rank 
			WHERE Total IN (SELECT total FROM Medals WHERE total = total_val);
            
		ELSEIF old_val_equal <= 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = old_val);
			UPDATE trail_Medals
			SET Bronze = t_bronze - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
			
			UPDATE trail_Medals
			SET  Total_Rank = t_rank - 1
			WHERE Total IN (SELECT total FROM Medals WHERE total = total_val);
            
		ELSEIF old_val_equal > 1 and val_equal = 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total < (old_val - 1) order by Total_Rank ASC LIMIT 1)-1;
			UPDATE trail_Medals
			SET Bronze = t_bronze - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
            
		ELSE
            UPDATE trail_Medals
			SET Bronze = t_bronze - 1, Total =  total_val
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
		
		END IF;
        
    
		
		SET new_noc = NEW.BRONZE;
		SET old_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')); #20
        SET old_val_equal = (SELECT COUNT(*) from trail_Medals where Total = old_val); #1
		SET total_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')) + 1; #21
		SET val_equal = (SELECT COUNT(*) from trail_Medals where Total = total_val); #1
         SET t_bronze = (SELECT BRONZE from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')) + 1; #4
        
		IF old_val_equal > 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val);
			UPDATE trail_Medals
			SET Bronze = t_bronze, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
            
          
            UPDATE trail_Medals
			SET  Total_Rank = t_rank + 2
			WHERE Total IN (Select total from Medals where total = old_val);
            
            
            
		ELSEIF old_val_equal <= 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val);
			UPDATE trail_Medals
			SET Bronze = t_bronze, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
            
		ELSEIF old_val_equal > 1 and val_equal = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = " in else if";
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = old_val);
			UPDATE trail_Medals
			SET Bronze = t_bronze , Total =  total_val
			WHERE NOC LIKE CONCAT('%',new_noc,'%');
            
            UPDATE trail_Medals
			SET  Total_Rank = t_rank + 1
			WHERE Total IN (SELECT total FROM Medals WHERE total = old_val);
			
            
		ELSE
           
			UPDATE trail_Medals
			SET Bronze = t_bronze , Total =  total_val
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
		END IF;
	ELSE
    SET old_noc = OLD.Gold;
       
        SET old_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',old_noc,'%'));
        SET old_val_equal = (SELECT COUNT(*) from trail_Medals where Total = old_val);
		SET total_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',old_noc,'%')) - 1;
		SET val_equal = (SELECT COUNT(*) from trail_Medals where Total = total_val);
	    SET t_gold = (SELECT GOLD from trail_Medals where BINARY NOC  LIKE CONCAT('%',old_noc,'%'));
        IF old_val_equal >1 and val_equal > 0 THEN 
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val) - 1;
			UPDATE trail_Medals
			SET Gold = t_gold - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE NOC LIKE CONCAT('%',old_noc,'%');
			
			UPDATE trail_Medals
			SET  Total_Rank = t_rank 
			WHERE Total IN (SELECT total FROM Medals WHERE total = total_val);
            
		ELSEIF old_val_equal <= 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = old_val);
			UPDATE trail_Medals
			SET Gold = t_gold - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
			
			UPDATE trail_Medals
			SET  Total_Rank = t_rank - 1
			WHERE Total IN (SELECT total FROM Medals WHERE total = total_val);
            
		ELSEIF old_val_equal > 1 and val_equal = 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total < (old_val - 1) order by Total_Rank ASC LIMIT 1)-1;
			UPDATE trail_Medals
			SET Gold = t_gold - 1, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
            
		ELSE
			
            UPDATE trail_Medals
			SET Gold = t_gold - 1, Total =  total_val
			WHERE BINARY NOC LIKE CONCAT('%',old_noc,'%');
           
		END IF;
        
    
		
		SET new_noc = NEW.GOLD;
		SET old_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')); #20
        SET old_val_equal = (SELECT COUNT(*) from trail_Medals where Total = old_val); #1
		SET total_val = (Select Total from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')) + 1; #21
		SET val_equal = (SELECT COUNT(*) from trail_Medals where Total = total_val); #1
         SET t_gold = (SELECT GOLD from trail_Medals where BINARY NOC LIKE CONCAT('%',new_noc,'%')) + 1; #4
        
		IF old_val_equal > 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val);
			UPDATE trail_Medals
			SET Gold = t_gold, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
            
          
            UPDATE trail_Medals
			SET  Total_Rank = t_rank + 2
			WHERE Total IN (Select total from Medals where total = old_val);
            
            
            
		ELSEIF old_val_equal <= 1 and val_equal > 0 THEN
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = total_val);
			UPDATE trail_Medals
			SET Gold = t_gold, Total =  total_val, Total_Rank = t_rank 
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
            
		ELSEIF old_val_equal > 1 and val_equal = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = " in else if";
			SET t_rank = (SELECT DISTINCT(Total_Rank) from trail_Medals where Total = old_val);
			UPDATE trail_Medals
			SET Gold = t_gold , Total =  total_val
			WHERE NOC LIKE CONCAT('%',new_noc,'%');
            
            UPDATE trail_Medals
			SET  Total_Rank = t_rank + 1
			WHERE Total IN (SELECT total FROM Medals WHERE total = old_val);
			
            
		ELSE
           
			UPDATE trail_Medals
			SET Gold = t_gold , Total =  total_val
			WHERE BINARY NOC LIKE CONCAT('%',new_noc,'%');
		END IF;
        
      
	END IF;   
END //
DELIMITER ;
