export async function GET({ cookies }) {
  const theme = (await cookies.get('theme', { sameSite: 'strict' })) ?? 'light';
  if (theme === 'light') {
    cookies.set('theme', 'custom-theme', { path: '/', sameSite: 'strict' });
    return new Response('light', { status: 200 });
  } else {
    cookies.set('theme', 'light', { path: '/', sameSite: 'strict' });
    return new Response('custom-theme', { status: 200 });
  }
}
