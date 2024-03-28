import typia from "typia";

import { _test_json_application } from "../../../../internal/_test_json_application";
import { ArrayRepeatedUnionWithTuple } from "../../../../structures/ArrayRepeatedUnionWithTuple";

export const test_json_application_swagger_standard_ArrayRepeatedUnionWithTuple =
  _test_json_application({
    purpose: "swagger",
    surplus: false,
    name: "ArrayRepeatedUnionWithTuple",
  })({
    schemas: [
      {
        $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple",
      },
    ],
    components: {
      schemas: {
        ArrayRepeatedUnionWithTuple: {
          oneOf: [
            {
              type: "number",
            },
            {
              type: "boolean",
            },
            {
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              type: "array",
              items: {
                $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple",
              },
            },
            {
              type: "array",
              items: {
                $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IBox3D",
              },
            },
            {
              type: "array",
              items: {
                oneOf: [
                  {
                    type: "string",
                  },
                  {
                    type: "number",
                  },
                  {
                    type: "boolean",
                  },
                ],
              },
              minItems: 3,
              maxItems: 3,
              "x-typia-tuple": {
                type: "array",
                items: [
                  {
                    type: "string",
                    "x-typia-rest": false,
                    "x-typia-required": true,
                    "x-typia-optional": false,
                  },
                  {
                    type: "number",
                    "x-typia-rest": false,
                    "x-typia-required": true,
                    "x-typia-optional": false,
                  },
                  {
                    type: "boolean",
                    "x-typia-rest": false,
                    "x-typia-required": true,
                    "x-typia-optional": false,
                  },
                ],
                minItems: 3,
                maxItems: 3,
              },
            },
            {
              type: "array",
              items: {
                oneOf: [
                  {
                    $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IBox3D",
                  },
                  {
                    $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IPoint3D",
                  },
                ],
              },
              minItems: 2,
              maxItems: 2,
              "x-typia-tuple": {
                type: "array",
                items: [
                  {
                    $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IBox3D",
                    "x-typia-rest": false,
                    "x-typia-required": true,
                    "x-typia-optional": false,
                  },
                  {
                    $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IPoint3D",
                    "x-typia-rest": false,
                    "x-typia-required": true,
                    "x-typia-optional": false,
                  },
                ],
                minItems: 2,
                maxItems: 2,
              },
            },
          ],
        },
        "ArrayRepeatedUnionWithTuple.IBox3D": {
          type: "object",
          properties: {
            scale: {
              $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IPoint3D",
            },
            position: {
              $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IPoint3D",
            },
            rotate: {
              $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IPoint3D",
            },
            pivot: {
              $ref: "#/components/schemas/ArrayRepeatedUnionWithTuple.IPoint3D",
            },
          },
          nullable: false,
          required: ["scale", "position", "rotate", "pivot"],
        },
        "ArrayRepeatedUnionWithTuple.IPoint3D": {
          type: "object",
          properties: {
            x: {
              type: "number",
            },
            y: {
              type: "number",
            },
            z: {
              type: "number",
            },
          },
          nullable: false,
          required: ["x", "y", "z"],
        },
      },
    },
    purpose: "swagger",
    surplus: false,
  });
