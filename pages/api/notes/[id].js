// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Pool } from 'pg';
import credentials from '../../../credentials';

// Don't keep credentials in the source tree in a real app!
const pool = new Pool(credentials);

export default async function handler(req, res) {
  const { id } = req.query
  console.log(req.query)
  const { rows } = await pool.query('select * from notes where id = $1', [
    id,
  ]);
  res.json(rows[0]);
}
