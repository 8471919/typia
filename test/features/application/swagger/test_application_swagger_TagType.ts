import TSON from "../../../../src";
import { TagType } from "../../../structures/TagType";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_TagType = _test_application("swagger")(
    "TagType",
    TSON.application<[TagType], "swagger">(),
    {
        schemas: [
            {
                type: "array",
                items: {
                    $ref: "#/components/schemas/TagType.Type",
                },
                nullable: false,
            },
        ],
        components: {
            schemas: {
                "TagType.Type": {
                    type: "object",
                    properties: {
                        int: {
                            type: "integer",
                            nullable: false,
                            description: "Integer value.",
                            "x-tson-metaTags": [
                                {
                                    kind: "type",
                                    value: "int",
                                },
                            ],
                            "x-tson-jsDocTags": [
                                {
                                    name: "type",
                                    text: [
                                        {
                                            text: "int",
                                            kind: "text",
                                        },
                                    ],
                                },
                            ],
                            "x-tson-required": true,
                        },
                        uint: {
                            type: "integer",
                            nullable: false,
                            description: "Unsigned integer value.",
                            "x-tson-metaTags": [
                                {
                                    kind: "type",
                                    value: "uint",
                                },
                            ],
                            "x-tson-jsDocTags": [
                                {
                                    name: "type",
                                    text: [
                                        {
                                            text: "uint",
                                            kind: "text",
                                        },
                                    ],
                                },
                            ],
                            "x-tson-required": true,
                            minimum: 0,
                        },
                    },
                    nullable: false,
                    required: ["int", "uint"],
                    "x-tson_jsDocTags": [],
                },
            },
        },
        purpose: "swagger",
        prefix: "#/components/schemas",
    },
);
