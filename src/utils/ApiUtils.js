
// import AsyncStorage from '@react-native-community/async-storage'
import {AsyncStorage } from "react-native";

  export default {
    serverUrl :'https://api.themoviedb.org/3/',
      APIKEY:'75ec91e5d32ec957320eaa24e91f58a8'
    
        };
      
          export var checkStatus=(res)=>  {        
            if (res.code==200) {
              return res.result;
            } else {
              let error = new Error(res.message);
              error.res = res;
              throw error;
            }
          }
          
            
         
          export const getHeaders = (token)=> {    
            return {
              method: 'GET',
              headers: {
              "Access-Control-Allow-Origin": "*",
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Expires': 0
              },
            };
          
          };

         

          export const simpleGetHeaders = ()=> {    
            return {
              method: 'GET',
              headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': 0
              },
            };
          
          };

          export const postHeaders = (token,body)=> {    
            return {
              method: 'POST',
              headers: {
              'Authorization':"Bearer "+token,
              "Access-Control-Allow-Origin": "*",
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            };
          
          };

          export const putHeaders = (token,body)=> {    
            return {
              method: 'PUT',
              headers: {
                  'Authorization':"Bearer "+token,
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            };
          
          };

         
          