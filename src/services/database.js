import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'recipe_control.db', location: 'default' });
};

export const createTables = async (db) => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS meta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mes TEXT NOT NULL,
      nome TEXT NOT NULL,
      ano INTEGER NOT NULL,
      quantidade INTEGER NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS venda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idMeta INTEGER,
      dataVenda DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (idMeta) REFERENCES meta (id)
    );`
  ];

  for (const query of queries) {
    await db.executeSql(query);
  }
};

export async function getTargetInOpen(db, mes, ano) {
  try {
    const [result] = await db.executeSql(
      'SELECT * FROM meta WHERE mes = ? AND ano = ? LIMIT 1',
      [mes.toString(), ano]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Erro ao buscar meta:', error);
    throw error; 
  }
}


export async function obterMetaComVendas(db, mes, ano) {
  try {
    const [result] = await db.executeSql(
      'SELECT id, quantidade, (SELECT COUNT(id) FROM venda WHERE idMeta = meta.id) as venda FROM meta WHERE mes = ? AND ano = ? LIMIT 1',
      [mes.toString(), ano]
    );
    
    if (result.rows.length > 0) {
      const meta = result.rows.item(0);
      return {
        id: meta.id,
        quantidade: meta.quantidade,
        totalVendas: meta.venda
      };
    } else {
      throw new Error('Meta não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar meta:', error);
    throw error; 
  }
}

export async function inserirMeta(db, { mes, nome, ano, quantidade }) {
    await db.executeSql(
    'INSERT INTO meta (mes, nome, ano, quantidade) VALUES (?, ?, ?, ?)',
    [mes, nome, ano, quantidade]
  );
}

export async function adicionarVenda(db, idMeta) {
 await db.executeSql(
   "INSERT INTO venda (idMeta, dataVenda) VALUES (?, datetime('now', 'localtime'));",
   [idMeta]
 );
}
