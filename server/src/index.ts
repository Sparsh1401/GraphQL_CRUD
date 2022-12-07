import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from "./Schema";
import cors from "cors";
import { DataSource } from "typeorm";
import { Users } from './Entities/Users'


const main = async () =>{

        const AppDataSource = await new DataSource({
        type: "mysql",
        database: "GraphqlCRUD",
        username: "root",
        password: "1234567890",
        host: "localhost",
        logging: true,
        synchronize: false,
        entities: [Users],
    });

    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(3001, () =>{
        console.log(`Server is running on PORT 3001`)
    })
}

main().catch((err) =>{
    console.log(err);
})