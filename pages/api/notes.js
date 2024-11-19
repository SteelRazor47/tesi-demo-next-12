// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Pool } from 'pg';
import credentials from '../../credentials';

// Don't keep credentials in the source tree in a real app!
const pool = new Pool(credentials);

export default async function handler(req, res) {
  const { rows } = await pool.query('select * from notes order by id desc');
  res.json(rows);
}
