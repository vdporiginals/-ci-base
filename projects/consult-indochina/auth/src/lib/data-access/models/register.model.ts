export interface RegisterUser {
  Email: string;
  Username: string;
  Password: string;
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  DateOfBirth?: string;
  MediaURL?: string;
  Type: 1;
  Status: 1;
}
