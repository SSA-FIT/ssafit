import { axiosInstance } from '../apis/axios';
import { SignUpResponse } from '../types/commonTypes';
import {
  DeleteUser,
  ProfileRequest,
  ProfileResponse,
} from '../types/profileTypes';

class ProfileService {
  public static async getUserInfo(token: string): Promise<ProfileResponse> {
    const response = await axiosInstance.get<ProfileResponse>(
      '/api/users/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async updateUserInfo(
    data: ProfileRequest,
    token: string,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.put<SignUpResponse>(
      '/api/users/profile',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async deleteUserInfo(
    data: DeleteUser,
    token: string,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.delete<SignUpResponse>(
      '/api/users/profile',
      {
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}

export default ProfileService;
