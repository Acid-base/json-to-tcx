const Trackpoint = data => `
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

const Track = trackPoint.reduce((acc, item) => {
    return acc += Trackpoint(data);
}, '');

const Activities = data => `
<Activities>
    <Activity Sport="${data.Activity}">
        <Id>${data.Id}</Id>
        <Lap StartTime="${data.Lap}">
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
            <Cadence>${data.Cadence}</Cadence>
            <TriggerMethod>${data.TriggerMethod}</TriggerMethod>
            <Track>
                ${Track}
            </Track>
        </Lap>
        </Activity>
</Activities>
`;

const TrainingCenterDatabase = `
<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase version="1.0" creator="Runtastic: Life is short - live long, http://www.runtastic.com" xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns4="http://www.garmin.com/xmlschemas/ProfileExtension/v1">
    ${Activities}
</TrainingCenterDatabase>
`;
