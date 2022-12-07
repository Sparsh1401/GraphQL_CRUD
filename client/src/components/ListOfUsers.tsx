import React from 'react'
import { GET_ALL_USER } from "../Graphql/Queries"
import {useQuery} from "@apollo/client"


function ListOfUsers() {

    const {data, error , loading} = useQuery(GET_ALL_USER);
    if(data){
        console.log(data);
    }
    return (
        <div>{data && (data.getAllUsers.map((user: any) =>{
                return <div>Name: {user.name} / {user.username} </div>
            })
        )}
        </div>
    )
}

export default ListOfUsers