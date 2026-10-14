import { z } from 'zod';

// Convierte un schema de zod en JSON Schema para OpenAPI (sin la clave $schema).
export function toSchema(zodSchema, io = 'input') {
  const { $schema, ...jsonSchema } = z.toJSONSchema(zodSchema, { io });
  return jsonSchema;
}

export const jsonBody = (schema) => ({
  required: true,
  content: { 'application/json': { schema } },
});

export const jsonResponse = (description, schema) => ({
  description,
  content: { 'application/json': { schema } },
});

export const errorResponse = (description) => jsonResponse(description, { $ref: '#/components/schemas/Error' });

export const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'integer', minimum: 1 },
};

// Marca todas las operaciones como protegidas con JWT y les agrega la respuesta 401.
// Es el requireAuth de la documentación.
export function secure(paths) {
  const result = {};
  for (const [path, item] of Object.entries(paths)) {
    result[path] = {};
    for (const [key, value] of Object.entries(item)) {
      result[path][key] =
        key === 'parameters'
          ? value
          : {
              ...value,
              security: [{ bearerAuth: [] }],
              responses: { ...value.responses, 401: errorResponse('Token faltante, inválido o expirado') },
            };
    }
  }
  return result;
}
