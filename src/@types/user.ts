interface User {
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  photo: string | File | null;
}

export type { User };
