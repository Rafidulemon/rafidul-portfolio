/** "Md. Rafidul Islam" -> "Rafidul": skips honorifics and returns the first real name. */
export const givenName = (full: string) =>
  full.split(/\s+/).find((w) => !/^(md|mr|mrs|ms|dr|prof)\.?$/i.test(w)) ?? full;

/** "Software Engineer & Product-Focused Full-Stack Developer" -> "Software Engineer". */
export const shortRole = (title: string) => title.split(/\s*[&|,·]\s*/)[0] || title;
