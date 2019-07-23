const fs = require('fs');
const alias = {
    sport_type_id: {
        1: 'running'
    },
    StartTime: 'start_time',
    DistanceMeters: 'distance',
    TotalTimeSeconds: 'duration',
    AverageHeartRateBpm: 'pulse_avg',
    MaximumHeartRateBpm: 'pulse_max',
    MaximumSpeed: 'max_speed',
    Calories: 'calories',
    Notes: 'notes',
    Cadence: 'avg_cadence',

    heartRateta: {
        Time: 'timestamp',
        HeartRateBpm: 'heart_rate',
        DistanceMeters: 'distance'
    },

    gpsData: {
        Time: 'timestamp',
        LatitudeDegrees: 'latitude',
        LongitudeDegrees: 'longitude'
    },

    elevationData: {
        AltitudeMeters: 'elevation'
    }
};

const root = './Sport-sessions';
const path = {
    gpsData: `${root}/GPS-data`,
    elevationData: `${root}/Elevation-data`,
    heartRateta: `${root}/Heart-rate-data`,
    speedData: `${root}/Speed-data`
};

const testId = 'f81696e7-0c6a-4c22-89e2-b23da13f3e01.json';

// fs.readdir(root, function(err, items) {
//     console.log(items[0]);

//     fs.readFile(`${root}/${items[0]}`, 'utf8', (err, contents) => {
//         console.log(contents);
//     });
//     fs.readFile(`${path.gpsData}/${items[0]}`, 'utf8', (err, contents) => {
//         console.log(contents);
//     });
//     fs.readFile(`${path.heartRateta}/${items[0]}`, 'utf8', (err, contents) => {
//         console.log(contents);
//     });
//     fs.readFile(`${path.elevationData}/${items[0]}`, 'utf8', (err, contents) => {
//         console.log(contents);
//     });
//     items.forEach(item => console.log(item));
// });

let data = [];

fs.readFile(`${path.gpsData}/${testId}`, 'utf8', (err, contents) => {
    console.log(contents);
    contents.forEach(content => {
        data.timestamp = content.timestamp;
        data.longitude = content.longitude;
        data.latitude = content.latitude;
        data.altitude = content.altitude;
        data.distance = content.distance;
    });
 });
 fs.readFile(`${path.heartRateta}/${testId}`, 'utf8', (err, contents) => {
     console.log(contents);
     contents.forEach(content => {
        data.timestamp = content.timestamp;
        data.heart_rate = content.heart_rate;
    });
 });
 fs.readFile(`${root}/${testId}`, 'utf8', (err, contents) => {
     console.log(contents);
 });

const getTrackpoint = data => `
<Trackpoint>
    <Time>${data.Time}</Time>
    <HeartRateBpm>
        <Value>${data.HeartRateBpm}</Value>
    </HeartRateBpm>
    <DistanceMeters>${data.DistanceMeters}</DistanceMeters>
    <AltitudeMeters>${data.AltitudeMeters}</AltitudeMeters>
    <Position>
        <LatitudeDegrees>${data.LatitudeDegrees}</LatitudeDegrees>
        <LongitudeDegrees>${data.LongitudeDegrees}</LongitudeDegrees>
    </Position>
</Trackpoint>
`;

// const Track = trackPoint.reduce((acc, item) => {
//     return acc += Trackpoint(data);
// }, '');

const Activities = data => `
<Activities>
    <Activity Sport="${data.Activity}">
        <Id>${data.StartTime}</Id>
        <Lap StartTime="${data.StartTime}">
            <TotalTimeSeconds>${data.TotalTimeSeconds}</TotalTimeSeconds>
            <DistanceMeters>${data.DistanceMeters}</DistanceMeters>
            <Calories>${data.Calories}</Calories>
            <AverageHeartRateBpm>
                <Value>${data.AverageHeartRateBpm}</Value>
            </AverageHeartRateBpm>
            <MaximumHeartRateBpm>
                <Value>${data.MaximumHeartRateBpm}</Value>
            </MaximumHeartRateBpm>
            <MaximumSpeed>${data.MaximumSpeed}</MaximumSpeed>
            <Notes>${data.Notes}</Notes>
            <Cadence>${data.Cadence}</Cadence>
            <TriggerMethod>${data.TriggerMethod}</TriggerMethod>
            <Track>
                ${Track}
            </Track>
        </Lap>
        </Activity>
</Activities>
`;

// const TrainingCenterDatabase = `
// <?xml version="1.0" encoding="UTF-8"?>
// <TrainingCenterDatabase version="1.0" creator="Runtastic: Life is short - live long, http://www.runtastic.com" xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns4="http://www.garmin.com/xmlschemas/ProfileExtension/v1">
//     ${Activities}
// </TrainingCenterDatabase>
// `;
