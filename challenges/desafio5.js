/*  const favActTrybe = ["Sandra Bullock", "Tom Hanks",
 "Julia Roberts", "Kevin Spacey", "George Clooney"];
*/
db.movies.aggregate([
  {
    $addFields: {
      favActTrybe: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    },
  },
  {
    $project: {
      favMatch: {
        $setIntersection: ["$cast", "$favActTrybe"],
      },
      _id: 0,
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
      _id: null,
      title: 1,
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
    $sort: {
      num_favs: -1,
      "tomatoes.viwer.rating": -1,
      title: -1,
    },
  },
]);
