import { test, expect } from '@playwright/test';

let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://reqres.in/'
  });
})

test.afterAll(async ({ }) => {
  await apiContext.dispose();
});


test.describe('Api tests', () => {
  test('Should create a user', async ({ }) => {
    const userData = {
      'name': 'Nazar',
      'job': 'AQA'
    };
    const createUserRequest = await apiContext.post(`/api/users`, {data: userData});

    expect(createUserRequest.ok()).toBeTruthy();
    expect(createUserRequest.status()).toBe(201);
    expect(await createUserRequest.json()).toEqual(expect.objectContaining(userData));
  });

  test('Should return user by given userId', async ({ }) => {
    const userId = 12;
    const userData = {
      'data': {
        'id':userId,
        'email':'rachel.howell@reqres.in',
        'first_name':'Rachel',
        'last_name':'Howell',
        'avatar':'https://reqres.in/img/faces/12-image.jpg'
      },
      'support':{
        'url':'https://reqres.in/#support-heading',
        'text':'To keep ReqRes free, contributions towards server costs are appreciated!'
      }
    };
    const getUserByIdRequest = await apiContext.get(`/api/users/${userId}`);

    expect(getUserByIdRequest.ok()).toBeTruthy();
    expect(getUserByIdRequest.status()).toBe(200);
    expect(await getUserByIdRequest.json()).toEqual(expect.objectContaining(userData));
  });

  test('Should update user with given data using PATCH request', async ({ }) => {
    const userId = 12;
    const userDataToUpdate = {
      "name": "morpheus",
      "job": "zion resident"
    };
    const updateUserByIdRequest = await apiContext.patch(`/api/users/${userId}`, {data: userDataToUpdate});

    expect(updateUserByIdRequest.ok()).toBeTruthy();
    expect(updateUserByIdRequest.status()).toBe(200);
    expect(await updateUserByIdRequest.json()).toEqual(expect.objectContaining(userDataToUpdate));
  });

  test('Should update user with given data using PUT request', async ({ }) => {
    const userId = 12;
    const userDataToUpdate = {
      "name": "morpheus",
      "job": "zion resident"
    };
    const updateUserByIdRequest = await apiContext.put(`/api/users/${userId}`, {data: userDataToUpdate});

    expect(updateUserByIdRequest.ok()).toBeTruthy();
    expect(updateUserByIdRequest.status()).toBe(200);
    expect(await updateUserByIdRequest.json()).toEqual(expect.objectContaining(userDataToUpdate));
  });

  test('Should remove user', async ({ }) => {
    const userId = 12;
    const deleteUserByIdRequest = await apiContext.delete(`/api/users/${userId}`);

    expect(deleteUserByIdRequest.ok()).toBeTruthy();
    expect(deleteUserByIdRequest.status()).toBe(204);
  });
});