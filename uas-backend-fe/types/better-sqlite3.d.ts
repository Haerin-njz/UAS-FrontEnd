declare module 'better-sqlite3' {
  // Minimal fallback typing. Replace with more specific types or install @types/better-sqlite3 if available.
  type AnyFunction = (...args: any[]) => any;
  interface Database {
    // Common methods used by the project
    prepare(sql: string): any;
    exec(sql: string): void;
    transaction(fn: AnyFunction): AnyFunction;
    close(): void;
    // index signature to allow other access
    [key: string]: any;
  }
  const BetterSqlite3: {
    new (path: string, options?: any): Database;
    (path: string, options?: any): Database;
  };
  export default BetterSqlite3;
}
