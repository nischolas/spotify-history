import type { SpotifyHistoryItem } from "@/types";

// Fake URIs for dummy tracks
const U = {
  losAngeles: "spotify:track:1GlCsOCJxHiOoGm2yhPMvk",
  nocturnal: "spotify:track:2XRpCfJUDkuiSfGFRRjRbB",
  letItHappen: "spotify:track:3FQgCXBgb2ZxGOGdTtFmQ1",
  theLessIKnow: "spotify:track:4NiJW4q9ichV2kFlKQbFPq",
  getLucky: "spotify:track:5vNRhkKd0yEAg8suGBpjeY",
  oneMoreTime: "spotify:track:7CjHXVmXf7JkAT7smNhQ6c",
  karmaPolice: "spotify:track:63OQupATfueTdZMWTxW03A",
  fakePlasticTrees: "spotify:track:1htbP4RfUYBDYRvdVPQaRK",
  goYourOwnWay: "spotify:track:7Hb2HRSYLEyGeBxzMDQjFm",
  dreams: "spotify:track:0ofHAoxe9vBkTCp2UQIavz",
  doIWannaKnow: "spotify:track:5XeFesFbtLpXzIVDNQP22n",
  danceYrselfClean: "spotify:track:0e5GzMxhGcuLk4UKNEFAhE",
  roygbiv: "spotify:track:4LRPiXqCikLlN15c3yImP7",
  avril14th: "spotify:track:1sCADhMoFPKdB2JnbbR1T5",
  sing: "spotify:track:6VMxXFGHMDFpKyQj7cEf2Q",
};

export const dummyAggregatedData: SpotifyHistoryItem[] = [
  { ts: "2024-03-01T12:00:00Z", ms_played: 54720000, count: 92, spotify_track_uri: U.losAngeles, master_metadata_track_name: "Los Angeles", master_metadata_album_artist_name: "The Midnight" },
  { ts: "2024-02-15T10:00:00Z", ms_played: 43200000, count: 78, spotify_track_uri: U.letItHappen, master_metadata_track_name: "Let It Happen", master_metadata_album_artist_name: "Tame Impala" },
  { ts: "2024-01-20T09:00:00Z", ms_played: 36900000, count: 65, spotify_track_uri: U.getLucky, master_metadata_track_name: "Get Lucky", master_metadata_album_artist_name: "Daft Punk" },
  { ts: "2023-12-10T14:00:00Z", ms_played: 32400000, count: 54, spotify_track_uri: U.doIWannaKnow, master_metadata_track_name: "Do I Wanna Know?", master_metadata_album_artist_name: "Arctic Monkeys" },
  { ts: "2023-11-05T11:00:00Z", ms_played: 28800000, count: 48, spotify_track_uri: U.karmaPolice, master_metadata_track_name: "Karma Police", master_metadata_album_artist_name: "Radiohead" },
  { ts: "2023-09-22T16:00:00Z", ms_played: 25200000, count: 43, spotify_track_uri: U.nocturnal, master_metadata_track_name: "Nocturnal", master_metadata_album_artist_name: "The Midnight" },
  { ts: "2023-08-14T13:00:00Z", ms_played: 21600000, count: 37, spotify_track_uri: U.goYourOwnWay, master_metadata_track_name: "Go Your Own Way", master_metadata_album_artist_name: "Fleetwood Mac" },
  { ts: "2023-07-03T08:00:00Z", ms_played: 18000000, count: 31, spotify_track_uri: U.danceYrselfClean, master_metadata_track_name: "Dance Yrself Clean", master_metadata_album_artist_name: "LCD Soundsystem" },
  { ts: "2023-06-18T17:00:00Z", ms_played: 15480000, count: 26, spotify_track_uri: U.theLessIKnow, master_metadata_track_name: "The Less I Know The Better", master_metadata_album_artist_name: "Tame Impala" },
  { ts: "2023-05-07T15:00:00Z", ms_played: 12960000, count: 22, spotify_track_uri: U.dreams, master_metadata_track_name: "Dreams", master_metadata_album_artist_name: "Fleetwood Mac" },
  { ts: "2022-11-30T10:00:00Z", ms_played: 10800000, count: 18, spotify_track_uri: U.oneMoreTime, master_metadata_track_name: "One More Time", master_metadata_album_artist_name: "Daft Punk" },
  { ts: "2022-09-12T09:00:00Z", ms_played: 9360000, count: 15, spotify_track_uri: U.fakePlasticTrees, master_metadata_track_name: "Fake Plastic Trees", master_metadata_album_artist_name: "Radiohead" },
  { ts: "2022-07-25T12:00:00Z", ms_played: 7920000, count: 12, spotify_track_uri: U.roygbiv, master_metadata_track_name: "Roygbiv", master_metadata_album_artist_name: "Boards of Canada" },
  { ts: "2022-05-19T11:00:00Z", ms_played: 6480000, count: 9, spotify_track_uri: U.avril14th, master_metadata_track_name: "Avril 14th", master_metadata_album_artist_name: "Aphex Twin" },
  { ts: "2021-12-01T14:00:00Z", ms_played: 5040000, count: 7, spotify_track_uri: U.sing, master_metadata_track_name: "Sing", master_metadata_album_artist_name: "Four Tet" },
];

