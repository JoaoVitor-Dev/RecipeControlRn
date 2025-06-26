import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'recipe_control.db', location: 'default' });
};

export const createTables = async (db) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS meta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mes TEXT NOT NULL,
      nome TEXT NOT NULL,
      ano INTEGER NOT NULL,
      quantidade INTEGER NOT NULL
    );
  `);
};

export async function inserirMeta(db, { mes, nome, ano, quantidade }) {
    await db.executeSql(
    'INSERT INTO meta (mes, nome, ano, quantidade) VALUES (?, ?, ?, ?)',
    [mes, nome, ano, quantidade]
  );
}
