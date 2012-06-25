## JSONpipen

  Usage: json [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -r, --read     Output as line by line representation for use with grep and other line tools

Json command line manipulation tool. Pipe json file through the utility.
Takes dot selector parameter to only return individual portions of the
result.

The -r flag can be used to output in an easy to grep format.

## Examples

Using the following JSON file:

  {"apiVersion":"2.0",
    "data":{
      "updated":"2010-01-07T19:58:42.949Z",
      "totalItems":800,
      "startIndex":1,
      "itemsPerPage":1,
      "items":[
      {"id":"hYB0mn5zh2c",
        "uploaded":"2007-06-05T22:07:03.000Z",
        "updated":"2010-01-07T13:26:50.000Z",
        "uploader":"GoogleDeveloperDay",
        "category":"News",
        "title":"Google
          Developers
          Day
          US
          - Maps
          API
          Introduction",
        "description":"Google
          Maps
          API
          Introduction
          ...",
        "tags":[
          "GDD07","GDD07US","Maps"
          ],
        "thumbnail":{
          "default":"http://i.ytimg.com/vi/hYB0mn5zh2c/default.jpg",
          "hqDefault":"http://i.ytimg.com/vi/hYB0mn5zh2c/hqdefault.jpg"
        },
        "player":{
          "default":"http://www.youtube.com/watch?v\u003dhYB0mn5zh2c"
        },
        "content":{
          "1":"rtsp://v5.cache3.c.youtube.com/CiILENy.../0/0/0/video.3gp",
          "5":"http://www.youtube.com/v/hYB0mn5zh2c?f...",
          "6":"rtsp://v1.cache1.c.youtube.com/CiILENy.../0/0/0/video.3gp"
        },
        "duration":2840,
        "aspectRatio":"widescreen",
        "rating":4.63,
        "ratingCount":68,
        "viewCount":220101,
        "favoriteCount":201,
        "commentCount":22,
        "status":{
          "value":"restricted",
          "reason":"limitedSyndication"
        },
        "accessControl":{
          "syndicate":"allowed",
          "commentVote":"allowed",
          "rate":"allowed",
          "list":"allowed",
          "comment":"allowed",
          "embed":"allowed",
          "videoRespond":"moderated"
        }
      }
      ]
    }
  }

Getting accessControl section only:

  $ cat test/youtube.json | json data.items[0].accessControl

Returns:

  {
    "syndicate": "allowed",
    "commentVote": "allowed",
    "rate": "allowed",
    "list": "allowed",
    "comment": "allowed",
    "embed": "allowed",
    "videoRespond": "moderated"
  }

"grepable" format:

  /syndicate/allowed
  /commentVote/allowed
  /rate/allowedwed
  /list/allowed
  /comment/allowed
  /embed/allowed
  /videoRespond/moderated


