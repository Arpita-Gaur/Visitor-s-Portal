const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'DS'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});



app.post('/api/data', (req, res) => {
    const { date } = req.body;
  
    // Check if the date exists in the booking table
    const query = `SELECT * FROM bookings WHERE date = ?`;
    db.query(query, [date], (err, results) => {
      if (err) {
        console.error('Error checking booking date:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
            const updateQuery = 'UPDATE Booking SET count = count + 1 WHERE date = ?';
            db.query(updateQuery, [date], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating booking count:', updateErr);
                    return res.status(500).json({ error: 'Failed to update booking count' });
                }
                res.json({ message: 'Booking count updated successfully', date });
          
        });
     } else {
         
          const insertQuery = `INSERT INTO bookings (date, count) VALUES (?, 1)`;
          db.query(insertQuery, [date], (insertErr) => {
            if (insertErr) {
              console.error('Error inserting new booking:', insertErr);
              res.status(500).json({ error: 'Failed to create booking' });
            } else {
              res.json({ message: 'Booking created successfully', date });
            }
          });
        }
      }
    });
  });
  app.get('/api/data/count', (req, res) => {
    const { date } = req.query;
  
    // Fetch the booking count for the given date
    const query = `SELECT count FROM bookings WHERE date = ?`;
    db.query(query, [date], (err, results) => {
      if (err) {
        console.error('Error fetching booking count:', err);
        res.status(500).json({ error: 'Internal server error' });
      } 
        if (results.length > 0) {
          // Send the count if the date exists
          res.json({ count: results[0].count });
        } else {
          // If the date doesn't exist, assume 0 bookings
          res.json({ count: 0 });
        }
      
    });
  });
  




app.post('/api/checkin', (req, res) => {
    const { Id, Name, Phone, ticketId } = req.body;

    
    

    

let sql = '';
    let values = [];

    if (Id) {
        sql += 'Emp_id = ?';
        values.push(Id);
    }
    if (Name) {
        if (sql) sql += ' OR ';
        sql += 'Emp_name LIKE ?';
        values.push(`${Name}%`);
    }
    if (Phone) {
        if (sql) sql += ' OR ';
        sql += 'Employee_phone_no LIKE ?';
        values.push(`${Phone}%`);
    }
    if (ticketId) {
        if (sql) sql += ' OR ';
        sql += 'Ticket_id = ?';
        values.push(ticketId);
    }

    if (!sql) {
        return res.status(400).json({ error: 'At least one field is required' });
    }

    sql = `SELECT * FROM details WHERE ${sql}`;
    console.log(sql);
    
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log(results);
        res.status(200).json({ message: 'User Data', data: results });
    });
});


app.post('/api/updateCheckInStatus', (req, res) => {
    const { id, Check_in_status } = req.body;

    if (id === undefined || Check_in_status === undefined) {
        return res.status(400).json({ error: 'ID and Check-in status are required' });
    }

    const sql = 'UPDATE details SET Check_in_status = ? WHERE id = ?';
    const values = [Check_in_status, id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error updating check-in status:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Check-in status updated:', results);
        res.status(200).json({ message: 'Check-in status successfully updated' });
    });
});


app.post('/api/checkout', (req, res) => {
    const { Id, Name, Phone, ticketId } = req.body;
    let sql = '';
    let values = [];

    if (Id) {
        sql += 'Emp_id = ?';
        values.push(Id);
    }
    if (Name) {
        if (sql) sql += ' OR ';
        sql += 'Emp_name LIKE ?';
        values.push(`${Name}%`);
    }
    if (Phone) {
        if (sql) sql += ' OR ';
        sql += 'Employee_phone_no LIKE ?';
        values.push(`${Phone}%`);
    }
    if (ticketId) {
        if (sql) sql += ' OR ';
        sql += 'Ticket_id = ?';
        values.push(ticketId);
    }

    if (!sql) {
        return res.status(400).json({ error: 'At least one field is required' });
    }

    sql = `SELECT * FROM details WHERE ${sql}`;
    console.log(sql);
    
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log(results);
        res.status(200).json({ message: 'User Data', data: results });
    });
});
app.post('/api/updateCheckOutStatus', (req, res) => {
    const { id, Check_out_status } = req.body;

    if (id === undefined || Check_out_status === undefined) {
        return res.status(400).json({ error: 'ID and Check-out status are required' });
    }

    const sql = 'UPDATE details SET Check_out_status = ? WHERE id = ?';
    const values = [Check_out_status, id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error updating check-out status:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Check-out-status updated:', results);
        res.status(200).json({ message: 'Check-out status successfully updated' });
    });
});


