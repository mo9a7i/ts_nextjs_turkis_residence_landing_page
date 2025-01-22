import { Permission } from 'node-appwrite';

type AttributeType = 'string' | 'email' | 'datetime' | 'enum';

interface BaseAttribute {
    type: AttributeType;
    required: boolean;
}

interface StringAttribute extends BaseAttribute {
    type: 'string';
    size: number;
}

interface EmailAttribute extends BaseAttribute {
    type: 'email';
}

interface DatetimeAttribute extends BaseAttribute {
    type: 'datetime';
}

interface EnumAttribute extends BaseAttribute {
    type: 'enum';
    options: string[];
}

export type Attribute = StringAttribute | EmailAttribute | DatetimeAttribute | EnumAttribute;

export interface CollectionConfig {
    name: string;
    permissions: Permission[];
    attributes: Record<string, Attribute>;
}

export interface IndexConfig {
    name: string;
    type: 'key' | 'unique' | 'fulltext';
    attributes: string[];
}

export type Collections = Record<string, CollectionConfig>;
export type Indexes = Record<string, IndexConfig[]>; 