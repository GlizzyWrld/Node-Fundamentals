const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const {Pool} = require('pg');
const SECRET = require('../secrets');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biztime',
    password: SECRET,
    port: 5432
  })

router.get('/', async (req, res, next) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT code, name FROM companies');
      const companies = result.rows;
      client.release();
      return res.json({companies: companies});
    } catch (error) {
        return next(new ExpressError('Error finding companies').statusCode(404));
    }
  });


router.get('/:code', async (req, res, next) => {
    try{
        let code = req.params.code;
        const client = await pool.connect();
        const result = await client.query(`SELECT code, name, description, id, amt, paid FROM companies JOIN invoices ON companies.code = invoices.comp_code WHERE code = $1`, [code])
        const data = result.rows[0];
        const company = {
            company: data.code,
            name: data.name,
            description: data.description,
            invoices: {
                id: data.id,
                amt: data.amt,
                paid: data.paid
            }
        }
        client.release();
        return res.json({company: company})
    } catch (error) {
        return next(new ExpressError('Company cannot be found').statusCode(404));
    }
})

router.post('/', async (req, res, next) => {
    try{
        const {code, name, description} = req.body;
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO companies (code, name, description) VALUES  ($1, $2, $3)
        RETURNING *`,[code, name, description]);
        const newCompany = result.rows[0]
        client.release();
        return res.status(201).json({company: newCompany});
    } catch (error) {
        console.error('Error creating company:', error);
        return next(error)
    }
})


router.put('/:code', async (req, res, next) => {
    try {
        const {code, name, description} = req.body;
        const client = await pool.connect();
        const checkResult = await client.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if (checkResult.rows.length === 0) {
            client.release();
            return res.status(404).json({error: 'Company not found'})
        }
        const updatedResult = await client.query(`UPDATE companies SET name = $1, description = $2 WHERE code =$3`, [name, description, code]);
        const updatedCompany = updatedResult.rows[0];
        client.release();
        return res.json({company: updatedCompany});
    } catch(error){
        console.error('Error updating company:', error);
        return next(error);
    }
})


router.delete('/:code', async (req, res, next) =>{
    try {
        const { code } = req.params
        const client = await pool.connect();
        const checkResult = await client.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if(checkResult.rows.length === 0){
            client.release();
            return res.status(404).json({error: 'Company'})
        } 
        const deletedResult = await client.query(`DELETE FROM companies WHERE code = $1`, [code]);
        const deletedCompany = deletedResult.rows[0];
        client.release();
        return res.json({status: `deleted ${deletedCompany}`});
    } catch (error){
        console.error('Error deleting company:', error);
        return next(error);
    }
})

module.exports = router;