import { Injectable } from '@nestjs/common';
import { localDBType } from './database.types';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { deletePasswordResponse } from './utils';
import { Artist } from 'src/artist/entities/artist.entity';

const localDB: localDBType = {
    users: [],
    artists: [],
}

@Injectable()
export class DatabaseService {
     //user

    listUsers(): User[] {
      return localDB.users.map((u)=> {
        return deletePasswordResponse(u);
      });
    }

    createUser(body: {login: string, password: string} ): Omit<User, 'password'> {
        const user = {
            id: uuidv4(),
            login: body.login,
            version: 1,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
        localDB.users.push({...user, password: body.password})
        return user;
      }
      getUser(id: string): Omit<User, 'password'> {
        const user = localDB.users.find((u)=> u.id === id);
        if(!user) {
            return null;
        }

        return deletePasswordResponse(user);
      }

      updateUser(id: string, oldPassword: string, newPassword: string): Omit<User, 'password'> {
        const user = localDB.users.find((u)=> u.id === id && u.password === oldPassword);
        if(!user) {
            return null;
        }
        const newUser = {
            ...user,
            version: user.version + 1 , 
            updatedAt: new Date().getTime(), 
            password: newPassword 
        }
        
        localDB.users = localDB.users.map((u)=> u.id === id ? newUser : u);

        return deletePasswordResponse(newUser);
      }

      removeUser(id: string): any {
        localDB.users  = localDB.users.filter((u)=> u.id !== id);
        return [];
      }

      //artist
      listArtists(): Artist[] {
        return localDB.artists;
      }

      createArtist(body: {name: string, grammy: boolean} ): Artist {
        const artist = {
            id: uuidv4(),
            name: body.name,
            grammy: body.grammy,
        }
        localDB.artists.push(artist)
        return artist;
      }

      getArtist(id: string): Artist {
        return localDB.artists.find((a)=> a.id === id);
      }

      updateArtist(id: string, name: string, grammy: boolean): Artist {
        const artist = localDB.artists.find((u)=> u.id === id);
        const newArtist = {...artist, name, grammy};
        localDB.artists = localDB.artists.map((a)=> a.id === id ? newArtist : a);

        return newArtist;
      }

      deleteArtist(id: string): any {
        localDB.artists = localDB.artists.filter((a)=> a.id !== id);

        return [];
      }
}
