const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const {Pool} = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biztime',
    password: '4523',
    port: 5432
  })


router.get('/', async (req, res, next) => {
    try{
        const client = await pool.connect();
        const result = await client.query(`SELECT id, comp_code FROM invoices `);
        const invoices = result.rows;
        client.release();
        return res.json({invoices: invoices});
    } catch(error) {
        console.error('Error getting invoices:', error);
        return next(error);
    }
})


router.get('/:id', async (req, res, next) => {
    try{
        let id = req.params.id;
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM invoices JOIN companies ON invoices.comp_code = companies.code WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            client.release();
            return res.status(404).json({error: 'Invoice not found'})
        }
        const data = result.rows[0];
        const invoice = {
            id: data.id,
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid,
            company: {
                code:data.code,
                name: data.name,
                description: data.description
            }
        }
        client.release();
        return res.json({invoice: invoice})
    } catch(error) {
        console.error('Error getting invoice:', error);
        return next(error);
    }
})


router.post('/', async (req, res, next) => {
    try {  
        const {comp_code, amt} = req.body;
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`, [comp_code, amt])
        const invoice = result.rows[0];
        client.release();
        res.json({ invoice })
    } catch (error) {
        return next(new ExpressError(`Failed creating invoice. ${error}`, 400).message);
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const {amt} = req.body;
        const client = await pool.connect();
        const checkResult = await client.query('SELECT * FROM invoices WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            client.release();
            return res.status(404).json({error: 'Invoice not found'})
        }
        const result = await client.query('UPDATE invoices SET amt =$1 WHERE id = $2 RETURNING *', [amt, id]);
        const updatedInvoice = result.rows[0]
        client.release();
        res.json({invoice: updatedInvoice})
    } catch (error) {
        return next(new ExpressError(`Failed updating invoice. ${error}`, 400).message);
    }
})


router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const client = await pool.connect();
        const checkResult = await client.query('SELECT * FROM invoices WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            client.release();
            return res.status(404).json({error: 'Invoice not found'})
        }
        const result = await client.query('DELETE FROM invoices WHERE id = $1', [id]);
        const deletedInvoice = result.rows[0]
        res.json({status: 'deleted'})
    } catch (error) {
        return next(new ExpressError(`Failed deleting invoice. ${error}`, 400).message);
    }
} )


module.exports = router;