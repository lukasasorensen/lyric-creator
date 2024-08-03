import IUserDb from "@/interfaces/db/IUserDb";
import { InsertOneResult, ObjectId } from "mongodb";


export async function createUser(newUser: Partial<IUserDb>): Promise<Object> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ insertedId: 'asdfasdfasdf', acknowledged: true });
        }, 1500);
    })
}

// export async function createUser(newUser: Partial<IUserDb>): Promise<InsertOneResult> {
//   try {
//     newUser.createdAt = new Date();
//     newUser.isDeleted = false;

//     const res = await fetch("http://localhost:3000/api/users/", {
//       body: JSON.stringify(newUser),
//       method: "POST",
//     });

//     let results = await res.json();

//     if (results.error) {
//       throw new Error(results.error);
//     }

//     return results;
//   } catch (err) {
//     console.error("SongClient.createSong ERROR - ", err);
//     throw err;
//   }
// }
