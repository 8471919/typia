import TSON from "../../../../src";
import { TagObjectUnion } from "../../../structures/TagObjectUnion";
import { _test_application } from "../../internal/_test_application";

export const test_application_ajv_TagObjectUnion = _test_application("ajv")(
    "TagObjectUnion",
    TSON.application<[TagObjectUnion], "ajv">(),
    {
        schemas: [
            {
                type: "array",
                items: {
                    oneOf: [
                        {
                            $ref: "components#/schemas/TagObjectUnion.Numeric",
                        },
                        {
                            $ref: "components#/schemas/TagObjectUnion.Literal",
                        },
                    ],
                },
                nullable: false,
            },
        ],
        components: {
            schemas: {
                "TagObjectUnion.Numeric": {
                    $id: "components#/schemas/TagObjectUnion.Numeric",
                    type: "object",
                    properties: {
                        value: {
                            type: "number",
                            nullable: false,
                            "x-tson-metaTags": [
                                {
                                    kind: "minimum",
                                    value: 3,
                                },
                            ],
                            "x-tson-jsDocTags": [
                                {
                                    name: "minimum",
                                    text: [
                                        {
                                            text: "3",
                                            kind: "text",
                                        },
                                    ],
                                },
                            ],
                            "x-tson-required": true,
                            minimum: 3,
                        },
                    },
                    nullable: false,
                    required: ["value"],
                    "x-tson_jsDocTags": [],
                },
                "TagObjectUnion.Literal": {
                    $id: "components#/schemas/TagObjectUnion.Literal",
                    type: "object",
                    properties: {
                        value: {
                            type: "string",
                            nullable: false,
                            "x-tson-metaTags": [
                                {
                                    kind: "length",
                                    minimum: {
                                        include: true,
                                        value: 3,
                                    },
                                    maximum: {
                                        include: true,
                                        value: 7,
                                    },
                                },
                            ],
                            "x-tson-jsDocTags": [
                                {
                                    name: "length",
                                    text: [
                                        {
                                            text: "[3, 7]",
                                            kind: "text",
                                        },
                                    ],
                                },
                            ],
                            "x-tson-required": true,
                            minLength: 3,
                            maxLength: 7,
                        },
                    },
                    nullable: false,
                    required: ["value"],
                    "x-tson_jsDocTags": [],
                },
            },
        },
        purpose: "ajv",
        prefix: "components#/schemas",
    },
);
