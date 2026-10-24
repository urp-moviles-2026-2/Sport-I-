// TypeScript declarations for Metro's existing CSS imports.
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
declare module '*.css';
