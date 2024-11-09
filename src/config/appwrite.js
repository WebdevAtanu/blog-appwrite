import {Client, Account, Databases, Query, Storage, OAuthProvider} from 'appwrite';
const client=new Client();
client.setEndpoint(import.meta.env.VITE_API_ENDPOINT) // Appwrite endpoint
.setProject(import.meta.env.VITE_PROJECT_ID); // project ID
const account=new Account(client);
const db=new Databases(client);
const storage= new Storage(client);
export{client,db,account,Query,storage,OAuthProvider};