const raw = (ts: string, uri: keyof typeof U, name: string, artist: string, ms: number, platform: string, reason_start: SpotifyHistoryItem["reason_start"]): SpotifyHistoryItem => ({
  ts,
  ms_played: ms,
  spotify_track_uri: U[uri],
  master_metadata_track_name: name,
  master_metadata_album_artist_name: artist,
  platform,
  reason_start,
});

export const dummyRawData: SpotifyHistoryItem[] = [
  // 2024 - Los Angeles is most played
  raw("2024-04-12T08:23:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "iOS", "trackdone"),
  raw("2024-04-08T21:45:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "iOS", "clickrow"),
  raw("2024-03-30T19:10:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "android", "clickrow"),
  raw("2024-03-22T14:05:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "iOS", "trackdone"),
  raw("2024-03-15T10:30:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "Windows", "clickrow"),
  raw("2024-02-28T22:15:00Z", "getLucky", "Get Lucky", "Daft Punk", 248000, "iOS", "trackdone"),
  raw("2024-02-20T17:40:00Z", "losAngeles", "Los Angeles", "The Midnight", 1200, "iOS", "fwdbtn"),
  raw("2024-02-14T09:55:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 272000, "android", "clickrow"),
  raw("2024-02-07T16:20:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "Windows", "trackdone"),
  raw("2024-01-25T11:35:00Z", "karmaPolice", "Karma Police", "Radiohead", 258000, "iOS", "clickrow"),
  raw("2024-01-18T20:00:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "android", "backbtn"),
  raw("2024-01-10T07:45:00Z", "getLucky", "Get Lucky", "Daft Punk", 2100, "iOS", "fwdbtn"),

  // 2023 - Let It Happen is most played
  raw("2023-12-28T15:30:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "iOS", "clickrow"),
  raw("2023-12-20T21:10:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "android", "trackdone"),
  raw("2023-12-05T13:00:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "Windows", "clickrow"),
  raw("2023-11-18T09:15:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "iOS", "trackdone"),
  raw("2023-11-10T19:45:00Z", "karmaPolice", "Karma Police", "Radiohead", 258000, "iOS", "backbtn"),
  raw("2023-10-30T14:20:00Z", "goYourOwnWay", "Go Your Own Way", "Fleetwood Mac", 215000, "android", "trackdone"),
  raw("2023-10-15T22:00:00Z", "letItHappen", "Let It Happen", "Tame Impala", 3800, "iOS", "fwdbtn"),
  raw("2023-09-28T11:30:00Z", "nocturnal", "Nocturnal", "The Midnight", 301000, "Windows", "clickrow"),
  raw("2023-09-14T08:45:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 272000, "iOS", "backbtn"),
  raw("2023-08-25T17:15:00Z", "danceYrselfClean", "Dance Yrself Clean", "LCD Soundsystem", 434000, "android", "clickrow"),
  raw("2023-08-08T20:30:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "iOS", "trackdone"),
  raw("2023-07-22T16:00:00Z", "dreams", "Dreams", "Fleetwood Mac", 254000, "Windows", "trackdone"),
  raw("2023-07-10T12:45:00Z", "getLucky", "Get Lucky", "Daft Punk", 1500, "iOS", "fwdbtn"),

  // 2022 - Get Lucky is most played
  raw("2022-12-15T10:20:00Z", "getLucky", "Get Lucky", "Daft Punk", 248000, "android", "clickrow"),
  raw("2022-11-30T21:05:00Z", "getLucky", "Get Lucky", "Daft Punk", 248000, "iOS", "trackdone"),
  raw("2022-11-12T14:40:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "Windows", "backbtn"),
  raw("2022-10-28T09:15:00Z", "getLucky", "Get Lucky", "Daft Punk", 248000, "iOS", "clickrow"),
  raw("2022-10-10T18:30:00Z", "fakePlasticTrees", "Fake Plastic Trees", "Radiohead", 234000, "android", "trackdone"),
  raw("2022-09-20T13:00:00Z", "oneMoreTime", "One More Time", "Daft Punk", 320000, "iOS", "clickrow"),
  raw("2022-09-05T07:30:00Z", "getLucky", "Get Lucky", "Daft Punk", 2700, "Windows", "fwdbtn"),
  raw("2022-08-18T22:15:00Z", "roygbiv", "Roygbiv", "Boards of Canada", 162000, "iOS", "clickrow"),
  raw("2022-07-30T16:45:00Z", "avril14th", "Avril 14th", "Aphex Twin", 124000, "android", "trackdone"),
  raw("2022-07-12T11:00:00Z", "karmaPolice", "Karma Police", "Radiohead", 258000, "iOS", "backbtn"),
  raw("2022-06-25T19:30:00Z", "getLucky", "Get Lucky", "Daft Punk", 248000, "iOS", "trackdone"),
  raw("2022-05-14T08:45:00Z", "nocturnal", "Nocturnal", "The Midnight", 1900, "android", "fwdbtn"),

  // 2021 - Do I Wanna Know? is most played
  raw("2021-12-20T15:30:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 272000, "iOS", "clickrow"),
  raw("2021-12-05T21:00:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 272000, "android", "trackdone"),
  raw("2021-11-18T10:15:00Z", "sing", "Sing", "Four Tet", 302000, "iOS", "clickrow"),
  raw("2021-11-02T17:45:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 272000, "Windows", "backbtn"),
  raw("2021-10-20T14:00:00Z", "letItHappen", "Let It Happen", "Tame Impala", 467000, "iOS", "clickrow"),
  raw("2021-09-15T09:30:00Z", "dreams", "Dreams", "Fleetwood Mac", 254000, "android", "trackdone"),
  raw("2021-08-28T20:15:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 4200, "iOS", "fwdbtn"),
  raw("2021-08-10T12:00:00Z", "karmaPolice", "Karma Police", "Radiohead", 258000, "Windows", "backbtn"),
  raw("2021-07-22T18:30:00Z", "getLucky", "Get Lucky", "Daft Punk", 248000, "iOS", "clickrow"),
  raw("2021-06-15T11:45:00Z", "losAngeles", "Los Angeles", "The Midnight", 289000, "android", "trackdone"),
  raw("2021-05-30T16:00:00Z", "doIWannaKnow", "Do I Wanna Know?", "Arctic Monkeys", 272000, "iOS", "clickrow"),
  raw("2021-04-12T08:30:00Z", "goYourOwnWay", "Go Your Own Way", "Fleetwood Mac", 1100, "android", "fwdbtn"),
];
