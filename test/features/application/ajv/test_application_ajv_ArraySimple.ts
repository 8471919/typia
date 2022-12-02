import TSON from "../../../../src";
import { ArraySimple } from "../../../structures/ArraySimple";
import { _test_application } from "../../internal/_test_application";

export const test_application_ajv_ArraySimple = _test_application("ajv")(
    "ArraySimple",
    TSON.application<[ArraySimple], "ajv">(),
    {
        schemas: [
            {
                type: "array",
                items: {
                    $ref: "components#/schemas/ArraySimple.IPerson",
                },
                nullable: false,
            },
        ],
        components: {
            schemas: {
                "ArraySimple.IPerson": {
                    $id: "components#/schemas/ArraySimple.IPerson",
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        email: {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        hobbies: {
                            oneOf: [
                                {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        nullable: false,
                                        "x-tson-required": true,
                                    },
                                    nullable: false,
                                    "x-tson-required": true,
                                },
                                {
                                    type: "array",
                                    items: {
                                        $ref: "components#/schemas/ArraySimple.IHobby",
                                        "x-tson-required": true,
                                    },
                                    nullable: false,
                                    "x-tson-required": true,
                                },
                                {
                                    type: "array",
                                    items: {
                                        $ref: "components#/schemas/ArraySimple.IContent",
                                        "x-tson-required": true,
                                    },
                                    nullable: false,
                                    "x-tson-required": true,
                                },
                            ],
                            "x-tson-required": true,
                        },
                    },
                    nullable: false,
                    required: ["name", "email", "hobbies"],
                    "x-tson_jsDocTags": [],
                },
                "ArraySimple.IHobby": {
                    $id: "components#/schemas/ArraySimple.IHobby",
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        rank: {
                            type: "number",
                            nullable: false,
                            "x-tson-required": true,
                        },
                    },
                    nullable: false,
                    required: ["name", "rank"],
                    "x-tson_jsDocTags": [],
                },
                "ArraySimple.IContent": {
                    $id: "components#/schemas/ArraySimple.IContent",
                    type: "object",
                    properties: {
                        body: {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                    },
                    nullable: false,
                    required: ["body"],
                    "x-tson_jsDocTags": [],
                },
            },
        },
        purpose: "ajv",
        prefix: "components#/schemas",
    },
);
