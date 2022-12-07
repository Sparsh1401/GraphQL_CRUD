import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from '../../Entities/Users';
import { MessageType } from "../TypeDefs/Messages";


export const CREATE_USER = {
    type: UserType,
    args: {
        name: {type:GraphQLString},
        username: {type:GraphQLString},
        password: {type:GraphQLString}
    },
    async resolve(parent : any, args: any) {
        const {name, username, password} = args;
        await Users.insert({name, username, password});
        return args;
    }
}

export const DELETE_USER = {
    type: UserType,
    args:{
        id: {type:GraphQLID}
    },
    async resolve(parent:any, args:any){
        const id = args.id
        await Users.delete(id)
    }
}

export const UPDATE_PASSWORD = {
    type:UserType,
    args:{
        username:{type:GraphQLString},
        oldPassword:{type:GraphQLString},
        newPassword:{type:GraphQLString},
    },
    async resolve(parent: any , args: any){
        const {username, oldPassword, newPassword} = args
        const user = await Users.findOne({ 
            where:{username: username }});
        if(!user){
            throw new Error("USERNAME DOESNT EXIST")
        }
        const userPassword = user?.password

        if(oldPassword===userPassword){
            await Users.update({username: username },
                {password: newPassword}
                )
        }else{
            throw new Error("PASSWORD DO NOT MATCH");
        }
    }
}