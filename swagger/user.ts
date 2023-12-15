export const userRegisterSwagger = {
    "hapi-swagger": {
        responses: {
            201: {
                description: "User created successfully.",
            },
            400: {
                description: "Input Fields Required.",
            },
            409: {
                description: "User already exists.",
            },
        },
    },
};

export const userLoginSwagger = {
    "hapi-swagger": {
      responses: {
        200: {
          description: "User logined successfully.",
        },
        401: {
          description: "Password is incorrect.",
        },
        404: {
          description: "User not found.",
        },
      },
    },
  };