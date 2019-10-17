import { fetchData } from './fetchdata';
import fs from 'fs';
import { GraphQLServer } from 'graphql-yoga'

// rickymorty entry point
const url = 'https://rickandmortyapi.com/api/character/';



const runApp = data => {

  // data.forEach(element => {
  //    console.log(`${element.id}: ${element.name}`);
  // });

  const typeDefs = `

  type Query {

    character(id: Int!):Character
    characters(page:Int,pagesize:Int!,name:String,status:String,planet:String):[Characters!]!

  }

  type Character {
    id:Int!
    name:String!
    status:String!
    planet:String!
  }

  type Characters{

    page:Int
    pagesize:Int!
    name:String
    status:String
    planet:String

  }

  

  `
  const resolvers = {

  Query:{

    character: (parent,args,ctx,infor) => {
      const result = data.find(obj => obj.id === args.id);

      return {
        id: result.id,
        name: result.name,
        status: result.status,
        planet: result.location.name,
      }
      

    },

    characters: (parent,args,ctx,infor) =>{
      let page, pageSize;
      //filter

      let filter = data.slice();

      if(args.name){

          filter = filter.filter(obj=>(obj.name.includes(args.name)));
      }

      if(args.status){

          filter = filter.filter(pedro =>(pedro.status == args.status));
      }

      if(args.planet){

          filter = filter.filter(luis =>(luis.location.planet == args.planet));

      }

      //page

      if(args.page){

          page = args.page;

      }else{

          page = 1;
      }

      let number_page = page * args.pagesize;


      // filter.slice(number_page - args.pagesize -1 ,number_page);

      return filter;


    }
    
  },

  }

  const server = new GraphQLServer({typeDefs,resolvers});
  server.start({port:"30010"});


};

// main program
fetchData(runApp, url);