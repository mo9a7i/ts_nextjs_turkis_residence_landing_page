export const indexes = {
    properties: [
        {
            name: 'properties_user_id',
            type: 'key',
            attributes: ['userId']
        }
    ],
    pageVisits: [
        {
            name: 'visits_user_timestamp',
            type: 'key',
            attributes: ['userId', 'timestamp']
        }
    ]
}; 