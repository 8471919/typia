import { IJsDocTagInfo } from "./IJsDocTagInfo";
import { IMetadataDictionary } from "./IMetadataDictionary";
import { IMetadataParameter } from "./IMetadataParameter";
import { Metadata } from "./Metadata";
export declare class MetadataParameter {
    name: string;
    type: Metadata;
    description: string | null;
    jsDocTags: IJsDocTagInfo[];
    private constructor();
    static from(json: IMetadataParameter, dict: IMetadataDictionary): MetadataParameter;
    toJSON(): IMetadataParameter;
}
