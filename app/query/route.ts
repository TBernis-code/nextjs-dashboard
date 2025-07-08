import postgres from 'postgres';
import { neon } from '@neondatabase/serverless';


const sql = neon(`${process.env.DATABASE_URL}`);

 async function listInvoices() {
 	const data = await sql`
     SELECT invoices.amount, customers.name
     FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
   `;

 	return data;
 }

export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return Response.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
