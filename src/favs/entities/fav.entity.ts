interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class Fav implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
