db.movies.aggregate([
  {
    $project: {
      cast: 1,
      favMatch: {
        $setIntersection: [
          "$cast",
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
        ],
      },
      _id: 0,
    },
  },
  {
    $project: {
      _id: 0,
      num_favs: {
        $cond: {
          if: {
            $isArray: "$favMatch",
          },
          then: {
            $size: "$favMatch",
          },
          else: "NA",
        },
      },
    },
  },
  {
    $match: {
      countries: "USA",
      "tomatoes.viwer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viwer.rating": -1,
      title: -1,
    },
  },
]);
