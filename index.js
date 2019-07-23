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
    heartRateData: `${root}/Heart-rate-data`,
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

let gpsData = fs.readFileSync(`${path.gpsData}/${testId}`, 'utf8');
let heartRateData = fs.readFileSync(`${path.heartRateData}/${testId}`, 'utf8');

gpsData && JSON.parse(gpsData).forEach(content => {
    let obj = {};
    obj.timestamp = content.timestamp;
    obj.longitude = content.longitude;
    obj.latitude = content.latitude;
    obj.altitude = content.altitude;
    obj.distance = content.distance;

    data.push(obj);
});


heartRateData = JSON.parse(heartRateData);

 let i = 0;
 data.forEach(item => {
     for (i; i < heartRateData.length;) {
         let current = heartRateData[i].heart_rate;
         let prev = i && heartRateData[i-1].heart_rate;

         if (item.distance === heartRateData[i].distance) {
             item.heart_rate = current;
             i++;
         } else if (item.distance < heartRateData[i].distance) {
             item.heart_rate = prev;
         }
         break;
     }
});

console.log(data);

//  fs.readFile(`${root}/${testId}`, 'utf8', (err, contents) => {
//     //  console.log(contents);
//  });

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
