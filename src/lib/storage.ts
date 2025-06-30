import { supabase } from './supabase';

export type StorageBucket = 'profile-images' | 'portfolio-files' | 'chat-attachments' | 'user-documents';

export class StorageService {
  /**
   * Upload a file to a specific bucket
   */
  static async uploadFile(
    bucket: StorageBucket,
    path: string,
    file: File,
    options?: { upsert?: boolean }
  ) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          upsert: options?.upsert || false,
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error uploading file to ${bucket}:`, error);
      throw error;
    }
  }

  /**
   * Get public URL for a file
   */
  static getPublicUrl(bucket: StorageBucket, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }

  /**
   * Delete a file from storage
   */
  static async deleteFile(bucket: StorageBucket, path: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting file from ${bucket}:`, error);
      throw error;
    }
  }

  /**
   * List files in a bucket folder
   */
  static async listFiles(bucket: StorageBucket, folder?: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder || '', {
          limit: 100,
          offset: 0,
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error listing files in ${bucket}:`, error);
      throw error;
    }
  }

  /**
   * Generate a unique file path for user uploads
   */
  static generateFilePath(userId: string, fileName: string, folder?: string) {
    const timestamp = Date.now();
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const basePath = folder ? `${folder}/${userId}` : userId;
    return `${basePath}/${timestamp}_${cleanFileName}`;
  }

  /**
   * Validate file type and size
   */
  static validateFile(file: File, bucket: StorageBucket) {
    const limits = {
      'profile-images': {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      },
      'portfolio-files': {
        maxSize: 50 * 1024 * 1024, // 50MB
        allowedTypes: [
          'image/jpeg', 'image/png', 'image/webp', 'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'video/mp4', 'video/webm',
          'audio/mpeg', 'audio/wav'
        ]
      },
      'chat-attachments': {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: [
          'image/jpeg', 'image/png', 'image/webp', 'image/gif',
          'application/pdf',
          'text/plain',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
      },
      'user-documents': {
        maxSize: 20 * 1024 * 1024, // 20MB
        allowedTypes: [
          'image/jpeg', 'image/png', 'image/webp', 'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/plain',
          'text/csv'
        ]
      }
    };

    const config = limits[bucket];
    
    if (file.size > config.maxSize) {
      throw new Error(`File size exceeds limit of ${config.maxSize / (1024 * 1024)}MB`);
    }

    if (!config.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed for ${bucket}`);
    }

    return true;
  }
}

// Helper functions for common use cases
export const uploadProfileImage = async (userId: string, file: File) => {
  StorageService.validateFile(file, 'profile-images');
  const path = StorageService.generateFilePath(userId, file.name, 'avatars');
  return StorageService.uploadFile('profile-images', path, file, { upsert: true });
};

export const uploadPortfolioFile = async (userId: string, file: File) => {
  StorageService.validateFile(file, 'portfolio-files');
  const path = StorageService.generateFilePath(userId, file.name, 'portfolio');
  return StorageService.uploadFile('portfolio-files', path, file);
};

export const uploadChatAttachment = async (userId: string, file: File) => {
  StorageService.validateFile(file, 'chat-attachments');
  const path = StorageService.generateFilePath(userId, file.name, 'attachments');
  return StorageService.uploadFile('chat-attachments', path, file);
};