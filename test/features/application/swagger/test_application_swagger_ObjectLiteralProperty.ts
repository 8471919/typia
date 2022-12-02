import TSON from "../../../../src";
import { ObjectLiteralProperty } from "../../../structures/ObjectLiteralProperty";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_ObjectLiteralProperty = _test_application(
    "swagger",
)(
    "ObjectLiteralProperty",
    TSON.application<[ObjectLiteralProperty], "swagger">(),
    {
        schemas: [
            {
                $ref: "#/components/schemas/ObjectLiteralProperty.ISomething",
            },
        ],
        components: {
            schemas: {
                "ObjectLiteralProperty.ISomething": {
                    type: "object",
                    properties: {
                        "something-interesting-do-you-want?": {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        "or-something-crazy-do-you-want?": {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                    },
                    nullable: false,
                    required: [
                        "something-interesting-do-you-want?",
                        "or-something-crazy-do-you-want?",
                    ],
                    "x-tson_jsDocTags": [],
                },
            },
        },
        purpose: "swagger",
        prefix: "#/components/schemas",
    },
);
