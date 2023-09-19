import { redirect, type ActionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { deleteContact } from '~/data';

export const action = async ({ params }: ActionArgs) => {
  const contactId = params.contactId;
  invariant(contactId, 'Contact ID missing');

  await deleteContact(contactId);

  return redirect(`/`);
};