//     if (!Id || !Name || !Phone || !ticketId) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

    
//     const checkSql = 'SELECT * FROM CHECKIN WHERE Id = ? AND ticketId = ?';
//     const checkValues = [Id, ticketId];

//     db.query(checkSql, checkValues, (err, results) => {
//         if (err) {
//             console.error('Error querying data:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (results.length > 0) {
            
//             const insertSql = 'INSERT INTO CHECKOUT (Id, Name, Phone, ticketId) VALUES (?, ?, ?, ?)';
//             const insertValues = [Id, Name, Phone, ticketId];

//             db.query(insertSql, insertValues, (err, results) => {
//                 if (err) {
//                     console.error('Error inserting data:', err);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 res.status(201).json({ message: 'Check-Out successfully done', data: { Id, Name, Phone, ticketId } });
//             });
//         } else {
            
//             res.status(400).json({ error: 'Check-in data not found, cannot proceed with check-out' });
//         }
//     });
// });
//----------------------------------update------------------------------------
// app.post('/api/update', (req, res) => {
//     const { Id, Phone, ticketId } = req.body;

//     if (!Id || !Phone || !ticketId) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     const sql = 'INSERT INTO EmployeeUpdates (Id, Phone, ticketId) VALUES (?, ?, ?)';
//     const values = [Id, Phone, ticketId];

//     db.query(sql, values, (err, results) => {
//         if (err) {
//             console.error('Error inserting employee data:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         res.status(201).json({ message: 'Employee data updated successfully', data: { Id, Phone, ticketId } });
//     });
// });


app.post('/api/fetch', (req, res) => {
    const { Id, Phone, ticketId } = req.body;
  
    let whereClause = '';
    let queryValue;
  
    if (Id) {
      whereClause = 'Emp_id = ?';
      queryValue = Id;
    } else if (Phone) {
      whereClause = 'Employee_phone_no = ?';
      queryValue = Phone;
    } else if (ticketId) {
      whereClause = 'Ticket_id = ?';
      queryValue = ticketId;
    }
  
    const sql = `SELECT Emp_id, Employee_phone_no, Ticket_id FROM details WHERE ${whereClause}`;
  
    db.query(sql, [queryValue], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'No record found' });
      }
      res.status(200).json(results[0]);
    });
  });
  
  app.post('/api/update', (req, res) => {
    const { Id, Phone, ticketId, updateFields } = req.body;
  
    if (!Id && !Phone && !ticketId) {
      return res.status(400).json({ error: 'At least one of Id, Phone, or ticketId is required' });
    }
  
    let whereClause = '';
    let queryValue;
  
    if (Id) {
      whereClause = 'Emp_id = ?';
      queryValue = Id;
    } else if (Phone) {
      whereClause = 'Employee_phone_no = ?';
      queryValue = Phone;
    } else if (ticketId) {
      whereClause = 'Ticket_id = ?';
      queryValue = ticketId;
    }
  
    const updateSet = Object.keys(updateFields).map(field => `${field} = ?`);
    const updateValues = Object.values(updateFields);
  
    if (updateSet.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
  
    const sql = `UPDATE details SET ${updateSet.join(', ')} WHERE ${whereClause}`;
  
    db.query(sql, [...updateValues, queryValue], (err, results) => {
      if (err) {
        console.error('Error updating employee data:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'No record found with the provided criteria' });
      }
      res.status(200).json({ message: 'Employee data updated successfully' });
    });
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));