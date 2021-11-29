db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /won [0-9] oscar/i },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_: { $avg: "$imdb.rating" },
      desvio_: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_", 1] },
      desvio_padrao: { $round: ["$desvio_", 1] },
      _id: false,
    },
  },
]);
