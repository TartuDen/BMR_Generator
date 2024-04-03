package wiper

import "database/sql"

func WipeEquipmentTable(db *sql.DB) error {
	// SQL script to delete existing data and insert new data
	script := `
        -- Delete existing data from the equipment table to start fresh
        DELETE FROM equipment;

        -- Insert data for balances
        INSERT INTO equipment (name, code, description, utensils)
        VALUES
            ('balances', '007-1', 'max=3kg', FALSE),
            ('balances', '007-10', 'max=2kg', FALSE),
            ('balances', '007-12', 'max=1kg', FALSE),
            ('balances', '007-16', 'max=220kg', FALSE),
            ('balances', '007-21', 'max=1.3kg', FALSE),
            ('balances', '007-25', 'max=3.5kg', FALSE),
            ('balances', '007-26', 'max=3.5kg', FALSE),
            ('balances', '007-27', 'max=3.5kg', FALSE),
            ('balances', '007-34', 'max=3.5kg', FALSE),
            ('balances', '007-6', 'max=10kg', FALSE),
            ('balances', '007-20', 'max=3kg', FALSE),
            ('balances', '007-23', 'max=150kg', FALSE),
            ('balances', '007-24', 'max=30kg', FALSE),
            ('balances', '007-39', 'max=30kg', FALSE),
            ('balances', '007-40', 'max=30kg', FALSE),
            ('balances', '007-41', 'max=3kg', FALSE),
            ('balances', '007-42', 'max=30kg', FALSE),
            ('balances', '007-43', 'max=1kg', FALSE),
            ('balances', '007-44', 'max=120kg', FALSE),
            ('balances', '007-45', 'max=60kg', FALSE);

        -- Insert data for reactor
        INSERT INTO equipment (name, code, description, utensils)
        VALUES
            ('reactor', '002-10', '30L glass', FALSE),
            ('reactor', '002-11', '15L glass', FALSE),
            ('reactor', '002-12', '150L glass', FALSE),
            ('reactor', '002-13', '100L glass', FALSE),
            ('reactor', '002-14', '100L g-lined', FALSE),
            ('reactor', '002-15', '150L glass', FALSE),
            ('reactor', '002-16', '50L glass', FALSE),
            ('reactor', '002-17', '100L glass', FALSE);

        -- Insert data for d_filter
        INSERT INTO equipment (name, code, description, utensils)
        VALUES
            ('d_filter', '046-4', 'ss 40/80L', FALSE),
            ('d_filter', '046-6', 'ss 30/45L', FALSE),
            ('d_filter', '046-7', 'ss agit 100/140L', FALSE);

        -- Insert data for n_filter
        INSERT INTO equipment (name, code, utensils)
        VALUES
            ('n_filter', '046-1', FALSE),
            ('n_filter', '046-13', FALSE),
            ('n_filter', '046-14', FALSE),
            ('n_filter', '046-2', FALSE),
            ('n_filter', '046-3', FALSE);

        -- Insert data for m_pump
        INSERT INTO equipment (name, code, utensils)
        VALUES
            ('m_pump', '001-22', FALSE),
            ('m_pump', '001-23', FALSE),
            ('m_pump', '001-24', FALSE);

        -- Insert data for p_pump
        INSERT INTO equipment (name, code, utensils)
        VALUES
            ('p_pump', '001-13', FALSE),
            ('p_pump', '001-21', FALSE),
            ('p_pump', '001-29', FALSE);

        -- Insert data for o_pump
        INSERT INTO equipment (name, code, utensils)
        VALUES
            ('o_pump', '001-38', FALSE),
            ('o_pump', '001-43', FALSE);

        -- Insert data for oven
        INSERT INTO equipment (name, code, description, utensils)
        VALUES
            ('oven', '012-10', 'vac.', FALSE),
            ('oven', '012-13', 'conv.', FALSE),
            ('oven', '012-14', 'conv.', FALSE),
            ('oven', '012-15', 'vac.', FALSE),
            ('oven', '012-16', 'conv.', FALSE),
            ('oven', '012-17', 'vac.', FALSE),
            ('oven', '012-6', 'conv.', FALSE),
            ('oven', '012-9', 'vac.', FALSE);
    `

	// Execute the script
	_, err := db.Exec(script)
	if err != nil {
		return err
	}
	return nil
}
