export const scrollToElement = (elemRef, offset = 0) => {
  const top = elemRef.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
