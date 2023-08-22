import { Injectable } from '@nestjs/common';
import { localDBType } from './database.types';
import { v4 as uuidv4 } from 'uuid';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Service } from 'src/favs/favs.controller';
import { PrismaService } from './prisma.service';
import { Artist, Prisma, User } from '@prisma/client';

// const localDB: localDBType = {
//   users: [],
//   artists: [],
//   tracks: [],
//   albums: [],
//   favs: {
//     artists: [],
//     tracks: [],
//     albums: [],
//   },
// };
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DatabaseService extends PrismaService {
  prisma = new PrismaClient();
  //user
  async listUsers(): Promise<Omit<User, "password">[]> {
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
  }): Promise<any> {
    const user =  await this.prisma.user.create({
      data: {
        id: uuidv4(),
        login: body.login,
        version: 1,
        password: body.password 
      }, 
      select: {
        login: true,
        version: true, 
        createdAt: true, 
        updatedAt: true, 
        id: true
      }
    })

      return {...user, createdAt: user.createdAt.getTime(), updatedAt: user.updatedAt.getTime()}
  }
  async getUser(id: string): Promise<any> {
    const user =  await this.prisma.user.findFirst({
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

    return user ? {...user, createdAt: user.createdAt.getTime(), updatedAt: user.updatedAt.getTime()} : null
  }

  async getUserByLogin(login: string): Promise<any> {
    const user =  await this.prisma.user.findFirst({
      where: {
        login: login,
      },
      select: {
        login: true,
        version: true, 
        createdAt:  true, 
        updatedAt:  true, 
        id: true,
        password: true,
      }
    })

    return user ? {...user, createdAt: user.createdAt.getTime(), updatedAt: user.updatedAt.getTime()} : null
  }

  async updateUser(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      }
    });

    if (!user || user?.password !== oldPassword) {
      return null;
    }
    
    const upd =  await this.prisma.user.update({
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

    return {...upd, createdAt: upd.createdAt.getTime(), updatedAt: upd.updatedAt.getTime()}
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

  async getArtist(id: string): Promise<Artist> {
    return await this.prisma.artist.findFirst({
      where: {
        id
      }
    })
  }

  async updateArtist(id: string, name: string, grammy: boolean): Promise<Artist> {
    const newArtist = await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        name: name,
        grammy,
      }
    });
    
    return newArtist;
  }

  async deleteArtist(id: string): Promise<any> {
  console.log(await this.prisma.artist.findUnique({where:{id}}))
   await this.prisma.artist.delete({
    where: {
      id
    }
   })
    return [];
  }

  //track
  async listTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany({});
  }

  async createTrack(body: {
    name: string;
    artistId: string;
    albumId: string;
    duration: number;
  }): Promise<Track> {
    return await this.prisma.track.create({
      data: {
        id: uuidv4(),
        name: body.name,
        duration: body.duration,
        ...(body.artistId && {
          artist: {
            connect: {
              id: body.artistId
            }
          },
        }),
      
        ...(body.albumId && {album: {
          connect: {
            id: body.albumId
          }
        }})
      },
    });
  }

  async getTrack(id: string): Promise<Track> {
    return await this.prisma.track.findFirst({
      where: {
        id
      }
    });
  }

  async updateTrack(
    id: string,
    body: {
      name?: string;
      artistId?: string;
      albumId?: string;
      duration?: number;
    },
  ): Promise<Track> {
    const newTrack = await this.prisma.track.update({
      where: {
        id,
      }, 
      data: {
        name: body.name,
        duration: body.duration,
        ...(body.artistId && {
          artist: {
            connect: {
              id: body.artistId
            }
          },
        }),
      
        ...(body.albumId && {album: {
          connect: {
            id: body.albumId
          }
        }})
      }
    })

    return newTrack;
  }
  async deleteTrack(id: string): Promise<any> {
    await this.prisma.track.delete({
      where: {
        id
      }
    })
    return [];
  }

  //album
  async listAlbums(): Promise<Album[]> {
    return  await this.prisma.album.findMany({});
  }

  async createAlbum(body: { name: string; artistId: string; year: number }): Promise<Album> {
    return await this.prisma.album.create({
      data: {
        id: uuidv4(),
        name: body.name,
        year: body.year,
        ...(body.artistId && {
          artist: {
            connect: {
              id: body.artistId
            }
          }
        })
      }
    })
  }

  async getAlbum(id: string): Promise<Album> {
    return await this.prisma.album.findFirst({
      where: {id}
    });
  }

  async updateAlbum(
    id: string,
    body: { name?: string; artistId?: string; year?: number },
  ): Promise<Album> {
    const newAlbum = await this.prisma.album.update({
      where: {
        id
      },
      data: {
        name: body.name,
        year: body.year,
        ...(body.artistId && {
          artist: {
            connect: {
              id: body.artistId
            }
          }
        })
      }
    })

    return newAlbum;
  }

  async deleteAlbum(id: string): Promise<any> {
    await this.prisma.album.delete({
      where: {id}
    });

    return [];
  }

  //favs
  async listFavs(): Promise<any> {
    const data =  await this.prisma.fav.findMany({
      include: {
        album: true,
        artist: true,
        track: true
      }
    })

    const categorizedItems = {
      albums: [],
      tracks: [],
      artists: []
    };
    
    for (const item of data) {
      if (item.album || item.albumId) {
        categorizedItems.albums.push(item);
      }
      if (item.track || item.trackId) {
        categorizedItems.tracks.push(item);
      }
      if (item.artist || item.artistId) {
        categorizedItems.artists.push(item);
      }
    }

    return categorizedItems;
  }

  async addFav(service: Service, id: string): Promise<Track | Album | Artist | null> {
    switch (service) {
      case 'track':
        const track = await this.prisma.track.findUnique({
          where: { id },
        });
        if (!track) {
          return null;
        }
        await this.prisma.fav.create({
          data: {
            track: {
              connect: {
                id,
              },
            },
          },
        });
        return track;

      case 'album':
        const album = await this.prisma.album.findUnique({
          where: { id },
        });
        if (!album) {
          return null;
        }
        await this.prisma.fav.create({
          data: {
            album: {
              connect: {
                id,
              },
            },
          },
        });
        return album;

      case 'artist':
        const artist = await this.prisma.artist.findUnique({
          where: { id },
        });
        if (!artist) {
          return null;
        }
        await this.prisma.fav.create({
          data: {
            artist: {
              connect: {
                id,
              },
            },
          },
        });
        return artist;

      default:
        return null;
    }
  }


  async removeFav(service: Service, id: string): Promise<any> {
    const favData: Prisma.FavUpdateInput = {};
    
    switch (service) {
      case 'track':
        this.prisma.fav.delete({
          where: {
            trackId: id
          },
        })
        break;
        
      case 'album':
        this.prisma.fav.delete({
          where: {
            albumId: id
          },
        })
        break;
        
      case 'artist':
        this.prisma.fav.delete({
          where: {
            artistId: id
          },
        })
        break;
        
      default:
        return null;
    }

    const updatedFav = await this.prisma.fav.updateMany({
      data: favData,
    });
    return updatedFav;
  }
}
