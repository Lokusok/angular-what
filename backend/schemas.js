export const POST = {
  users: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        descr: { type: 'string' },
      },
      required: ['id', 'name', 'descr'],
    },
  },
};

export const PUT = {
  users: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        descr: { type: 'string' },
      },
      required: ['id', 'name', 'descr'],
    },
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
      required: ['id'],
    },
  },
};

export const DELETE = {
  users: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
      required: ['id'],
    },
  },
};
