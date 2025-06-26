import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'recipe_control.db', location: 'default' });
};

export const createTables = async (db) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS metas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mes TEXT NOT NULL,
      ano INTEGER NOT NULL,
      valor_meta REAL NOT NULL,
      quantidade INTEGER NOT NULL
    );
  `);
};

export async function inserirMeta(db, { mes, ano, valor_meta, quantidade }) {
    await db.executeSql(
    'INSERT INTO metas (mes, ano, valor_meta, quantidade) VALUES (?, ?, ?, ?)',
    [mes, ano, valor_meta, quantidade]
  );
}
