declare namespace Api {
  namespace SwaggerV2 {
    type Unknown = unknown;

    interface ApiResponse {
      code: number;
      type: string;
      message: string;
    }

    interface Category {
      id: number;
      name: string;
    }

    interface Pet {
      id: number;
      category: Api.SwaggerV2.Category;
      name: string;
      photoUrls: string[];
      tags: Api.SwaggerV2.Tag[];
      status: 'available' | 'pending' | 'sold'; // pet status in the store
    }

    interface Tag {
      id: number;
      name: string;
    }

    interface Order {
      id: number;
      petId: number;
      quantity: number;
      shipDate: string;
      status: 'placed' | 'approved' | 'delivered'; // Order Status
      complete: boolean;
    }

    interface User {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone: string;
      userStatus: number; // User Status
    }
  }
}
