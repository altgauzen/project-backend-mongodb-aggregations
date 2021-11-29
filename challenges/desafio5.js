const favActTrybe = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
    },
  },
  {
    $project: {
      title: 1,
      "tomatoes.viewer.rating": 1,
      cast: 1,
      favMatch: {
        $setIntersection: [
          "$cast",
          favActTrybe,
        ],
      },
      _id: 0,
    },
  },
  {
    $addFields: {
      num_favs: {
        $cond: {
          if: {
            $isArray: "$favMatch",
          },
          then: {
            $size: "$favMatch",
          },
          else: 0,
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $limit: 25,
  },
  {
    $skip: 24,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
