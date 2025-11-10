import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads a file to the server
 * @param {File} file - The file to upload
 * @param {Function} onProgress - Callback function that receives upload progress (0-100)
 * @returns {Promise<{url: string}>} - Returns the URL of the uploaded file
 */
export const uploadFile = async (file, onProgress = () => {}) => {
  // In a real implementation, you would upload the file to your server or a cloud storage service
  // This is a mock implementation that simulates a file upload
  
  return new Promise((resolve, reject) => {
    // Simulate upload progress
    const fileSize = file.size;
    let uploaded = 0;
    const chunkSize = Math.max(fileSize / 100, 1024 * 1024); // 1MB chunks or smaller for small files
    
    const uploadChunk = () => {
      // Simulate network delay
      setTimeout(() => {
        uploaded += chunkSize;
        const progress = Math.min(Math.round((uploaded / fileSize) * 100), 100);
        onProgress(progress);
        
        if (uploaded < fileSize) {
          uploadChunk();
        } else {
          // Generate a mock URL (in a real app, this would come from your server)
          const fileExtension = file.name.split('.').pop();
          const fileName = `${uuidv4()}.${fileExtension}`;
          const mockUrl = `https://storage.example.com/uploads/${fileName}`;
          
          resolve({ url: mockUrl });
        }
      }, 100);
    };
    
    // Start the upload
    uploadChunk();
  });
};

/**
 * Validates a file before upload
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Maximum file size in bytes
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @returns {{valid: boolean, error?: string}} - Validation result
 */
export const validateFile = (file, { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif'] } = {}) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return { 
      valid: false, 
      error: `File is too large. Maximum size is ${maxSizeMB}MB.` 
    };
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { valid: true };
};

/**
 * Converts a file to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string representation of the file
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
