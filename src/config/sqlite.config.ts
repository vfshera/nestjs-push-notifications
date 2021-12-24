import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

 const sqliteConfig: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db',
    entities: ['dist/src/**/*.entities.js'],
    synchronize: false,
    migrations:['dist/src/database/migrations/*.js'],
    cli: {
        migrationsDir: "src/database/migrations"
    }
}


export default sqliteConfig;