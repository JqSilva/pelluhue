import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'gestion.db');
const db = new Database(dbPath);

db.exec(`
  -- TABLA 1: FAMILIAS (Solo lo esencial)
  CREATE TABLE IF NOT EXISTS familias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL -- Ej: "Familia Rodríguez", "Los Pérez"
  );

  -- TABLA 2: PAGOS (Ingresos de las familias)
  CREATE TABLE IF NOT EXISTS pagos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    familia_id INTEGER NOT NULL,
    monto INTEGER NOT NULL,
    fecha DATE NOT NULL, -- Formato YYYY-MM-DD
    tipo TEXT, -- Opcional: "Adelanto", "Cuota extraordinaria"
    FOREIGN KEY(familia_id) REFERENCES familias(id)
  );

  -- TABLA 3: GASTOS (Luz, agua, reparaciones - Sin vincular a familias)
  CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL, -- Ej: "Luz", "Agua", "Mantenimiento"
    monto INTEGER NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT
  );
`);

export default db;