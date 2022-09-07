import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //create connection to the database and version we want to use
  const jateDB = await openDB("jate", 1);
  //create a new transaction and specify the store and data privileges
  const tx = jateDB.transaction("jate", "readwrite");
  //open up the desired object store
  const store = tx.objectStore("jate");
  const request = store.put({ jate: content });
  //get confirmation of the request
  const result = await request;
  console.log("Data saved successfully to the jate database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //create a connection to the jate database and version we want to use
  const jateDB = await openDB(" jate", 1);
  //create a new transaction and specify the store and data privileges
  const tx = jateDB.transaction("jate", "readonly");
  //open up the desired object store
  const store = tx.objectStore("jate");
  //using the getAll() method to get all data in the database
  const request = store.getAll();
  //get confirmation of the request
  const result = await request;
  console.log(result);
};

initdb();
