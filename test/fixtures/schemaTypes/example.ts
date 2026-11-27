type Definition = Record<string, unknown>;

const defineType = (definition: Definition) => definition;
const defineField = (definition: Definition) => definition;
const defineArrayMember = (definition: Definition) => definition;

export const example = defineType({
  name: "example",
  type: "document",
  fields: [
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "href", type: "url" })],
        }),
      ],
    }),
  ],
});
