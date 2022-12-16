export default function cancelLoadingPage(currentPage: string, nextPage: string) {
  const isSameStartsWith = (path: string) =>
    currentPage.startsWith(path) && nextPage.startsWith(path);

  return (
    currentPage === nextPage ||
    currentPage === '/login' ||
    isSameStartsWith('/explore') ||
    isSameStartsWith('/free-model') ||
    isSameStartsWith('/sale-off') ||
    isSameStartsWith('/user') ||
    (isSameStartsWith('/blog') &&
      currentPage.split('/').length <= 3 &&
      nextPage.split('/').length <= 3)
  );
}
