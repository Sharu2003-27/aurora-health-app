export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: UserResponse;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number; // cm
  weight?: number; // kg
  wakeUpTime?: string; // HH:mm
  bedtime?: string; // HH:mm
  activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OAuthRequest {
  provider: 'google' | 'apple';
  token: string;
  email?: string;
  name?: string;
}
