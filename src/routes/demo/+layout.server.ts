export async function load({ env, locals, url, cookies }) {
  let projects = [
    { id: 'bd5ac095-033d-44cc-8e85-53629492a2e8', name: 'Acme corp' },
    { id: 'eb44b8ce-11d0-4aaa-bba4-343809071a45', name: 'Wood you furniture' },
    { id: '3d4e2bd5-cae0-4082-a27f-4145e76b5e5b', name: 'Starter Comp' }
  ];

  let theme = cookies.get('currentTheme');
  if (theme === null) {
    cookies.set('currentTheme', 'light', { path: '/' });
  }

  return {
    url: url.toString(),
    theme,
    projects
  };
}
