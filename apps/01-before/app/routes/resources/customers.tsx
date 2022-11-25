import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { searchCustomers } from '~/models/customer.server';
import { requireUser } from '~/session.server';

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  invariant(typeof query === 'string', 'query is required')
  return json({
    customers: await searchCustomers(query),
  });
}
