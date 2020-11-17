# Murmurations Library

This repo is for storing and curating Murmurations **fields** and **schemas**.

Additions or modifications to library fields occur through pull requests to this repo. Issues can be used to discuss and propose updates or changes. 

Schemas are created by specific networks or interest groups, and they are added to this repo by pull request.

## Overview

A **schema** is a group of **fields** (data points) that together provide information that is useful to **aggregators** who present that data in meaningful ways. Schemas define the composition of fields, and fields define the type and validation rules for data.

An example of field composition in a schema can be seen in this [demo schema](schemas/demo-v1.json).

Note how fields are defined separately, including information about their type and other validation rules. For example, see how the [`name` field](fields/name-v1.json) is defined.

### Validation

All schemas and fields must validate against the [JSON Schema](https://json-schema.org/) vocabulary for annotating and validating JSON documents.

A useful online validation tool can be found at: https://www.jsonschemavalidator.net/

Schemas and fields in the Murmurations library are validated against JSON Schema Draft 4.

## Creating a Schema

1. Define all of the data points (fields) you want to collect from the nodes you want to aggregate
2. Check if any of those fields already exist in the [field library](fields/)
3. Draft your schema following the example format of the [demo schema](schemas/demo-v1.json)
    - Use `$ref`s to point to any existing fields in the library you want to use, or else define the new fields you need directly in the schema
    - Reusing existing fields from the library whenever possible makes it easier for nodes using your schema to be compatible with other schemas without needing to re-enter the same data twice
4. Make sure your schema validates using the [JSON Schema Validator](https://www.jsonschemavalidator.net/)
    - Select _Schema Draft v4_ from the "Select schema" dropdown menu and then paste your schema into the "Input JSON" text area

## Testing Your Schema

1. Once your schema validates to Draft 4, cut it from the "Input JSON" text area and paste it into the "Select schema" text area on the left
2. Add curly braces to create an object, and then start entering the key/value pairs for your schema in the "Input JSON" text area
3. Test various values to ensure that the validation rules you created are working correctly

## Adding Your Schema to the Library

1. Fork this library repo and create a new branch for your schema
2. Add your new schema in the `/schemas` directory
3. Create a pull request
    - If there are fields in your schema that you think should be added into the `/fields` directory because they are highly likely to be useful to others in their schemas, please mention this in your pull request
