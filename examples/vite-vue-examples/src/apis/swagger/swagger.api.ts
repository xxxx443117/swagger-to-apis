import { Http } from '../http';

export class SwaggerV2Api extends Http {
  //  uploads an image pet
  async post_pet_petId_uploadImage(params: {
    petId: number; // ID of pet to update
    additionalMetadata?: string; // Additional data to pass to server
    file?: FormData; // file to upload
  }): Promise<Api.Response<Api.SwaggerV2.ApiResponse>> {
    return this.post(`/v2/pet/${params.petId}/uploadImage`, params);
  }

  //  Add a new pet to the store pet
  async post_pet(body: Api.SwaggerV2.Pet): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.post(`/v2/pet`, body);
  }

  //  Update an existing pet pet
  async put_pet(body: Api.SwaggerV2.Pet): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.put(`/v2/pet`, body);
  }

  //  Finds Pets by status pet  (Multiple status values can be provided with comma separated strings)
  async get_pet_findByStatus(status: string[]): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.get(`/v2/pet/findByStatus`, { status });
  }

  // @deprecated Finds Pets by tags pet  (Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.)
  async get_pet_findByTags(tags: string[]): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.get(`/v2/pet/findByTags`, { tags });
  }

  //  Find pet by ID pet  (Returns a single pet)
  async get_pet_petId(petId: number): Promise<Api.Response<Api.SwaggerV2.Pet>> {
    return this.get(`/v2/pet/${petId}`, { petId });
  }

  //  Updates a pet in the store with form data pet
  async post_pet_petId(params: {
    petId: number; // ID of pet that needs to be updated
    name?: string; // Updated name of the pet
    status?: string; // Updated status of the pet
  }): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.post(`/v2/pet/${params.petId}`, params);
  }

  //  Deletes a pet pet
  async delete_pet_petId(params: {
    petId: number; // Pet id to delete
  }): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.delete(`/v2/pet/${params.petId}`, params);
  }

  //  Returns pet inventories by status store  (Returns a map of status codes to quantities)
  async get_store_inventory(): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.get(`/v2/store/inventory`);
  }

  //  Place an order for a pet store
  async post_store_order(body: Api.SwaggerV2.Order): Promise<Api.Response<Api.SwaggerV2.Order>> {
    return this.post(`/v2/store/order`, body);
  }

  //  Find purchase order by ID store  (For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions)
  async get_store_order_orderId(orderId: number): Promise<Api.Response<Api.SwaggerV2.Order>> {
    return this.get(`/v2/store/order/${orderId}`, { orderId });
  }

  //  Delete purchase order by ID store  (For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors)
  async delete_store_order_orderId(orderId: number): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.delete(`/v2/store/order/${orderId}`, { orderId });
  }

  //  Creates list of users with given input array user
  async post_user_createWithList(body: unknown): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.post(`/v2/user/createWithList`, { body });
  }

  //  Get user by user name user
  async get_user_username(username: string): Promise<Api.Response<Api.SwaggerV2.User>> {
    return this.get(`/v2/user/${username}`, { username });
  }

  //  Updated user user  (This can only be done by the logged in user.)
  async put_user_username(
    username: string,
    body: Api.SwaggerV2.User
  ): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.put(`/v2/user/${username}`, { username, body });
  }

  //  Delete user user  (This can only be done by the logged in user.)
  async delete_user_username(username: string): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.delete(`/v2/user/${username}`, { username });
  }

  //  Logs user into the system user
  async get_user_login(
    username: string,
    password: string
  ): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.get(`/v2/user/login`, { username, password });
  }

  //  Logs out current logged in user session user
  async get_user_logout(): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.get(`/v2/user/logout`);
  }

  //  Creates list of users with given input array user
  async post_user_createWithArray(body: unknown): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.post(`/v2/user/createWithArray`, { body });
  }

  //  Create user user  (This can only be done by the logged in user.)
  async post_user(body: Api.SwaggerV2.User): Promise<Api.Response<Api.SwaggerV2.Unknown>> {
    return this.post(`/v2/user`, body);
  }
}
