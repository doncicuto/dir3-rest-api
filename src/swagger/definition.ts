/**
 * @openapi
 *  components:
 *    parameters:
 *      idAGE:
 *        name: id
 *        in: path
 *        description: DIR3 Code
 *        required: true
 *        schema:
 *          type: string
 *          example: E00003301
 *      idCCAA:
 *        name: id
 *        in: path
 *        description: DIR3 Code
 *        required: true
 *        schema:
 *          type: string
 *          example: A07002862
 *      idEELL:
 *        name: id
 *        in: path
 *        description: DIR3 Code
 *        required: true
 *        schema:
 *          type: string
 *          example: L01471868
 *      idUniversity:
 *        name: id
 *        in: path
 *        description: DIR3 Code
 *        required: true
 *        schema:
 *          type: string
 *          example: U02500001
 *      idJustice:
 *        name: id
 *        in: path
 *        description: DIR3 Code
 *        required: true
 *        schema:
 *          type: string
 *          example: J00000467
 *      idInstitution:
 *        name: id
 *        in: path
 *        description: DIR3 Code
 *        required: true
 *        schema:
 *          type: string
 *          example: I00000001
 *      selectParam:
 *        name: select
 *        in: query
 *        description: comma-separated list of fields that we want to retrieve. See a list of possible fields visiting the Unit schema.
 *        required: false
 *        schema:
 *          type: string
 *          example: id,description
 *      offsetParam:
 *        name: offset
 *        in: query
 *        description: Number of records to be skipped.
 *        required: false
 *        schema:
 *          type: number
 *          default: 0
 *          example: 10
 *      limitParam:
 *        name: limit
 *        in: query
 *        description: Number of records to be retrieved.
 *        required: false
 *        schema:
 *          type: number
 *          example: 50
 *      descriptionParam:
 *        name: description
 *        in: query
 *        description: "Find units that contains the string. It will try to find the description script in the following Unit fields: description, hierarchicalSuperiorUnitDescription, rootOrganicUnitDescription or rootPublicLawEntityIndicatorDescription."
 *        required: false
 *        schema:
 *          type: string
 *          example: Valladolid
 *      provinceParam:
 *        name: province
 *        in: query
 *        description: "Find units whose province description contains the search string."
 *        required: false
 *        schema:
 *          type: string
 *          example: Valladolid
 *      statusParam:
 *        name: status
 *        in: query
 *        description: "Find units whose status equals the search string."
 *        required: false
 *        schema:
 *          type: string
 *          example: V
 *    responses:
 *      Units:
 *       description: A list of organic units
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/ArrayOfUnits'
 *      Unit:
 *       description: Organic unit detail
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Unit'
 *
 *    schemas:
 *      ArrayOfUnits:
 *        type: array
 *        items:
 *          oneOf:
 *            - $ref: '#/components/schemas/Unit'
 *      Unit:
 *        type: object
 *        required:
 *          - id
 *          - description
 *          - level
 *          - type
 *          - hierarchicalLevel
 *          - hierarchicalSuperiorUnitId
 *          - hierarchicalSuperiorUnitDescription
 *          - rootOrganicUnitId
 *          - rootOrganicUnitDescription
 *          - status
 *          - nifOrCif
 *        properties:
 *          id:
 *            type: string,
 *            description: Unit DIR3 code
 *            example: "E00003301"
 *          description:
 *            type: string
 *            description: Unit description
 *            example: "Ministerio de Defensa"
 *          level:
 *            type: number,
 *            description: "Territorial level of administration to which the organic unit belongs, according to article 2 of Law 39/2015. Possible values: 1 - General State Administration, 2 - Autonomous Government Administration, 3 - Local Administration, 4 - Universities, 5 - Other institutions"
 *            example: 1
 *          type:
 *            type: string,
 *            description: "Type of public entity. Possible values: AE - AGENCIA ESTATAL, AY - AYUNTAMIENTO, CA - COMUNIDAD AUTONOMA, CI - CABILDO O CONSELL INSULAR, CO - COMARCA, DP - DIPUTACION PROVINCIAL O FORAL, EM - ENTIDAD LOCAL MENOR, EP - ENTIDAD DE DERECHO PUBLICO, MA	- MANCOMUNIDAD, MN - MINISTERIO, OA - ORGANISMO AUTONOMO, UN - UNIVERSIDAD"
 *            example: "MN"
 *          provinceDesc:
 *            type: string,
 *            description: "Name of the province. Only present for Local Entities"
 *            example: "Valladolid"
 *          provinceId:
 *            type: number,
 *            description: "Code of the province. A number between 1 and 52. Code descriptions are available at https://www.ine.es/daco/daco42/codmun/cod_provincia.htm"
 *            example: 47
 *          hierarchicalLevel:
 *            type: number,
 *            description: "Sequential number that identifies the hierarchical level that the unit occupies in the structure of the entity to which it belongs."
 *            example: 1
 *          hierarchicalSuperiorUnitId:
 *            type: string,
 *            description: "DIR3 Code of the immediately superior organic unit on which the unit hierarchically depends. If the unit represents the highest level of the public entity itself, it will refer to itself."
 *            example: EA9999999
 *          hierarchicalSuperiorUnitDescription:
 *            type: string
 *            description: "Description of the immediately superior organic unit."
 *            example: "Administracion del Estado"
 *          rootOrganicUnitId:
 *            type: string,
 *            description: "DIR3 code of the organic unit, at the highest level of hierarchy, on which the unit depends. If the unit represents the highest level of the public entity itself, it will refer to itself."
 *            example: "E00003301"
 *          rootOrganicUnitDescription:
 *            type: string
 *            description: "Description of the organic unit, at the highest level of hierarchy."
 *            example: "Ministerio de Defensa"
 *          publicLawEntityIndicator:
 *            type: string
 *            description: "Defines whether the unit is or depends on a Public Law Entity, according to article 2 of Law 39/2015. Possible values 'S' for yes, 'N' for no."
 *            example: "S"
 *          rootPublicLawEntityIndicatorId:
 *            type: string,
 *            description: "DIR3 code of the Public Law Entity associated with the unit. If the unit represents the Entity itself, it will refer to itself."
 *            example: "LA0016435"
 *          rootPublicLawEntityIndicatorDescription:
 *            type: string,
 *            description: "Description of the Public Law Entity associated with the unit."
 *            example: "Consorcio Escolar Junta Económica de Centros Escolares de Campezo"
 *          status:
 *            type: string,
 *            enum: [V, E, A, T]
 *            description: "Status or legal / functional situation of the unit. Possible values: `V` - Current, `E` - Extinct, `A` - Canceled, `T` - Transitory"
 *            example: "V"
 *          officialCreationDate:
 *            type: string
 *            format: date-time
 *            description: "Date on which the unit is created or established, according to a legal provision."
 *            example: "1959-09-06T23:00:44.000Z"
 *          nifOrCif:
 *            type: string
 *            description: "NIF or CIF code of the unit."
 *            example: C13525968
 */
