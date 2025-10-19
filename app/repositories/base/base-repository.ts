export abstract class BaseRepository {
  protected api: ReturnType<typeof $fetch.create>;

  constructor() {
    const { $api } = useNuxtApp();
    this.api = $api;
  }

  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      return await this.api<T>(endpoint, {
        method: "GET",
        params,
      });
    }
    catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async post<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<T> {
    try {
      return await this.api<T>(endpoint, {
        method: "POST",
        body,
      });
    }
    catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async put<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<T> {
    try {
      return await this.api<T>(endpoint, {
        method: "PUT",
        body,
      });
    }
    catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async patch<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<T> {
    try {
      return await this.api<T>(endpoint, {
        method: "PATCH",
        body,
      });
    }
    catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      return await this.api<T>(endpoint, {
        method: "DELETE",
      });
    }
    catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected handleError(error: any): void {
    // Custom error handling logic
    if (error.statusCode === 404) {
      console.error("Resource not found");
    }
    else if (error.statusCode === 500) {
      console.error("Server error");
    }
    else {
      console.error("API Error:", error);
    }
  }
}
