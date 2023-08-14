import { Injectable } from '@nestjs/common';
import { localDBType } from './database.types';
import { v4 as uuidv4 } from 'uuid';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Service } from 'src/favs/favs.controller';
import { PrismaService } from './prisma.service';
import { Artist, User } from '@prisma/client';

const localDB: localDBType = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favs: {
    artists: [],
    tracks: [],
    albums: [],
  },
};

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}
  //user
  async listUsers(): Promise<Omit<User, "password">[]> {
    // return localDB.users.map((u) => {
    //   return deletePasswordResponse(u);
    // });
    return await this.prisma.user.findMany({
      select: {
        login: true,
        version: true, 
        createdAt:  true, 
        updatedAt:  true, 
        id: true
      }
    })
  }

  async createUser(body: {
    login: string;
    password: string;
  }): Promise<Omit<User, 'password'>> {
    // const user = {
    //   id: uuidv4(),
    //   login: body.login,
    //   version: 1,
    //   createdAt: new Date().getTime(),
    //   updatedAt: new Date().getTime(),
    // };
    // localDB.users.push({ ...user, password: body.password });

    return await this.prisma.user.create({
      data: {
        id: uuidv4(),
        login: body.login,
        version: 1,
        password: body.password 
      }, 
      select: {
        login: true,
        version: true, 
        createdAt:  true, 
        updatedAt:  true, 
        id: true
      }
    });
  }
  async getUser(id: string): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        login: true,
        version: true, 
        createdAt:  true, 
        updatedAt:  true, 
        id: true
      }
    })
  }

  async updateUser(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      }
    });

    if (!user || user?.password !== oldPassword) {
      return null;
    }
    
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        version: {increment: 1},
        password: newPassword,
      },
      select: {
        login: true,
        version: true, 
        createdAt:  true, 
        updatedAt:  true, 
        id: true
      }
    })
  }

  async removeUser(id: string): Promise<any> {
    await this.prisma.user.delete({
      where: {
        id,
      }
    })
    return [];
  }

  //artist
  async listArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany({});
  }

  listArtistsById(ids: string[]): Artist[] {
    return localDB.artists
      .map((a) => {
        if (ids.includes(a.id)) {
          return a;
        }
      })
      .filter(Boolean);
  }

  async createArtist(body: { name: string; grammy: boolean }): Promise<{ id: string; name: string; grammy: boolean; }> {
    const artist = {
      id: uuidv4(),
      name: body.name,
      grammy: body.grammy,
    };

    return await this.prisma.artist.create({
      data: {
        ...artist,
      }
    })
  }

  getArtist(id: string): Artist {
    return localDB.artists.find((a) => a.id === id);
  }

  updateArtist(id: string, name: string, grammy: boolean): Artist {
    const artist = localDB.artists.find((u) => u.id === id);
    const newArtist = { ...artist, name, grammy };
    localDB.artists = localDB.artists.map((a) => (a.id === id ? newArtist : a));

    return newArtist;
  }

  deleteArtist(id: string): any {
    localDB.artists = localDB.artists.filter((a) => a.id !== id);
    const tracksId = localDB.tracks
      .filter((t) => t.artistId === id)
      .map((t) => t.id);
    const albumsId = localDB.albums
      .filter((t) => t.artistId === id)
      .map((t) => t.id);
    tracksId.forEach((t) => {
      this.updateTrack(t, { artistId: null });
    });

    albumsId.forEach((t) => {
      this.updateAlbum(t, { artistId: null });
    });
    this.removeFav('artist' as Service, id);
    return [];
  }

  //track
  listTracks(): Track[] {
    return localDB.tracks;
  }

  listTracksById(ids: string[]): Track[] {
    return localDB.tracks
      .map((a) => {
        if (ids.includes(a.id)) {
          return a;
        }
      })
      .filter(Boolean);
  }

  createTrack(body: {
    name: string;
    artistId: string;
    albumId: string;
    duration: number;
  }): Track {
    const track = {
      id: uuidv4(),
      name: body.name,
      artistId: body.artistId,
      albumId: body.albumId,
      duration: body.duration,
    };
    localDB.tracks.push(track);
    return track;
  }

  getTrack(id: string): Track {
    return localDB.tracks.find((a) => a.id === id);
  }

  updateTrack(
    id: string,
    body: {
      name?: string;
      artistId?: string;
      albumId?: string;
      duration?: number;
    },
  ): Track {
    const track = localDB.tracks.find((u) => u.id === id);
    const newTrack = {
      ...track,
      name: body.name !== undefined ? body.name : track.name,
      artistId: body.artistId !== undefined ? body.artistId : track.artistId,
      albumId: body.albumId !== undefined ? body.albumId : track.albumId,
      duration: body.duration !== undefined ? body.duration : track.duration,
    };
    localDB.tracks = localDB.tracks.map((a) => (a.id === id ? newTrack : a));

    return newTrack;
  }
  deleteTrack(id: string): any {
    localDB.tracks = localDB.tracks.filter((a) => a.id !== id);
    this.removeFav('track' as Service, id);
    return [];
  }

  //album
  listAlbums(): Album[] {
    return localDB.albums;
  }

  listAlbumsById(ids: string[]): Album[] {
    return localDB.albums
      .map((a) => {
        if (ids.includes(a.id)) {
          return a;
        }
      })
      .filter(Boolean);
  }

  createAlbum(body: { name: string; artistId: string; year: number }): Album {
    const album = {
      id: uuidv4(),
      name: body.name,
      artistId: body.artistId,
      year: body.year,
    };
    localDB.albums.push(album);
    return album;
  }

  getAlbum(id: string): Album {
    return localDB.albums.find((a) => a.id === id);
  }

  updateAlbum(
    id: string,
    body: { name?: string; artistId?: string; year?: number },
  ): Album {
    const album = localDB.albums.find((u) => u.id === id);
    const newAlbum = {
      ...album,
      name: body.name !== undefined ? body.name : album.name,
      artistId: body.artistId !== undefined ? body.artistId : album.artistId,
      year: body.year !== undefined ? body.year : album.year,
    };
    localDB.albums = localDB.albums.map((a) => (a.id === id ? newAlbum : a));

    return newAlbum;
  }

  deleteAlbum(id: string): any {
    localDB.albums = localDB.albums.filter((a) => a.id !== id);
    const tracksId = localDB.tracks
      .filter((t) => t.albumId === id)
      .map((t) => t.id);

    tracksId.forEach((t) => {
      this.updateTrack(t, { albumId: null });
    });

    this.removeFav('album' as Service, id);

    return [];
  }

  //favs
  listFavs(): { tracks: Track[]; albums: Album[]; artists: Artist[] } {
    const favs = localDB.favs;
    return {
      tracks: this.listTracksById(favs.tracks),
      albums: this.listAlbumsById(favs.albums),
      artists: this.listArtistsById(favs.artists),
    };
  }

  addFav(service: Service, id: string): Track | Album | Artist | null {
    switch (service) {
      case 'track':
        const track = this.getTrack(id);
        if (!track) {
          return null;
        }
        localDB.favs.tracks.push(id);
        return track;

      case 'album':
        const album = this.getAlbum(id);
        if (!album) {
          return null;
        }
        localDB.favs.albums.push(id);
        return album;

      case 'artist':
        const artist = this.getArtist(id);
        if (!artist) {
          return null;
        }
        localDB.favs.artists.push(id);
        return artist;

      default:
        return null;
    }
  }

  removeFav(service: Service, id: string): Track | Album | Artist | null {
    switch (service) {
      case 'track':
        const track = this.getTrack(id);
        const isInFavs = localDB.favs.tracks.includes(id);
        if (!track || !isInFavs) {
          return null;
        }
        localDB.favs.tracks = localDB.favs.tracks.filter((t) => t !== id);
        return track;

      case 'album':
        const album = this.getAlbum(id);
        const isInFavsA = localDB.favs.albums.includes(id);
        if (!album || !isInFavsA) {
          return null;
        }
        localDB.favs.albums = localDB.favs.albums.filter((t) => t !== id);
        return album;

      case 'artist':
        const artist = this.getArtist(id);
        const isInFavsArt = localDB.favs.artists.includes(id);
        if (!artist || !isInFavsArt) {
          return null;
        }
        localDB.favs.artists = localDB.favs.artists.filter((t) => t !== id);
        return artist;

      default:
        return null;
    }
  }
}
