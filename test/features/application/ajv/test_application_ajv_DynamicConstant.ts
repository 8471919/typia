import TSON from "../../../../src";
import { DynamicConstant } from "../../../structures/DynamicConstant";
import { _test_application } from "../../internal/_test_application";

export const test_application_ajv_DynamicConstant = _test_application("ajv")(
    "DynamicConstant",
    TSON.application<[DynamicConstant], "ajv">(),
    {
        schemas: [
            {
                $ref: "components#/schemas/DynamicConstant",
            },
        ],
        components: {
            schemas: {
                DynamicConstant: {
                    $id: "components#/schemas/DynamicConstant",
                    type: "object",
                    properties: {
                        a: {
                            type: "number",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        b: {
                            type: "number",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        c: {
                            type: "number",
                            nullable: false,
                            "x-tson-required": true,
                        },
                        d: {
                            type: "number",
                            nullable: false,
                            "x-tson-required": true,
                        },
                    },
                    nullable: false,
                    required: ["a", "b", "c", "d"],
                    "x-tson_jsDocTags": [],
                },
            },
        },
        purpose: "ajv",
        prefix: "components#/schemas",
    },
);
