export interface DomainUser {
  userId?: string,
  externalId?: string,
  username?: string,
  email?: string,
  role?: UserRole
}

export enum UserRole {
  STANDARD_USER,
  MODERATOR
}

