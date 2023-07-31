interface TrackI {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }

export class Track implements TrackI {
    id: string;
    name: string;
    artistId: string;
    albumId: string;
    duration: number;
}
