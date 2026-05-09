import { redirect } from 'next/navigation';

// Fallback: if the middleware doesn't catch '/', redirect to the default locale.
export default function RootPage() {
  redirect('/fr');
}
