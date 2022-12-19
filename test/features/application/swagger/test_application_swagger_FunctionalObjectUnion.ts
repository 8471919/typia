import typia from "../../../../src";
import { FunctionalObjectUnion } from "../../../structures/FunctionalObjectUnion";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_FunctionalObjectUnion = 
    _test_application("swagger")(
        "FunctionalObjectUnion",
        typia.application<[FunctionalObjectUnion], "swagger">(),{schemas: [
        {
            type: "array",
            items: {
                oneOf: [
                    {
                        $ref: "#/components/schemas/FunctionalObjectUnion.IPoint"
                    },
                    {
                        $ref: "#/components/schemas/FunctionalObjectUnion.ILine"
                    },
                    {
                        $ref: "#/components/schemas/FunctionalObjectUnion.IPolyline"
                    },
                    {
                        $ref: "#/components/schemas/FunctionalObjectUnion.IPolygon"
                    }
                ]
            },
            nullable: false
        }
    ],
    components: {
        schemas: {
            "FunctionalObjectUnion.IPoint": {
                type: "object",
                properties: {
                    x: {
                        type: "number",
                        nullable: false,
                        "x-typia-required": true
                    },
                    y: {
                        type: "number",
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "x",
                    "y"
                ],
                "x-typia_jsDocTags": []
            },
            "FunctionalObjectUnion.ILine": {
                type: "object",
                properties: {
                    p1: {
                        $ref: "#/components/schemas/FunctionalObjectUnion.IPoint",
                        "x-typia-required": true
                    },
                    p2: {
                        $ref: "#/components/schemas/FunctionalObjectUnion.IPoint",
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "p1",
                    "p2"
                ],
                "x-typia_jsDocTags": []
            },
            "FunctionalObjectUnion.IPolyline": {
                type: "object",
                properties: {
                    points: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/FunctionalObjectUnion.IPoint",
                            "x-typia-required": true
                        },
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "points"
                ],
                "x-typia_jsDocTags": []
            },
            "FunctionalObjectUnion.IPolygon": {
                type: "object",
                properties: {
                    points: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/FunctionalObjectUnion.IPoint",
                            "x-typia-required": true
                        },
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "points"
                ],
                "x-typia_jsDocTags": []
            }
        }
    },
    purpose: "swagger",
    prefix: "#/components/schemas"
}
);