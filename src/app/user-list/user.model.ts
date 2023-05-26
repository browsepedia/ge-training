export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  addresses: Address[];
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  city: string;
}

interface Geo {
  lat: string;
  lng: string;
}
