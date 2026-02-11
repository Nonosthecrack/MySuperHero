export interface Hero {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    alignment: string;
    fullName: string;
    publisher: string;
  };
  images: {
    md: string;
  };
}
