import TSON from "../../../../src";
import { ObjectUnionComposite } from "../../../structures/ObjectUnionComposite";
import { _test_application } from "../../internal/_test_application";

export const test_application_ajv_ObjectUnionComposite = _test_application(
    "ajv",
)("ObjectUnionComposite", TSON.application<[ObjectUnionComposite], "ajv">(), {
    schemas: [
        {
            type: "array",
            items: {
                oneOf: [
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.ILine",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.ITriangle",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.IRectangle",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.IPolyline",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.IPolygon",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.IPointedShape",
                    },
                    {
                        $ref: "components#/schemas/ObjectUnionComposite.ICircle",
                    },
                ],
            },
            nullable: false,
        },
    ],
    components: {
        schemas: {
            "ObjectUnionComposite.IPoint": {
                $id: "components#/schemas/ObjectUnionComposite.IPoint",
                type: "object",
                properties: {
                    x: {
                        type: "number",
                        nullable: false,
                        "x-tson-required": true,
                    },
                    y: {
                        type: "number",
                        nullable: false,
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["x", "y"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.ILine": {
                $id: "components#/schemas/ObjectUnionComposite.ILine",
                type: "object",
                properties: {
                    p1: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    p2: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["p1", "p2"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.ITriangle": {
                $id: "components#/schemas/ObjectUnionComposite.ITriangle",
                type: "object",
                properties: {
                    p1: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    p2: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    p3: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["p1", "p2", "p3"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.IRectangle": {
                $id: "components#/schemas/ObjectUnionComposite.IRectangle",
                type: "object",
                properties: {
                    p1: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    p2: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    p3: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    p4: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["p1", "p2", "p3", "p4"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.IPolyline": {
                $id: "components#/schemas/ObjectUnionComposite.IPolyline",
                type: "object",
                properties: {
                    points: {
                        type: "array",
                        items: {
                            $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                            "x-tson-required": true,
                        },
                        nullable: false,
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["points"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.IPolygon": {
                $id: "components#/schemas/ObjectUnionComposite.IPolygon",
                type: "object",
                properties: {
                    outer: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPolyline",
                        "x-tson-required": true,
                    },
                    inner: {
                        type: "array",
                        items: {
                            $ref: "components#/schemas/ObjectUnionComposite.IPolyline",
                            "x-tson-required": true,
                        },
                        nullable: false,
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["outer", "inner"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.IPointedShape": {
                $id: "components#/schemas/ObjectUnionComposite.IPointedShape",
                type: "object",
                properties: {
                    outer: {
                        type: "array",
                        items: {
                            $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                            "x-tson-required": true,
                        },
                        nullable: false,
                        "x-tson-required": true,
                    },
                    inner: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["outer", "inner"],
                "x-tson_jsDocTags": [],
            },
            "ObjectUnionComposite.ICircle": {
                $id: "components#/schemas/ObjectUnionComposite.ICircle",
                type: "object",
                properties: {
                    centroid: {
                        $ref: "components#/schemas/ObjectUnionComposite.IPoint",
                        "x-tson-required": true,
                    },
                    radius: {
                        type: "number",
                        nullable: false,
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["centroid", "radius"],
                "x-tson_jsDocTags": [],
            },
        },
    },
    purpose: "ajv",
    prefix: "components#/schemas",
});
