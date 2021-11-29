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
      "tomatoes.viwer.rating": {
        $gte: 3,
      },
    },
  },
  {
    $project: {
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
      "tomatoes.viwer.rating": -1,
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
