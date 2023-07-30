interface ArtistI {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }

export class Artist implements ArtistI {
    id: string;
    name: string;
    grammy: boolean;
}
