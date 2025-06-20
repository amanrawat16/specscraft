import { User } from "@/app/types";
import { BaseService } from "./baseService";

export class UserService extends BaseService {
  // Get current user profile
  static async getCurrentUser(): Promise<User | null> {
    try {
      return await this.apiCall<User>('/api/auth/me', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  // Update user profile
  static async updateProfile(data: Partial<User>): Promise<User> {
    return await this.apiCallWithAuth<User>('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
} 